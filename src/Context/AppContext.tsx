import Router, { useRouter } from "next/router";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { location } from "src/@types";
import { useAxios } from "src/utills/axios";
interface AppContextProviderInterface {
  user: any | null;
  setUser: Dispatch<SetStateAction<any | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  agentId: string;
  setAgentId: Dispatch<SetStateAction<string>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  resCount: number;
  setResCount: Dispatch<SetStateAction<number>>;
  location: location | null;
  setLocation: Dispatch<SetStateAction<location | null>>;
  redirectId: string | null;
  setRedirectId: Dispatch<SetStateAction<string | null>>;
  searchFilter: string;
  setsearcheFilter: Dispatch<SetStateAction<string>>;
}

interface IContextProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProviderInterface>(
  {} as AppContextProviderInterface
);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: IContextProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [agentId, setAgentId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [resCount, setResCount] = useState<number>(0);
  const [location, setLocation] = useState<location | null>(null);
  const [redirectId, setRedirectId] = useState<string | null>("");
  const [searchFilter, setsearcheFilter] = useState<string>("all");

  const sharedState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    agentId,
    setAgentId,
    showModal,
    setShowModal,
    resCount,
    setResCount,
    location,
    setLocation,
    redirectId,
    setRedirectId,
    searchFilter,
    setsearcheFilter,
  };
  return (
    <>
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  );
};
