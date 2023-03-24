import { toast } from "react-toastify";
export const LoginSuccess = () => {
  toast("Logged in Successfully");
};

export const SignupSuccess = () => {
  toast("Sign in Successfull");
};

export const Agent = () => {
  toast("Details sent to agent successfully", {
    position: "bottom-center",
    type: "success",
  });
};
