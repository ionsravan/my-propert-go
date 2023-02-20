import { AxiosInstance } from "axios";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineNumber,
  AiOutlineUser,
} from "react-icons/ai";
import { useAxios } from "src/utills/axios";
import { ConnectWithFaceBook } from "../LoginWitFaceBook";
import { ConnectWithGoogle } from "../LoginWithGoogle";
import { Input } from "../sharedInput";
import { Navbar } from "./signupNavbar";

const SingnupTemplate = ({
  signupController,
}: {
  signupController: (
    name: string,
    email: string,
    mob: number,
    password: string,
    instance: AxiosInstance,
    setCookies: any,
    setLoading: Dispatch<SetStateAction<boolean>>,
    router: NextRouter
  ) => {};
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mob, setmob] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookies] = useCookies(["jwtToken"]);
  const [confirmEmail, setConfiremail] = useState<string>("");
  const instance = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="grow  ">
      <Navbar />
      <div className="my-8 md:py-24 px-5 md:px-12">
        <div className="space-y-5 text-sm text-gray-500 max-w-[400px]">
          <h1 className="text-3xl lg:text-4xl font-extrabold font-manrope text-black">
            {"New Here ? let's set up your account"}
          </h1>
          <p>OR SIGN UP WITH EMAIL</p>
        </div>
        <div className="space-y-10 max-w-xl py-10">
          <Input
            value={name}
            setValue={setName}
            Icon={AiOutlineUser}
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
            Icon={AiOutlineNumber}
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
          className={`${
            loading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
          } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out`}
        >
          {loading ? "loading..." : "Signup"}
        </button>
        <ConnectWithGoogle />
        <ConnectWithFaceBook />
      </div>
    </div>
  );
};
export default SingnupTemplate;
