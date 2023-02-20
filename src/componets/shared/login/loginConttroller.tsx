import { AxiosInstance } from "axios";

export const loginController = async (
  email: string,
  password: string,
  instance: AxiosInstance,
  url: string
): Promise<string | number> => {
  try {
    console.log("hui");
    const res = await instance.post(url, {
      email: email,
      password: password,
    });
    console.log(res.data);
    if (res.status == 200) {
      return res.data.token;
    } else {
      return 0;
    }
  } catch (e: any) {
    if (
      e?.response.request.status == 401 ||
      e?.response?.request?.status == 404
    ) {
      return 401;
    } else {
      return 500;
    }
  }
};
