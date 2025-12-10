import { BlockedDateIsNotAvailableException, BlockedDatesNotFoundException } from "../exceptions/BlockedDates.exception";
import {
  BlockedDateRepository,
  GetAllBlockedDatesResult,
  PrimitiveBlockedDate,
} from "../interfaces/blockedDate";
import { PrimitiveProperty } from "../interfaces/property";
import { BookingService } from "./BookingService";
import { PropertyService } from "./PropertyService";

export class BlockedDateService {
  constructor(
    private readonly blockedDateRepository: BlockedDateRepository,
    private readonly propertyService: PropertyService,
    private bookingService: BookingService
  ) {}
  
  setBookingService(service: BookingService) {
    this.bookingService = service;
  }

  async create(ownerId: string, obj: PrimitiveBlockedDate) {
    const { propertyId, ...rest } = obj;

    const property = await this.propertyService.findById(propertyId);
    this.propertyService.verifyIfIsTheOwnerProperty(ownerId, property);
    
    const existBooking = await this.bookingService.findBookingConfirmBetweenDate(propertyId, rest.dateBlocked, rest.dateBlocked)
    if(existBooking.length !==0) throw new BlockedDateIsNotAvailableException()

    return await this.blockedDateRepository.create({ ...rest, ownerId, propertyId });
  }

  async getAllBlockedDates(
    ownerId: string
  ): Promise<GetAllBlockedDatesResult[]> {
    const propertiesCache: Record<string, PrimitiveProperty> = {};
    const result: GetAllBlockedDatesResult[] = [];

    const blockedDates = await this.blockedDateRepository.getAllBlockedDates(
      ownerId
    );
    if (!blockedDates) throw new BlockedDatesNotFoundException();

    for (let i = 0; i < blockedDates.length; i++) {
      const { propertyId, ...restBlockedDate } = blockedDates[i];
      if (!propertiesCache[propertyId]) {
        const property = await this.propertyService.findById(propertyId);
        propertiesCache[propertyId] = property;
      }
      result.push({
        ...restBlockedDate,
        property: propertiesCache[propertyId],
      });
    }

    return result;
  }

  async findBlockedDatesBetweenDates(
    propertyId: string,
    startDate: string,
    endDate: string
  ) {
    return this.blockedDateRepository.findBlockedDatesBetweenDates(propertyId, startDate, endDate)
  }
}
