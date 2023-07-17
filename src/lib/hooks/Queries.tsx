import axios from "axios";
import { toast } from "react-toastify";
import { Cookie, CookieSetOptions } from 'universal-cookie';

export const checkLoginError = (err: any) => {
  if (err.response?.data?.chkLogin === false) {
    toast.error("Your token has expired, Kindly login again!");
    localStorage.clear();
    // setTimeout(() => {
    window.location.reload();
    // }, 500)
    return true;
  } else {
    toast.error(
      JSON.stringify(err?.response?.data?.message) ||
        "Something went wrong on our side"
    );
  }
};

export const localStorageToken = () => {
  let storedToken;
  if (typeof window !== "undefined") {
    storedToken = localStorage.getItem("accessToken");
  }
  if (storedToken) {
    return storedToken;
  } else {
    return null;
  }
};

export default function cookies<T extends string, U = {
    [K in T]?: any;
}>(dependencies?: T[]): [U, (name: T, value: Cookie, options?: CookieSetOptions) => void, (name: T, options?: CookieSetOptions) => void];



export async function handlePostAPI(url: string, data: any, msg: string) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + url,
      data,
      {
        headers: {
          Authorization: `Bearer ${cookies.jwtToken}`,
        },
      }
    );
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message);
      }

      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}
export async function handlePostAPIWithoutHeader(
  url: string,
  data: any,
  msg: string
) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + url,
      data
    );
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}

export async function handlePutAPIWithoutHeader(
  url: string,
  data: any,
  msg: string
) {
  try {
    const response = await axios.put(
      process.env.REACT_APP_API_ENDPOINT + url,
      data
    );
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}

export async function handlePutAPI(url: string, data: any, msg: string) {
  try {
    const response = await axios.put(
      process.env.REACT_APP_API_ENDPOINT + url,
      data,
      {
        headers: {
          Authorization: `Bearer ${cookies.jwtToken}`,
        },
      }
    );
    if (response.data) {
      if (msg !== null) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}

export async function handleGetAPI(url: string, msg: string) {
  try {
    const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + url, {
      headers: {
        Authorization: `Bearer ${cookies.jwtToken}`,
      },
    });
    if (response.data) {
      if (msg) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}
export async function handleDeleteAPI(url: string, msg: string) {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_ENDPOINT + url,

      {
        headers: {
          Authorization: `Bearer ${cookies.jwtToken}`,
        },
      }
    );
    if (response.data) {
      if (msg) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}

export async function handleGetAPIHeaderLess(url: string, msg: string) {
  try {
    const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + url);
    if (response.data) {
      if (msg) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    checkLoginError(e);
  }
}
