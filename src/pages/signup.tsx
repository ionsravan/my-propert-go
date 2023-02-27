import LoginSignupCTA from "src/componets/shared/Form/LoginSignupCTA";
import SignupLoginFormContainer from "src/componets/shared/Form/SignupLoginFormContainer";
import SingnupTemplate from "src/componets/shared/signup";
import { signupController } from "src/componets/shared/signup/singupController";

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
