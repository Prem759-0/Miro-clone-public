import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, {
    id: room,
  });

  if (!board) {
    return new Response("Unauthorized", { status: 403 });
  }

  // ✅ FIX: allow personal OR org boards
  if (board.orgId && board.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName || user.username || "Teammate",
      picture: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
