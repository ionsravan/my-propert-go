import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { ProperyRes } from "src/@types";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import CustomLoader from "src/componets/shared/Loader";
import { useFetch } from "src/lib/hooks/useFetch";
import AddProperty from "src/pages/addProperty";
import { PostingCard } from "src/pages/agent/mypostings";

const EditProperties = () => {

    const router = useRouter();
    const id = router.query["id"];


    const { data, error, status } = useFetch<ProperyRes>(
        `property/getPropertyById/${id}`
    );



    if (status === "FETCHING") {
        return <CustomLoader />;
    }



    return (
        <>
            <div className="flex justify-between mb-8 ">
                <h1 className="text-black font-bold text-[22px]">Edit Property</h1>

            </div>

            {data?.result?._id && <PostingCard {...data?.result} key={2} />}
            <div
                className={
                    "mt-11 flex space-x-6 text-[#0066FF] font-semibold text-lg  "
                }
            >
                <p className="border-b py-3 border-[#0066FF]">Step 1: Genreral Info</p>
            </div>

            <AddProperty navbarFooter={false} propertyData={data?.result} isEdit={true} />

        </>
    );
};

EditProperties.getLayout = function getLayout(page: ReactElement) {
    return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default EditProperties;
