import { create } from "zustand";
import { FieldResponse, Field, Slot, BookingStatus } from "../../app/models/booking/index";
import { getSlot } from "../../app/apis/booking";

interface BookingState {
    fields: Field[];
    loading: boolean;
    getSlots: () => void;
    updateSlotStatus: (
        fieldId: number,
        slotId: number,
        status: BookingStatus
    ) => void;
}

export const bookingStore = create<BookingState>((set, get) => ({
    fields: [],
    loading: false,

    getSlots: async () => {
        set({ loading: true });
        try {
            const response = await getSlot();
            console.log(response.data[0].slots[0]);

            set({ fields: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    updateSlotStatus: (fieldId: number, slotId: number, status: BookingStatus) => {
        const { fields } = get();
        const updatedFields = fields.map((field) => {
            if (field.id === fieldId) {
                return {
                    ...field,
                    slots: field.slots.map((slot) =>
                        slot.id === slotId ? { ...slot, is_booked: status } : slot
                    ),
                };
            }
            return field;
        });

        set({ fields: updatedFields });
    },
}));