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
import { SignupSuccess } from "src/componets/successToast";
import { useAxios } from "src/utills/axios";
import { ConnectWithFaceBook } from "../LoginWitFaceBook";
import { ConnectWithGoogle } from "../LoginWithGoogle";
import { Input } from "../sharedInput";
import { Navbar } from "./signupNavbar";

const SingnupTemplate = ({
  signupController,
  redirectUrl,
  url,
}: {
  signupController: (
    name: string,
    email: string,
    mob: number,
    password: string,
    instance: AxiosInstance,
    url: string
  ) => Promise<string | number>;
  url: string;
  redirectUrl: string;
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
  const [showError, setShowError] = useState<boolean>(false);
  const [errors, setErros] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      name &&
      email &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password &&
      password.length >= 8 &&
      mob &&
      /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
        mob.toString()
      ) &&
      password &&
      confirmEmail &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(confirmEmail)
    ) {
      setLoading(true);
      const result = await signupController(
        name,
        email,
        mob,
        password,
        instance,
        url
      );
      if (typeof result == "string") {
        setCookies("jwtToken", result);
        SignupSuccess();
        router.push(redirectUrl);
      } else {
        if (result == 409) {
          setErros("This Email Already Exists on Another Account");
        } else {
          setErros("Some Error Accured Please Try Again !");
        }
      }
    } else {
      console.log("not runnig");
      setLoading(false);
      setShowError(true);
      return;
    }
  };

  return (
    <div className="grow">
      <Navbar />
      <div className="md:py-24 px-5 md:px-12">
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
            showError={showError}
            err={name === "" ? "Enter Valid Name" : ""}
          />
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
            value={confirmEmail}
            setValue={setConfiremail}
            err={
              email !== confirmEmail
                ? "Emial should be same as Above"
                : confirmEmail == ""
                ? "Not Valid email"
                : ""
            }
            Icon={AiOutlineMail}
            placeholder="Conferm Email"
            showError={showError}
          />
          <Input
            value={mob}
            setValue={setmob}
            Icon={AiOutlineNumber}
            placeholder="Mob. Number"
            showError={showError}
            err={
              mob.toString().length !== 10
                ? "Not Valid Mobile Number"
                : /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
                    mob.toString()
                  )
                ? " "
                : "Not Valid Number"
            }
          />
          <Input
            value={password}
            setValue={setPassword}
            Icon={AiOutlineLock}
            placeholder="Add a Password"
            showError={showError}
            err={password.length < 8 ? "password must be 8 chaachters" : " "}
            type={showPass ? "text" : "password"}
          />
          <div
            className="w-full px-4 space-x-4 textlg
          "
          >
            <input
              checked={showPass}
              onChange={() => {
                setShowPass(!showPass);
              }}
              type="checkbox"
              name="password"
              id=""
            />
            <label htmlFor="password" className="text-lg">
              show password
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
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
