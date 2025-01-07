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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const users_service_1 = require("./users.service");
const users_input_1 = require("./users.input");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = require("bcrypt");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
    async getAllusers() {
        try {
            return await this.service.getAll();
        }
        catch (error) {
            throw new common_1.HttpException('Error while fetching users.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getbyId(id) {
        try {
            const user = await this.service.getbyId(Number(id));
            if (!user) {
                throw new common_1.HttpException(`User with ID ${id} not found.`, common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while fetching user with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async create(input) {
        try {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            return await this.service.create(input.name, input.email, input.age, hashedPassword);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException('Error while creating the user.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updatebyId(id, input) {
        try {
            const hashedPassword = input.password ? await bcrypt.hash(input.password, 10) : undefined;
            return await this.service.updatebyId(+id, input.name, input.email, input.age, hashedPassword);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while updating user with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async deletebyId(id) {
        try {
            return await this.service.deletebyId(+id);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException(`Error while deleting user with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users', description: 'Retrieve a list of all users.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved users.', type: users_entity_1.User, isArray: true }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllusers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID', description: 'Retrieve a user by their ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved the user.', type: users_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getbyId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create user', description: 'Create a new user.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully created the user.', type: users_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user by ID', description: 'Update a user by their ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully updated the user.', type: users_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatebyId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID', description: 'Delete a user by their ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully deleted the user.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deletebyId", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map