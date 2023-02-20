import axios, { AxiosInstance } from "axios";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";
import {
  AiOutlineCalendar,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineProfile,
} from "react-icons/ai";
import { SignupSuccess } from "src/componets/successToast";
import { useAxios } from "src/utills/axios";
import { Input } from "../signup";

const Nav = () => {
  const router = useRouter();
  const NavItems = [
    {
      name: "Appartment",
      link: "/",
    },
    {
      name: "Corpers Trade",
      link: "/",
    },
    {
      name: "Help",
      link: "/",
    },
    {
      name: "Sing up",
      link: "/",
    },
  ];
  return (
    <nav className="flex-grow space-x-4 flex justify-end items-center text-sm">
      {NavItems.map(({ link, name }, index) => {
        return (
          <Link className="font-manrope font-medium " href={link} key={index}>
            {name}
          </Link>
        );
      })}
      <button
        className={`${
          router?.pathname == "/"
            ? "bg-white text-primaryBlue"
            : "bg-primaryBlue text-white"
        } px-6 rounded-full py-2 font-manrope`}
      >
        Login / Signup
      </button>
    </nav>
  );
};

const signupController = async (
  name: string,
  email: string,
  mobileNumber: number,
  password: string,
  instance: AxiosInstance,
  setCookies: any,
  setLoadig: any,
  router: NextRouter
) => {
  try {
    setLoadig(true);
    const res = await instance.post("/admin/signup", {
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      name: name,
    });
    if (res.status !== 200) {
      if (res.status > 400) {
        throw {
          status: 409,
          err: "user Already exist",
        };
        return;
      }
      throw {
        status: 500,
        err: "signup failed",
      };
      return;
    }
    console.log("res", res);
    setCookies("jwtToken", res.data.token);
    SignupSuccess();
    setLoadig(false);
    router.push("/admin");
  } catch (e) {
    console.log(e);
  }
};

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mob, setmob] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookies] = useCookies(["jwtToken"]);
  const [confirmEmail, setConfiremail] = useState<string>("");
  const instance = useAxios();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 min-h-screen font-manrope">
        <div className=" bg relative p-6 hidden md:block">
          <div className="absolute bottom-0 right-0">
            <div className="h-80 relative w-80 ">
              <Image
                src={"/bars.png"}
                fill
                className="object-fill "
                alt="villa4"
              />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              placeat non excepturi voluptatibus autem assumenda corporis
              doloremque, praesentium dolore eos.
            </p>
            <button className="bg-white max-w-[200px] w-full self-start py-3 rounded-full text-primaryBlue transition transform active:scale-95  duration-100 ease-out">
              Know More
            </button>
          </div>
        </div>
        <div className="grow  ">
          <div className="py-24 px-12">
            <div className="space-y-5 text-sm text-gray-500 max-w-[400px]">
              <h1 className="text-3xl lg:text-4xl font-extrabold font-manrope text-black">
                {"Admin Signup "}
              </h1>
            </div>
            <div className="space-y-6 max-w-xl py-10">
              <Input
                value={name}
                setValue={setName}
                Icon={AiOutlineProfile}
                placeholder="Name"
              />
              <Input
                value={email}
                setValue={setEmail}
                Icon={AiOutlineMail}
                placeholder="Email"
              />
              <Input
                value={confirmEmail}
                setValue={setConfiremail}
                err={email !== confirmEmail ? "Emial is not smae" : null}
                Icon={AiOutlineMail}
                placeholder="Conferm Email"
              />
              <Input
                value={mob}
                setValue={setmob}
                Icon={AiOutlinePhone}
                placeholder="Mob. Number"
              />
              <Input
                value={password}
                setValue={setPassword}
                Icon={AiOutlineLock}
                placeholder="Add a Password"
              />
            </div>

            <button
              onClick={() => {
                signupController(
                  name,
                  email,
                  mob,
                  password,
                  instance,
                  setCookies,
                  setLoading,
                  router
                );
              }}
              className="bg-[#2C5FC3] w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out"
            >
              Sign up
            </button>
            <div className="border flex max-w-xl rounded-xl my-4 justify-center  p-2  font-semibold cursor-pointer">
              <div className="w-[250px] flex items-center space-x-3  ">
                <div className="relative h-8 w-8  pl-10 ">
                  <Image
                    src={"/google.png"}
                    fill
                    alt="home"
                    className="object-contain rounded-lg"
                  />
                </div>
                <p>Connect with Google</p>
              </div>
            </div>
            <div className="border flex max-w-xl rounded-xl my-4 justify-center  p-2  font-semibold cursor-pointer">
              <div className="w-[250px] flex items-center  space-x-3">
                <div className="relative h-8 w-8  pl-10 ">
                  <Image
                    src={"/fb.png"}
                    fill
                    alt="home"
                    className="object-contain rounded-lg"
                  />
                </div>
                <p>Connect with facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
