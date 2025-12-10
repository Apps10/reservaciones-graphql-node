import { UserService } from "../../src/services/UserService";
import { HashPasswordService } from "../../src/utils/hashPassord.utils";
import { JWTService } from "../../src/utils/jwt.utils";
import { PrimitiveUser, UserRepository } from "../../src/interfaces/user";
import {
  UserAlreadyExistException,
  UserAuthenticationFailException,
  UserNotFoundException,
  UserUnauthorizedException,
} from "../../src/exceptions/User.exception";


const mockUserRepository = {
  findByEmail: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
} as jest.Mocked<UserRepository>;

jest.mock("../../src/utils/hashPassord.utils", () => ({
  HashPasswordService: {
    hashPassword: jest.fn().mockReturnValue("hashed123"),
    comparePassword: jest.fn(),
  },
}));

jest.mock("../../src/utils/jwt.utils", () => ({
  JWTService: {
    generateToken: jest.fn().mockReturnValue("token_abc"),
    verifyToken: jest.fn(),
  },
}));


describe("UserService tests", () => {
  let userService: UserService;

  const fakeUser: PrimitiveUser = {
    id: "123",
    name: "Alfonso",
    lastName: "Contreras",
    email: "test@test.com",
    role: "viajero",
    password: "123456",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockUserRepository);
  });

  test("login → should login user correctly", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(fakeUser);
    (HashPasswordService.comparePassword as jest.Mock).mockReturnValue(true);

    const result = await userService.login("test@test.com", "123456");

    expect(result.token).toBe("token_abc");
    expect(result.user.email).toBe("test@test.com");
    expect(HashPasswordService.comparePassword).toHaveBeenCalled();
  });

  test("login → should throw error if user does not exist", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(userService.login("no@no.com", "123"))
      .rejects.toThrow(UserUnauthorizedException);
  });

  test("login → should throw error if password is incorrect", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(fakeUser);
    (HashPasswordService.comparePassword as jest.Mock).mockReturnValue(false);

    await expect(userService.login("test@test.com", "wrong"))
      .rejects.toThrow(UserUnauthorizedException);
  });

  
  test("register → should register a user correctly", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.save.mockResolvedValue({
      ...fakeUser,
      password: "hashed123",
    });

    const result = await userService.register(fakeUser);

    expect(HashPasswordService.hashPassword).toHaveBeenCalled();
    expect(result.token).toBe("token_abc");
    expect(result.user.email).toBe("test@test.com");
  });

  test("register → should fail if email already exists", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(fakeUser);

    await expect(userService.register(fakeUser))
      .rejects.toThrow(UserAlreadyExistException);
  });

  
  test("findById → should return user when exists", async () => {
    mockUserRepository.findById.mockResolvedValue(fakeUser);

    const found = await userService.findById("123");

    expect(found.email).toBe(fakeUser.email);
  });

  test("findById → should throw error when user doesn't exist", async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(userService.findById("999"))
      .rejects.toThrow(UserNotFoundException);
  });

 
  test("verifyToken → should return user if token is valid", async () => {
    (JWTService.verifyToken as jest.Mock).mockReturnValue({
      id: "123",
      email: "test@test.com",
    });

    const user = await userService.verifyToken("valid_token");

    expect(user?.email).toBe("test@test.com");
  });

  test("verifyToken → should throw error on invalid token", async () => {
    (JWTService.verifyToken as jest.Mock).mockReturnValue(null);

    await expect(userService.verifyToken("invalid"))
      .rejects.toThrow(UserAuthenticationFailException);
  });
});
