import { AxiosInstance } from "axios";
import { NextRouter } from "next/router";
import LoginSignupCTA from "src/componets/shared/Form/LoginSignupCTA";
import SignupLoginFormContainer from "src/componets/shared/Form/SignupLoginFormContainer";
import SingnupTemplate from "src/componets/shared/signup";
const signupController = async (
  name: string,
  email: string,
  mobileNumber: number,
  password: string,
  instance: AxiosInstance,
  url: string
): Promise<string | number> => {
  try {
    const res = await instance.post(url, {
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      name: name,
    });
    if (res.status == 200) {
      return res.data?.token;
    } else {
      return 409;
    }
  } catch (e) {
    return 500;
  }
};

const FormLoginSignup = () => {
  return (
    <>
      <SignupLoginFormContainer>
        <LoginSignupCTA />
        <SingnupTemplate
          url="/user/signup"
          redirectUrl="/"
          signupController={signupController}
        />
      </SignupLoginFormContainer>
    </>
  );
};

export default FormLoginSignup;
