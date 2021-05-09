import { useRouter } from "next/router"
import { usePostQuery, useProductQuery } from "../generated/graphql"
import { useGetIntId } from "./useGetIntId"

export const useGetPostFromUrl = () => {
  const intId = useGetIntId()
    return useProductQuery({
        pause: intId === -1,
        variables:{
            id: intId
        }
    })
}