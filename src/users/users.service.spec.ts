import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };
  
  export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
  }));

  
describe('UsersService', () => {

  let service: UsersService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService, 
          { provide: getRepositoryToken(User),
           useFactory: repositoryMockFactory
          }
        ]
      }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
