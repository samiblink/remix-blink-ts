import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { logout} from '~/utils/auth.server';

// POST action that triggers the logout process
export const action: ActionFunction = async ({ request }) => logout(request);
// GET action - user sent to home page
export const loader: LoaderFunction = async () => redirect("/");
