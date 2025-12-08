export const PropertyType = {
  APARTMENT: "apartment",
  HOUSE: "house",
  FARM: "farm"
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export interface PrimitiveProperty {
  id?: string
  name: string
  descripction?: string,
  ownerId: string
  propertyType: PropertyType
  maxNumberOfguests: number
}