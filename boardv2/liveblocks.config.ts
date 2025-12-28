// liveblocks.config.ts

import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {Layer, Color} from "@/types/canvas"
import {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useSelf,
  useOthers,
  useOther,
  useOthersConnectionIds,
  useBroadcastEvent,
  useEventListener,
  useErrorListener,
  useStorage,
  useMutation,
  useHistory,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
  useStatus,
  useLostConnectionListener,
  useThreads,
  useUser,
  useCreateThread,
  useEditThreadMetadata,
  useCreateComment,
  useEditComment,
   useOthersMapped,
} from "@liveblocks/react";

/* =====================================================
   Liveblocks client (AUTH ENDPOINT MODE)
===================================================== */
export const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});

/* =====================================================
   Global Liveblocks typings
===================================================== */
declare global {
  interface Liveblocks {
    Presence: {
      cursor: {x: number; y: number; } | null;
      selection: string[];
      pencilDraft: [x: number, y: number, pressure: number][] | null;
      penColor: Color | null;
    };
    Storage: {
      layers: LiveMap<string, LiveObject<Layer>>;
      layerIds: LiveList<string>;
    };
    UserMeta: {
      id: string;
      info: {
        name?: string;
        picture?: string;
      };
    };
    RoomEvent: {   };
    ThreadMetadata: {};
    RoomInfo: {};
  }
}

/* =====================================================
   Re-exports
===================================================== */
export {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useSelf,
  useOthers,
  useOther,
  useOthersConnectionIds,
  useBroadcastEvent,
  useEventListener,
  useErrorListener,
  useStorage,
  useMutation,
  useHistory,
  useUndo,
  useRedo,
  useCanUndo,
  useCanRedo,
  useStatus,
  useLostConnectionListener,
  useThreads,
  useUser,
  useCreateThread,
  useEditThreadMetadata,
  useCreateComment,
  useEditComment,
  useOthersMapped,
};

export {};
