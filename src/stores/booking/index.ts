import { create } from "zustand";
import { FieldResponse, Field, Slot, BookingStatus, PayloadCheckingSlot, SlotOrder } from "../../app/models/booking/index";
import { getSlot, payloadGetSlot } from "../../app/apis/booking";
import Toast from "react-native-toast-message";
import { ToastError, ToastSuccess } from "../../app/untils/ToastMessage/toast";

type payloadUpdateDataBooking = {
    slot: SlotOrder;
    idSportComplex: number;
}

interface BookingState {
    fields: Field[];
    loading: boolean;
    getSlots: (payload: payloadGetSlot) => void;
    dataBooking?: PayloadCheckingSlot;
    updateDataBooKing: (payload: payloadUpdateDataBooking) => void;
    resetDataBooking: () => void;
}

export const bookingStore = create<BookingState>((set, get) => ({
    fields: [],
    loading: false,
    dataBooking: undefined,

    getSlots: async (payload) => {
        set({ loading: true });
        try {
            const response = await getSlot(payload);
            // console.log(response.data[0].slots[0]);

            set({ fields: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
    updateDataBooKing: (payload: payloadUpdateDataBooking) => {
        try {
            set({ loading: true });
            const { dataBooking } = get() || { dataBooking: null };
            const { idSportComplex, slot } = payload;

            if (dataBooking?.idSportComplex === idSportComplex) {
                const isInOrder = dataBooking.order.some(
                    ({ yard_id, start_time, end_time, day }) =>
                        yard_id === slot.yard_id &&
                        start_time === slot.start_time &&
                        end_time === slot.end_time &&
                        day === slot.day
                );

                set({
                    dataBooking: {
                        ...dataBooking,
                        order: isInOrder
                            ? dataBooking.order.filter(
                                ({ yard_id, start_time, end_time, day }) =>
                                    !(
                                        yard_id === slot.yard_id &&
                                        start_time === slot.start_time &&
                                        end_time === slot.end_time &&
                                        day === slot.day
                                    )
                            )
                            : [...dataBooking.order, slot],
                    },
                });

                // ToastSuccess('Thành công', isInOrder ? 'Đã xoá slot khỏi danh sách đặt.' : 'Đã thêm slot vào danh sách đặt.');
            } else {
                set({
                    dataBooking: {
                        idSportComplex,
                        order: [slot],
                    },
                });

                // ToastSuccess('Thành công', 'Đã tạo danh sách mới và thêm slot.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu đặt:', error);
            // ToastError('Lỗi khi thêm hoặc xoá slot', error.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            set({ loading: false });
        }
    },
    resetDataBooking: () => {
        set({ dataBooking: undefined })
    }

}));