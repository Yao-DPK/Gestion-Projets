import { Member } from '../associations.member';
export declare class AssociationDTO {
    id: number;
    name: string;
    members?: Member[];
    constructor(name: string, members?: Member[]);
}
