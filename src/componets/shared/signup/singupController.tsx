import { AxiosInstance } from "axios";

export const signupController = async (
  name: string,
  email: string,
  mobileNumber: number,
  password: string,
  instance: AxiosInstance,
  url: string
): Promise<string | number> => {
  try {
    const res = await instance.post(url, {
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      name: name,
      type: "Agent",
    });
    if (res.status == 200) {
      return res.data?.token;
    } else {
      return 409;
    }
  } catch (e) {
    return 500;
  }
};
