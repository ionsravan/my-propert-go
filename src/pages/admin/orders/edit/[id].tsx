import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineNumber, AiOutlineUser } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { CustomerValuesProps, User } from "src/@types";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import CustomLoader from "src/componets/shared/Loader";
import FormProvider from "src/componets/shared/RHF/FormProvider";
import RHFTextField from "src/componets/shared/RHF/RHFTextField";
import { useAxios } from "src/utills/axios";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const NewCompanyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Customer name is required"),
  email: Yup.string().email().required("email is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
});

const defaultValues = {
  name: "",
  password: "",
  email: "",
  mobileNumber: "",
};

const addForm = {
  "& .MuiInputBase-root": {
    borderRadius: "18px",
    border: "2px solid rgba(169, 169, 169, 0.28)",
    bgcolor: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: 0,
  },
};

let iconClass = "text-xl text-[#2C5FC3] mr-2";

const EditOrders = () => {
  const router = useRouter();
  const { id } = router.query;
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const methods: any = useForm<CustomerValuesProps>({
    mode: "onChange",
    resolver: yupResolver(NewCompanyValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const [users, setUsers] = useState<User | undefined | null>(null);

  async function getAllUsers() {
    try {
      setPageLoading(true);
      const res = await instance.get(`/admin/user/getUserById/` + id);
      if (res.data) {
        let resoponse = res?.data?.data;
        setUsers(res?.data?.data);
        reset({
          name: resoponse?.name || "",
          email: resoponse?.email || "",
          mobileNumber: resoponse?.mobileNumber || "",
        });
        setPageLoading(false);
      }
    } catch (e) {
      setPageLoading(false);
      console.log(e);
    }
  }
  console.log("router)", router.query);

  useEffect(() => {
    if (id) {
      getAllUsers();
    }
  }, [id]);

  async function onSubmit(data: CustomerValuesProps) {
    try {
      setLoading(true);
      const res = await instance.put("/admin/user/editUserById/" + id, data);
      if (res.data) {
        toast.success("Customer updated Successfully");
        setLoading(false);
        router.push("/admin/customers");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      {pageLoading ? <CustomLoader /> : null}

      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h2 className="text-TitleColor font-bold text-3xl">Edit Orders</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button
            onClick={() => router.push("/admin/customers")}
            className=" text-black font-medium justify-center w-full bg-white rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            <span>
              <MdArrowBack className="w-5 h-6" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="md:py-4">
          <div className="space-y-5 max-w-xl pb-4">
            <RHFTextField
              name="name"
              sx={addForm}
              placeholder="Name"
              InputProps={{
                startAdornment: <AiOutlineUser className={iconClass} />,
              }}
            />
            <RHFTextField
              name="email"
              placeholder="Email"
              type="email"
              sx={addForm}
              InputProps={{
                startAdornment: <AiOutlineMail className={iconClass} />,
              }}
            />
            <RHFTextField
              name="mobileNumber"
              type="number"
              placeholder="Mobile Number"
              sx={addForm}
              InputProps={{
                startAdornment: <AiOutlineNumber className={iconClass} />,
              }}
            />
          </div>
          <button
            disabled={loading}
            className={`${
              loading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
            } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out`}
          >
            {loading ? (
              <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
            ) : (
              "Update User"
            )}
          </button>
        </div>
      </FormProvider>
    </div>
  );
};

EditOrders.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default EditOrders;