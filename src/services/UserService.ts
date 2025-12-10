import { User } from "../models/user";
import { PrimitiveUser, SecurePrimitiveUser, UserRepository } from "../interfaces/user";
import { JWTService } from "../utils/jwt.utils";
import { HashPasswordService } from "../utils/hashPassord.utils";
import {
  UserAlreadyExistException,
  UserAuthenticationFailException,
  UserUnauthorizedException,
} from "../exceptions/User.exception";

export class UserService {
  constructor(private readonly userRepository: UserRepository<User>) {}

  async login(email: string, password: string): Promise<{ token: string, user: SecurePrimitiveUser }> {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) throw new UserUnauthorizedException();

    const { password: userHashedPassword } =
      existUser.toJSON() as PrimitiveUser;
    const isCorrectPassword = HashPasswordService.comparePassword(
      password,
      userHashedPassword
    );
    if (!isCorrectPassword) throw new UserUnauthorizedException();

    const token = JWTService.generateToken(existUser.toJSON());
    const safeUser = existUser.toJSON();
    delete safeUser.password;

    return { token, user: safeUser };
  }

  async register(userWithId: PrimitiveUser): Promise<{ token: string, user: SecurePrimitiveUser }> {
    const { id, ...user } = userWithId;
    const existUser = await this.userRepository.findByEmail(user.email);
    if (existUser)
      throw new UserAlreadyExistException(
        `the email: ${user.email} already Exist`
      );

    const hashPassord = HashPasswordService.hashPassword(user.password);
    const newUser = await this.userRepository.save({
      ...user,
      password: hashPassord,
    });

    const token = JWTService.generateToken(newUser.toJSON());
    const safeUser = newUser.toJSON()
    delete safeUser.password;

    return { token, user: safeUser };
  }
  
  async findById(id: string): Promise<User | null> {
    const existUser = await this.userRepository.findById(id);
    return existUser;
  }

    
  async verifyToken(token: string): Promise<SecurePrimitiveUser | null> {
    const existUser = JWTService.verifyToken(token);
    if(!existUser) throw new UserAuthenticationFailException('Token is Invalid')
    return existUser;
  }
}
