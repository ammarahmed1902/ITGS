import { Service } from '../entities/Service';

export interface IServiceRepository {
  getServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | undefined>;
}
