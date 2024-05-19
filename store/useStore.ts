import create from 'zustand';

interface UserState {
  isRegistered: boolean | null;
  isAdmin: boolean;
  userType: string | null;
  setIsRegistered: (isRegistered: boolean | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setUserType: (userType: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isRegistered: null,
  isAdmin: false,
  userType: null,
  setIsRegistered: (isRegistered) => set({ isRegistered }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setUserType: (userType) => set({ userType }),
}));
