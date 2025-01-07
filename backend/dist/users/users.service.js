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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll() {
        return await this.repository.find();
    }
    async create(name, email, age, password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let user = await this.repository.create({
            name: name,
            email: email,
            age: age,
            password: hashedPassword,
        });
        await this.repository.save(user);
        return user;
    }
    async getbyId(id) {
        return this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
    }
    async getbyEmail(email) {
        return this.repository.findOne({ where: { email: (0, typeorm_2.Equal)(email) } });
    }
    async updatebyId(id, name, email, age, password) {
        var user = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
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
    async deletebyId(id) {
        const result = await this.repository.delete(id);
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map