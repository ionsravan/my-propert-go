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
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { MdDeleteForever, MdDescription, MdTitle } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { Pagination, User } from "src/@types";
import AdminsideNav from "src/componets/admin/adminDasboardnav";
import ConfirmBox from "src/componets/shared/ConfirmDialog";
import DashBoardLayout from "src/Layout/DasboardsLayout";
import { useAxios } from "src/utills/axios";
import { tableStyles } from "../tickets";
import Modal from "src/componets/shared/modal";
import FormProvider from "src/componets/shared/RHF/FormProvider";
import RHFTextField from "src/componets/shared/RHF/RHFTextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addForm, iconClass } from "../customers/edit/[id]";
import { RHFUpload } from "src/componets/shared/RHF/RHFUpload";
// import Image from "src/componets/shared/Image";
import { CustomFile } from "src/componets/shared/upload";
import Image from "next/image";
import { ErrorDispaly } from "../property";

// photos?: CustomFile | string | null;
interface NewLocTypes {
  name: string;
}

// photos: Yup.mixed().required("Photo is required"),
const NewCompanyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});

// photos: "",
const defaultValues = {
  name: "",
};

// give main area a max widht
const Locations = () => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    pageSize: 10,
  });

  const instance = useAxios();
  const [locations, setLocations] = useState<User[] | undefined | null>([]);
  const [pagination, setPagination] = useState<Pagination | undefined | null>(
    null
  );
  const router = useRouter();

  const methods = useForm<NewLocTypes>({
    mode: "onChange",
    resolver: yupResolver(NewCompanyValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    resetField,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  async function getAllLocations() {
    try {
      setLoading(true);

      const res = await instance.get(`/property/location/getAllLocation`);
      if (res.data) {
        setLocations(res?.data?.result);
        setPagination(res?.data?.pagination);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      ErrorDispaly(e);
    }
  }

  useEffect(() => {
    getAllLocations();
  }, []);

  async function onSubmit(data: NewLocTypes) {
    try {
      setDeleteLoading(true);
      // var bodyFormData = new FormData();
      // if (data?.photos instanceof File) {
      //   bodyFormData.append("photos", data.photos);
      // }
      // bodyFormData.append("name", data?.name);
      let res = await instance.post("/admin/location/addNewLocation", data);
      if (res.data) {
        toast.success("Locations added Successfully");
        setDeleteLoading(false);
        setDialogOpen(false);
        getAllLocations();
      }
    } catch (e) {
      setDeleteLoading(false);
      ErrorDispaly(e);
    }
  }


  function closeDialog() {
    reset(defaultValues);
    setDialogOpen(false);
  }

  const all_customer_columns: GridColDef[] = [
    {
      minWidth: 120,

      flex: 0.7,
      field: "name",
      headerName: "Name",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Typography variant="body1" fontWeight={500}>
          {row?.name}
        </Typography>
      ),
    },
    // {
    //   field: "locationImages",
    //   headerName: "Image",
    //   flex: 0.4,
    //   align: "left",
    //   headerAlign: "left",
    //   disableColumnMenu: true,
    //   renderCell: ({ row }) => (
    //     <Box>
    //       {row?.locationImages?.length > 0 ? (
    //         <Image width={200} height={100} src={row?.locationImages[0]} alt="" />
    //       ) : null}
    //     </Box>
    //   ),
    // },
    {
      minWidth: 120,

      field: "action",
      headerName: "ACTION",
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Tooltip title="Edit">
              <IconButton onClick={() => openEdit(row)} color="primary">
                <BsPencilFill />
              </IconButton>
            </Tooltip> */}
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setDeleteId(row?._id);
                setDeleteOpen(true);
              }}
              color="error"
            >
              <MdDeleteForever />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue("photos", newFile, {
  //         shouldValidate: true,
  //         shouldDirty: true,
  //       });
  //     }
  //   },
  //   [setValue]
  // );

  async function deleteLocation() {
    try {
      setDeleteLoading(true);
      const res = await instance.delete("/admin/deleteLocation/" + deleteId);
      if (res.data) {
        toast.success("Location Deleted Successfully");
        setDeleteLoading(false);
        setDeleteOpen(false);
        getAllLocations();
      }
    } catch (err: any) {
      setDeleteLoading(false);
      console.log(err);
      toast.error(
        err.response?.data?.message || "Something went wrong on our side"
      );
    }
  }


  return (
    <div className=" w-full bg-[#F6F6F6] ">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h1 className="text-[#707EAE] text-[10.4px]">Hello Admin</h1>
          <h2 className="text-TitleColor font-bold text-3xl">Locations</h2>
        </div>
        <div className="max-w-[140px] text-sm  w-full">
          <button
            onClick={() => {
              setDialogOpen(true);
              setEdit(false);
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
              rows={locations || []}
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
              // rowCount={pagination?.totalLocations || 0}
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
        title={edit ? "Update Location" : "Add Location"}
        open={dialogOpen}
        closeDialog={closeDialog}
        size="sm"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            placeholder="Name"
            InputProps={{
              startAdornment: <MdTitle className={iconClass} />,
            }}
            sx={addForm}
            name="name"
          />
          <button
            type="submit"
            disabled={deleteLoading}
            className={`${deleteLoading ? "bg-[#2C5FC3]/50 " : "bg-[#2C5FC3]"
              } flex justify-center w-[100%] p-4 rounded-xl text-white text-center  transform transition active:scale-95 duration-200 ease-out mt-4`}
          >
            {deleteLoading ? (
              <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
            ) : edit ? (
              "Update Location"
            ) : (
              "Add Location"
            )}
          </button>
        </FormProvider>
      </Modal>

      <ConfirmBox
        title="Location"
        name="location"
        open={deleteOpen}
        closeDialog={() => setDeleteOpen(false)}
        toDoFunction={deleteLocation}
        loading={deleteLoading}
      />
    </div>
  );
};

Locations.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout Navbar={AdminsideNav}>{page}</DashBoardLayout>;
};

export default Locations;
