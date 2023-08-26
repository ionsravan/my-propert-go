import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "src/componets/shared/RHF/RHFTextField";
import FormProvider from "src/componets/shared/RHF/FormProvider";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineNumber,
  AiOutlineUser,
} from "react-icons/ai";
import { CircularProgress, IconButton } from "@mui/material";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CustomerValuesProps } from "src/@types";
import { ErrorDispaly } from "src/pages/admin/property";

const NewCompanyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Customer name is required"),
  password: Yup.string().required("Password is Required"),
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

const AddEditCustomer = ({ type }: { type: string }) => {
  const router = useRouter();
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const methods: any = useForm<CustomerValuesProps>({
    mode: "onChange",
    resolver: yupResolver(NewCompanyValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  async function onSubmit(data: CustomerValuesProps) {
    try {
      setLoading(true);
      const res = await instance.post("/admin/user/createNewUser", data);
      if (res.data) {
        toast.success("Customer Created Successfully");
        setLoading(false);
        router.push("/admin/customers");
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  return (
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
          <RHFTextField
            name="password"
            type={showPassword ? "text" : "password"}
            sx={addForm}
            placeholder="Password"
            InputProps={{
              startAdornment: <AiOutlineLock className={iconClass} />,
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <BsEyeSlash /> : <BsEyeFill />}
                </IconButton>
              ),
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
            "Add User"
          )}
        </button>
      </div>
    </FormProvider>
  );
};

export default AddEditCustomer;
