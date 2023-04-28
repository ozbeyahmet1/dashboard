import { fetchData } from "@/store/features/configurationSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

const useConfiguration = () => {
  const { data } = useAppSelector((state) => state.configuration);
  const configurationDispatch = useAppDispatch();

  useEffect(() => {
    void configurationDispatch(fetchData());
  }, [configurationDispatch]);

  return { data };
};

export default useConfiguration;
