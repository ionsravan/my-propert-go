import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPencil, BsPencilFill } from "react-icons/bs";
import { MdDeleteForever, MdMoney } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
  CustomerValuesProps,
  leadsProps,
  location,
  newResponse,
  Pagination,
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
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addForm, iconClass } from "../customers/edit/[id]";
import { SiGoogleads } from "react-icons/si";
import Image from "src/componets/shared/Image";
import { RHFSelect } from "src/componets/shared/RHF/RHFSelect";
import { ErrorDispaly } from "../property";

const NewCompanyValidationSchema = Yup.object().shape({
  lead: Yup.number().required("Lead count is required"),
});

const defaultValues = {
  lead: "",
};
const NewPaidSchema = Yup.object().shape({
  paid: Yup.boolean().required("Paid is required"),
});

const defaultValuesPaid = {
  paid: false,
};

const userStatusObj = { pending: "primary", paid: "success" };

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
const Orders = () => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>({});
  const [edit, setEdit] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [users, setUsers] = useState<User[] | undefined | null>([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [selected, setSelected] = useState("All");
  const router = useRouter();

  const methods: any = useForm<leadsProps>({
    mode: "onChange",
    resolver: yupResolver(NewCompanyValidationSchema),
    defaultValues,
  });

  const methodsPaid: any = useForm<leadsProps>({
    mode: "onChange",
    resolver: yupResolver(NewPaidSchema),
    defaultValuesPaid,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const {
    handleSubmit: handleSubmitPaid,
    setValue: setValuePaid,
    reset: resetPaid,
    formState: { },
  } = methodsPaid;

  async function getAllOrders() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/getAllOrders`);
      if (res.data) {
        setUsers(res?.data?.orders);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  async function onSubmit(data: { lead: number }) {
    try {
      setDeleteLoading(true);
      let body = {
        userId: deleteId?._id,
        count: data.lead,
        planId: deleteId?.planId,

      };
      const res = await instance.post("/admin/leads/increaseLeadCount", body);
      if (res.data) {
        toast.success("Leads Added Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        getAllOrders();
        setValue("lead", "");
      }
    } catch (e) {
      setDeleteLoading(false);
      ErrorDispaly(e);
    }
  }

  async function onPaidSubmit(data: { lead: number }) {
    try {
      setDeleteLoading(true);

      let bodyData = { ...data };
      bodyData.id = deleteId?.userId;
      const res = await instance.put("/admin/editPlanElement", bodyData);
      if (res.data) {
        toast.success("Leads Added Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        setUsers(res?.data?.plans);
        setValue("paid", false);
      }
    } catch (e) {
      setDeleteLoading(false);
      console.log(e);
    }
  }

  const all_customer_columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 120,

      field: "userName",
      headerName: "USER NAME",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography variant="body1" fontWeight={500}>
          {row?.userName}
        </Typography>
      ),
    },
    {
      minWidth: 150,

      flex: 0.2,
      field: "userEmail",
      headerName: "EMAIl",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "planName",
      headerName: "PLAN NAME",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "leadCount",
      headerName: "LEADS",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 140,

      field: "screenshot",
      headerName: "SCREENSHOT",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box>
          {row?.screenshot?.length > 0 ? (
            <Image src={row?.screenshot[0]} border={true} zoom={true}></Image>
          ) : null}
        </Box>
      ),
    },
    {
      minWidth: 120,

      field: "paid",
      headerName: "STATUS",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Chip
          // skin="light"
          size="small"
          label={row?.paid ? "paid" : "pending"}
          color={userStatusObj[row?.paid ? "paid" : "pending"]}
          sx={{
            textTransform: "capitalize",
            "& .MuiChip-label": { lineHeight: "18px" },
          }}
        />
      ),
    },
    {
      minWidth: 160,

      field: "action",
      headerName: "ACTION",
      flex: 0.15,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" gap={2}>
          <button
            onClick={() => {
              setDeleteId(row);
              setDeleteOpen(true);
              setEdit(false);
            }}
            className=" text-[#0066FF] font-medium justify-center w-full text-[1rem]  py-3 flex space-x-2 items-center transition transform active:scale-95 duration-200  "
          >
            Add Leads
          </button>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setDeleteId(row);
                setDeleteOpen(true);
                setEdit(true);
                setValuePaid("paid", row?.paid);
              }}
              color="primary"
            >
              <BsPencilFill />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Orders</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full"></div>
      </div>

      <Grid container spacing={6} sx={{ pb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <DataGrid
              rows={users || []}
              columns={all_customer_columns}
              getRowId={(row) => row._id}
              autoHeight
              components={{
                LoadingOverlay: LinearProgress,
              }}
              loading={loading}
              getRowHeight={() => "auto"}
              pageSizeOptions={[50,100,300,500,1000]}

              // pagination
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
        title={edit ? "Update Status" : "Add Leads"}
        open={deleteOpen}
        closeDialog={() => setDeleteOpen(false)}
        size="sm"
      >
        {edit ? (
          <FormProvider
            methods={methodsPaid}
            onSubmit={handleSubmitPaid(onPaidSubmit)}
          >
            <RHFSelect
              placeholder="Paid Status"
              InputProps={{
                startAdornment: <MdMoney className={iconClass} />,
              }}
              sx={addForm}
              name="paid"
            >
              <MenuItem value={true}>Paid</MenuItem>
              <MenuItem value={false}>Pending</MenuItem>
            </RHFSelect>
            <button
              type="submit"
              disabled={deleteLoading}
              className={`${deleteLoading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
                } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out mt-4`}
            >
              {deleteLoading ? (
                <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
              ) : (
                "Update Paid Status"
              )}
            </button>
          </FormProvider>
        ) : (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              placeholder="Leads"
              InputProps={{
                startAdornment: <SiGoogleads className={iconClass} />,
              }}
              sx={addForm}
              name="lead"
              type="number"
            />
            <button
              type="submit"
              disabled={deleteLoading}
              className={`${deleteLoading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
                } flex justify-center w-full p-4 rounded-xl text-white text-center max-w-xl transform transition active:scale-95 duration-200 ease-out mt-4`}
            >
              {deleteLoading ? (
                <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
              ) : (
                "Add Lead"
              )}
            </button>
          </FormProvider>
        )}
      </Modal>
    </div>
  );
};

Orders.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Orders;