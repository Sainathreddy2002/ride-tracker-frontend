import { create } from 'zustand';
import { persist, } from 'zustand/middleware';

interface UserStore {
  id: number | null;
  setId: (id: number) => void;
  name: string | null;
  setName: (name: string) => void;
  email: string | null;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      id: null,
      setId: (id) => set({ id }),
      name: null,
      setName: (name) => set({ name }),
      email: null,
      setEmail: (email) => set({ email }),
    }),
    {
      name: 'user-storage', // Key in localStorage
    }
  )
);
