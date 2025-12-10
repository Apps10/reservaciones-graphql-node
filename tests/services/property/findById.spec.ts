import { PropertyNotFoundException } from "../../../src/exceptions/Property.exception";
import { PropertyService } from "../../../src/services/PropertyService";
import { mockPropertyRepository } from "../../repositories/propertyRepository.mock";

describe("PropertyService - findById", () => {
  let service: PropertyService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PropertyService(mockPropertyRepository);
  });

  it("debe retornar la propiedad si existe", async () => {
    const property = { id: "1", ownerId: "11", name: "Casa" };

    mockPropertyRepository.findById.mockResolvedValue(property);

    const result = await service.findById("1");

    expect(mockPropertyRepository.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(property);
  });

  it("debe lanzar PropertyNotFoundException si no existe", async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    await expect(service.findById("X")).rejects.toThrow(
      PropertyNotFoundException
    );
  });
});
