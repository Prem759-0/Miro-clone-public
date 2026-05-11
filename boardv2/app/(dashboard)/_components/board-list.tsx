"use client";

import { Loader } from "lucide-react";
import { useQuery } from "convex/react";
import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps{
    orgId: string;
    query:{
        search? : string;
        favorites? : string;
    };
}

export const BoardList = ({
    orgId, 
    query,
}: BoardListProps) => {

    const data = useQuery(api.boards.get, {
        orgId,
        ...query
    });

if (data === undefined) {
  return (
    <div className="relative min-h-[400px]">
      <h2 className="text-3xl font-semibold">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <Loader className="w-8 h-8 text-muted-foreground animate-spin" />
      </div>

      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-6
          gap-5 mt-8 pb-10 opacity-50
        "
      >
        {!query.favorites && (
         <NewBoardButton orgId={orgId} disabled/>
        )}

        {Array.from({ length: 5 }).map((_, i) => (
          <BoardCard.Skeleton key={i} />
        ))}
      </div>
    </div>
  );
}




    if(!data?.length && query.search){
        return(
           <EmptySearch/>
        )
    }

    if(!data?.length && query.favorites){
        return <EmptyFavorites/>;
    }

    if(!data?.length ){
        return <EmptyBoards/>
    }

    return(
        <div>
            <h2 className="text-3xl">
               {query.favorites ? " Favorite boards" : " Teram boards"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-8 pb-10">
                {!query.favorites && (
                 <NewBoardButton orgId={orgId} disabled={false}  />
                )}
                {data?.map((board)=>(
                    <BoardCard
                     key={board._id}
                     id={board._id}
                     title={board.title}
                     imageUrl={board.imageUrl}
                     authorId={board.authorId}
                     orgId={board.orgId}
                     authorName={board.authorName}
                     createdAt={board._creationTime}
                     isFavorite={board.isFavorite}
                    />
                ))}
            </div> 
        </div>
    )
}
