import { AssociationsService } from './associations.service';
import { AssociationDTO } from './entities/associations.dto';
import { AssociationInput } from './associations.input';
import { Association } from './entities/association.entity';
import { Member } from './associations.member';
export declare class AssociationsController {
    private service;
    constructor(service: AssociationsService);
    getAllassociations(): Promise<AssociationDTO[]>;
    getbyId(id: string): Promise<AssociationDTO>;
    create(input: AssociationInput): Promise<Association>;
    updatebyId(id: string, input: any): Promise<Association>;
    deletebyId(id: string): Promise<void>;
    getMembers(id: string): Promise<Member[]>;
}
