
"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {useSession} from 'next-auth/react';
import { getBaseUrl } from './util/baseURL';
import Image from 'next/image';


export const dynamic = 'force-dynamic';


const fetchBlogs = async () => {

const baseURL = getBaseUrl();

  const res = await fetch(`${baseURL}/api/blog?revalidate=10`);
  if (!res.ok) {
    console.error('API request failed with status:', res.status);
    return [];
  }
  const data = await res.json();
  return data.posts;
};



const Home = () => {

  const {data} = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log('Fetching data...');
    const fetchData = async () => {
      const data = await fetchBlogs();
      setPosts(data);
    };

    fetchData();
  }, []);


  return (
<main className="w-full h-full flex flex-col items-center">
  {/* Welcome and Name */}
  <div className="w-full p-4 my-5 text-center">
    <h1 className="text-slate-300 text-2xl font-extrabold font-verdana">
      Abdulahi Blog
    </h1>
   
  </div>

  {data ? (
  <div key="welcome-message" className="text-slate-200 font-semibold flex items-center">
    Welcome, {data.user?.name}
    {data.user?.image && (


<Image src={data.user.image} alt="User Profile" />

      
    )}
  </div>
) : null}

  <div className="w-3/4 flex justify-between p-4 my-5">
    <div>
      {data ? (
        <Link href="/api/auth/signout" className="p-2 bg-slate-200 font-semibold">
          Logout
        </Link>
      ) : (
        <Link href="/api/auth/signin" className="p-2 bg-slate-200 font-semibold">
          Login
        </Link>
      )}
    </div>
    {data ? (
      <Link href="/blog/add" className="p-2 bg-slate-200 font-semibold">
        Add new Post ➕
      </Link>
    ) : null}
  </div>

  {/* Blogs */}
  <div className="w-full flex flex-col items-center">
  {posts?.map((post: any) => (
    <div key={post.id} className="w-3/4 p-4 my-5 rounded-md bg-slate-200 flex flex-col justify-center">
      {/* Title and actions */}
      <div className="flex items-center my-3">
        <div className="mr-auto">
          <h2 className="font-semibold">{post.title}</h2>
        </div>
        {data ? (
          <>
            <Link
              href={`/blog/edit/${post.id}`}
              className="px-4 py-1 bg-slate-900 rounded-md font-semibold text-slate-200 mr-2"
            >
              Edit
            </Link>
            <Link
              href={`/blog/edit/${post.id}`}
              className="px-4 py-1 bg-red-900 rounded-md font-semibold text-slate-200"
            >
              Delete
            </Link>
          </>
        ) : null}
      </div>

      {/* Date and Description */}
      <div className="mr-auto my-1">
        <blockquote className="font-bold text-slate-700">
          {new Date(post.date).toDateString()}
        </blockquote>
      </div>

      <div className="mr-auto my-1">
        <h2>{post.description}</h2>
      </div>
    </div>
  ))}
</div>


  {/* Login/Logout and Add New Post Links */}

</main>



  );
};

export default Home;