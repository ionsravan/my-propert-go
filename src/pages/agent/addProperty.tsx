import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Input } from "src/componets/shared/sharedInput";
import { useAppContext } from "src/Context/AppContext";
import { useAxios } from "src/utills/axios";
import { addProperty } from ".";

interface Props {
  showModal: any;
  setShowModal: Function;
}
// const res = await instance.post("/agent/property/addProperty", {
//   name: "my New property",
//   cost: 2000,
//   description: "new Property is added",
//   size: 200,
//   availableFor: "Rent",
//   BHKconfig: 4,
//   amenities: ["Lift"],
//   location: "Banglore",
//   locationId: "62f28a1c0df5e0b03e8b3c01",
//   area: "Electronics City",
//   areaId: "62f2968ebf14be30bd0a16ac",
//   address: "alfdfsnl",
// });

export default function Modal() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desccription, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [adress, setAdress] = useState("");
  const [area, setArea] = useState("");
  const [BHKconfig, setBHKConfig] = useState<string>();
  const [file, setFile] = useState<any>(null);
  const instance = useAxios();
  const { agentId, showModal, setShowModal } = useAppContext();
  const [cookies, setCookes] = useCookies(["jwtToken"]);
  console.log(agentId);

  const handleFileChange = (e: ChangeEvent<any>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async (id: string, agentId: string) => {
    if (!file) {
      return;
    }

    let data = new FormData();

    data.append("propertyId", id);
    data.append("photos", file);
    try {
      const response = await axios({
        method: "patch",
        url: "http://localhost:8080/api//agent/property/addImageToProperty",
        data: data,
        headers: {
          Authorization: `Bearer ${cookies.jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto lg:w-[800px] max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5  rounded-t">
                  <h3 className="text-3xl font-semibold text-TitleColor">
                    Add New Property
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className=" w-[90%] mx-auto space-y-3' ">
                  <div className="space-y-4">
                    <Input placeholder="name" value={name} setValue={setName} />
                    <Input
                      placeholder="price"
                      value={cost}
                      setValue={setCost}
                    />
                    <Input
                      placeholder="BHK Config ie. 4"
                      value={BHKconfig}
                      setValue={setBHKConfig}
                    />
                    <Input
                      placeholder="location"
                      value={location}
                      setValue={setLocation}
                    />
                    <Input placeholder="area" value={area} setValue={setArea} />
                    <Input
                      placeholder="address"
                      value={adress}
                      setValue={setAdress}
                    />
                    <Input
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
                    className="w-[90%] max-w-lg px-3 py-2 border  my-4"
                  />

                  <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">
                      upload Property Image (jpg,png,svg,jpeg)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo
                          </p>
                        </div>
                        <input
                          onChange={handleFileChange}
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
                          "RENT",
                          BHKconfig as string,
                          "LIFT",
                          location,
                          area,
                          "str",
                          adress
                        )
                      ).data.result._id;
                      if (id) {
                        toast("Property Added SUccesfully");
                        setShowModal(false);
                      }
                      // await handleUploadClick(id, agentId);
                    }}
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
