import Image from "next/image";
import { AiFillCar, AiFillPhone } from "react-icons/ai";
import { FaBath } from "react-icons/fa";
import { GrSteps } from "react-icons/gr";
import { MdOutlineBedroomParent } from "react-icons/md";
import imgs from "public.json";
import { HomeSectionTitle } from "src/componets";
const Tour = () => {
  return (
    <div className="bg-[#F4F4F4] ">
      <section className=" pt-20 pb-32 px-10 max-w-7xl grid grid-cols-1 md:grid-cols-2 mx-auto">
        <div className="space-y-3">
          <div className="max-w-7xl mx-auto">
            <HomeSectionTitle
              text="Let's Tour  And See Our House"
              borderColor="border-green-400"
              titleColro="text-green-400"
            />
          </div>
          <p className="text-sm text-[#626687]">
            Houses recommended by our partners that have been curated to become
            the home of your dreams!
          </p>
          <div>
            <h1 className="text-TitleColor">House Details</h1>
          </div>
          <div className="text-[#3C4563] grid grid-cols-2 gap-4">
            <div className="flex text-xl font-manrope items-center space-x-4">
              <MdOutlineBedroomParent />
              <p>4 Bedrooms</p>
            </div>
            <div className="flex text-xl font-manrope items-center space-x-4">
              <FaBath />
              <p>2 Bathroom</p>
            </div>
            <div className="flex text-xl font-manrope items-center space-x-4">
              <AiFillCar />
              <p>1 Carport</p>
            </div>
            <div className="flex text-xl font-manrope items-center space-x-4">
              <GrSteps />
              <p>2 Bedrooms</p>
            </div>
            <div className="hidden md:flex col-span-2 justify-between my-4 mr-10 ">
              <div className="flex space-x-2 items-center ">
                <div className="relative h-10 w-10 rounded-full ">
                  <Image
                    src={"/agent.png"}
                    fill
                    alt="home"
                    className="object-fill rounded-full "
                  />
                </div>
                <div className="font-manrope">
                  <p className="text-TitleColor">Danniel Russel</p>
                  <p className="text-sm text-locColor font-manrope">
                    Manchester kentecy
                  </p>
                </div>
              </div>
              <div className="flex  items-center px-4 rounded-full bg-green-500 text-white space-x-2 active:scale-95 transform transition duration-150 ">
                <AiFillPhone className="rotate-90 " />
                <button className="">Contact Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <div className=" relative max-w-md  w-[449px] ">
            <div className="relative grow h-96 max-w-md">
              <Image
                src={imgs.bighouse}
                fill
                alt="home"
                className="object-fill "
              />
            </div>
            <div className="absolute w-52 -bottom-5 -left-11 ">
              <div className="relative grow h-32 max-w-md">
                <Image
                  src={"/sofa.png"}
                  fill
                  alt="home"
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
            <div className="absolute w-52 -bottom-5 right-11">
              <div className="relative grow h-20 max-w-md">
                <Image
                  src={"/f.png"}
                  fill
                  alt="home"
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
            <div className="absolute w-52 -bottom-5 -right-14">
              <div className="relative grow h-20 max-w-md">
                <Image
                  src={"/f.png"}
                  fill
                  alt="home"
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tour;
