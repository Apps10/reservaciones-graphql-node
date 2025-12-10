import { Op } from "sequelize";
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

  async findBlockedDatesBetweenDates(propertyId: string, startDate: string, endDate: string): Promise<PrimitiveBlockedDate[]> {
    const blockedDates = await BlockedDate.findAll({
      where: {
        propertyId,
        dateBlocked: {
        [Op.between]: [startDate, endDate]
      }
      }
    }); 
    return blockedDates.map(b=>b.toJSON())
  }
}