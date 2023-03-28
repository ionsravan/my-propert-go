import { AiFillProfile, AiOutlineMore, AiOutlineUsb } from "react-icons/ai";
import { User } from "src/@types";

import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";
import { atom, useAtom } from "jotai";
const usersAtom = atom<User[] | null>(null);

export default function Example({ _id }: { _id: string }) {
  const instance = useAxios();
  const [users, setUsers] = useAtom(usersAtom);
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-sm ">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <AiOutlineMore />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute w-[100px] z-10 mt-3 -left-10 top-0   -translate-x-1/2 transform  sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg w-full shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative  bg-white w-full ">
                    <button
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const res = await instance.delete(
                            "/admin/user/deleteUser",
                            {
                              data: {
                                userId: _id,
                              },
                            }
                          );
                          if (res.status == 200) {
                            setUsers((prev) => {
                              const users = prev?.filter(
                                (item) => item._id !== _id
                              );
                              if (users) {
                                return users;
                              } else {
                                return null;
                              }
                            });
                            toast("User Deleted Succesfully", {
                              type: "success",
                              position: "bottom-center",
                            });
                            setLoading(false);
                          }
                        } catch (e) {
                          setLoading(false);
                          toast("Error Accured while deleting user", {
                            position: "bottom-center",
                            type: "error",
                          });
                        }
                      }}
                      className="w-full text-sm text-red-400"
                    >
                      {loading ? "deleting" : "delete"} User
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

export const AssetHead = () => {
  return (
    <div className=" rounded-t-lg grid grid-cols-6 bg-primaryBlue text-white font-medium text-[10px] ">
      <div className="col-start-1 col-span-1  ">
        <p className=" ">USER NAME</p>
      </div>
      <div className="col-start-2 col-span-1    flex justify-start">
        <p className=" text-text-faded">EMAIl</p>
      </div>
      <div className="col-start-3 col-span-1 flex justify-start  ">
        <p className=" text-text-faded">MOBILE</p>
      </div>
      <div className="col-start-4 col-span-1  flex justify-start ">
        <p className="text-text-faded">JOINING DATE</p>
      </div>
      <div className="col-start-5 col-span-1 flex justify-center  ">
        <p className=" text-text-faded">ENQUIRES</p>
      </div>
      <div className="col-start-6 col-span-1 flex justify-center  ">
        <p className=" text-text-faded">Action</p>
      </div>
    </div>
  );
};

const AssetComponet = ({ name, _id, email, mobileNumber }: User) => {
  return (
    <>
      <div className=" bg-white grid grid-cols-6 p-4 border-b border-[#EDEDED] items-center rounded-xl text-sm ">
        <div className="col-start-1  col-span-1  ">
          <p className="text-sm w-full font-bold">{name}</p>
        </div>
        <div className="col-start-2 col-span-1">
          <p className="text-[#303030]">{email}</p>
        </div>
        <div className="col-start-3 col-span-1 ">
          <p className="text-[#303030]">+{mobileNumber}</p>
        </div>
        <div className="col-start-4 col-span-1   ">
          <p className="text-[#303030]">Joined 4 Months Ago</p>
        </div>
        <div className="col-start-5 col-span-1   ">
          <p className="text-center text-[#303030] font-normal">
            2 Enquires Today{" "}
          </p>
        </div>
        <div className="col-start-6 col-span-1 flex justify-center  ">
          <p className="text-[#303030] text-center text-xl cursor-pointer">
            <Example _id={_id} />
          </p>
        </div>
      </div>
    </>
  );
};

export const AdminCustomers = ({ users }: { users: User[] }) => {
  const [filtred, setFiltred] = useAtom(usersAtom);

  useEffect(() => {
    setFiltred(users);
  }, []);

  return (
    <div className="w-full p-5 rounded-xl overflow-y-scroll">
      <div className="bg-primaryBlue p-5 px-8 rounded-lg">
        <AssetHead />
      </div>
      <div className="px-6 bg-white overflow-y-scroll">
        {filtred?.map((user) => {
          return <AssetComponet {...user} key={user._id} />;
        })}
      </div>
    </div>
  );
};
