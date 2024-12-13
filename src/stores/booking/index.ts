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
    dataBoking?: PayloadCheckingSlot;
    updateDataBooKing: (payload: payloadUpdateDataBooking) => void
}

export const bookingStore = create<BookingState>((set, get) => ({
    fields: [],
    loading: false,
    dataBoking: undefined,

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
            set({ loading: true }); // Bật trạng thái loading
            const { dataBoking } = get(); // Lấy trạng thái hiện tại
            const { idSportComplex, slot } = payload;

            // Kiểm tra nếu có dữ liệu đặt hiện tại và idSportComplex khớp
            if (dataBoking?.idSportComplex === idSportComplex) {
                const isInOrder = dataBoking.order.some(
                    ({ yard_id, start_time, end_time }) =>
                        yard_id === slot.yard_id &&
                        start_time === slot.start_time &&
                        end_time === slot.end_time
                );

                set({
                    dataBoking: {
                        ...dataBoking,
                        order: isInOrder
                            ? dataBoking.order.filter(
                                ({ yard_id, start_time, end_time }) =>
                                    yard_id !== slot.yard_id ||
                                    start_time !== slot.start_time ||
                                    end_time !== slot.end_time
                            )
                            : [...dataBoking.order, slot],
                    },
                });

                // ToastSuccess(
                //     'Thành công',
                //     isInOrder ? 'Đã xoá slot khỏi danh sách đặt.' : 'Đã thêm slot vào danh sách đặt.'
                // );
            } else {
                // Tạo danh sách mới nếu idSportComplex không khớp hoặc không có dữ liệu
                set({
                    dataBoking: {
                        idSportComplex,
                        order: [slot],
                    },
                });
                // ToastSuccess('Thành công', 'Đã tạo danh sách mới và thêm slot.');
            }
        } catch (error) {
            console.error(error); // Ghi lại lỗi để debug
            // ToastError('Lỗi khi thêm hoặc xoá slot', 'Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            set({ loading: false }); // Tắt trạng thái loading
        }
    },
    
}));