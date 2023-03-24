import { useEffect, useRef, useReducer } from "react";
import { useAxios } from "src/utills/axios";

export enum FetchState {
  FETCHING = "FETCHING",
  FETCHED = "FETCHED",
  FETCH_ERROR = "FETCH_ERROR",
}

type Action = {
  type: FetchState;
  payload?: any;
};

type RequestState<Type> = {
  status: string;
  error: null | Error;
  data?: Type | null;
};

function reducer<Type>(
  state: RequestState<Type>,
  action: Action
): RequestState<Type> {
  switch (action.type) {
    case FetchState.FETCHING:
      return { ...state, status: FetchState.FETCHING };
    case "FETCHED":
      return { ...state, status: FetchState.FETCHED, data: action.payload };
    case "FETCH_ERROR":
      return {
        ...state,
        status: FetchState.FETCH_ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function useFetch<Type>(url: string): RequestState<Type> {
  const cache = useRef<any>({});
  const instance = useAxios();
  const initialState: RequestState<Type> = {
    status: "idle",
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer<
    React.Reducer<RequestState<Type>, Action>
  >(reducer, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url || !url.trim()) return;

    const fetchData = async () => {
      dispatch({ type: FetchState.FETCHING });
      try {
        const response = await instance.get(url);
        cache.current[url] = response.data;
        if (cancelRequest) return;
        dispatch({ type: FetchState.FETCHED, payload: response.data });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({
          type: FetchState.FETCH_ERROR,
          payload: (error as Error).message,
        });
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
}
