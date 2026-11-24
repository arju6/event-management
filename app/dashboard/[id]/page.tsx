"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default  function Edit(){
        const [event, setEvent] = useState({
            eventName: "",
            description: "",
            eventDate: "",
            venue: "",
            eventType: "",
            status: ""
        })
        const {id}=useParams()
        const router=useRouter()
        useEffect(() => {
            let isActive = true
            const loadEvent = async () => {
                const res = await fetch(`/api/event/${id}`)
                const response = await res.json()
                if (res.ok && isActive) {
                    setEvent({
                        eventName: response.data.eventName,
                        description: response.data.description,
                        eventDate: new Date(response.data.eventDate).toISOString().slice(0, 10),
                        venue: response.data.venue,
                        eventType: response.data.eventType,
                        status: response.data.status
                    })
                }
            }

            void loadEvent()
            return () => {
                isActive = false
            }
        }, [id])

        const updateEvent=async()=>{

            const { eventName, description, eventDate, venue, eventType, status } = event
            if(eventName && description && eventDate && venue && eventType && status){

             const res=await fetch(`/api/event/${id}`,{
                    method:'PUT',
                    headers: { "Content-Type": "application/json" },
                    body:JSON.stringify(event)
                })
              const response=await  res.json()
              if(res.ok){
                toast.success("Event Updated Successfully")
                router.push('/dashboard')
              } else {
                toast.error(response.message)
              }

            }
            else{
                toast.error("Please fill in all event fields")
            }
        }

    return(

        <div className="flex items-center justify-center min-h-screen flex-col">
            <h1 className="text-red-700 my-5 text-4xl font-bold">UPDATE YOUR EVENT</h1>
            <div className="bg-white w-100 rounded-2xl mt-5 p-6 shadow-sm border border-slate-200   border-t-4 border-t-rose-400 border-b-4 border-b-rose-400">
                <form>
                    <div>
                        <input value={event.eventName} onChange={(e) => setEvent({ ...event, eventName: e.target.value })} type="text" placeholder="Event Name" className="p-2 border border-rose-400  rounded shadow w-full" />
                    </div>
                    <div className="my-2">
                        <textarea value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} placeholder="Description" className="p-2 border border-rose-400  rounded shadow w-full" />
                    </div>
                    <div className="my-2">
                        <input value={event.eventDate} onChange={(e) => setEvent({ ...event, eventDate: e.target.value })} type="date" aria-label="Event Date" className="p-2 border border-rose-400 rounded shadow w-full" />
                    </div>
                    <div className="my-2">
                        <input value={event.venue} onChange={(e) => setEvent({ ...event, venue: e.target.value })} type="text" placeholder="Venue" className="p-2 border border-rose-400 rounded shadow w-full" />
                    </div>
                    <div className="my-2">
                        <input value={event.eventType} onChange={(e) => setEvent({ ...event, eventType: e.target.value })} type="text" placeholder="Event Type" className="p-2 border border-rose-400 rounded shadow w-full" />
                    </div>
                    <div className="my-2">
                        <input value={event.status} onChange={(e) => setEvent({ ...event, status: e.target.value })} type="text" placeholder="Status" className="p-2 border border-rose-400 rounded shadow w-full" />
                    </div>
                    <button onClick={updateEvent} type="button"  className="bg-rose-600 text-white font-bold w-full p-2 rounded">
                        UPDATE</button>


                </form>


            </div>

        </div>
    )
}