import { useRouter } from 'next/router';
import React from 'react';
import { Footer, Navbar } from 'src/componets';


const Custom404 = () => {
    const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div style={{width:"50%", height:"50%"}} className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-2xl">
          <h1 className="text-4xl font-semibold mb-8">404 - Page Not Found</h1>
          <p className="text-gray-600 text-lg mb-8">
            The page you are looking for does not exist.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-xl"
            onClick={() => router.push('/')} 
          >
            Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Custom404;
