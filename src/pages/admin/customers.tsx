import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { VscListFilter } from "react-icons/vsc";
import { location, response, User } from "src/@types";
import { AdminCustomers } from "src/componets/admin/adminCustomer";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";

export const Button = ({
  name,
  Icon,
  Color,
}: {
  name: string;
  Icon: React.ElementType;
  Color: string;
}) => {
  return (
    <div
      className={
        Color +
        " bg-white font-bold w-full rounded-sm shadow-sm flex space-x-1 items-center justify-center px-4 p-1 max-w-max border border-[#DEDEDE]"
      }
    >
      <div className="text-xs">{<Icon />}</div>
      <div>
        <p className=" text-[10px]">{name}</p>
      </div>
    </div>
  );
};

const userTypes = ["All", "Premium"];

// give main area a max widht
const Customers = () => {
  const { data, error, status } = useFetch<response<User[]>>(
    "/admin/user/getAllUsers"
  );
  const [users, setUsers] = useState<User[] | undefined | null>();
  const { data: loc } = useFetch<response<location[]>>(
    "/property/location/getAllLocation"
  );
  const [results, setResults] = useState<location[] | null>(null);
  const [name, setName] = useState<string>("");
  const [selected, setSelected] = useState("All");
  useEffect(() => {
    if (loc?.result.length == 0) return;
    if (loc?.result !== undefined) {
      setResults(loc?.result);
    }
  }, [loc?.result]);

  useEffect(() => {
    if (data?.result.length == 0) return;
    if (data?.result !== undefined) {
      setUsers(data?.result);
    }
  }, [data?.result]);

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div>
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Customers</h2>
        </div>
      </div>
      <div className="flex justify-between mb-8">
        <div className="space-x-5">
          {userTypes.map((u) => {
            return (
              <button
                onClick={() => {
                  setSelected(u);
                }}
                key={u}
                className={` p-2 ${
                  selected == u
                    ? "text-primaryBlue  border-b border-primaryBlue"
                    : "text-[#616161]"
                }`}
              >
                {u}
              </button>
            );
          })}
        </div>

        <div className="flex space-x-[12px]">
          <Button name="Filter" Icon={VscListFilter} Color="" />
          <div className="flex items-center bg-white p-2 space-x-3">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              name=""
              id=""
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.length > 0) {
                  setUsers((prev) => {
                    const filtred = data?.result?.filter((str) => {
                      return str.name.includes(name);
                    });
                    if (filtred !== undefined) {
                      return filtred;
                    } else {
                      return null;
                    }
                  });
                } else {
                  if (data?.result !== undefined) {
                    setUsers(data?.result);
                  }
                }
              }}
              placeholder="search by location"
              className="outline-none"
            />
          </div>
        </div>
      </div>
      {/* dashboard caerd */}
      {users && <AdminCustomers users={users} />}
    </div>
  );
};

Customers.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Customers;
