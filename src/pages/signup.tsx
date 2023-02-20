import { AxiosInstance } from "axios";
import { NextRouter } from "next/router";
import LoginSignupCTA from "src/componets/shared/Form/LoginSignupCTA";
import SignupLoginFormContainer from "src/componets/shared/Form/SignupLoginFormContainer";
import SingnupTemplate from "src/componets/shared/signup";
import { SignupSuccess } from "src/componets/successToast";
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
    const res = await instance.post("/user/signup", {
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      name: name,
    });
    if (res.status !== 200) {
      setLoadig(false);
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
    setCookies("jwtToken", res.data.token);
    SignupSuccess();
    setLoadig(false);
    router.push("/");
  } catch (e) {
    console.log(e);
  }
};

const FormLoginSignup = () => {
  return (
    <>
      <SignupLoginFormContainer>
        <LoginSignupCTA />
        <SingnupTemplate signupController={signupController} />
      </SignupLoginFormContainer>
    </>
  );
};

export default FormLoginSignup;
