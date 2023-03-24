import { GrLocation, GrStar } from "react-icons/gr";
import { FaRegBookmark, FaRupeeSign } from "react-icons/fa";
import Image from "next/image";
import { LoadImage } from "../../componets/shared/img";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RxDotFilled } from "react-icons/rx";
import React, { Fragment, ReactElement, useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import Layout from "src/Layout/main";
import { useFetch } from "src/lib/hooks/useFetch";
import { useRouter } from "next/router";
import type { Propery, ProperyRes } from "src/@types";
import { useAxios } from "src/utills/axios";
import { Agent } from "src/componets/successToast";
import { useCookies } from "react-cookie";
import Link from "next/link";
import ImageSlider, { MyModal } from "src/componets/Sliders/ImageSlider";
import CardCarousel from "src/componets/Sliders/cardCaursel";
import { scrollLeft, scrollRight } from "..";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Transition, Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const reviewData = [
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quas corrupti doloremque modi accusamus enim sed repellendus vel. Ad porro quisquam et labore reprehenderit quae aliquam vitae, assumenda minima quam?",
  },
];

function MyMsg({ data, text }: { data: any; text: string }) {
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const instance = useAxios();
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" flex items-center justify-center w-full">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md b px-4 py-2 text-sm font-medium w-full text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {text}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-36 inset-0 overflow-y-auto ">
            <div className="flex justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  text-lg leading-6 text-white font-bold bg-primaryBlue p-4"
                  >
                    Talk To The Agent
                  </Dialog.Title>
                  <div className="mt-2 px-4">
                    <h1 className="text-black ">Message</h1>
                    <textarea
                      id="description"
                      name="desccription"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required={true}
                      placeholder="writte your message"
                      className="focus:outline-none  w-full h-52 px-3 mt-5 py-2 border  my-4"
                    />
                  </div>

                  <div className="mt-4 p-4 w-full flex justify-end">
                    <div
                      className={
                        "cursor-pointer inline-flex justify-center rounded-md border border-transparent px-6 py-2 text-sm font-medium bg-primaryBlue text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" +
                        (loading ? " bg-opacity-50 " : "")
                      }
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const res = await instance.post(
                            "/user/property/contactAgent",
                            {
                              propertyId: data?.result?._id,
                              message: message,
                              propertyType: data?.result?.propertyType,
                            }
                          );
                          if (res.data) {
                            toast("great", {
                              position: "bottom-center",
                              type: "success",
                            });
                            setLoading(false);
                            setMessage("");
                            closeModal();
                          }
                        } catch (e) {
                          setLoading(false);
                          console.log(e);
                        }
                      }}
                    >
                      {loading ? "Sending Message.." : "Send Message"}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div>
                <button>
                  <AiOutlineCloseCircle className="text-2xl text-white mx-2" />
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const ReviewCard = ({ text }: { text: string }) => {
  return (
    <div className="border py-8 px-3 min-w-[400px] space-y-4">
      <div className="flex space-x-4">
        <div className="h-16 w-16 relative rounded-full">
          <Image
            src={"/agent.png"}
            fill
            className="object-fill rounded-full"
            alt="villa4"
          />
        </div>
        <div className="grow flex justify-between items-center">
          <div>
            <p className="text-TitleColor text-xl">Dinne Russel</p>
            <p className="text-sm text-locColor">Menchestor Kenteky</p>
          </div>
          <p className="text-xs text-locColor">1 wk ago</p>
        </div>
      </div>
      <div>
        <p className="font-manrope1 text-sm">{text}</p>
      </div>
    </div>
  );
};

