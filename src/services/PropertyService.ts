import {
  PropertyGenericException,
  PropertyIsNotYoursException,
  PropertyNotFoundException,
} from "../exceptions/Property.exception";
import { PrimitiveProperty, PropertyRepository } from "../interfaces/property";
import { PrimitiveUser } from "../interfaces/user";
import { Property } from "../models/property";

type UpdatePropertyDto = Omit<PrimitiveProperty, "ownerId" | "id">;
type SavePropertyDto = Omit<PrimitiveProperty, "ownerId">;

export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository<Property>
  ) {}

  async findById(id: string) {
    return await this.propertyRepository.findById(id);
  }

  async findAllMyProperties(ownerId: string) {
    return await this.propertyRepository.findAllMyProperties(ownerId);
  }

  async save(owner: PrimitiveUser, property: SavePropertyDto) {
    const propertyDto = { ...property, ownerId: owner.id } as PrimitiveProperty;
    return await this.propertyRepository.save(propertyDto);
  }

  async delete(ownerId: string, id: string) {
    const propertyObj = await this.propertyRepository.findById(id);
    if (!propertyObj) throw new PropertyNotFoundException();
    const property = propertyObj.toJSON() as PrimitiveProperty;

    if (property.ownerId !== ownerId) throw new PropertyIsNotYoursException();
    return await this.propertyRepository.delete(id);
  }

  async update(
    ownerId: string,
    propertyId: string,
    payload: Partial<UpdatePropertyDto>
  ) {
    const propertyObj = await this.propertyRepository.findById(propertyId);
    if (!propertyObj) throw new PropertyNotFoundException();
    const property = propertyObj.toJSON() as PrimitiveProperty;

    if (property.ownerId !== ownerId) throw new PropertyIsNotYoursException();
    await this.propertyRepository.update(propertyId, payload);
    return {
      ...property,
      ...payload
    }
  }
}
