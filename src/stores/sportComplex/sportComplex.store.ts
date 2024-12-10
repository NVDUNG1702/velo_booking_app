import { create } from 'zustand';
import { getSportComplex } from '../../app/apis/sportComplex';
import { SportComplexResponse } from '../../app/models/sportComplex';
import { ToastError } from '../../app/untils/ToastMessage/toast';


interface SportComplexStore {
    dataSportComplex: SportComplexResponse | null;
    loading: boolean;
    getListSportComplex: (payload: any) => Promise<void>;
}

export const sportComplexStore = create<SportComplexStore>((set) => ({
    dataSportComplex: null,
    loading: false,
    getListSportComplex: async (payload) => {
        set({ loading: true });
        try {
            const response = (await getSportComplex(payload));
            set({ dataSportComplex: response, loading: false });
        } catch (error) {
            // ToastError('ERROR', 'Vui lòng thử lại sau!')
            set({ loading: false });
        } finally {
            set({ loading: false })
        }
    },
}));