import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsService } from './associations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Association } from './entities/association.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { AssociationDTO } from './entities/associations.dto';
import { Member } from './associations.member';
import { HttpException, HttpStatus } from '@nestjs/common';

// Mock data
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};
const mockUsersService = {
  getbyId: jest.fn(),
};

describe('AssociationsService', () => {
  let service: AssociationsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        {
          provide: getRepositoryToken(Association),
          useValue: mockRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AssociationsService>(AssociationsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all associations', async () => {
    const mockAssociations = [
      new Association(),
      new Association(),
    ];

    mockRepository.find.mockResolvedValue(mockAssociations);

    const result = await service.getAll();
    expect(result.length).toBe(2);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should throw an error when unable to find associations', async () => {
    mockRepository.find.mockResolvedValue(null);
    
    await expect(service.getAll()).rejects.toThrow(
      new HttpException('Error while fetching associations.', HttpStatus.INTERNAL_SERVER_ERROR)
    );
  });

  it('should create a new association', async () => {
    const mockAssociationData = { name: 'Test Association', users: [] };
    const newAssociation = new Association();
    
    mockRepository.create.mockReturnValue(newAssociation);
    mockRepository.save.mockResolvedValue(newAssociation);
    mockUsersService.getbyId.mockResolvedValue(new User());

    const result = await service.create(mockAssociationData.name, [1]);

    expect(result).toBe(newAssociation);
    expect(mockRepository.save).toHaveBeenCalledWith(newAssociation);
  });

  it('should throw error while creating an association if any issues occur', async () => {
    const mockAssociationData = { name: 'Test Association', users: [] };
    
    mockUsersService.getbyId.mockRejectedValue(new HttpException('User not found', HttpStatus.BAD_REQUEST));

    await expect(service.create(mockAssociationData.name, [1])).rejects.toThrowError(
      new HttpException('Error while creating the association.', HttpStatus.INTERNAL_SERVER_ERROR)
    );
  });

  it('should return association by id', async () => {
    const mockAssociation = new Association();
    mockRepository.findOne.mockResolvedValue(mockAssociation);
    mockRepository.find.mockResolvedValue([mockAssociation]);
    
    const result = await service.getById(1);
    expect(result).toBeDefined();
  });

  it('should update an association by id', async () => {
    const mockAssociation = new Association();
    const updatedAssociation = new Association();
    
    mockRepository.findOne.mockResolvedValue(mockAssociation);
    mockRepository.save.mockResolvedValue(updatedAssociation);

    const result = await service.updatebyID(1, [new User()], 'New Association Name');
    expect(result).toBe(updatedAssociation);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should delete an association by id', async () => {
    mockRepository.delete.mockResolvedValue(undefined);

    await service.deletebyID(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should return members of an association', async () => {
    const mockAssociationDTO = new AssociationDTO('Test Association', [new Member('User 1', '', 0, 'member')]);
    mockRepository.findOne.mockResolvedValue(mockAssociationDTO);
    
    const result = await service.getmembers(1);
    expect(result).toEqual(mockAssociationDTO.members);
  });
});
