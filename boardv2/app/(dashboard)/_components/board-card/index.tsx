"use client"

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import {formatDistanceToNow} from "date-fns"

import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite,
}: BoardCardProps) => {
    const {userId} = useAuth();

    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });


    const {
      mutate: onFavorite,
      pending: pendingFavorite,
    } = useApiMutation(api.board.favorite)

    const {
      mutate: onUnfavorite,
      pending: pendingUnfavorite,
    } = useApiMutation(api.board.unfavorite)

    const toggleFavorite = () => {
        if(isFavorite){
            onUnfavorite({id})
              .catch(() => toast.error("Failed to unfavorite"))
        } else {
            onFavorite({id, orgId})
             .catch(() => toast.error("Failed to favorite"))
        }
    }

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image 
                       src={imageUrl}
                       alt={title}
                       fill
                       className="object-cover"
                    />
                    <Overlay/>
                    <Actions
                       id={id}
                       title={title}
                       side="right"
                    >
                      <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                       <MoreHorizontal 
                          className="text-white opacity-75 hover:opacity-100 transition-opacity"
                       />
                      </button>

                    </Actions>
                </div>
                <Footer
                      isFavorited={isFavorite}
                      title={title}
                      authorLabel={authorLabel}
                      createdAtLabel={createdAtLabel}
                      onClick={toggleFavorite}
                      disabled={pendingFavorite || pendingUnfavorite}
                />
            </div>
        </Link>
    )
};


BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] border rounded-lg overflow-hidden bg-white">

      {/* Image placeholder */}
      <Skeleton className="h-[75%] w-full rounded-none animate-none bg-muted/80" />

      {/* Footer placeholder */}
      <div className="p-3 space-y-2 bg-muted/95">
        <Skeleton className="h-3 w-3/4 animate-none bg-muted/70" />
        <Skeleton className="h-2 w-1/2 animate-none bg-muted/60" />
      </div>

    </div>
  );
};



