import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

function useAuthStorage() {
  return useContext(AuthStorageContext);
}

export default useAuthStorage;
