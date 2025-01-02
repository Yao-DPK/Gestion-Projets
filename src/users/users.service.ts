import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//import { RoleService } from 'src/role/role.service';

@Injectable()
export class UsersService {
  constructor(
    /*@Inject(forwardRef(() => RoleService))
    private roleService: RoleService,*/
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  public async create(
    name: string,
    email: string,
    age: number,
    password: string,
  ): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user: User = await this.repository.create({
      name: name,
      email: email,
      age: age,
      password: hashedPassword, // Store the hashed password in the database
    });

    await this.repository.save(user);
    return user;
  }

  async getbyId(id: number): Promise<User> {
    return this.repository.findOne({ where: { id: Equal(id) } });
  }

  async updatebyId(
    id: number,
    name: string,
    email: string,
    age: number,
    password: string,
  ): Promise<User> {
    var user = await this.repository.findOne({ where: { id: Equal(id) } });
    if (name !== undefined) {
      user.name = name;
    }
    if (email !== undefined) {
      user.email = email;
    }
    if (age !== undefined) {
      user.age = age;
    }
    if (password !== undefined) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }
    return await this.repository.save(user);
  }

  async deletebyId(id: number): Promise<DeleteResult> {
    const result = await this.repository.delete(id);
    return result;
  }

  /*async getUserRoles(userId: number): Promise<{ roleName: string }[]> {
    const user = await this.getbyId(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const roles = await this.roleService.getUserRoles(userId);
    return roles.map((role) => ({ roleName: role.name }));
  }*/
}