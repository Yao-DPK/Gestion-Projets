import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(request: any): Promise<{
        access_token: string;
        userId: number;
        email: string;
        name: string;
    }>;
    getProfile(request: any): Promise<any>;
}
