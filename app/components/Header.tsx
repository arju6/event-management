"use client"

import { signOut } from "next-auth/react"



export default function Header(){

    const handleLogout=async()=>{
       await signOut({
        callbackUrl:'/login'

        })

    }
    return(
         <header className="flex items-center justify-between bg-white px-4 py-3 text-white sm:px-8">
      <div className="flex items-center space-x-4">
            <button onClick={handleLogout} className="bg-blue-600 text-white p-2 rounded">  Logout
            </button>
          </div>
    </header>
    )
}
