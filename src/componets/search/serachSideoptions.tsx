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
import {
  amenity,
  area,
  Propery,
  ProperyFilter,
  ProperyResArr,
  response,
} from "src/@types";
import { useAppContext } from "src/Context/AppContext";
import { useFetch } from "src/lib/hooks/useFetch";
import { useFilterContext } from "src/pages/search/[query]/[name]";
import CustomLoader from "../shared/Loader";
import { Slider, Stack, TextField, Typography } from "@mui/material";
import { debounce } from "src/@global/Queries";
import { Search } from "../Home/header";

const budgetArr: number[] = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 90];

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
export function FilterCheckBox({
  enabled,
  name,
  setEnabled,
  values,
}: {
  name: string;
  values?: string;
  enabled: boolean;
  setEnabled: any;
}) {
  return (
    <div
      onClick={() => {
        setEnabled(enabled ? "" : values ?? name);
      }}
      className="flex space-x-3 items-center"
    >
      <input
        type={"checkbox"}
        className={"outline-[#42526E] rounded-sm"}
        checked={enabled}
        readOnly
      />
      <div className="flex text-[#42526E] space-x-2 items-center">
        <label htmlFor="" className="text-sm">
          {name}
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
      {/* <button className="text-xs text-primaryBlue">+4 more</button> */}
    </div>
  );
};
const Location = ({
  name,
  stars = 0,
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<string[]>>;
  name: string;
  stars?: number;
}) => {
  const { area, setArea } = useFilterContext();

  let newArea = [...area]
  return (
    <div
      onClick={() => {
        let newArray: string[] = [];
        if (!newArea.includes(name)) {
          newArray.push(name);
        } else {
          newArray.splice(newArray.indexOf(name), 1);
        }
        setArea(newArray);
      }}
      className="flex space-x-3 items-center"
    >
      <input
        type={"checkbox"}
        className={"outline-[#42526E] rounded-sm"}
        name={name}
        checked={enabled}
        readOnly
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
  const { area, setArea } = useFilterContext();
  const isSelected = (name:string) => area.indexOf(name) !== -1;

//   return (
//     <div>
//       <h1 className="text-[16px] pb-5">Area</h1>
//       <div className="space-y-3">
//         {areas.map((a: area) => {
//           const checkSelect = isSelected(a.name);
//           return (
//             <Location
//               setEnabled={setArea}
//               enabled={checkSelect}
//               key={a._id}
//               name={a.name}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };
}

const BhkFilter = () => {
  const { BHKconfig, setBHKconfig } = useFilterContext();
  // console.log(BHKconfig,"BHK")
  return (
    <div>
      <h1 className="text-[16px] pb-5">BHK</h1>
      <div className="space-y-3">
        <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "1"}
          name="1 BHK"
          values="1"
        />
   
        <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "2"}
          name="2 BHK"
          values="2"
        />
   
        <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "3"}
          name="3 BHK"
          values="3"
        />
    
        <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "4"}
          name="4 BHK"
          values="4"
        />
        <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "5"}
          name="5 BHK"
          values="5"
        />
        {/* <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "6"}
          name="6 BHK"
          values="6"
        /> */}
        <FilterCheckBox
          setEnabled={setBHKconfig}
          enabled={BHKconfig === "5+"}
          name="5+ BHK"
          values="5+"
        />
      </div>
    </div>
  );
};

const FurnishingFilter = () => {
  const { furnishing, setFurnishing } = useFilterContext();

  return (
    <div>
      <h1 className="text-[16px] pb-5">Furnishing Status</h1>
      <div className="space-y-3">
        <FilterCheckBox
          setEnabled={setFurnishing}
          enabled={furnishing === "Furnished"}
          name="Furnished"
        />
        <FilterCheckBox
          setEnabled={setFurnishing}
          enabled={furnishing === "Semi-Furnished"}
          name="Semi-Furnished"
        />
        <FilterCheckBox
          setEnabled={setFurnishing}
          enabled={furnishing === "Unfurnished"}
          name="Unfurnished"
        />
        <FilterCheckBox
          setEnabled={setFurnishing}
          enabled={furnishing === "Gated Communities"}
          name="Gated Communities"
        />
      </div>
    </div>
  );
};

const PossesionFilter = () => {
  const { possession, setPossession } = useFilterContext();

  return (
    <div>
      <h1 className="text-[16px] pb-5">Construction Status</h1>
      <div className="space-y-3">
        <FilterCheckBox
          setEnabled={setPossession}
          enabled={possession === "Ready To Move"}
          name="Ready To Move"
        />
        <FilterCheckBox
          setEnabled={setPossession}
          enabled={possession === "Under Construction"}
          name="Under Construction"
        />
      </div>
    </div>
  );
};
const PropertyToggleFilter = () => {
  const { toggle, setToggle } = useFilterContext();
  console.log(toggle,"BHK")

  return (
    <div>
      <h1 className="text-[16px] pb-5">Property Toggle</h1>
      <div className="space-y-3">
        <FilterCheckBox
          setEnabled={setToggle}
          enabled={toggle === "Property"}
          name="Property"
        />
        <FilterCheckBox
          setEnabled={setToggle}
          enabled={toggle === "Project"}
          name="Project"
        />
      </div>
    </div>
  );
};
const AvailablePropertyFilter = () => {
  const { availableFor, setAvailableFor } = useFilterContext();

  return (
    <div>
      <h1 className="text-[16px] pb-5">Available For</h1>
      <div className="space-y-3">
        <FilterCheckBox
          setEnabled={setAvailableFor}
          enabled={availableFor === "rent"}
          name="rent"
        />
        <FilterCheckBox
          setEnabled={setAvailableFor}
          enabled={availableFor === "sale"}
          name="sale"
        />
        <FilterCheckBox
          setEnabled={setAvailableFor}
          enabled={availableFor === "Development"}
          name="Development"
        />
      </div>
    </div>
  );
};

