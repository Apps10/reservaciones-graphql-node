import {
  PropertyNotFoundException,
  PropertyIsNotYoursException,
} from "../../../src/exceptions/Property.exception";
import { PropertyService } from "../../../src/services/PropertyService";
import { mockPropertyRepository } from "../../repositories/propertyRepository.mock";

describe("PropertyService - delete", () => {
  let service: PropertyService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PropertyService(mockPropertyRepository);
  });

  it("debe eliminar correctamente si el dueño coincide", async () => {
    const property = { id: "1", ownerId: "A" };

    mockPropertyRepository.findById.mockResolvedValue(property);
    mockPropertyRepository.delete.mockResolvedValue(true);

    const res = await service.delete("A", "1");

    expect(mockPropertyRepository.delete).toHaveBeenCalledWith("1");
    expect(res).toBe(true);
  });

  it("debe lanzar error si la propiedad no existe", async () => {
    mockPropertyRepository.findById.mockResolvedValue(null);

    await expect(service.delete("A", "XX")).rejects.toThrow(
      PropertyNotFoundException
    );
  });

  it("debe lanzar error si otro usuario intenta borrar", async () => {
    mockPropertyRepository.findById.mockResolvedValue({
      id: "1",
      ownerId: "REAL_OWNER",
    });

    await expect(service.delete("HACKER", "1")).rejects.toThrow(
      PropertyIsNotYoursException
    );
  });
});
