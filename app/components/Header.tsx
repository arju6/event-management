"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function Header(){
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout=async()=>{
       setIsLoggingOut(true)
       await signOut({ callbackUrl: "/login" })
    }
    return(
         <header className="flex items-center justify-between bg-white px-4 py-3 text-white sm:px-8">
      <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded bg-blue-600 p-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
    </header>
    )
}
