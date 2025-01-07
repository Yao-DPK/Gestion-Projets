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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(input) {
        const user = await this.userService.getbyEmail(input.email);
        if (!user || !(bcrypt.compare(input.password, user.password))) {
            console.error('Invalid credentials');
            throw new common_1.UnauthorizedException();
        }
        return {
            userId: user.id,
            email: user.email,
            name: user.name,
        };
    }
    async authenticateUser(input) {
        const user = await this.validateUser(input);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return this.signIn(user);
    }
    async signIn(user) {
        const tokenPayload = { userId: user.userId, email: user.email, name: user.name };
        const access_token = await this.jwtService.signAsync(tokenPayload);
        return { access_token, userId: user.userId, email: user.email, name: user.name };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map