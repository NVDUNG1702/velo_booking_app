import { create } from "zustand";

interface storeState {
    isModel: boolean;
    setModel: (value: boolean) => void;
}

export const modelStore = create<storeState>()((set) => (
    {
        isModel: false,
        setModel: (payload) => {
            set({ isModel: payload });
        }
    }
));