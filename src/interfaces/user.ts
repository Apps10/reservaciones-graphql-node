export type PrimitiveUser = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
};

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

export interface UserRepository<T> {
  findById(id: string): Promise<T | null>;
  findByEmail(email: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(user: PrimitiveUser): Promise<T>;
}
