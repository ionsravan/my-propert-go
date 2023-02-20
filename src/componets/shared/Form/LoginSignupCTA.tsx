import Image from "next/image";

const LoginSignupCTA = () => {
  return (
    <div className=" bg relative p-6 md:block hidden">
      <div className="absolute bottom-0 right-0">
        <div className="h-80 relative w-80 ">
          <Image src={"/bars.png"} fill className="object-fill " alt="villa4" />
        </div>
      </div>
      <div className="relative mt-16 max-w-lg  lg:max-w-xl mx-auto ">
        <div className="relative">
          <div className="h-80 lg:h-96 relative w-64 lg:w-80 z-20 ">
            <Image
              src={"/bigbuilding.png"}
              fill
              className="object-fill "
              alt="villa4"
            />
          </div>
          <div className="h-48 relative w-64 lg:w-80 bottom-60 left-20  z-10 ">
            <Image
              src={"/smallb.png"}
              fill
              className="object-contain "
              alt="villa4"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center justify-center -mt-28 max-w-xl mx-auto ">
        <h2 className="text-white md:text-4xl lg:text-5xl font-manrope font-extrabold">
          Discover, Contact and buy.
        </h2>
        <p className="text-sm text-white/70 py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia placeat
          non excepturi voluptatibus autem assumenda corporis doloremque,
          praesentium dolore eos.
        </p>
        <button className="bg-white max-w-[200px] w-full self-start py-3 rounded-full text-primaryBlue transition transform active:scale-95  duration-100 ease-out">
          Know More
        </button>
      </div>
    </div>
  );
};

export default LoginSignupCTA;
