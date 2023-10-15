"use client"

import { Fragment, useRef } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/app/util/baseURL";

export const dynamic = 'force-dynamic';



const addBlog = async ({ title, description }: { title: string; description: string }) => {

  const baseURL = getBaseUrl();


  const res = await fetch(`${baseURL}/api/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Use headers to set Content-Type
    },
    body: JSON.stringify({ title, description }),
  });

  return await res.json(); // Await the response before calling .json()
};


const AddPost = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const router = useRouter();

  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (titleRef.current && descriptionRef.current) {
        toast.loading("Sending Request 😂", {id: "1"})
        await addBlog({
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        });
        toast.success("Blog Posted Successfully 😂", {id: "1"})
      }
      router.push("/");

    };

  return(
  <Fragment>
        <Toaster />
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">Add your post here to make the world better place📖</p>
                <form onSubmit={handleSubmit}>
                    <input ref={titleRef} type="text" className="rounded-md w-full px-4 py-2 my-2" placeholder="Give the post title" />
                    <textarea ref={descriptionRef} className="round-md px-4 py-2 w-full my-2" placeholder="Portray your content here...."></textarea>
                    <button className="fonts-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">Create post</button>
                </form>
            </div>
        </div>
  </Fragment>  
)}

export default AddPost