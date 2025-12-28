"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Actions } from "@/components/actions";
import Image from "next/image";
import { Poppins } from "next/font/google"
import {Hint} from "@/components/hint"
import { useRenameModal } from "@/store/use-rename-modal";

import { cn } from "@/lib/utils"; 
import { Menu } from "lucide-react";

interface InfoProps{
    boardId : string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
        |
        </div>
    )
}

export const Info = ({ boardId }: InfoProps) => {
    const {onOpen} = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    if (!data) return <InfoSkeleton />

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to boards" side="bottom" sideOffset={10}>

            <Button asChild variant="board" className="px-2">
                <Link href="/">
                
                <Image
                 src="/logo.svg"
                 alt="logo"
                 height={30}
                 width={30}
                />

                <span className={cn("font-semibold text-xl ml-1 text-black")}>
                    Canvra
                </span>
                </Link>
            </Button>

            </Hint>

            <TabSeparator/>

            <Hint label="Edit title" side="bottom" sideOffset={10}>

            <Button
              variant="board"
              className="text-base font-normal  px-2"
              onClick={()=> onOpen(data._id, data.title)}
            >
                {data.title}
            </Button>
            </Hint>
            <TabSeparator/>

            <Actions
              id={data._id}
              title={data.title}
              side="bottom"
              sideOffset={10}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                         <Button
                             variant="board"
                             size="icon"
                         >
                            <Menu/>
                         </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    )
}

export const InfoSkeleton = () => {
    return (
        <div
            className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
        />
    )
}

// attach skeleton as a static property for convenience (used as <Info.Skeleton />)
(Info as any).Skeleton = InfoSkeleton

