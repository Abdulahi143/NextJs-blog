import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error("Database connection unsuccessful😢");
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ msg: "success", posts }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            // If 'error' is of type 'Error', access the 'message' property
            return NextResponse.json({ msg: "Error", error: error.message }, { status: 500 });
        } else {
            // Handle other cases where 'error' is not an instance of 'Error'
            return NextResponse.json({ msg: "Error", error: "An unknown error occurred" }, { status: 500 });
        }
    } finally {
        await prisma.$disconnect();
    }
}

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { title, description } = await req.json();
        await main();

        const post = await prisma.post.create({ data: { description, title } });
        return NextResponse.json({ msg: "success", post }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            // If 'error' is of type 'Error', access the 'message' property
            return NextResponse.json({ msg: "Error", error: error.message }, { status: 500 });
        } else {
            // Handle other cases where 'error' is not an instance of 'Error'
            return NextResponse.json({ msg: "Error", error: "An unknown error occurred" }, { status: 500 });
        }
    } finally {
        await prisma.$disconnect();
    }
}
