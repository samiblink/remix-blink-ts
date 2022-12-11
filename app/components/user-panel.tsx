
import type { User } from "@prisma/client"
import { UserCircle } from "./user-circle"
import { useNavigate } from "@remix-run/react"


// creates side panel containing list of users. TODO - make dynamic
export function UserPanel({users}: {users: User[] }) {
    const navigate = useNavigate()
    return (
        <div className="w-160 bg-gray-200 flex flex-col">
            <div className="text-center bg-gray-300 h-20 flex items-center justify-center shadow-lg">
                <h2 className="text-xl text-gray-800 font-semibold">My Team</h2>
            </div>
            <div className="flex-1 overflow-y py-4 flex flex-col gap-y-4">
                {users.map((user) => ( // all found users are rendered here with initials
                    <UserCircle 
                    key={user.id} 
                    profile={user.profile} 
                    className="h-24 w-24 mx-auto flex-shrink-0" 
                    onClick={() => navigate(`kudo/${user.id}`)}
                    />
                ))}
            </div>
            <div className="text-center p-6 bg-gray-300 ">
                <form action="/logout" method="post">
                    <button type="submit" className="rounded-xl bg-gray-800 font-semibold text-gray-400 px-3 py-2 transition duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-800 hover:-translate-y-1"
                    >Sign Out
                    </button>
                </form>
            </div>
        </div>
    )
}