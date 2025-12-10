import { PropertyNotFoundException } from "../exceptions/Property.exception";
import { PrimitiveProperty, PropertyRepository } from "../interfaces/property";
import { Property } from "../models/property";

export class PropertySequelizeRepository implements PropertyRepository<Property>
{
  async findAllMyProperties(ownerId: string): Promise<Property[]> {
    return await Property.findAll({ where: { ownerId } });
  }

  async findById(id: string): Promise<Property | null> {
    return await Property.findByPk(id);
  }

  async save(property: PrimitiveProperty): Promise<Property> {
    return await Property.create({ ...property });
  }

  async delete(id: string): Promise<number> {
    const rowcount = await Property.destroy({ where: { id } });
    if(rowcount===0) throw new PropertyNotFoundException()
    return rowcount
  }

  async update(
    propertyId: string,
    payload: Partial<PrimitiveProperty>
  ): Promise<number> {
    const [affectedCount] = await Property.update(payload, {
        where: {
          id: propertyId,
      },
    });

    if(affectedCount==0) throw new PropertyNotFoundException()
    return affectedCount
  }

  // async searchAvaliableProperties(start: string, end: string, guest: number): Promise<Property[]> {
  //   const
  //   return await Property.create({ ...property})

  // }
}
