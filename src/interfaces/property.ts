export const PropertyType = {
  APARTMENT: "apartment",
  HOUSE: "house",
  FARM: "farm",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export interface PrimitiveProperty {
  id?: string;
  name: string;
  descripction?: string;
  ownerId: string;
  pricePerNight: number;
  propertyType: PropertyType;
  maxNumberOfGuests: number;
}

export interface PropertyRepository<T> {
  findById(id: string): Promise<T | null>;
  findAllMyProperties(ownerId: string): Promise<T[]>;
  save(property: PrimitiveProperty): Promise<T>;
  delete(id: string): Promise<number>
  update(propertyId: string, payload: Partial<PrimitiveProperty>): Promise<number>
  // searchAvaliableProperties(
  //   start: string,
  //   end: string,
  //   guest: number
  // ): Promise<T[]>;
}
