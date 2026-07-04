import { IServiceRepository } from '../../domain/repositories/IServiceRepository';
import { Service } from '../../domain/entities/Service';

export class ServiceService {
  constructor(private serviceRepository: IServiceRepository) {}

  async getAllServices(): Promise<Service[]> {
    return this.serviceRepository.getServices();
  }

  async getServiceById(id: string): Promise<Service | undefined> {
    return this.serviceRepository.getServiceById(id);
  }
}
