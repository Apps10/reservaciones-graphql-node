import { BlockedDateRepository, PrimitiveBlockedDate } from "../interfaces/blockedDate";
import { BlockedDate } from "../models/blockedDate";

export class BlockedDateSequelizeRepository implements BlockedDateRepository {
  async create(blockedDate: PrimitiveBlockedDate): Promise<PrimitiveBlockedDate> {
    return (await BlockedDate.create({...blockedDate})).toJSON()
  }

  async getAllBlockedDates(ownerId: string): Promise<PrimitiveBlockedDate[]> {
    const blockedDates = await BlockedDate.findAll({where: {ownerId}}) 
    return blockedDates.map(p=>p.toJSON()) 
  }
}