import notes from '@/models/noteModel'
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        const { id } = await params
        const noteDetails = await notes.findById({ _id: id })
        return NextResponse.json({ message: "note details", data: noteDetails }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "something went wrong", data: {} }, { status: 500 })

    }
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        const { id } = await params
        const body = await req.json()
        const updatedNote = await notes.findByIdAndUpdate({ _id: id }, body, { new: true })
        return NextResponse.json({ message: "Note Updated Succesfully", data: updatedNote }, { status: 200 })


    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "something went wrong", data: {} }, { status: 500 })

    }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    try {
        const { id } = await params
        const dltedNote = await notes.findByIdAndDelete({ _id: id })
        return NextResponse.json({ message: "Note Deleted Successfully", data: dltedNote }, { status: 200 })


    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "something went wrong", data: {} }, { status: 500 })

    }
}