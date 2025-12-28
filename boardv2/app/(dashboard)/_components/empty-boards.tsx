"use client"

import { Button } from "@/components/ui/button"

import { api } from "@/convex/_generated/api"
import Image from "next/image"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const EmptyBoards = () => {
  const router = useRouter();

  const {mutate, pending} = useApiMutation(api.board.create);
  const {organization} = useOrganization();

  const onClick = () =>{
     if (!organization) return;

    mutate({
        orgId: organization.id,
        title: "Untitled"
     })
     .then((id)=>{
        toast.success("Board created successfully 🎉");
        router.push(`/board/${id}`)
     })
     .catch(()=> toast.error(("Failed to create board‼️")))
  }

  return (
    <div className="h-full flex flex-col items-center justify-center px-4">

      {/* RESPONSIVE IMAGE (SAME AS elements.png) */}
      <div
        className="
          w-[200px]
          sm:w-[240px]
          md:w-[280px]
          lg:w-[200px]
          2xl:w-[380px]
        "
      >
        <Image
          src="/8.png"
          alt="No results"
          width={380}
          height={380}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6 text-center">
        Create your first board!
      </h2>

      <p className="text-muted-foreground text-sm mt-2 text-center">
       Start by creating a board for your organization.
      </p>

      <div className="mt-6">
         <Button disabled={pending} onClick={onClick} size="lg">
            Create board
         </Button>
      </div>
    </div>
  )
}
