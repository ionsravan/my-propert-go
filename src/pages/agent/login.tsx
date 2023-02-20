import LoginSignupCTA from "src/componets/shared/Form/LoginSignupCTA";
import SignupLoginFormContainer from "src/componets/shared/Form/SignupLoginFormContainer";
import { LoginTemplate } from "src/componets/shared/login";
import { loginController } from "src/componets/shared/login/loginConttroller";

const Login = () => {
  return (
    <>
      <SignupLoginFormContainer>
        <LoginSignupCTA />
        <LoginTemplate
          url="/agent/login"
          login={loginController}
          redirectUrl="/agent"
        />
      </SignupLoginFormContainer>
    </>
  );
};

export default Login;
