import {
  PropertyNotFoundException,
  PropertyIsNotYoursException,
} from "../../../src/exceptions/Property.exception";
import { PropertyService } from "../../../src/services/PropertyService";
import { mockPropertyRepository } from "../../repositories/propertyRepository.mock";

describe("PropertyService - update", () => {
  let service: PropertyService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PropertyService(mockPropertyRepository);
  });

  it("debe actualizar si el owner es válido", async () => {
    const property = {
      id: "1",
      ownerId: "USER_A",
      title: "Antigua",
    };

    mockPropertyRepository.findById.mockResolvedValue(property);
    mockPropertyRepository.update.mockResolvedValue(true);

    const payload = { name: "Nueva" };

    const result = await service.update("USER_A", "1", payload);

    expect(mockPropertyRepository.update).toHaveBeenCalledWith("1", payload);
    expect(result).toEqual({ ...property, ...payload });
  });

  it("debe lanzar error si la propiedad no existe", async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    await expect(
      service.update("USER_A", "XX", { name: "Test" })
    ).rejects.toThrow(PropertyNotFoundException);
  });

  it("debe lanzar error si el owner no coincide", async () => {
    mockPropertyRepository.findById.mockResolvedValue({
      id: "1",
      ownerId: "USER_REAL",
    });

    await expect(
      service.update("USER_FAKE", "1", { name: "Hack" })
    ).rejects.toThrow(PropertyIsNotYoursException);
  });
});
