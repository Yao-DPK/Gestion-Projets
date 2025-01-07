import { Repository } from 'typeorm';
import { Association } from './entities/association.entity';
import { UsersService } from '../users/users.service';
import { AssociationDTO } from './entities/associations.dto';
import { Member } from './associations.member';
import { User } from '../users/users.entity';
export declare class AssociationsService {
    private repository;
    private userService;
    constructor(repository: Repository<Association>, userService: UsersService);
    getAll(): Promise<AssociationDTO[]>;
    create(name: string, idUsers: number[]): Promise<Association>;
    getById(id: number): Promise<AssociationDTO>;
    updatebyID(id: number, users: User[], name: string): Promise<Association>;
    deletebyID(id: number): Promise<void>;
    getmembers(id: number): Promise<Member[]>;
}
