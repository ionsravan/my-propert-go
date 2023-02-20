import React, { SetStateAction, useState } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const cities = [
  "Kolkata",
  "mumbai",
  "Rawla",
  "Bikaner",
  "Udaipur",
  "Pune",
  "Noida",
  "Chennai",
  "New York",
  "Goa",
];

const GetInTouchWithAdvertiserModal = ({
  showModal,
  setShowModal,
}: ModalProps) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items- flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            <div className="relative md:w-[80%] my-6 mx-auto max-w-4xl ">
              {/*content*/}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="border-0 mt-16 rounded-lg shadow-lg relative  flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid bg-[#ECECEC] rounded-t">
                  <nav className="flex space-x-4 text-primaryBlue text-lg">
                    <button className="p-2 border-b border-primaryBlue">
                      Buy a Home
                    </button>
                    <button className="p-2">Top Cities</button>
                    <button className="p-2">Commercial</button>
                  </nav>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                  {cities.map((city) => {
                    return (
                      <p
                        key={city}
                        className="font-normal font-manrope text-sm leading-7"
                      >
                        Propery in {city}
                      </p>
                    );
                  })}
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default GetInTouchWithAdvertiserModal;
