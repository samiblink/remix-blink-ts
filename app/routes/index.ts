import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { requireUserId } from "../utils/auth.server"

// Remix runs the loader function before serving your page. Redirects in loader will trigger before your page is served.
// returns the user to the login screen if they are not logged in.
export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return redirect("/home")
}