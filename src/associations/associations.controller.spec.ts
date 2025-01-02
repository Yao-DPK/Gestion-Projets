import { Test, TestingModule } from '@nestjs/testing';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AssociationDTO } from './entities/associations.dto';
import { AssociationInput } from './associations.input';
import { Association } from './entities/association.entity';
import { User } from 'src/users/users.entity';

const mockAssociationsService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  updatebyID: jest.fn(),
  deletebyID: jest.fn(),
  getmembers: jest.fn(),
};

describe('AssociationsController', () => {
  let controller: AssociationsController;
  let service: AssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
      providers: [
        {
          provide: AssociationsService,
          useValue: mockAssociationsService,
        },
        UsersService,
      ],
    }).compile();

    controller = module.get<AssociationsController>(AssociationsController);
    service = module.get<AssociationsService>(AssociationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all associations', async () => {
    const associations = [new AssociationDTO('Association 1', [])];
    mockAssociationsService.getAll.mockResolvedValue(associations);
    
    const result = await controller.getAllassociations();
    expect(result).toBe(associations);
  });

  it('should throw error while fetching associations', async () => {
    mockAssociationsService.getAll.mockRejectedValue(
      new HttpException('Error while fetching associations.', HttpStatus.INTERNAL_SERVER_ERROR)
    );
    
    await expect(controller.getAllassociations()).rejects.toThrow(HttpException);
  });

  it('should create a new association', async () => {
    const associationInput: AssociationInput = {
      name: 'Association Name', idUsers: [1],
      users: []
    };
    const createdAssociation = new Association();
    
    mockAssociationsService.create.mockResolvedValue(createdAssociation);

    const result = await controller.create(associationInput);
    expect(result).toEqual(createdAssociation);
  });

  it('should update an association by ID', async () => {
    const updateInput = { name: 'Updated Association', users: [] };
    const updatedAssociation = new Association();
    
    mockAssociationsService.updatebyID.mockResolvedValue(updatedAssociation);

    const result = await controller.updatebyId('1', updateInput);
    expect(result).toEqual(updatedAssociation);
  });

  it('should delete an association by ID', async () => {
    mockAssociationsService.deletebyID.mockResolvedValue(undefined);
    
    await controller.deletebyId('1');
    expect(mockAssociationsService.deletebyID).toHaveBeenCalled();
  });

  it('should return members of an association', async () => {
    const members = [new User()];
    mockAssociationsService.getmembers.mockResolvedValue(members);
    
    const result = await controller.getMembers('1');
    expect(result).toEqual(members);
  });
});