const BudgetFilter = () => {
  const { min, setMax, setMin, max } = useFilterContext();

  const minmin = 0;
  const maxmax = 200000000;

  const [value, setValue] = useState<number[]>([0, 200000000]);

  const minDebounced = debounce((val) => {
    setMin(val);
  }, 20000);

  const maxDebounced = debounce((val) => {
    setMax(val);
  }, 20000);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue);
      minDebounced(newValue[0]);
      maxDebounced(newValue[1]);
    }
  };

  return (
    <div>
      <h1 className="text-[16px] pb-5">Budget</h1>
      <div className="space-y-3 px-3">
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={minmin}
          max={maxmax}
        />
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <TextField
            size="small"
            label="min"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100px" }}
            value={value[0]}
            onChange={(e) => {
              setValue([Number(e.target.value), value[1]]);
              minDebounced(Number(e.target.value));
            }}
          />
          <Typography>-</Typography>
          <TextField
            label="max"
            size="small"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100px" }}
            value={value[1]}
            onChange={(e) => {
              setValue([value[0], Number(e.target.value)]);
              maxDebounced(Number(e.target.value));
            }}
          />
        </Stack>
        <div className="flex text-[#42526E] space-x-2 items-center pl-2 ">
          {/* <label htmlFor="" className="text-sm">
            in Lacs
          </label> */}
        </div>
      </div>
    </div>
  );
};

const TypeFilter = ({
  areas = [
    { label: "all", value: "" },
    { label: "villa", value: "Villa" },
    { label: "flat", value: "Flat" },
    { label: "pg", value: "PG" },
    { label: "agriculture land", value: "Agriculture Land" },
    { label: "penthouse", value: "Penthouse" },
    { label: "individual house", value: "Individual House" },
    { label: "stutio apartment", value: "Stutio Apartment" },
    { label: "shop", value: "Shop" },
    { label: "office space", value: "Office Space" },
    { label: "showroom", value: "Showroom" },
    { label: "building", value: "Building" },
    { label: "warehouse", value: "Warehouse" },
    { label: "industrial land", value: "Industrial Land" },

    // { label: "building type", value: "building type" },
  ],
}: {
  areas?: any;
}) => {
  const { propertyType, setPropertyType } = useFilterContext();
  return (
    <div>
      <h1 className="text-[16px] pb-5">Property Type</h1>
      <div className="space-y-3">
        {areas.map((area: any, index: number) => {
          return (
            <FilterCheckBox
              key={index}
              setEnabled={setPropertyType}
              enabled={propertyType === area.value}
              name={area.label}
              values={area.value}
            />
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
  searchAllProperty: any;
}

const SearchSideOptions = ({ data, setData, searchAllProperty }: Props) => {
  const router = useRouter();

  const { query, name } = router.query;
  const { data: areas, error } = useFetch<response<area[]>>(
    `/property/location/getAreaInLocation/${query}`
  );

  const { data: ams } = useFetch<response<amenity[]>>("/getAllAmenities");

  if (!router.isReady) {
    return <CustomLoader />;
  }

  return (
    <>
      <div  className="font-manrope top-2 overflow-hidden">
        <div className="mb-2">
        <Search />
        </div>
      
        <h1 className="text-TitleColor font-bold text-2xl py-2 ">Properties</h1>
        <div className="text-TitleColor">
        <SidBarItemContainer isBottomBorder>
            <AvailablePropertyFilter />
          </SidBarItemContainer>
        <SidBarItemContainer isBottomBorder>
            <PropertyToggleFilter />
          </SidBarItemContainer>
          {/* <SidBarItemContainer isBottomBorder>
            <PropertiesFilter
              enabled={verifiedPropety}
              setEnabled={setVerifiedPropety}
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
              enabled={propertywithVideos}
              setEnabled={setPropertyWithVideos}
            >
              <div className="flex flex-col">
                <p className="text-[16px]">Properties With Videos</p>
              </div>
            </PropertiesFilter>
          </SidBarItemContainer> */}
          <SidBarItemContainer isBottomBorder>
            <BhkFilter />
          </SidBarItemContainer>
          {/* <SidBarItemContainer isBottomBorder>
            {areas && <LocationsFilter areas={areas.result} />}
          </SidBarItemContainer> */}
          <SidBarItemContainer isBottomBorder>
            <TypeFilter />
          </SidBarItemContainer>
          <SidBarItemContainer isBottomBorder>
            <PossesionFilter />
          </SidBarItemContainer>
          {/* amenties */}
          {/* <SidBarItemContainer isBottomBorder>
            <div>{ams && <Amenties data={ams?.result} />}</div>
          </SidBarItemContainer> */}
          <SidBarItemContainer isBottomBorder>
            <FurnishingFilter />
          </SidBarItemContainer>
          <SidBarItemContainer>
            <BudgetFilter />
          </SidBarItemContainer>
        </div>
      </div>
    </>
  );
};



export default SearchSideOptions;
