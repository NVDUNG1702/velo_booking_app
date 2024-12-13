// Enum cho trạng thái booking
export enum BookingStatus {
  EMPTY = "empty",
  ORDERING = "ordering",
  PLACED = "placed",
  LOCKED = "locked",
}

// Interface cho mỗi khung giờ (slot)
export interface Slot {
  start_time: string; // Thời gian bắt đầu
  end_time: string; // Thời gian kết thúc
  day: string; // Ngày của slot
  is_booked: BookingStatus; // Trạng thái slot
  id: number | null; // ID slot (nếu có)
}

// Interface cho từng sân
export interface Field {
  id: number; // ID sân
  fieldTypeId: number; // ID loại sân
  sportComplexId: number; // ID khu thể thao
  fieldName: string; // Tên sân
  surfaceType: string; // Loại bề mặt sân
  dimensions: string; // Kích thước sân
  lightingSystem: string; // Hệ thống chiếu sáng
  availabilityStatus: string; // Trạng thái hoạt động
  notes: string | null; // Ghi chú (nếu có)
  amount: string; // Giá tiền sân
  slots: Slot[]; // Danh sách khung giờ
}

// Interface cho response trả về từ API
export interface FieldResponse {
  status: number; // Trạng thái HTTP
  message: string; // Thông báo
  data: Field[]; // Danh sách sân
}

export interface SlotOrder extends Slot {
  yard_id: number
}

export interface PayloadCheckingSlot {
  idSportComplex: number;
  order: SlotOrder[];
}