
"use client"
import { useParams, useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import toast from "react-hot-toast"



function EditForm(){
        const [note, setNote] = useState({ title: "", description: "" })
        const {id}=useParams()
        const router=useRouter()
        useEffect(() => {
         getNote()
        }, [])
        

        const getNote=async()=>{

           const res=await fetch(`/api/note/${id}`)
           const response=await res.json()
        //    console.log(response);
        if(res.status==200){
            setNote(response.data)
        }
           


        }

        const updateNote=async()=>{

            const {title,description}=note
            if(title&&description){

             const res=await fetch(`/api/note/${id}`,{
                    method:'PUT',
                    body:JSON.stringify(note)
                })
              const response=await  res.json()
            //   console.log(response);
              if(res.status==200){
                toast.success("Note Updated Successfully")
                router.push('/dashboard')
              }

            }
            else{
                toast.error("enter title and description")
            }
        }
    
    return(
        
        <div className="flex items-center justify-center min-h-screen flex-col">
            <h1 className="text-red-700 my-5 text-4xl font-bold">UPDATE YOUR NOTE</h1>
            <div className="bg-white w-100 rounded-2xl mt-5 p-6 shadow-sm border border-slate-200   border-t-4 border-t-rose-400 border-b-4 border-b-rose-400">
                <form>
                    <div>
                        <input value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} type="text" placeholder="Title" className="p-2 border border-rose-400  rounded shadow w-full" />
                    </div>
                    <div className="my-2">
                        <textarea value={note.description} onChange={(e) => setNote({ ...note, description: e.target.value })} placeholder="Description" className="p-2 border border-rose-400  rounded shadow w-full" />
                    </div>
                    <button onClick={updateNote} type="button"  className="bg-rose-600 text-white font-bold w-full p-2 rounded">
                        UPDATE</button>


                </form>


            </div>

        </div>
    )
}

export default function Edit(){
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading note...</div>}>
            <EditForm />
        </Suspense>
    )
}