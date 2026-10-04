import type {Service} from '../../domain/entities/Service';
import type {IServiceRepository} from '../../domain/repositories/IServiceRepository';
import {SERVICES_DATA} from '../../constants';
export class MockServiceRepository implements IServiceRepository {
 async getServices():Promise<Service[]>{return SERVICES_DATA;}
 async getServiceById(id:string):Promise<Service|undefined>{return SERVICES_DATA.find(service=>service.id===id);}
}
