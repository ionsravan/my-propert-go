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



// const TermsAndConditions = () => {
//   const [agreed, setAgreed] = useState(false);

//   const handleAgree = () => {
//     setAgreed(true);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
//         <div className="h-40 overflow-y-scroll mb-4">
//           {/* Replace this with your actual terms and conditions content */}
//           <p className="text-gray-600">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet posuere elit. Nulla quis tristique sapien. Integer sodales nisl eu felis ultrices, ac iaculis purus eleifend. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce vel orci sit amet augue vestibulum consectetur. Duis cursus auctor orci, in dictum dolor facilisis non. Vestibulum eu diam nec dui rhoncus fringilla. Vivamus nec sem eu mauris consequat malesuada.
//             {/* Continue with more content */}
//           </p>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="agreeCheckbox"
//             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             checked={agreed}
//             onChange={handleAgree}
//           />
//           <label htmlFor="agreeCheckbox" className="ml-2 text-gray-700">
//             I agree to the Terms and Conditions
//           </label>
//         </div>
//         <button
//           className={`mt-4 py-2 px-4 rounded-md ${agreed ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
//           disabled={!agreed}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

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
    <div className="grow  ">
      <Navbar />
      <div className="py-14 px-12">
        <div className="space-y-5 text-sm text-gray-500 max-w-[400px]">
          <h1 className="text-3xl lg:text-4xl font-extrabold font-manrope text-black">
            {"Welcome Back !"}
          </h1>
        </div>

        {redirectUrl === "/admin" ? (<div>

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
              type="password"
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
                toast("Logged in Successfully", {
                  position: "bottom-center",
                  type: "success",
                });
                router.push(redirectUrl);
                // <TermsAndConditions/>

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
              } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out`}
          >
            {loading ? "loading..." : "Login"}
          </button>

        </div> ) : (<div className="space-y-6 max-w-xl py-10 mx-11">
          <OtpAuthentication />
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
