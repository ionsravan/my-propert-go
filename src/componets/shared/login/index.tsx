import { AxiosInstance } from "axios";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { useAppContext } from "src/Context/AppContext";
import { useAxios } from "src/utills/axios";
import { ConnectWithFaceBook } from "../LoginWitFaceBook";
import { Input } from "../sharedInput";
import { useForm, Resolver } from "react-hook-form";
import { LoginSuccess } from "src/componets/successToast";
import { ConnectWithGoogle } from "../LoginWithGoogle";

export interface LoginProps {
  login: (
    email: string,
    password: string,
    instance: AxiosInstance,
    url: string
  ) => Promise<string | number>;
  redirectUrl: string;
  url: string;
}

export const LoginTemplate = ({ login, redirectUrl, url }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cookies, setCookies] = useCookies(["jwtToken"]);
  const instance = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showError, setSHowError] = useState<boolean>(false);
  const [error, setErorr] = useState<string>("");
  return (
    <div className="grow  ">
      {/* <Navbar /> */}
      <div className="py-24 px-12">
        <div className="space-y-5 text-sm text-gray-500 max-w-[400px]">
          <h1 className="text-3xl lg:text-4xl font-extrabold font-manrope text-black">
            {"Welcome Back !"}
          </h1>
        </div>
        <div className="space-y-6 max-w-xl py-10">
          <p className="text-red-400">{error}</p>
          <Input
            value={email}
            setValue={setEmail}
            Icon={AiOutlineMail}
            placeholder="Email"
            showError={showError}
            err={
              email == ""
                ? "This Field is required"
                : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ? ""
                : "Enter Valid Email"
            }
          />
          <Input
            value={password}
            setValue={setPassword}
            Icon={AiFillLock}
            placeholder="Password"
            showError={showError}
            err={password == "" ? "Enter Valid Password" : ""}
          />
        </div>

        <button
          onClick={async () => {
            if (
              email == "" ||
              !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            ) {
              setSHowError(true);
              return;
            }
            const result = await login(email, password, instance, url);
            if (typeof result == "string") {
              setCookies("jwtToken", result);
              LoginSuccess();
              router.push(redirectUrl);
            } else {
              if (result == 401) {
                console.log(result);
                setErorr("Email or Password is wrong");
              } else {
                setErorr("Some Error Accured Try Again !");
              }
            }
          }}
          className={`${
            loading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
          } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out`}
        >
          {loading ? "loading..." : "Login"}
        </button>
        <ConnectWithFaceBook />
        <ConnectWithGoogle />
      </div>
    </div>
  );
};
