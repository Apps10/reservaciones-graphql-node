export type PrimitiveUser = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  // role: UserRole;
};

export type SecurePrimitiveUser = Omit<PrimitiveUser, 'password'>

export const UserRole = {
  TRAVELER: "traveler",
  OWNER: "owner",
} as const;

// export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface UserRepository<T> {
  findById(id:string): Promise<T | null>
  findByEmail(email:string): Promise<T | null>
  findAll(): Promise<T[]>
  save(user:PrimitiveUser): Promise<T>
}
