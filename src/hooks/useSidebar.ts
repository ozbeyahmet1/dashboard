import { SelectedSidebar, setSidebar } from "@/store/features/sidebarSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sidebar = useSelector((state: RootState) => state.sidebar.sidebar);

  const setSidebarSelected = useCallback(
    (selected: SelectedSidebar) => {
      dispatch(setSidebar(selected));
    },
    [dispatch],
  );

  useEffect(() => {
    const pathname = router.pathname;

    if (pathname === "/") {
      setSidebarSelected(SelectedSidebar.HOMEPAGE);
    } else if (pathname.includes("/product")) {
      setSidebarSelected(SelectedSidebar.PRODUCT);
    } else if (pathname.includes("/edit")) {
      setSidebarSelected(SelectedSidebar.EDIT);
    }
  }, [router.pathname, setSidebarSelected]);

  return { sidebar, setSidebarSelected };
};

export default useSidebar;
