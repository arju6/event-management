"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Header from "../components/Header";

interface Event {
    _id: string,
    eventName: string,
    description: string,
    eventDate: string,
    venue: string,
    eventType: string,
    status: string
}

export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        let isActive = true
        const loadEvents = async () => {
            const res = await fetch("/api/event")
            const response = await res.json()
            if (res.ok && isActive) {
                setEvents(response.data)
            }
        }

        void loadEvents()
        return () => {
            isActive = false
        }
    }, [])

    const removeEvent = async (id:string) => {
     const res=await fetch(`/api/event/${id}`,{
            method:'DELETE'
        })
        if(res.ok){
            const eventsResponse = await fetch("/api/event")
            const response = await eventsResponse.json()
            if (eventsResponse.ok) {
                setEvents(response.data)
            }
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
                                My Events<span className="text-rose-500">.</span>
                            </h1>
                            <p className="text-slate-500 mt-2">
                                Manage your events in one place.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/add"
                            className="bg-slate-900 hover:bg-rose-500 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2"
                        >
                            <span className="text-xl">+</span> Add New Event
                        </Link>
                    </div>

                    {/* Events Section */}
                    <div className="mb-5 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-700">
                            All Events
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            events?.length > 0 ?
                                events?.map((event: Event) => (
                                    <div key={event?._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-t-4 border-t-rose-400">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                            {event?.eventName}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed line-clamp-3">
                                            {event?.description}
                                        </p>
                                        <p className="mt-3 text-slate-600">Date: {new Date(event.eventDate).toLocaleDateString(undefined, { timeZone: "UTC" })}</p>
                                        <p className="text-slate-600">Venue: {event.venue}</p>
                                        <p className="text-slate-600">Type: {event.eventType}</p>
                                        <p className="text-slate-600">Status: {event.status}</p>
                                        <div className="flex justify-end items-center gap-3 mt-7 pt-4 border-t border-slate-100">
                                            <button onClick={() => removeEvent(event?._id)} className="p-3 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                                                <FaTrash size={16} />
                                            </button>
                                            <Link
                                                href={`/dashboard/${event?._id}`}
                                                className="p-3 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                                            >
                                                <MdEdit size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                                :
                                <p className="text-center font-bold my-5 text-red-700 text-2xl">No Event Added Yet!</p>
                        }
                    </div>
                </div>
            </div>
      </>
    )
}