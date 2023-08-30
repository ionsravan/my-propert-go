import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPencil, BsPencilFill, BsTags } from "react-icons/bs";
import {
  MdDeleteForever,
  MdDescription,
  MdSubscriptions,
} from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
  CustomerValuesProps,
  leadsProps,
  location,
  newResponse,
  Pagination,
  plansProps,
  response,
  User,
} from "src/@types";
import { AdminCustomers } from "src/componets/admin/adminCustomer";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import ConfirmBox from "src/componets/shared/ConfirmDialog";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useFetch } from "src/lib/hooks/useFetch";
import { useAxios } from "src/utills/axios";
import { tableStyles } from "../tickets";
import Modal from "src/componets/shared/modal";
import FormProvider from "src/componets/shared/RHF/FormProvider";
import RHFTextField from "src/componets/shared/RHF/RHFTextField";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addForm, iconClass } from "../customers/edit/[id]";
import { SiGoogleads } from "react-icons/si";
import { BiMoney } from "react-icons/bi";
import { CgAdd, CgClose } from "react-icons/cg";
import { ErrorDispaly } from "../property";

const NewCompanyValidationSchema = Yup.object().shape({
  numOfLeads: Yup.string().required("Lead count is required"),
  price: Yup.string().required("Price is required"),
  name: Yup.string().required("Plan Name is required"),
  text: Yup.string().required("Description is required"),
  tags: Yup.array().of(Yup.string().required("Tag is required").nullable()),
});

const defaultValues = {
  numOfLeads: "",
  name: "",
  text: "",
  price: "",
  tags: ["Edit this Tags"],
};

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

