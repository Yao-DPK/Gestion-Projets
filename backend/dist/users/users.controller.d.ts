import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserInput } from './users.input';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getAllusers(): Promise<User[]>;
    getbyId(id: string): Promise<User>;
    create(input: UserInput): Promise<User>;
    updatebyId(id: string, input: UserInput): Promise<User>;
    deletebyId(id: string): Promise<import("typeorm").DeleteResult>;
}
