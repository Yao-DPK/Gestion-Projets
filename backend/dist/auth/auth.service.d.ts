import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export type AuthInput = {
    email: string;
    password: string;
};
type AuthOutput = {
    access_token: string;
    userId: number;
    email: string;
    name: string;
};
type SignInData = {
    userId: number;
    email: string;
    name: string;
};
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(input: AuthInput): Promise<SignInData>;
    authenticateUser(input: AuthInput): Promise<AuthOutput>;
    signIn(user: SignInData): Promise<AuthOutput>;
}
export {};
