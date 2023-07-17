import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
  useState,
  createContext,
  useEffect,
} from "react";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { amenity, area, Propery, ProperyResArr, response } from "src/@types";
import { useAppContext } from "src/Context/AppContext";
import { useFetch } from "src/lib/hooks/useFetch";
import { useFilterContext } from "src/pages/search/[query]";

export function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) {
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
  return <p className="text-sm px-3 rounded-full ">{text}</p>;
};
const Amenties = ({ data }: { data: amenity[] }) => {
  const [ams, setAms] = useState(data);
  const { selected, setSelected } = useFilterContext();

  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-[16px] pb-5">Aminties</h1>
        {selected.length > 0 && (
          <button
            className="text-sm text-primaryBlue"
            onClick={() => {
              setSelected([]);
            }}
          >
            clear
          </button>
        )}
      </div>
      <div className="px-2 flex flex-wrap ">
        {selected?.map((d) => {
          return (
            <div
              className="flex justify-center items-center py-1 px-3 my-2 mx-2 border rounded-full bg-primaryBlue text-white cursor-pointer"
              key={d}
              onClick={() => {
                setSelected((prev) => prev.filter((item) => item !== d));
              }}
            >
              <Aminity text={d} />
              <AiOutlineClose />
            </div>
          );
        })}
      </div>
      <div className="px-2 flex flex-wrap ">
        {ams?.map((d) => {
          return (
            <div
              className="border rounded-full my-3 cursor-pointer"
              key={d._id}
              onClick={() => {
                setSelected((prev) => {
                  const data = [...prev];
                  data?.push(d.name);
                  const uniqueArray = data.filter(function (item, pos) {
                    return data.indexOf(item) == pos;
                  });
                  return uniqueArray;
                });
              }}
            >
              <Aminity text={d.name} />
            </div>
          );
        })}
      </div>
      <button className="text-xs text-primaryBlue">+4 more</button>
    </div>
  );
};
const Location = ({ name, stars = 0 }: { name?: string; stars?: number }) => {
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
const LocationsFilter = ({ areas }: { areas: area[] }) => {
  return (
    <div>
      <h1 className="text-[16px] pb-5">Locations</h1>
      <div className="space-y-3">
        {areas.map((a) => {
          return <Location key={a._id} name={a.name} />;
        })}
      </div>
    </div>
  );
};

const TypeFilter = ({
  areas = ["all", "villa", "appartment", "pg"],
}: {
  areas?: string[];
}) => {
  const { searchFilter, setsearcheFilter } = useAppContext();
  return (
    <div>
      <h1 className="text-[16px] pb-5">Property Type</h1>
      <div className="space-y-3">
        {areas.map((area, index) => {
          return (
            <div key={area} className="flex space-x-3 text-sm">
              <input
                checked={searchFilter == area}
                onChange={(e) => {
                  setsearcheFilter(e.target.value);
                }}
                type={"radio"}
                value={area}
                name="type"
              />
              <label htmlFor="type">{area}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PropertiesFilter = ({
  children,
  enabled,
  setEnabled,
}: {
  children: ReactNode;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>{children}</div>
      <Toggle enabled={enabled} setEnabled={setEnabled} />
    </div>
  );
};

interface Props {
  data: Propery[] | undefined | null;
  setData: Dispatch<SetStateAction<Propery[] | undefined | null>>;
}

const SearchSideOptions = ({ data, setData }: Props) => {
  const { query } = useRouter();
  console.log(query.query,"quety")

  

  
  const { data: area, error } = useFetch<response<area[]>>(
    `/property/location/getAreaInLocation/${query.query}`
  );




  const { data: ams } = useFetch<response<amenity[]>>("/getAllAmenities");
  const { propertywithPhotos, setPropertyWithPhotos } = useFilterContext();

  return (
    <>
      <div className="font-manrope top-2 overflow-hidden">
        <h1 className="text-TitleColor font-bold text-2xl py-2 mb-4">
          Properties
        </h1>
        <div className="text-TitleColor">
          <SidBarItemContainer isBottomBorder>
            <PropertiesFilter
              enabled={propertywithPhotos}
              setEnabled={setPropertyWithPhotos}
            >
              <div className="flex flex-col">
                <p className="text-[16px]">Verified Properties</p>
                <small className="text-[10px] opacity-60">
                  verified by myproperty go
                </small>
              </div>
            </PropertiesFilter>
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <PropertiesFilter
              enabled={propertywithPhotos}
              setEnabled={setPropertyWithPhotos}
            >
              <div className="flex flex-col">
                <p className="text-[16px]">Properties With Photos</p>
              </div>
            </PropertiesFilter>
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <PropertiesFilter
              enabled={propertywithPhotos}
              setEnabled={setPropertyWithPhotos}
            >
              <div className="flex flex-col">
                <p className="text-[16px]">Properties With Videos</p>
              </div>
            </PropertiesFilter>
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            {area && <LocationsFilter areas={area.result} />}
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <TypeFilter />
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <p className="text-[16px]">New Projects / Soceties</p>
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <p className="text-[16px]">Construction Status</p>
          </SidBarItemContainer>
          {/* amenties */}
          <SidBarItemContainer isBottomBorder>
            <div>{ams && <Amenties data={ams?.result} />}</div>
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <p className="text-[16px]">Furnishing status</p>
          </SidBarItemContainer>
          <SidBarItemContainer>
            <p className="text-[16px]">Purchase type</p>
          </SidBarItemContainer>
        </div>
      </div>
    </>
  );
};

export default SearchSideOptions;
