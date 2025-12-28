"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@liveblocks/react";
import {LiveMap, LiveObject, LiveList} from "@liveblocks/client";
import {Layer} from "@/types/canvas"
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  roomId: string;
  children: ReactNode;
  fallback: ReactNode;
}

export const Room = ({ roomId, children, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider 
      id={roomId} 
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
        >
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
