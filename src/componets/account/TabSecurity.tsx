// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { BiSave } from 'react-icons/bi'
import { CircularProgress } from '@mui/material'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import RHFTextField from '../shared/RHF/RHFTextField'
import { AiOutlineLock } from 'react-icons/ai'
import { addForm, iconClass } from 'src/pages/admin/customers/edit/[id]'
import FormProvider from '../shared/RHF/FormProvider'
import { useRouter } from 'next/router'
import { useAxios } from 'src/utills/axios'
import { useCookies } from 'react-cookie'
import { ErrorDispaly } from 'src/pages/admin/property'

interface State {
    showNewPassword: boolean
    showCurrentPassword: boolean
    showConfirmNewPassword: boolean
}

const defaultValues = {
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: ''
}

const schema = yup.object().shape({
    currentPassword: yup.string().min(8).required("Current Passwords is required"),
    newPassword: yup
        .string()
        .min(8)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
        )
        .required('Passwords is required'),
    confirmNewPassword: yup
        .string()
        .required('Confirm Passwords is required')
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

const TabSecurity = () => {
    // ** States
    const [values, setValues] = useState<State>({
        showNewPassword: false,
        showCurrentPassword: false,
        showConfirmNewPassword: false
    })
    const [removeCookie] = useCookies(["jwtToken"]);

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();
    const instance = useAxios();

    // ** Hooks

    const methods = useForm({ defaultValues, resolver: yupResolver(schema) })

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = methods

    const handleClickShowCurrentPassword = () => {
        setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
    }

    const handleClickShowNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword })
    }

    const handleClickShowConfirmNewPassword = () => {
        setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
    }

    const handleLogout = () => {
        toast("Logout Succesfully", {
            position: "bottom-center",
            type: "success",
        });
        setTimeout(() => {
            removeCookie("jwtToken");
            router.push("/")
        }, 1000);

    }

    const onPasswordFormSubmit = async (values: any) => {
        try {
            let data = {
                oldPassword: values.currentPassword,
                newPassword: values.newPassword
            }
            setLoading(true);
            const res = await instance.post("/admin/changePassword", data);
            if (res.data) {
                toast.success('Password Changed Successfully')
                setLoading(false);
                handleLogout()
                reset(defaultValues)
            }
        } catch (e) {
            setLoading(false);
            ErrorDispaly(e);
        }
    }

    return (
        <Card>
            <CardHeader title='Change Password' />
            <CardContent>
                <FormProvider methods={methods} onSubmit={handleSubmit(onPasswordFormSubmit)}>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={3} sx={{ mt: 0 }}>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>


                                        <RHFTextField
                                            name="currentPassword"
                                            type={values.showCurrentPassword ? "text" : "password"}
                                            sx={addForm}
                                            placeholder="Current Password"
                                            InputProps={{
                                                startAdornment: <AiOutlineLock className={iconClass} />,
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            edge='end'
                                                            onClick={handleClickShowCurrentPassword}
                                                            onMouseDown={e => e.preventDefault()}
                                                        >
                                                            {values.showCurrentPassword ? <BsEyeSlash /> : <BsEyeFill />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl fullWidth>

                                        <RHFTextField
                                            name="newPassword"
                                            type={values.showNewPassword ? "text" : "password"}
                                            sx={addForm}
                                            placeholder="New Password"
                                            InputProps={{
                                                startAdornment: <AiOutlineLock className={iconClass} />,
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            edge='end'
                                                            onClick={handleClickShowNewPassword}
                                                            onMouseDown={e => e.preventDefault()}
                                                        >
                                                            {values.showNewPassword ? <BsEyeSlash /> : <BsEyeFill />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>

                                        <RHFTextField
                                            name="confirmNewPassword"
                                            type={values.showConfirmNewPassword ? "text" : "password"}
                                            sx={addForm}
                                            placeholder="Confirm New Password"
                                            InputProps={{
                                                startAdornment: <AiOutlineLock className={iconClass} />,
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            edge='end'
                                                            onClick={handleClickShowConfirmNewPassword}
                                                            onMouseDown={e => e.preventDefault()}
                                                        >
                                                            {values.showConfirmNewPassword ? <BsEyeSlash /> : <BsEyeFill />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />


                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={3} sx={{ mt: 0 }}>

                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Password Requirements:</Typography>
                                    <Box component='ul' sx={{ mb: 0, '& li': { mb: 1, color: 'text.secondary' } }}>
                                        <li>Minimum 8 characters long - the more, the better</li>
                                        <li>At least one lowercase & one uppercase character</li>
                                        <li>At least one number, symbol, or whitespace character</li>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} >

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${loading ? "bg-[#0066FF]/50 " : "bg-[#0066FF]"
                                    } flex justify-center w-[100%] p-4 rounded-xl text-white text-center  transform transition active:scale-95 duration-200 ease-out mt-4`}
                            >
                                {loading ? (
                                    <CircularProgress size={25} sx={{ mr: 2 }} color="inherit" />
                                ) : 'Save'}
                            </button>
                        </Grid>
                    </Grid>
                </FormProvider>            </CardContent>
        </Card>
    )
}

export default TabSecurity
