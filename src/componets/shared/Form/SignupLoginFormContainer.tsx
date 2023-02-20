import { ReactNode } from "react";

const SignupLoginFormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 min-h-screen font-manrope">
      {children}
    </div>
  );
};

export default SignupLoginFormContainer;