// give main area a max widht
const Plans = () => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [modalName, setModalName] = useState<string>("Add");
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [plans, setPlans] = useState<User[] | undefined | null>([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );

  const methods = useForm<plansProps>({
    mode: "onChange",
    resolver: yupResolver(NewCompanyValidationSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  async function getAllPlans() {
    try {
      setLoading(true);
      const res = await instance.get(`/user/plan/getAllPlans`);
      if (res.data) {
        setPlans(res?.data?.plans);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllPlans();
  }, []);

  async function onSubmit(data: plansProps) {
    try {
      setDeleteLoading(true);
      let bodyData = data;
      let url =
        modalName === "Add" ? "/admin/plan/addPlan" : "/admin/editPlanModel";
      let res
      if (modalName === "Update") {
        bodyData._id = deleteId;
        res = await instance.put(url, data);
      } else {
        res = await instance.post(url, data);
      }

      if (res.data) {
        toast.success("Leads Added Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        getAllPlans();
        reset(defaultValues);
      }
    } catch (e) {
      setDeleteLoading(false);
      ErrorDispaly(e);
    }
  }
  function openEdit(data: any) {
    setModalName("Update");
    setDeleteOpen(true);
    setDeleteId(data?._id);
    setValue("numOfLeads", data?.numOfLeads || 0);
    setValue("name", data?.name);
    setValue("price", data?.price);
    setValue("text", data?.text);
    setValue("tags", data?.tags);
  }

  function closeModal() {
    reset(defaultValues);
    setDeleteOpen(false);
  }

  const all_plans_columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 120,

      field: "name",
      headerName: "Name",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography variant="body1" textTransform="capitalize" fontWeight={500}>
          {row?.name}
        </Typography>
      ),
    },
    {
      minWidth: 120,

      flex: 0.25,
      field: "text",
      headerName: "Description",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "price",
      headerName: "Price",
      flex: 0.15,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "numOfLeads",
      headerName: "LEADS",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 150,

      field: "tags",
      headerName: "Tags",
      flex: 0.2,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box display="flex" sx={{ flexWrap: "wrap", gap: 2 }}>
          {row?.tags?.map((item: string, i: number) => (
            <Chip key={i} label={item} />
          ))}
        </Box>
      ),
    },
    {
      minWidth: 120,

      field: "action",
      headerName: "ACTION",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => openEdit(row)} color="primary">
              <BsPencilFill />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                // setDeleteId(row?._id);
                setDeleteOpen(true);
              }}
              color="error"
            >
              <MdDeleteForever />
            </IconButton>
          </Tooltip> */}
        </Box>
      ),
    },
  ];

  console.log("fields", watch("tags"));

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Plans</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button
            onClick={() => {
              setModalName("Add");
              setDeleteOpen(true);
            }}
            className=" text-white font-medium justify-center w-full bg-[#0066FF] rounded-full py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            <span>
              <TbEdit />
            </span>
            <span>Add New</span>
          </button>
        </div>
      </div>

      <Grid container spacing={6} sx={{ pb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <DataGrid
              rows={plans || []}
              columns={all_plans_columns}
              getRowId={(row) => row._id}
              autoHeight
              components={{
                LoadingOverlay: LinearProgress,
              }}
              loading={loading}
              getRowHeight={() => "auto"}
              pageSizeOptions={[25, 50, 75, 100]}

              // pagination={true}
              // rowsPerPageOptions={[5, 10, 25]}
              // rowCount={pagination?.totalUsers || 0}
              // page={pageState.page - 1}
              // pageSize={pageState.pageSize}
              // paginationMode="server"
              // onPageChange={(newPage: number) => {
              //   setPageState((old) => ({ ...old, page: newPage + 1 }));
              // }}
              // onPageSizeChange={(newPageSize: number) =>
              //   setPageState((old) => ({ ...old, pageSize: newPageSize }))
              // }
              sx={tableStyles}
            />
          </Card>
        </Grid>
      </Grid>

      <Modal
        title={`${modalName} Plan`}
        open={deleteOpen}
        scroll="paper"
        closeDialog={closeModal}
        size="sm"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            placeholder="Plan Name"
            InputProps={{
              startAdornment: <MdSubscriptions className={iconClass} />,
            }}
            sx={{ mt: 2, ...addForm }}
            name="name"
            type="text"
          />
          <RHFTextField
            placeholder="Description"
            InputProps={{
              startAdornment: <MdDescription className={iconClass} />,
            }}
            sx={{ mt: 2, ...addForm }}
            name="text"
            type="text"
          />
          <RHFTextField
            placeholder="Price"
            InputProps={{
              startAdornment: <BiMoney className={iconClass} />,
            }}
            sx={{ mt: 2, ...addForm }}
            name="price"
            type="number"
          />
          <RHFTextField
            placeholder="Leads"
            InputProps={{
              startAdornment: <SiGoogleads className={iconClass} />,
            }}
            sx={{ mt: 2, ...addForm }}
            name="numOfLeads"
            type="number"
          />
          <Grid container spacing={4}>
            {fields?.length > 0
              ? fields.map((field, index) => (
                <Grid
                  sx={{ mt: 2 }}
                  key={field?.id}
                  item
                  xs={12}
                  display="flex"
                >
                  <RHFTextField
                    name={`tags.${index}`}
                    InputProps={{
                      startAdornment: <BsTags className={iconClass} />,
                    }}
                    sx={addForm}
                    placeholder="Enter Tags"
                  />
                  <IconButton
                    color="error"
                    sx={{
                      display: watch("tags")?.length > 1 ? "flex" : "none",
                      width: "fit-content",
                      borderRadius: "8px",
                    }}
                    onClick={() => remove(index)}
                  >
                    <CgClose />
                  </IconButton>
                </Grid>
              ))
              : null}

            <Grid
              item
              xs={12}
              sx={{ mt: 2 }}
              display="flex"
              justifyContent="flex-end"
            >
              <button
                onClick={() => {
                  append("");
                }}
                type="button"
                className=" text-white font-medium justify-center w-32 bg-[#0066FF] rounded-full py-2 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
              >
                <span>
                  <CgAdd />
                </span>
                <span>Add Tag</span>
              </button>
            </Grid>
          </Grid>

          {/* <RHFTextField
            placeholder="Leads"
            InputProps={{
              startAdornment: <SiGoogleads className={iconClass} />,
            }}
            sx={{mt:2,...addForm}}
            name="numOfLeads"
            type="number"
          /> */}
          <button
            type="submit"
            disabled={deleteLoading}
            className={`${deleteLoading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
              } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out mt-4`}
          >
            {deleteLoading ? (
              <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
            ) : (
              `${modalName} Plan`
            )}
          </button>
        </FormProvider>
      </Modal>
    </div>
  );
};

Plans.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Plans;
