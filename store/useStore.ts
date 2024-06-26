import { ListedShareDetail, ShareDetail } from "@/types/artwork"
import { create } from "zustand"

interface UserState {
  isRegistered: boolean | null
  isAdmin: boolean
  userType: string | null
  listening: boolean
  refreshDataFlag: boolean
  initialShares: ShareDetail[]
  listedShares: ListedShareDetail[]
  setIsRegistered: (isRegistered: boolean | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setUserType: (userType: string | null) => void
  setListening: (listening: boolean) => void
  triggerRefresh: () => void
  resetRefreshFlag: () => void
  setInitialShares: (initialShares: ShareDetail[]) => void
  setListedShares: (listedShares: ListedShareDetail[]) => void
}

export const useUserStore = create<UserState>((set) => ({
  isRegistered: null,
  isAdmin: false,
  userType: null,
  listening: false,
  refreshDataFlag: false,
  initialShares: [],
  listedShares: [],
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setUserType: (userType) => set({ userType }),
  setListening: (listening) => set({ listening }),
  triggerRefresh: () =>
    set((state) => ({ refreshDataFlag: !state.refreshDataFlag })),
  resetRefreshFlag: () => set({ refreshDataFlag: false }),
  setInitialShares: (initialShares) => set({ initialShares }),
  setListedShares: (listedShares) => set({ listedShares }),
}))
