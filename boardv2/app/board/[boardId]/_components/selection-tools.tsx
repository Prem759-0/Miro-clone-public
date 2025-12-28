"use client";

import { memo } from "react";
import { Camera, Color } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useMutation, useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/components/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf(
      (me) => me.presence.selection ?? []
    ) as string[];

    /* =======================
       MOVE TO BACK
       ======================= */
    const moveToBack = useMutation(
      ({ storage }) => {
        if (selection.length === 0) return;

        const layerIds = storage.get("layerIds"); // LiveList<string>
        const ids = layerIds.toImmutable();

        const selected = ids.filter((id) => selection.includes(id));
        const remaining = ids.filter((id) => !selection.includes(id));

        const newOrder = [...selected, ...remaining];

        while (layerIds.length > 0) {
          layerIds.delete(0);
        }

        newOrder.forEach((id) => {
          layerIds.push(id);
        });
      },
      [selection]
    );

    /* =======================
       MOVE TO FRONT
       ======================= */
    const moveToFront = useMutation(
      ({ storage }) => {
        if (selection.length === 0) return;

        const layerIds = storage.get("layerIds");
        const ids = layerIds.toImmutable();

        const selected = ids.filter((id) => selection.includes(id));
        const remaining = ids.filter((id) => !selection.includes(id));

        const newOrder = [...remaining, ...selected];

        while (layerIds.length > 0) {
          layerIds.delete(0);
        }

        newOrder.forEach((id) => {
          layerIds.push(id);
        });
      },
      [selection]
    );

    /* =======================
       SET FILL COLOR
       ======================= */
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const layers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          layers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x =
      selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
          )`,
        }}
      >
        <ColorPicker onChange={setFill} />

        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button
              onClick={moveToFront}
              variant="board"
              size="icon"
            >
              <BringToFront />
            </Button>
          </Hint>

          <Hint label="Send to back" side="bottom">
            <Button
              onClick={moveToBack}
              variant="board"
              size="icon"
            >
              <SendToBack />
            </Button>
          </Hint>

          <Hint label="Delete" side="bottom">
            <Button
              onClick={deleteLayers}
              variant="board"
              size="icon"
            >
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
