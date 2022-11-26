import type { LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getUserById } from "~/utils/user.server"
import { Portal } from "~/components/portal"

export const loader: LoaderFunction = async ({request, params}) => {
    const { userId } = params // pulls params field from loader function and grabs userId value.

    if (typeof userId !== "string") {
        return redirect("/home")
    }
    const recipient = await getUserById(userId)
    return json({ recipient })
}
export default function KudoModal() {
    const data = useLoaderData()
    // retrieves data from the loader function with userLoaderData and renders userId to the screen.
    return <Portal wrapperId="kudo-modal"><h2> User: {data.userId} </h2></Portal>
    
}