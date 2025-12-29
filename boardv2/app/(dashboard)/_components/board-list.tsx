"use client";



import { useQuery } from "convex/react";
import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";
import { Doc } from "@/convex/_generated/dataModel";

interface BoardListProps{
    orgId: string;
    query:{
        search? : string;
        favorites? : string;
    };
}

type BoardWithFavorite = Doc<"boards"> & { isFavorite: boolean };

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
    <div>
      <h2 className="text-3xl font-semibold">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>

      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
          lg:grid-cols-5 xl:grid-cols-6
          gap-5 mt-8 pb-10
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
                {data?.map((board: BoardWithFavorite)=>(
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