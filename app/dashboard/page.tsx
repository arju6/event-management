"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
interface Note {
    _id:string
    title: string,
    description: string
}

export default function Dashboard() {

    const [notes, setNotes] = useState<Note[]>([])

    const fetchNotes = async () => {
        const res = await fetch('/api/note')
        const response = await res.json()
        setNotes(response.data)
    }

    const removeNote = async (id: string) => {
        const res = await fetch(`/api/note/${id}`, {
            method: 'DELETE'
        });
        if(res.status === 200){
            fetchNotes()
        }
    };

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
            <Header />
            <div className="mx-auto max-w-5xl">
                <header className="flex flex-col gap-6 border-b border-slate-200 pb-7 sm:flex-row sm:items-center sm:justify-between sm:pb-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                            Your personal space
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                            Notes<span className="text-indigo-600">.</span>
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                            Keep your thoughts organized, one note at a time.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/add"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
                    >
                        <span className="text-lg leading-none" aria-hidden="true">+</span>
                        Add a note
                    </Link>
                </header>

                <section className="pt-8 sm:pt-10" aria-labelledby="notes-heading">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 id="notes-heading" className="text-lg font-semibold">Your collection</h2>
                            <p className="mt-1 text-sm text-slate-500">A little room for your ideas.</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                            {notes?.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            notes?.length > 0 ?
                                notes?.map(note => (
                                    <article key={note._id} className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                                               Notes
                                            </span>
                                            <span className="text-xs text-slate-400">Your note</span>
                                        </div>
                                        <h3 className="mt-6 text-xl font-semibold tracking-tight"> {note.title}</h3>
                                        <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                                            {note.description}

                                        </p>
                                        <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => removeNote(note._id)}
                                                aria-label="Delete note"
                                                className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-rose-600"
                                            >
                                                <FaTrash aria-hidden="true" />
                                            </button>
                                            <Link
                                                href={`/dashboard/${note._id}`}
                                                type="button"
                                                aria-label="Edit note"
                                                className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600"
                                            >
                                                <FaEdit aria-hidden="true" />
                                            </Link>
                                        </div>
                                    </article>
                                ))
                                :
                                <p className="text-center text-2xl">No Notes</p>
                        }


                    </div>
                </section>
            </div>
        </main>
    )
}