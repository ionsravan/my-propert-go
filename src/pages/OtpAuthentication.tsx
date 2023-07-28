import { useState } from 'react';
import { useRouter } from "next/router";
import { useAxios } from "src/utills/axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const OtpAuthentication = () => {
    const router = useRouter();
    const instance = useAxios();
    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
    });
    const [showLogin, setShowLogin] = useState(true);
    const [showVerify, setShowVerify] = useState(false);
    const [showLoginVerify, setShowLoginVerify] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [loginValue, setLoginValue] = useState('');
    const [loginOtp, setLoginOtp] = useState('');
    const [cookies, setCookies] = useCookies(["jwtToken"]);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleRegisterClick = () => {
        setShowLogin(false);
    };


    // For Login
    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(loginValue, "login value");
        try {
            // setLoading(true);
            const mobileNo = {
                mobileNumber: loginValue,
            };
            const res = await instance.post("/user/otpLogin", mobileNo);
            if (res.data) {
                toast.success("Otp send Successfully");
                setShowLoginVerify(true)
                //   setLoading(false);
            }
        } catch (e) {
            // setLoading(false);
            console.log(e);
        }


    };
    const handleOtpLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(loginValue, "login value");

        try {
            // setLoading(true);
            const data = {
                mobileNumber: loginValue,
                otp: loginOtp,
            };
            const res = await instance.post("/user/verifyLoginOTP", data);
            if (res.data) {
                console.log(res.data, "redd")
                setCookies("jwtToken", res.data.token);
                toast.success("Otp fetch Successfully");

                router.push("/")
                //   setLoading(false);
            }
        } catch (e) {
            // setLoading(false);
            console.log(e);
        }


    };


    // For Registraiotn

    const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(registerFormData, "register");

    };

    const handleRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // setLoading(true);
            const mobileNo = {
                mobileNumber: registerFormData.mobileNumber,
            };
            const res = await instance.post("/user/otpSignup", mobileNo);
            if (res.data) {
                toast.success("Otp send Successfully");
                setShowVerify(true);
                //   setLoading(false);
            }
        } catch (error) {
            // setLoading(false);
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.message || "User Already Registered, Try Login ";
                toast.error(errorMessage);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }

    };

    //   For Otp Verification
    const handleOtpSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('OTP verified:', otpValue);
        try {
            // setLoading(true);
            const data = {
                name: registerFormData.name,
                email: registerFormData.email,
                mobileNumber: registerFormData.mobileNumber,
                otp: otpValue,
            };
            const res = await instance.post("/user/verifySignupOTP", data);
            if (res.data) {
                setCookies("jwtToken", res.data.token);
                toast.success("Otp fetch Successfully");
                router.push("/")
                //   setLoading(false);
            }
        } catch (e) {
            // setLoading(false);
            console.log(e);
        }
        setRegisterFormData({
            name: '',
            email: '',
            password: '',
            mobileNumber: '',
        });
        // setShowLogin(true);

    };

    return <>

        {showLogin ? !showLoginVerify ? (

            <div className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                {/* <div className='flex space-x-4 justify-center mb-2'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleLoginClick}>Login</button>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleRegisterClick}>Register</button>
                    </div> */}

                {/* <h1 className="text-2xl font-bold mb-6">Login</h1> */}

                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-8 px-14 mt-8">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="otp">
                            Enter your mobile number to get started.
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="otp"
                            name="otp"
                            value={loginValue}
                            onChange={(e) => setLoginValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className=" px-14 flex items-center justify-center">
                        <button
                            className=" w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className='px-14 flex justify-center mt-6'>
                        <p>If not registered click <span onClick={handleRegisterClick} style={{ color: "blue", fontSize: "20px", fontWeight: "bold", marginLeft: "7px" }}>Sign Up</span></p>
                    </div>
                </form>

            </div>

        ) : (
            
            <div className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <h1 className="text-2xl font-bold mb-6">Login</h1>

                    <form onSubmit={handleOtpLoginSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                                Enter Otp
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="otp"
                                name="otp"
                                value={loginOtp}
                                onChange={(e) => setLoginOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Verify Login
                            </button>
                        </div>
                    </form>

              
            </div>
        ) : !showVerify ? (
            <div>
                <div className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md"> */}
                    {/* <div className='flex space-x-4 justify-center mb-2'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleLoginClick}>Login</button>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline' style={{ display: "block" }} onClick={handleRegisterClick}>Register</button>
                        </div> */}
                    <h1 className="text-2xl font-bold mb-6">Register</h1>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="name"
                                name="name"
                                value={registerFormData.name}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                id="email"
                                name="email"
                                value={registerFormData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                id="password"
                                name="password"
                                value={registerFormData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                                Mobile Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={registerFormData.mobileNumber}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register
                            </button>
                            <button
                                className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleLoginClick}
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            // </div>
        ) : (
            <div className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <h1 className="text-2xl font-bold mb-6">Verify Mobile No.</h1>
                    <form onSubmit={handleOtpSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                                Enter OTP
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="otp"
                                name="otp"
                                value={otpValue}
                                onChange={(e) => setOtpValue(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Verify
                            </button>
                        </div>
                    </form>
                </div>

        )}

    </>
};

export default OtpAuthentication;
