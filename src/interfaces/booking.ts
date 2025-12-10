export const BookingStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
} as const;

export interface PrimitiveBooking {
  id: string;
  propertyId: string;
  visitorId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalPrice: number;
}

export type NewBooking  = Omit<
  PrimitiveBooking,
  "id" | "totalPrice" | "status"
>;

export type UpdateBooking  = Partial<Omit<
  PrimitiveBooking,
  "id" | "totalPrice" | "propertyId"
>>;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface BookingRepository {
  create(Booking : NewBooking): Promise<PrimitiveBooking>;
  update(
    bookingId: string, 
    payload: UpdateBooking
  ): Promise<number>
  findAllBookingsByPropertyId(
    propertyId: string
  ): Promise<PrimitiveBooking[]>
  findById(
    bookingId: string
  ): Promise<PrimitiveBooking | null>
}
