import {
  PrimitiveUser,
  SecurePrimitiveUser,
  UserRepository,
} from "../interfaces/user";
import { JWTService } from "../utils/jwt.utils";
import { HashPasswordService } from "../utils/hashPassord.utils";
import {
  UserAlreadyExistException,
  UserAuthenticationFailException,
  UserNotFoundException,
  UserUnauthorizedException,
} from "../exceptions/User.exception";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: SecurePrimitiveUser }> {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) throw new UserUnauthorizedException();

    const { password: userHashedPassword } = existUser as PrimitiveUser;
    const isCorrectPassword = HashPasswordService.comparePassword(
      password,
      userHashedPassword
    );
    if (!isCorrectPassword) throw new UserUnauthorizedException();

    const token = JWTService.generateToken(existUser);
    const { password: _, ...safeUser } = existUser;
    return { token, user: safeUser };
  }

  async register(
    userWithId: PrimitiveUser
  ): Promise<{ token: string; user: SecurePrimitiveUser }> {
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

    const token = JWTService.generateToken(newUser);
    const { password, ...safeUser } = newUser;
    return { token, user: safeUser };
  }

  async findById(id: string): Promise<PrimitiveUser> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) throw new UserNotFoundException();
    return existUser;
  }

  async verifyToken(token: string): Promise<SecurePrimitiveUser | null> {
    const existUser = JWTService.verifyToken(token);
    if (!existUser)
      throw new UserAuthenticationFailException("Token is Invalid");
    return existUser;
  }
}
