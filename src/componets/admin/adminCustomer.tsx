import { AiFillProfile, AiOutlineUsb } from "react-icons/ai";
import { User } from "src/@types";

interface VestedToken {
  name: string;
  tokenAddress: string;
  ammount: string;
  cliffamount: string;
  time: string;
  id: string;
}

export const AssetHead = () => {
  return (
    <div className=" rounded-t-lg grid grid-cols-5  bg-primaryBlue text-white font-medium text-[10px] ">
      <div className="col-start-1 col-span-1  ">
        <p className=" ">USER NAME</p>
      </div>
      <div className="col-start-2 col-span-1    flex justify-start">
        <p className=" text-text-faded">EMAIl</p>
      </div>
      <div className="col-start-3 col-span-1 flex justify-start  ">
        <p className=" text-text-faded">MOBILE</p>
      </div>
      <div className="col-start-4 col-span-1  flex justify-start ">
        <p className="text-text-faded">JOINING DATE</p>
      </div>
      <div className="col-start-5 col-span-1 flex justify-center  ">
        <p className=" text-text-faded">ENQUIRES</p>
      </div>
    </div>
  );
};

const AssetComponet = ({ name, _id, email, mobileNumber }: User) => {
  return (
    <>
      <div className=" bg-white grid grid-cols-5 p-4 border-b border-[#EDEDED] items-center rounded-xl text-sm ">
        <div className="col-start-1  col-span-1  ">
          <p className="text-sm w-full font-bold">{name}</p>
        </div>
        <div className="col-start-2 col-span-1">
          <p className="text-[#303030]">{email}</p>
        </div>
        <div className="col-start-3 col-span-1 ">
          <p className="text-[#303030]">+{mobileNumber}</p>
        </div>
        <div className="col-start-4 col-span-1   ">
          <p className="text-[#303030]">Joined 4 Months Ago</p>
        </div>
        <div className="col-start-5 col-span-1   ">
          <p className="text-center text-[#303030] font-normal">
            2 Enquires Today{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export const AdminCustomers = ({ users }: { users: User[] }) => {
  return (
    <div className="  w-full p-5 rounded-xl">
      <div
        className="bg-primaryBlue p-5 px-8
      "
      >
        <AssetHead />
      </div>
      <div className="px-6 bg-white">
        {users.map((user) => {
          return <AssetComponet {...user} key={user._id} />;
        })}
      </div>
    </div>
  );
};
