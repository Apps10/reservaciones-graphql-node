import bcrypt from "bcrypt";

export class HashPasswordService {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
