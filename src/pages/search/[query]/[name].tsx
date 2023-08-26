import { Card } from "@mui/material";
import { Loader } from "lucide-react";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { VscListFilter } from "react-icons/vsc";
import { Propery, ProperyResArr } from "src/@types";
import SearchResult from "src/componets/search/searchResults";
import SearchSideOptions from "src/componets/search/serachSideoptions";
import CustomLoader from "src/componets/shared/Loader";
import { useAppContext } from "src/Context/AppContext";
import Layout from "src/Layout/main";
import { useFetch } from "src/lib/hooks/useFetch";
import { ErrorDispaly } from "src/pages/admin/property";
import { useAxios } from "src/utills/axios";

interface FilterContextInterface {
  selected: string[] | [];
  setSelected: Dispatch<SetStateAction<string[] | []>>;
  area: string[] | [];
  setArea: Dispatch<SetStateAction<string[] | []>>;
  BHKconfig: string;
  setBHKconfig: Dispatch<SetStateAction<string>>;
  availableFor: string;
  setAvailableFor: Dispatch<SetStateAction<string>>;
  propertyType: string;
  setPropertyType: Dispatch<SetStateAction<string>>;
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
  min: number;
  setMin: Dispatch<SetStateAction<number>>;
  max: number;
  setMax: Dispatch<SetStateAction<number>>;
  furnishing: string;
  setFurnishing: Dispatch<SetStateAction<string>>;
  possession: string;
  setPossession: Dispatch<SetStateAction<string>>;
  toggle: string;
  setToggle: Dispatch<SetStateAction<string>>;
}
interface IContextProps {
  children: ReactNode;
}
export const FilterContext = createContext<FilterContextInterface>(
  {} as FilterContextInterface
);
export const useFilterContext = () => {
  return useContext(FilterContext);
};

export const FilterContextProvder = ({ children }: IContextProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  // const [area, setArea] = useState<string[]>([]);

  const [BHKconfig, setBHKconfig] = useState("");
  const [availableFor, setAvailableFor] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [size, setSize] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(200000000000000000);
  const [furnishing, setFurnishing] = useState("");
  const [possession, setPossession] = useState("");
  const [toggle, setToggle] = useState("");

  const shared = {
    // area,
    // setArea,
    selected,
    setSelected,
    BHKconfig,
    setBHKconfig,
    availableFor,
    setAvailableFor,
    propertyType,
    setPropertyType,
    size,
    setSize,
    max,
    setMax,
    min,
    setMin,
    furnishing,
    setFurnishing,
    possession,
    setPossession,
    toggle,
    setToggle,
  };
  return (
    <FilterContext.Provider value={shared}>{children}</FilterContext.Provider>
  );
};

const SearchAll = () => {
  const { resCount } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const instance = useAxios();

  const { query, name } = router.query;
  // const { data, status } = useFetch<ProperyResArr>(
  //   `/property/getPropertiesByLocation/${query}`
  // );
  // console.log(data);

  const [PropertyResult, setPropertyResult] = useState<
    Propery[] | undefined | null
  >(null);

  async function searchAllProperty(data: any) {
    try {
      setLoading(true);
      const res = await instance.post(
        "/property/getPropertiesByAllFilters",
        data
      );
      if (res.data) {
        setPropertyResult(res?.data?.result);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  // useEffect(() => {

  //   console.log(PropertyResult,"resultP")

  // }, [PropertyResult])
  

  const {
    // area,
    selected,
    BHKconfig,
    availableFor,
    propertyType,
    size,
    max,
    min,
    furnishing,
    possession,
    toggle
  } = useFilterContext();

  useEffect(() => {
    if (name) {
      searchAllProperty({
        minPrice: min || undefined,
        maxPrice: max || undefined,
        availableFor: availableFor || undefined,
        possessionStatus: possession || undefined,
        propertyType: propertyType || undefined,
        BHKconfig: BHKconfig || undefined,
        size: size || undefined,
        // area: area || undefined,
        furnishingStatus: furnishing || undefined,
        amenities: selected?.length ? selected : undefined,
        location: name,
        toggle: toggle || undefined,
      });
    }
  }, [
    name,
    // area,
    selected,
    BHKconfig,
    availableFor,
    propertyType,
    size,
    max,
    min,
    furnishing,
    possession,
    toggle
  ]);

  console.log("min", min, max)

  return (
    <>
      {loading ? <CustomLoader /> : null}

      <div className="lg:p-10 md:p-8 mx-auto font-manrope overflow-hidden">
        {/* top part */}
        <div className="p-4 md:pb-10 flex items-center justify-between">
          {/* <h1 className="text-lg md:text-2xl text-TitleColor font-bold">
            {resCount} Results in {name}
          </h1> */}
          <h1 className="text-lg md:text-2xl text-TitleColor font-bold">
            {PropertyResult?.length === 0
              ? `0 Results in ${name}`
              : `${resCount} Results in ${name}`}
          </h1>
          <div
            className="lg:hidden block p-3 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <VscListFilter className="text-2xl" />
          </div>
        </div>
        {/* main part */}
        <div className="flex w-full overflow-hidden ">
          <div className="hidden lg:block  border   h-max  bg-white w-full shrink  max-w-[290px]  rounded-lg p-4">
            <SearchSideOptions
              data={PropertyResult}
              setData={setPropertyResult}
              searchAllProperty={searchAllProperty}
            />
          </div>
          <div
            className={`absolute z-40 top-0 left-0 transition-all duration-150 ease-in-out  ${open ? "-translate-x-0" : "-translate-x-full"
              }  border  h-screen overflow-scroll   bg-white w-full shrink  max-w-[290px]  rounded-lg p-4`}
          >
            <SearchSideOptions
              data={PropertyResult}
              setData={setPropertyResult}
              searchAllProperty={searchAllProperty}
            />
          </div>
          <div style={{ marginBottom: "50px" }} className="lg:ml-10 w-full overflow-hidden ">
            {PropertyResult?.length ? (
              <SearchResult data={PropertyResult} />
            ) : (
              <Card>
                <div className="flex flex-col w-full justify-center items-center py-4 ">
                  <img
                    className="w-[25%] h-[75%] "
                    src="/no-results.png"
                    alt=""
                  />
                  <p className="text-lg font-bold py-4">No Property Found</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Search = () => {
  return (
    <FilterContextProvder>
      <SearchAll />
    </FilterContextProvder>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
