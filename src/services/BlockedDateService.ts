import { BlockedDatesNotFoundException } from "../exceptions/BlockedDates.exception";
import { BlockedDateRepository, GetAllBlockedDatesResult, PrimitiveBlockedDate } from "../interfaces/blockedDate";
import { PrimitiveProperty } from "../interfaces/property";
import { PropertyService } from "./PropertyService";

export class BlockedDateService {
  constructor(
    private readonly blockedDateRepository: BlockedDateRepository,
    private readonly propertyService: PropertyService
  ) {}

  async create(ownerId: string, obj: PrimitiveBlockedDate){
    const { id: propertyId, ...rest } = obj

    const property = await this.propertyService.findById(rest.propertyId) 
    this.propertyService.verifyIfIsTheOwnerProperty(ownerId, property)

    return await this.blockedDateRepository.create(rest)
  }

  async getAllBlockedDates(ownerId: string): Promise<GetAllBlockedDatesResult[]>{
    const propertiesCache: Record<string, PrimitiveProperty> = {}
    const result: GetAllBlockedDatesResult[] = [];

    const blockedDates = await this.blockedDateRepository.getAllBlockedDates(ownerId)
    if(!blockedDates) throw new BlockedDatesNotFoundException()
    
    blockedDates.forEach(async (b)=> {
      const {propertyId, ...restBlockedDate} = b
      if(!propertiesCache[propertyId]){
        const property = await this.propertyService.findById(propertyId)
        propertiesCache[propertyId] = property
      }
      propertiesCache[propertyId]
      result.push({
        ...restBlockedDate,
        property: propertiesCache[propertyId]
      })
    })

    return result
  }
}