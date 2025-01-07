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
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const association_entity_1 = require("./entities/association.entity");
const users_service_1 = require("../users/users.service");
const associations_dto_1 = require("./entities/associations.dto");
const associations_member_1 = require("./associations.member");
let AssociationsService = class AssociationsService {
    constructor(repository, userService) {
        this.repository = repository;
        this.userService = userService;
    }
    async getAll() {
        try {
            const associations = await this.repository.find();
            if (!associations) {
                throw new common_1.HttpException(`Associations found.`, common_1.HttpStatus.NOT_FOUND);
            }
            const associationsDTO = [];
            for (const association of associations) {
                const users = await association.users;
                const members = [];
                for (const user of users) {
                    const newMember = new associations_member_1.Member(user.name, user.email, user.age, 'member');
                    members.push(newMember);
                }
                const associationDTO = new associations_dto_1.AssociationDTO(association.name, members);
                associationsDTO.push(associationDTO);
            }
            return associationsDTO;
        }
        catch (error) {
            throw new common_1.HttpException(`Error while fetching associations}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(name, idUsers) {
        let users = [];
        for (let i = 0; i < idUsers.length; i++) {
            var user = await this.userService.getbyId(+idUsers[i]);
            users.push(user);
        }
        const newAssociation = this.repository.create({ name: name, users: users });
        this.repository.save(newAssociation);
        return newAssociation;
    }
    async getById(id) {
        try {
            const association = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
            if (!association) {
                throw new common_1.HttpException(`Association with ID ${id} not found.`, common_1.HttpStatus.NOT_FOUND);
            }
            const users = await association.users;
            const members = [];
            for (const user of users) {
                const newMember = new associations_member_1.Member(user.name, user.email, user.age, 'member');
                members.push(newMember);
            }
            const associationDTO = new associations_dto_1.AssociationDTO(association.name, members);
            return associationDTO;
        }
        catch (error) {
            throw new common_1.HttpException(`Error while fetching association with ID ${id}.`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatebyID(id, users, name) {
        var association = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (users !== undefined) {
            association.users = users;
        }
        if (name !== undefined) {
            association.name = name;
        }
        return this.repository.save(association);
    }
    async deletebyID(id) {
        await this.repository.delete(id);
    }
    async getmembers(id) {
        const association = await this.getById(id);
        return association.members;
    }
};
exports.AssociationsService = AssociationsService;
exports.AssociationsService = AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(association_entity_1.Association)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], AssociationsService);
//# sourceMappingURL=associations.service.js.map