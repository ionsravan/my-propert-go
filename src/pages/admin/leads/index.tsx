import {
  Box,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { toast } from "react-toastify";
import {
  CustomerValuesProps,
  leadsChangeProps,
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
import { useAxios } from "src/utills/axios";
import { tableStyles } from "../tickets";
import Modal from "src/componets/shared/modal";
import FormProvider from "src/componets/shared/RHF/FormProvider";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addForm, iconClass } from "../customers/edit/[id]";
import { SiGoogleads } from "react-icons/si";
import { RHFSelect } from "src/componets/shared/RHF/RHFSelect";
import { ErrorDispaly } from "../property";

const NewCompanyValidationSchema = Yup.object().shape({
  newAgentId: Yup.string().required("Current agent is required"),
  agentId: Yup.string(),
  leadId: Yup.string(),
});

const defaultValues = {
  agentId: "",
  newAgentId: "",
  leadId: "",
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
const Leads = () => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [users, setUsers] = useState<User[] | undefined | null>([]);
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );

  const methods: any = useForm<leadsChangeProps>({
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

  async function getAllLeads() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/leads/getAllLeads`);
      if (res.data) {
        setLeads(res?.data?.result);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  async function getAllUsers() {
    try {
      setLoading(true);
      const res = await instance.get(`/admin/user/getAllUsers`);
      if (res.data) {
        setUsers(res?.data?.data);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllLeads();
    getAllUsers();
  }, []);

  async function onSubmit(data: leadsChangeProps) {
    try {
      setDeleteLoading(true);

      const res = await instance.post("/admin/leads/changeLead", data);
      if (res.data) {
        toast.success("Leads changed Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        setLeads(res?.data?.adminLeads);
        reset(defaultValues);
      }
    } catch (e) {
      setDeleteLoading(false);
      ErrorDispaly(e);
    }
  }

  const all_customer_columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 120,

      field: "userName",
      headerName: "Name",
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
      flex: 0.25,
      minWidth: 150,

      field: "userEmail",
      headerName: "Email",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      field: "propertyName",
      headerName: "Property Name",
      flex: 0.2,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 120,

      flex: 0.1,
      field: "location",
      headerName: "Location",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography >
          {row?.propertyId?.location?.name}
        </Typography>
      ),
    },
    {
      minWidth: 120,

      field: "agentName",
      headerName: "Agent",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      minWidth: 150,

      field: "action",
      headerName: "ACTION",
      flex: 0.15,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box>
          <button
            onClick={() => {
              setDeleteOpen(true);
              setValue("agentId", row?.agentId);
              setValue("leadId", row?._id);
            }}
            className=" text-[#0066FF] font-medium justify-center w-full text-[1rem]  py-3 flex  items-center transition transform active:scale-95 duration-200  "
          >
            Change Leads
          </button>
        </Box>
      ),
    },
  ];

  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Leads</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full"></div>
      </div>

      <Grid container spacing={6} sx={{ pb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <DataGrid
              rows={leads || []}
              columns={all_customer_columns}
              getRowId={(row) => row._id}
              autoHeight
              components={{
                LoadingOverlay: LinearProgress,
              }}
              loading={loading}
              getRowHeight={() => "auto"}
              pageSizeOptions={[25, 50, 75, 100]}
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
        title="Add Leads"
        open={deleteOpen}
        closeDialog={() => setDeleteOpen(false)}
        size="sm"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <InputLabel sx={{ ml: 1 }}>Current Agent</InputLabel>
          <RHFSelect
            placeholder="Current Agent"
            disabled
            InputProps={{
              startAdornment: <AiOutlineUser className={iconClass} />,
            }}
            sx={{ ...addForm }}
            name="agentId"
          >
            {users?.map((item: User, i: number) => (
              <MenuItem key={i} value={item?._id}>{item?.name}</MenuItem>
            ))}
          </RHFSelect>
          <InputLabel sx={{ mt: 2, ml: 1 }}>New Agent</InputLabel>

          <RHFSelect
            placeholder="New Agent"
            InputProps={{
              startAdornment: <AiOutlineUser className={iconClass} />,
            }}
            sx={addForm}
            name="newAgentId"
          >
            {users?.map((item: User, i: number) => (
              <MenuItem key={i} value={item?._id}>{item?.name}</MenuItem>
            ))}
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
              "Change Lead"
            )}
          </button>
        </FormProvider>
      </Modal>
    </div>
  );
};

Leads.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Leads;
