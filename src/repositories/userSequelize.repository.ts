import { PrimitiveUser, UserRepository } from "../interfaces/user";
import { User } from "../models/user";

export class UserSequelizeRepository implements UserRepository<User> {
  async findById(id: string) {
    return await User.findByPk(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async findAll() {
    return await User.findAll();
  }

  async save(user: PrimitiveUser) {
    return await User.create(user);
  }
}
