import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { VscListFilter } from "react-icons/vsc";
import { ProperyResArr } from "src/@types";
import SearchResult from "src/componets/search/searchResults";
import SearchSideOptions from "src/componets/search/serachSideoptions";
import { useAppContext } from "src/Context/AppContext";
import Layout from "src/Layout/main";
import { useFetch } from "src/lib/hooks/useFetch";

const Search = () => {
  const { resCount, location } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const locName = router.query.query;
  const { data } = useFetch<ProperyResArr>(
    `/property/getPropertiesByLocation/${locName}`
  );
  const [PropertyResult, setPropertyResult] =
    useState<ProperyResArr | undefined | null>(null);

  useEffect(() => {
    setPropertyResult(data);
  }, [data]);

  return (
    <div className="lg:p-10 md:p-8 mx-auto font-manrope overflow-hidden">
      {/* top part */}
      <div className="p-4 md:pb-10 md:block flex items-center justify-between">
        <h1 className="text-lg md:text-2xl text-TitleColor font-bold">
          {resCount} Results in {location}
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
        <div className="hidden lg:block  border  min-h-screen h-max  bg-white w-full shrink  max-w-[290px]  rounded-lg p-4">
          <SearchSideOptions
            data={PropertyResult}
            setData={setPropertyResult}
          />
        </div>
        <div
          className={`absolute z-40 top-0 transition-all duration-150 ease-in-out  ${
            open ? "-translate-x-0" : "-translate-x-full"
          }  border  min-h-screen h-max  bg-white w-full shrink  max-w-[290px]  rounded-lg p-4`}
        >
          <SearchSideOptions
            data={PropertyResult}
            setData={setPropertyResult}
          />
        </div>
        <div className="lg:ml-10 w-full overflow-hidden ">
          <SearchResult data={PropertyResult} />
        </div>
      </div>
    </div>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
