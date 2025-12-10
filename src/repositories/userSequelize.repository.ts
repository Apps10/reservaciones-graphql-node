import { PrimitiveUser, UserRepository } from "../interfaces/user";
import { User } from "../models/user";

export class UserSequelizeRepository implements UserRepository {
  async findById(id: string) {
    const user = await User.findByPk(id)
    return user?.toJSON();
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user?.toJSON()
  }

  async findAll() {
    const users = await User.findAll()
    return users.map(u=>u.toJSON() as PrimitiveUser)
  }

  async save(user: PrimitiveUser) {
    const newUser = await User.create(user)
    return newUser.toJSON();
  }
}
