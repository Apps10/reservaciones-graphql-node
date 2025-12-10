export type PrimitiveUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type NewUser = Omit<PrimitiveUser, 'id'>

export type SecurePrimitiveUser = Omit<PrimitiveUser, "password">;
export type PayloadJWT = SecurePrimitiveUser & {
  createdAt: string;
  updatedAt: string;
  exp: number;
  iat: number;
};

export const UserRole = {
  VIAJERO: "viajero",
  PROPIETARIO: "propietario",
} as const;


export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface UserRepository {
  findById(id: string): Promise<PrimitiveUser | null>;
  findByEmail(email: string): Promise<PrimitiveUser | null>;
  findAll(): Promise<PrimitiveUser[]>;
  save(user: NewUser): Promise<PrimitiveUser>;
}