const Details = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const id = router.query["name"];
  const [cookies, setCookes] = useCookies(["jwtToken"]);
  const { data, error, status } = useFetch<ProperyRes>(
    `property/getPropertyById/${id}`
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(data);

  return (
    <div className=" bg-white">
      <main className=" py-12 px-5 md:px-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* head section */}
        <div className="space-y-8 md:space-y-4 w-full">
          <small className="font-manrope">
            home / Appartment /{" "}
            <span className="text-primaryBlue pl-1">{data?.result.name}</span>
          </small>
          {/* header section */}
          <div className=" md:flex justify-between items-start space-y-4">
            {/* title */}
            <div className="space-y-2 ">
              <h1 className="text-4xl mb-5 font-manrope font-semibold text-TitleColor">
                {data?.result.name}
              </h1>
              <div className="md:flex items-center  space-x-6 text-locColor">
                <div className="flex items-center space-x-4">
                  <GrLocation className="text-xl" />
                  <p className="text-2xl">{data?.result.area.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="flex items-center space-x-2">
                    <GrStar className="text-2xl text-yellow-300" />
                    <span className="text-sm md:text-2xl">4.6</span>
                  </p>
                  <p className="text-xs md:text-xl">(23 reviews)</p>
                </div>
              </div>
            </div>
            {/* save button */}
            <div className="flex items-center md:justify-between    space-x-8">
              <div className="flex items-center w-full md:w-auto">
                <FaRupeeSign className="text-primaryBlue text-2xl font-manrope" />
                <p className="text-2xl font-manrope font-semibold text-primaryBlue">
                  {data?.result.cost}
                </p>
              </div>
              <div className="flex items-center space-x-1 border px-3 py-1 rounded-full bg-white/70 cursor-pointer shadow-sm active:scale-105 transition transform duration-200 active:bg-gray-100">
                <FaRegBookmark className="text-red-400" />
                <p>save</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="md:flex md:space-x-4 space-y-3 md:space-y-0 font-manrope ">
          <div className="px-3 py-1 border bg-gray-50 shadow-sm">
            <p>{data?.result.area.name}</p>
          </div>
          <div className="px-3 py-1 border bg-gray-50 shadow-sm">
            <p>{data?.result.BHKconfig} Badroom</p>
          </div>
          <div className="px-3 py-1 border bg-gray-50 shadow-sm">
            <p>Modern</p>
          </div>
        </div>

        {/* main details content */}
        <section className="space-y-10">
          <div className="relative w-full overflow-x-scroll flex space-x-2  ">
            {data?.result?.propertyImages.slice(0, 2).map((img) => {
              return (
                <LoadImage key={img} src={img || "/bighouse.png"}>
                  <Image
                    src={img || "/bighouse.png"}
                    fill
                    className="object-contain"
                    alt="villa4"
                  />
                </LoadImage>
              );
            })}
            <div className="absolute z-10 bottom-0 right-5 md:right-14 bg-white px-4 py-2 rounded-full shadow-sm border hover:scale-105 active:scale-95 transition transform duration-200 ease-out  ">
              <button onClick={() => setIsOpen(true)}>More Images</button>
            </div>
          </div>

          <div className="w-full">
            {cookies?.jwtToken ? (
              <button className="  bg-primaryBlue text-white  w-full py-2 rounded-sm shadow-sm  hover:opacity-95 active:opacity-80 transition transform duration-200 ease-out  ">
                <MyMsg data={data} text="Get in Comfort" />
              </button>
            ) : (
              <Link href={"/login"}>
                <button className="  bg-primaryBlue text-white  w-full py-2 rounded-sm shadow-sm  hover:opacity-95 active:opacity-80 transition transform duration-200 ease-out  ">
                  Login to Get in Contact
                </button>
              </Link>
            )}
          </div>
          {data?.result?.propertyImages && (
            <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
              <ImageSlider
                setIsOpen={setIsOpen}
                slides={data?.result.propertyImages}
              />
            </MyModal>
          )}
          <div>
            <p className=" text-gray-800 font-manrope">
              {data?.result?.description}
            </p>
          </div>
          <div className="md:flex md:space-x-8 space-y-4 md:space-y-0">
            <div className="border rounded-md space-y-2  h-28 shadow-sm  w-32 flex flex-col justify-center items-center">
              <p className="text-4xl font-manrope font-semibold text-primaryBlue">
                {data?.result?.BHKconfig}
              </p>
              <p className="text-xl font-manrope font-light">Badroom</p>
            </div>
            <div className="border space-y-2 rounded-sm  h-28 shadow-sm  w-32 flex flex-col justify-center items-center">
              <p className="text-4xl font-manrope font-semibold text-primaryBlue">
                {1}
              </p>
              <p className="text-xl font-manrope font-light">Bathrooms</p>
            </div>
            <div className="border space-y-2  rounded-sm h-28 shadow-sm  w-32 flex flex-col justify-center items-center">
              <p className="text-4xl font-manrope font-semibold text-primaryBlue">
                1
              </p>
              <p className="text-xl font-manrope font-light">GuestRoom</p>
            </div>
          </div>
        </section>
        {/* maps */}
        <section className="md:flex space-y-5 md:space-y-0  md:space-x-8">
          <div className="h-[300px] md:h-[500px] relative grow">
            <Image src={"/map.png"} fill className="object-fill" alt="villa4" />
          </div>
          <div className="max-w-xs shadow-sm rounded-sm  bg-white grow border flex justify-center items-center">
            <div className="flex flex-col items-center space-y-5 p-5 md:p-0">
              <div className="h-20 w-20 relative rounded-full">
                <Image
                  src={data?.result?.agentId?.profilePhoto as string}
                  fill
                  className="object-fill rounded-full"
                  alt="villa4"
                />
              </div>
              <div className="w-full text-center">
                <div className="flex items-center justify-center  ">
                  <p className="font-manrope text-lg font-medium pr-2">
                    {data?.result.agentId.name}
                  </p>
                  <HiCheckCircle className="text-primaryBlue text-xl" />
                </div>
                <p className="text-xs text-locColor font-manrope flex justify-center  items-center">
                  Agent
                  <span>
                    <RxDotFilled className="text-lg" />
                  </span>{" "}
                  Joined 2020
                </p>
              </div>
              {cookies?.jwtToken ? (
                <button className="  bg-green-500 px-7  text-white  py-1 rounded-lg shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
                  <MyMsg data={data} text="Contact Agent" />
                </button>
              ) : (
                <Link href={"/login"}>
                  <button className="  bg-green-500 px-7  text-white   py-2 rounded-full shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
                    login to Contact Agent
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>
        {/* revies */}
        <section className=" py-16">
          <div className="flex justify-between">
            <div>
              <h1 className="text-TitleColor font-manrope font-bold text-xl md:text-3xl">
                Reviews
              </h1>
              <p className="text-xs font-manrope text-locColor">
                How others rated this apartment
              </p>
            </div>
            <button className="  bg-primaryBlue px-4 md:px-7 text-sm md:text-lg  text-white   py-1 rounded-lg shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  ">
              Add Review
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => scrollRight("review")}
              className="absolute hidden -right-0 z-50 border top-1/2 h-[40px] text-center md:flex justify-center items-center min-w-[40px]  bg-primaryBlue rounded-full  text-white   shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  "
            >
              <SlArrowRight />
            </button>
            <button
              onClick={() => scrollLeft("review")}
              className="absolute hidden -left-0 z-50 border top-1/2 h-[40px] text-center md:flex justify-center items-center min-w-[40px]  bg-primaryBlue rounded-full  text-white   shadow-sm  hover:opacity-95 active:scale-95 transition transform duration-200 ease-out  "
            >
              <SlArrowLeft />
            </button>

            <CardCarousel id="review" data={reviewData} Card={ReviewCard} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Details;

Details.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
