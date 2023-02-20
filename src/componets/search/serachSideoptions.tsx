import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ProperyResArr } from "src/@types";

export function Toggle() {
  const [enabled, setEnabled] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col items-center justify-center  overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => {
              setEnabled(!enabled);
            }}
            className="w-11 h-6 bg-[#D6EFFF] rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-PrimaryBlue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
        </label>
      </div>
    </div>
  );
}

const SidBarItemContainer = ({
  children,
  isBottomBorder,
}: {
  children: ReactNode;
  isBottomBorder?: boolean;
}) => {
  return (
    <div
      className={`py-6 ${isBottomBorder ? "border-b border-[#EBEBEB]" : ""}`}
    >
      {children}
    </div>
  );
};
const Aminity = ({ text }: { text: string }) => {
  return <p className="text-sm px-3 rounded-full my-2 border">{text}</p>;
};
const Amenties = () => {
  return (
    <div>
      <h1 className="text-[16px] pb-5">Aminties</h1>
      <div className="px-2 flex flex-wrap ">
        <Aminity text="Parking" />
        <Aminity text="Power Backup" />
        <Aminity text="Lift" />
        <Aminity text="Park" />
        <Aminity text="Gymnasuium" />
      </div>
      <button className="text-xs text-primaryBlue">+4 more</button>
    </div>
  );
};
const Location = ({
  name = "Ajmer",
  stars = 0,
}: {
  name?: string;
  stars?: number;
}) => {
  return (
    <div className="flex space-x-3 items-center">
      <input
        type={"checkbox"}
        className={"outline-[#42526E] rounded-sm"}
        name={name}
        value={name}
      />
      <div className="flex text-[#42526E] space-x-2 items-center">
        <label htmlFor="" className="text-sm">
          {name}
        </label>
        <div className="flex  items-center px-1 text-[8px] space-x-1 bg-green-300 bg-opacity-40 text-green-800">
          <p className="">4.5</p>
          <AiFillStar className="" />
        </div>
      </div>
    </div>
  );
};
const LocationsFilter = () => {
  return (
    <div>
      <h1 className="text-[16px] pb-5">Locations</h1>
      <div className="space-y-3">
        <Location />
        <Location />
        <Location />
        <Location />
        <Location />
        <Location />
      </div>
    </div>
  );
};
const PropertiesFilter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center">
      <div>{children}</div>
      <Toggle />
    </div>
  );
};

interface Props {
  data: ProperyResArr | undefined | null;
  setData: Dispatch<SetStateAction<ProperyResArr | undefined | null>>;
}

const SearchSideOptions = ({ data, setData }: Props) => {
  return (
    <div className="font-manrope top-2 overflow-hidden">
      <h1 className="text-TitleColor font-bold text-2xl py-2 mb-4">
        Properties
      </h1>
      <div className="text-TitleColor">
        <SidBarItemContainer isBottomBorder>
          <PropertiesFilter>
            <div className="flex flex-col">
              <p className="text-[16px]">Verified Properties</p>
              <small className="text-[10px] opacity-60">
                verified by myproperty go
              </small>
            </div>
          </PropertiesFilter>
        </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
          <PropertiesFilter>
            <div className="flex flex-col">
              <p className="text-[16px]">Properties With Photos</p>
            </div>
          </PropertiesFilter>
        </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
          <PropertiesFilter>
            <div className="flex flex-col">
              <p className="text-[16px]">Properties With Videos</p>
            </div>
          </PropertiesFilter>
        </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
          <LocationsFilter />
        </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
          <p className="text-[16px]">New Projects / Soceties</p>
        </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
          <p className="text-[16px]">Construction Status</p>
        </SidBarItemContainer>
        {/* amenties */}
        <SidBarItemContainer isBottomBorder>
          <div>
            <Amenties />
          </div>
        </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
          <p className="text-[16px]">Furnishing status</p>
        </SidBarItemContainer>
        <SidBarItemContainer>
          <p className="text-[16px]">Purchase type</p>
        </SidBarItemContainer>
      </div>
    </div>
  );
};

export default SearchSideOptions;
