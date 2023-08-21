import { useRouter } from 'next/router';
import React from 'react';
import { Footer, Navbar } from 'src/componets';


const Custom404 = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-10  rounded-lg shadow-xl ">
          <h1  className="text-3xl md:text-4xl font-semibold mb-6 text-center mt-10">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6 text-center">
            The page you are looking for does not exist.
          </p>
          <div className='flex items-center justify-center'>
          <button
            className="w-[40%] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl mb-10 "
            onClick={() => router.push('/')}
          >
            Home
          </button>
          </div>
       
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Custom404;
