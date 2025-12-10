export const PropertyType = {
  APARTMENT: "apartment",
  HOUSE: "house",
  FARM: "farm",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export interface PrimitiveProperty {
  id: string;
  name: string;
  descripction?: string;
  ownerId: string;
  pricePerNight: number;
  propertyType: PropertyType;
  maxNumberOfGuests: number;
}

export interface PropertyRepository {
  findById(id: string): Promise<PrimitiveProperty | null>;
  findAllMyProperties(ownerId: string): Promise<PrimitiveProperty[]>;
  save(property: PrimitiveProperty): Promise<PrimitiveProperty>;
  delete(id: string): Promise<number>
  update(propertyId: string, payload: Partial<PrimitiveProperty>): Promise<number>
}
