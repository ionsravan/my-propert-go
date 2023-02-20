import Image from "next/image";

export const ConnectWithFaceBook = () => {
  return (
    <div className="border flex max-w-xl rounded-xl my-4 justify-center  p-2  font-semibold cursor-pointer">
      <div className="w-[250px] flex items-center  space-x-3">
        <div className="relative h-8 w-8  pl-10 ">
          <Image
            src={"/fb.png"}
            fill
            alt="home"
            className="object-contain rounded-lg"
          />
        </div>
        <p>Connect with facebook</p>
      </div>
    </div>
  );
};
