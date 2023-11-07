import { AxiosInstance } from "axios";
import { useRouter } from "next/router";
import { Dispatch, useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { useAxios } from "src/utills/axios";
import { ConnectWithFaceBook } from "../LoginWitFaceBook";
import { Input } from "../sharedInput";
import { LoginSuccess } from "src/componets/successToast";
import { ConnectWithGoogle } from "../LoginWithGoogle";
import { Navbar } from "../signup/signupNavbar";
import { SetStateAction } from "jotai";
import { toast } from "react-toastify";
import OtpAuthentication from "src/pages/OtpAuthentication";
import Modal from "src/componets/shared/modal";





export interface LoginProps {
  login: (
    email: string,
    password: string,
    instance: AxiosInstance,
    url: string,
    setLoading: Dispatch<SetStateAction<boolean>>
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
    <div className="">
      <Navbar />
      <div className="py-14 px-5">
        <div className="space-y-5 flex items-center justify-center text-sm text-gray-500 w-full">
          <h1 className="text-3xl lg:text-4xl font-extrabold font-manrope text-black mb-4">
            {"Welcome Back !"}
          </h1>
        </div>

        {redirectUrl === "/admin" ? (<div className="flex items-center justify-center flex-col">

          <div className="space-y-6 max-w-xl">
            <p className="text-red-400">{error}</p>
            <div className="pb-4">
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
            </div>
      
            <Input
              type="password"
              value={password}
              setValue={setPassword}
              Icon={AiFillLock}
              placeholder="Password"
              showError={showError}
              err={password == "" ? "Enter Valid Password" : ""}
            />
          </div>
          <div style={{width:"150px",marginTop:"40px"}}>
            <button
              onClick={async () => {
                if (
                  email == "" ||
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                ) {
                  setSHowError(true);
                  return;
                }
                const result = await login(
                  email,
                  password,
                  instance,
                  url,
                  setLoading
                );
                console.log("Login Response:", result);
                if (typeof result == "string") {
                  setCookies("jwtToken", result);
                  localStorage.setItem("isAdmin", true);
                  toast("Logged in Successfully", {
                    position: "bottom-center",
                    type: "success",
                  });
                  localStorage.setItem("isAdmin", true);

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
              className={`${loading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
                } flex justify-center w-full p-4 rounded-xl text-white text-center transform transition active:scale-95 duration-200 ease-out`}
            >
              {loading ? "loading..." : "Login"}
            </button>

          </div>


        </div>) : (<div className="flex items-center justify-center">
          <div className="">
            <OtpAuthentication />
          </div>
        </div>)}





        {/* <ConnectWithFaceBook /> */}
        {/* <ConnectWithGoogle /> */}
        {/* <button style={{display:"block",margin:"35px 170px"}}
            className="bg-[#2C5FC3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
            onClick={() => router.push("/OtpAuthentication")}
          >
            Sign in using Mobile Number
          </button> */}



      </div>
    </div>
  );
};

