import { ReactNode } from "react";

interface Props {
  size: any;
  children: ReactNode;
}
const Button = ({ size, children }: Props) => {
  return (
    <button className={` bg-red-400 font-bold text-white px-6 py-2 ${size} `}>
      {children}
    </button>
  );
};

export default Button;
