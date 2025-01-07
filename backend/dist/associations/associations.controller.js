"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationsController = void 0;
const common_1 = require("@nestjs/common");
const associations_service_1 = require("./associations.service");
const swagger_1 = require("@nestjs/swagger");
const associations_dto_1 = require("./entities/associations.dto");
const associations_input_1 = require("./associations.input");
const association_entity_1 = require("./entities/association.entity");
const users_entity_1 = require("../users/users.entity");
let AssociationsController = class AssociationsController {
    constructor(service) {
        this.service = service;
    }
    async getAllassociations() {
        try {
            return this.service.getAll();
        }
        catch (error) {
            throw new common_1.HttpException('Error while fetching associations.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getbyId(id) {
        try {
            const association = this.service.getById(+id);
            if (!association) {
                throw new common_1.HttpException(`Association with ID ${id} not found.`, common_1.HttpStatus.NOT_FOUND);
            }
            return association;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while fetching association with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    create(input) {
        try {
            return this.service.create(input.name, input.idUsers);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException('Error while creating the association.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    updatebyId(id, input) {
        try {
            return this.service.updatebyID(+id, input.users, input.name);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while updating association with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    deletebyId(id) {
        try {
            return this.service.deletebyID(+id);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while deleting association with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    getMembers(id) {
        try {
            return this.service.getmembers(+id);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while fetching members of association with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.AssociationsController = AssociationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all associations', description: 'Retrieve a list of all associations.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved associations.', type: associations_dto_1.AssociationDTO, isArray: true }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAllassociations", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get association by ID', description: 'Retrieve an association by its ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved the association.', type: associations_dto_1.AssociationDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssociationsController.prototype, "getbyId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create association', description: 'Create a new association.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully created the association.', type: association_entity_1.Association }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_input_1.AssociationInput]),
    __metadata("design:returntype", void 0)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update association by ID', description: 'Update an association by its ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated the association.', type: association_entity_1.Association }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AssociationsController.prototype, "updatebyId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete association by ID', description: 'Delete an association by its ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully deleted the association.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssociationsController.prototype, "deletebyId", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, swagger_1.ApiOperation)({ summary: 'Get members of an association', description: 'Retrieve members of an association by ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved association members.', type: users_entity_1.User, isArray: true }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
exports.AssociationsController = AssociationsController = __decorate([
    (0, swagger_1.ApiTags)('associations'),
    (0, common_1.Controller)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
//# sourceMappingURL=associations.controller.js.map