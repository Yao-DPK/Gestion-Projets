import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Put, Delete, UseGuards } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserInput } from './users.input';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '../auth/auth.guard';

//import { RoleService } from 'src/role/role.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService/*, private rolesService: RoleService*/) {}

  //@UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Retrieve a list of all users.' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved users.', type: User, isArray: true })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAllusers(): Promise<User[]> {
    try {
      return await this.service.getAll();
    } catch (error) {
      throw new HttpException('Error while fetching users.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', description: 'Retrieve a user by their ID.' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the user.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getbyId(@Param('id') id: string) {
    try {
      const user = await this.service.getbyId(Number(id));
      if (!user) {
        throw new HttpException(`User with ID ${id} not found.`, HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(`Error while fetching user with ID ${id}.`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create a new user.' })
  @ApiResponse({ status: 201, description: 'Successfully created the user.', type: User })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() input: UserInput) {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      return await this.service.create(input.name, input.email, input.age, hashedPassword);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Error while creating the user.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID', description: 'Update a user by their ID.' })
  @ApiResponse({ status: 200, description: 'Successfully updated the user.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updatebyId(@Param('id') id: string, @Body() input: UserInput) {
    try {
      const hashedPassword = input.password ? await bcrypt.hash(input.password, 10) : undefined;
      return await this.service.updatebyId(+id, input.name, input.email, input.age, hashedPassword);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(`Error while updating user with ID ${id}.`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID', description: 'Delete a user by their ID.' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async deletebyId(@Param('id') id: string) {
    try {
      return await this.service.deletebyId(+id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(`Error while deleting user with ID ${id}.`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}