// plan

// have two div do grid on them
// show the image if it's on mid screen other wise dont
// place each element in the center using flix
// keep max widht on that
// add good spacing

import Image from "next/image";
import { useState } from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { Input } from "../shared/sharedInput";
import GetInTouchWithAdvertiserModal from "./AdvertiserModal";

const GetInTouchWithAdvertiser = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="font-manrope grid grid-cols-1 md:grid-cols-2  w-full my-20">
        <div className="hidden md:flex min-h-[70vh] justify-center items-center">
          <div className="h-96 relative w-full ">
            <Image
              src={"/bro.png"}
              fill
              className="object-contain "
              alt="villa4"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full space-y-10">
            <h1 className="text-primaryBlue text-sm font-semibold">Go Back</h1>
            <div className="p-5 bg-white space-y-8 shadow-md rounded-md">
              <div className="space-y-1">
                <h1 className="text-TitleColor text-2xl font-bold">
                  Get Intouch With Advertiser
                </h1>
                <p className="text-sm opacity-60">
                  Fill in your details to be shared with this advertiser
                </p>
              </div>
              <div className="space-y-6">
                <Input
                  value={""}
                  setValue={() => null}
                  Icon={AiOutlineUser}
                  placeholder="Name"
                />
                <Input
                  value={""}
                  setValue={() => null}
                  Icon={AiOutlinePhone}
                  placeholder="Phone Number"
                />
                <Input
                  value={""}
                  setValue={() => null}
                  Icon={AiOutlineMail}
                  placeholder="Email"
                />
              </div>
              <div className="space-y-6">
                <div className="text-[#657795]  flex justify-between text-sm">
                  <p>When you are planning to buy</p>
                  <div className="flex space-x-10">
                    <div className="space-x-2">
                      <input type="radio" />
                      <label htmlFor="yes">yes</label>
                    </div>
                    <div className="space-x-2">
                      <input type="radio" />
                      <label htmlFor="yes">no</label>
                    </div>
                  </div>
                </div>
                <div className="text-[#657795]  flex justify-between text-sm">
                  <p>When you are planning to buy</p>
                  <div className="flex space-x-10">
                    <div className="space-x-2">
                      <input className="marker:w-7" type="radio" />
                      <label htmlFor="yes">3 Months</label>
                    </div>
                    <div className="space-x-2">
                      <input type="radio" />
                      <label htmlFor="yes">6 Months</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-5 text-[#657795]">
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <label>Interested in home loan</label>
                </div>
                <div className="space-x-4">
                  <input type="checkbox" name="" id="" />
                  <label>I Agree T&C</label>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-[#2C5FC3] w-full p-4 rounded-xl text-white text-center  transform transition active:scale-95 duration-200 ease-out"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <GetInTouchWithAdvertiserModal
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

export default GetInTouchWithAdvertiser;
