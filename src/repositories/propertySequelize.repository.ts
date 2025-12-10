import { PrimitiveProperty, PropertyRepository } from "../interfaces/property";
import { Property } from "../models/property";

export class PropertySequelizeRepository implements PropertyRepository
{
  async findAllMyProperties(ownerId: string) {
    const properties = await Property.findAll({ where: { ownerId } });
    return properties.map(p=>p.toJSON())
  }

  async findById(id: string) {
    const property = await Property.findByPk(id);
    if(!property) return null
    return property.toJSON()
  }

  async save(property: PrimitiveProperty) {
    const newProperty = await Property.create({ ...property });
    return newProperty.toJSON()
  }

  async delete(id: string) {
    const rowcount = await Property.destroy({ where: { id } });
    return rowcount
  }

  async update(
    propertyId: string,
    payload: Partial<PrimitiveProperty>
  ) {
    const [affectedCount] = await Property.update(payload, {
        where: {
          id: propertyId,
      },
    });

    return affectedCount
  }

}
