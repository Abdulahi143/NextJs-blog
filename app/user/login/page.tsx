import React from 'react';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="mt-4">
          <Link href="/api/auth/signin">
          <button
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Sign in with Google
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
