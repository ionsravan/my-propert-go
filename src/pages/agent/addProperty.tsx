import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "src/componets/shared/sharedInput";
import { useAppContext } from "src/Context/AppContext";
import { useAxios } from "src/utills/axios";
import { addProperty } from ".";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  HiCheck,
  HiChevronDown,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BsBuilding } from "react-icons/bs";
import {
  AiOutlineClose,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import {
  MdOutlineHolidayVillage,
  MdPhotoSizeSelectSmall,
} from "react-icons/md";
import { area, location, response } from "src/@types";
import { useFetch } from "src/lib/hooks/useFetch";

interface SelectProps<T> {
  value: any;
  setState: any;
  options: any;
}

export function Select<T>({ value, setState, options }: SelectProps<T>) {
  useEffect(() => {
    if (options) {
      setState(options[0]);
    }
  }, []);

  return (
    <div className="top-16 w-full rounded-lg">
      <Listbox value={value ? value : "Location"} onChange={setState}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg  bg-white py-2 pl-2 pr-10 text-left    focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block text-black opacity-50 truncate text-lg">
              {value?.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown className="h-5 w-5 " aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((val: any, personIdx: any) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-black opacity-50 ${
                      active ? "bg-primaryBlue/50" : ""
                    }`
                  }
                  value={val}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {val.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default function AddPropertyForm() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desccription, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState<location | null>(null);
  const [adress, setAdress] = useState("");
  const [area, setArea] = useState<area | null>(null);
  const [BHKconfig, setBHKConfig] = useState<string>("1");
  const instance = useAxios();
  const { showModal, setShowModal } = useAppContext();
  const [availableFor, setAvailableFor] = useState({ name: "Rent" });
  const [propertyType, setPropertyType] = useState({ name: "villa" });
  const [filesToupload, setFilesToUpload] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );
  const { data, error } = useFetch<response<area[]>>(
    `/property/location/getAreaInLocation/${location?._id}`
  );

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setFilesToUpload((prev: any) => {
        let prevs = [...filesToupload];
        console.log(e.target.files);
        prevs.push(e.target.files[0]);
        console.log(prevs);
        return prevs;
      });
    }
    e.target.files = null;
  };
  const dleteImage = (file: any) => {
    setFilesToUpload((prev: any) => {
      let imgs: Array<any> = [...filesToupload];
      const index = imgs.indexOf(file);
      if (index > -1) {
        imgs.splice(index, 1);
      }
      return imgs;
    });
  };

  const renderPhotos = (source: any) => {
    return source.map((photo: any, index: any) => {
      return (
        <div
          className="w-max h-40 flex justify-center items-center  relative max-w-[200px]"
          key={index}
        >
          <button
            onClick={() => {
              dleteImage(photo);
            }}
            className="text-white bg-red-500 h-6 w-6 flex rounded-full items-center justify-center absolute top-1 right-0"
          >
            <AiOutlineClose />
          </button>
          <img
            className=" h-full object-cover"
            src={URL.createObjectURL(photo)}
            alt=""
            key={photo}
          />
        </div>
      );
    });
  };

  return (
    <>
      <>
        <div className=" mx-auto w-full lg:w-[800px] max-w-3xl  ">
          {/*content*/}
          <div className="border-0 rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5  rounded-t bg-white">
              <h3 className="text-3xl font-semibold text-TitleColor">
                Add New Property
              </h3>
            </div>
            {/*body*/}
            <form className=" w-[90%] mx-auto space-y-6' ">
              <div className="space-y-10">
                <Input
                  Icon={AiOutlineUser}
                  placeholder="name"
                  value={name}
                  setValue={setName}
                />
                <Input
                  Icon={AiOutlineDollar}
                  placeholder="price"
                  value={cost}
                  setValue={setCost}
                />
                <Input
                  Icon={AiOutlineHome}
                  placeholder="BHK Config ie. 4"
                  value={BHKconfig}
                  setValue={setBHKConfig}
                />
                <div className="flex items-center px-5  relative z-50 w-full border bd rounded-lg">
                  <MdOutlineHolidayVillage className="text-lg text-[#2C5FC3] " />
                  <Select
                    options={[
                      { name: "villa" },
                      { name: "pg" },
                      { name: "appartment" },
                    ]}
                    value={propertyType}
                    setState={setPropertyType}
                  />
                </div>
                <div className="flex items-center px-5  relative z-40 w-full border bd rounded-lg">
                  <AiOutlineSetting className="text-lg text-[#2C5FC3] " />
                  <Select
                    options={[{ name: "Rent" }, { name: "Sell" }]}
                    value={availableFor}
                    setState={setAvailableFor}
                  />
                </div>
                {loc?.result && (
                  <div className="flex items-center px-5  relative z-30 w-full border bd rounded-lg">
                    <HiOutlineLocationMarker className="text-lg text-[#2C5FC3] " />
                    <Select
                      options={loc?.result}
                      value={location}
                      setState={setLocation}
                    />
                  </div>
                )}

                {data?.result && (
                  <div className="flex items-center px-5  relative z-20 w-full border bd rounded-lg">
                    <BsBuilding className="text-lg text-[#2C5FC3] " />
                    <Select
                      options={data?.result}
                      value={area}
                      setState={setArea}
                    />
                  </div>
                )}
                <Input
                  Icon={FaRegAddressBook}
                  placeholder="address"
                  value={adress}
                  setValue={setAdress}
                />
                <Input
                  Icon={MdPhotoSizeSelectSmall}
                  placeholder="size in Sqft"
                  value={size}
                  setValue={setSize}
                />
              </div>
              <textarea
                id="description"
                name="desccription"
                value={desccription}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
                placeholder="Add  description"
                className="focus:outline-none  w-full h-52 px-3 mt-5 py-2 border  my-4"
              />

              <div className="m-4">
                <label className="inline-block mb-2 text-gray-500">
                  upload Property Image (jpg,png,svg,jpeg)
                </label>
                <div className="flex items-center  w-full">
                  <div className="w-full flex max-w-md overflow-x-scroll">
                    {renderPhotos(filesToupload)}
                  </div>
                  <label className=" max-w-[150px] flex flex-col w-full h-40 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Select a photo
                      </p>
                    </div>
                    <input
                      onChange={handleImageChange}
                      type="file"
                      className="opacity-0"
                    />
                  </label>
                </div>
              </div>
            </form>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-primaryBlue text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={async () => {
                  const id = await (
                    await addProperty(
                      instance,
                      name,
                      cost,
                      desccription,
                      size,
                      availableFor,
                      BHKconfig,
                      ["LFT"],
                      location,
                      area,
                      adress,
                      propertyType,
                      filesToupload,
                      setLoading
                    )
                  )?.data.result._id;
                  if (id) {
                    toast("Property Added SUccesfully", {
                      type: "success",
                      position: "bottom-center",
                    });
                    setShowModal(false);
                  }
                }}
              >
                {loading ? "Adding Property.." : "submit"}
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
