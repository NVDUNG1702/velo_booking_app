import { create } from "zustand";
import { getDataStorage, setDataStorage } from "../app/untils/localStorage";
import { MODE_COLOR } from "../app/constans";

interface ModeState {
    isMode: string,
    setIsMode: () => void,
    initializeMode: () => Promise<void>;
};

export const modeThemeStore = create<ModeState>()((set) => (
    {
        isMode: 'light',
        setIsMode: async () => {
            set((state) => {
                const newMode = state.isMode === 'light' ? 'dark' : 'light';
                setDataStorage(MODE_COLOR, newMode);
                return { isMode: newMode };
            });
        },
        initializeMode: async () => {
            const storedMode = await getDataStorage(MODE_COLOR);
            if (storedMode) {
                set({ isMode: storedMode });
            }
        }
    }
))