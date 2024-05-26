'use client'
import { useEffect } from "react";
import { useUserStore } from "@/store/useStore";

const PageRefresher: React.FC = () => {
  const refreshDataFlag = useUserStore((state) => state.refreshDataFlag);
  const resetRefreshFlag = useUserStore((state) => state.resetRefreshFlag);

  useEffect(() => {
    if (refreshDataFlag) {
      window.location.reload();
      resetRefreshFlag(); 
    }
  }, [refreshDataFlag, resetRefreshFlag]);

  return null;
};

export default PageRefresher;
