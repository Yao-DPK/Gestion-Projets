declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        userId: number;
        email: string;
        name: string;
    }): Promise<{
        userId: number;
        email: string;
        name: string;
    }>;
}
export {};
