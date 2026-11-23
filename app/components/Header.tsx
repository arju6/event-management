"use client";
import { signOut } from "next-auth/react";
export default function Header(){
    const handleLogout=async ()=>{
    await signOut({callbackUrl:"/login"})
    }
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 text-white sm:px-8">
      <div >
            <button
              type="button" className="bg-black text-white font-bold w-full p-2 rounded" onClick={handleLogout}>
              Logout
            </button>
          </div>
    </header>
  );
}
