import { User } from './users.entity';
import { DeleteResult, Repository } from 'typeorm';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<User>);
    getAll(): Promise<User[]>;
    create(name: string, email: string, age: number, password: string): Promise<User>;
    getbyId(id: number): Promise<User>;
    getbyEmail(email: string): Promise<User>;
    updatebyId(id: number, name: string, email: string, age: number, password: string): Promise<User>;
    deletebyId(id: number): Promise<DeleteResult>;
}
