import { NextResponse } from "next/server"
import { main } from "../route";
import prisma from "@/prisma/client";

export const GET = async (req:Request, res: NextResponse) => {
    try {
        const id = req.url.split('/blog/')[1];
        await main();
        const post = await prisma.post.findFirst({where: {id}});
        if(!post) 
        return NextResponse.json({msg: "Not Found"}, {status: 500})
        return NextResponse.json({msg: "Success", post}, {status: 200})

    } catch (error) {
        return NextResponse.json({msg: "Error", error}, {status: 500})
    } finally {
        await prisma.$disconnect();
    } 
}
export const PUT = async (req:Request, res: NextResponse) => {
    try {
        const {title, description} = await req.json();
        const id = req.url.split('/blog/')[1];
        await main();

        const post = await prisma.post.update({data: {title, description}, where: {id}})

        return NextResponse.json({msg: "Success", post}, {status: 200}) 
    } catch (error) {
        return NextResponse.json({msg: "Error", error}, {status: 500})
    } finally {
        await prisma.$disconnect();
    } 
}

export const DELETE = async (req:Request, res: NextResponse) => {
    try {
        const id = req.url.split('/blog/')[1];
        await main();

        const post = await prisma.post.delete({where: {id: id}});

        return NextResponse.json({msg: "Post deleted Successfully😃", post}, {status: 200}) 
    } catch (error) {
        return NextResponse.json({msg: "Error", error}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
}