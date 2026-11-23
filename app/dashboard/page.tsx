"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Header from "../components/Header";

interface Note {
    _id: string,
    title: string,
    description: string
}

export default function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([])
    // console.log(notes);
    useEffect(() => {
        fetchNote()

    }, [])


    const fetchNote = async () => {
        const res = await fetch(`/api/note`)
        const response = await res.json()
        setNotes(response.data)

    }

    const removeNote =async (id:string) => {
        console.log("--------------");
        
     const res=await   fetch(`/api/note/${id}`,{
            method:'DELETE'
        })
        // console.log(res);
        
        if(res.status==200){
            fetchNote()
        }
    }
    return (
      <>
      <Header/>
            <div className="min-h-screen bg-slate-50 px-5 py-10 md:px-12">
    
                {/* Header */}
                <div className="max-w-6xl mx-auto">
    
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-5">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
                                My Notes<span className="text-rose-500">.</span>
                            </h1>
                            <p className="text-slate-500 mt-2">
                                Organize your thoughts and ideas in one place.
                            </p>
                        </div>
    
                        <Link
                            href="/dashboard/add"
                            className="bg-slate-900 hover:bg-rose-500 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2"
                        >
                            <span className="text-xl">+</span> Add New Note
                        </Link>
                    </div>
    
                    {/* Notes Section */}
                    <div className="mb-5 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-700">
                            All Notes
                        </h2>
                    </div>
    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
                        {/* Note Card */}
                        {
                            notes?.length > 0 ?
                                notes?.map((note: Note) => (
                                    <div key={note?.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200   border-t-4 border-t-rose-400">
    
    
    
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                            {note?.title}
                                        </h3>
    
                                        <p className="text-slate-500 leading-relaxed line-clamp-3">
                                            {note?.description}
                                        </p>
    
                                        <div className="flex justify-end items-center gap-3 mt-7 pt-4 border-t border-slate-100">
    
                                            <button onClick={() => removeNote(note?._id)} className="p-3 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                                                <FaTrash size={16} />
                                            </button>
    
                                            <Link
                                                href={`/dashboard/${note?._id}`}
                                                className="p-3 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                                            >
                                            </Link>
                                  <MdEdit size={18} />
    
    
                                        </div>
                                    </div>
                                ))
                                :
                                <p className="text-center font-bold my-5 text-red-700 text-2xl">No Node Added Yet!</p>
                        }
                    </div>
                </div>
            </div>
      </>
    )
}