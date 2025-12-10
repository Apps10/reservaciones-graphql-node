import {
  PropertyGenericException,
  PropertyIsNotYoursException,
  PropertyNotFoundException,
} from "../exceptions/Property.exception";
import { PrimitiveProperty, PropertyRepository } from "../interfaces/property";
import { PrimitiveUser } from "../interfaces/user";

type UpdatePropertyDto = Omit<PrimitiveProperty, "ownerId" | "id">;
type SavePropertyDto = UpdatePropertyDto;

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async findById(id: string) {
    const property = await this.propertyRepository.findById(id);
    if (!property) throw new PropertyNotFoundException();
    return property as PrimitiveProperty;
  }

  async findAllMyProperties(ownerId: string) {
    const properties = await this.propertyRepository.findAllMyProperties(
      ownerId
    );
    return properties as PrimitiveProperty[];
  }

  async save(owner: PrimitiveUser, property: SavePropertyDto) {
    const propertyDto = { ...property, ownerId: owner.id } as PrimitiveProperty;
    return await this.propertyRepository.save(propertyDto);
  }

  async delete(ownerId: string, id: string) {
    const property = await this.propertyRepository.findById(id);
    if (!property) throw new PropertyNotFoundException();

    this.verifyIfIsTheOwnerProperty(ownerId, property);
    await this.propertyRepository.delete(id);
    return true;
  }

  async update(
    ownerId: string,
    propertyId: string,
    payload: Partial<UpdatePropertyDto>
  ) {
    const propertyObj = await this.propertyRepository.findById(propertyId);
    if (!propertyObj) throw new PropertyNotFoundException();
    const property = propertyObj as PrimitiveProperty;

    this.verifyIfIsTheOwnerProperty(ownerId, property);
    await this.propertyRepository.update(propertyId, payload);
    return {
      ...property,
      ...payload,
    };
  }

  verifyIfIsTheOwnerProperty(ownerId: string, property: PrimitiveProperty) {
    if (property.ownerId !== ownerId) throw new PropertyIsNotYoursException();
  }

  verifyMaxNumberOfGuest(bookingQtyGuest: number, property: PrimitiveProperty) {
    if (bookingQtyGuest > property.maxNumberOfGuests)
      throw new PropertyGenericException(
        "The maximum number of guests has been exceeded."
      );
  }
}
