import { SetStateAction } from "react";

interface InputProps {
  Icon?: React.ElementType;
  placeholder: string;
  value: any;
  err?: string;
  setValue: React.Dispatch<SetStateAction<any>>;
  showError?: boolean;
  type?: string;
}

export function Input({
  Icon,
  value,
  setValue,
  placeholder,
  err,
  showError,
  type = "text",
}: InputProps) {
  return (
    <div>
      <div
        className={`group bg-white focus-within:border-blue-500 border w-full space-x-4 flex justify-center items-center px-4 jj bd  `}
      >
        {Icon && <Icon className="text-xl text-[#2C5FC3] " />}
        <label className="flex items-center w-full relative cursor-pointer  py-1 ">
          <input
            value={value}
            required
            type={type}
            placeholder={placeholder}
            className="h-10 w-full px-2   bg-white border-none outline-none focus  transition duration-200"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </label>
      </div>
      {showError ? <p className=" mt-3 text-red-500 text-sm">{err}</p> : null}
    </div>
  );
}
