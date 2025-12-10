import { PrimitiveUser } from "../../../src/interfaces/user";
import { PropertyService } from "../../../src/services/PropertyService";
import { mockPropertyRepository } from "../../repositories/propertyRepository.mock";

describe("PropertyService - save", () => {
  let service: PropertyService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PropertyService(mockPropertyRepository);
  });

  it("debe guardar una propiedad con el owner incluido", async () => {
    const owner: PrimitiveUser = {
      id: "USER_1",
      email: "test@mail.com",
      lastName: "test",
      name: "test",
      password: "password",
      role: "propietario",
    };
    const payload = {
      name: "apartamento en la playa cartagena",
      propertyType: "apartment",
      pricePerNight: 100000,
      maxNumberOfGuests: 2,
    };
    const expectedSaved = { ...payload, ownerId: "USER_1" };

    mockPropertyRepository.save.mockResolvedValue(expectedSaved);

    const result = await service.save(owner, {...payload, propertyType:"apartment"});

    expect(mockPropertyRepository.save).toHaveBeenCalledWith({
      ...payload,
      ownerId: "USER_1",
    });

    expect(result).toEqual(expectedSaved);
  });
});
