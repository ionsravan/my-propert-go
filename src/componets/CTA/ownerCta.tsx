import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";
const OwnerCta = () => {
  return (
    <section className="bg-primaryBlue min-h-[500px] w-full flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center space-y-12 h-full max-w-7xl mx-auto py-16">
        <h1 className="text-white font-manrope font-extrabold text-3xl  md:text-5xl max-w-3xl text-center leading-normal">
          Are you a owner, login now to post your properties
        </h1>
        <Link href="/agent/login">
          <button className="max-w-max bg-white text-primaryBlue px-10 py-3 rounded-xl active:scale-95 transition duration-200 transform active:bg-gray-100">
            Get Started
          </button>
        </Link>

        <div className=" flex  flex-col sm:flex-row  w-full items-center space-y-6 sm:space-y-0 sm:justify-around">
          {/* create this is as a reusable componet */}
          <div className="flex items-center space-x-2  ">
            <HiCheckCircle className=" text-white/80 text-lg" />
            <p className="text-white/90 text-sm">Fully orgnized componets</p>
          </div>
          <div className="flex items-center space-x-2  ">
            <HiCheckCircle className=" text-white/80 text-lg" />
            <p className="text-white/90 text-sm">Fully orgnized componets</p>
          </div>
          <div className="flex items-center space-x-2  ">
            <HiCheckCircle className=" text-white/80 text-lg" />
            <p className="text-white/90 text-sm">Fully orgnized componets</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerCta;
