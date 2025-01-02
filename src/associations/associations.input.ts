import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.entity";

export class AssociationInput {

    @ApiProperty({
        description: 'The ids of the users of the association',
        example: [1, 2, ],
        type: Number[1000],
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The users of the association',
        example: [{id:0, name:'Yao Konan', lastname:'yao.konan27@gmail.com', age:21}],
        type: User[1000],
    })
    public users: User[];

    @ApiProperty({
        description: 'The name of the association',
        example: "Association",
        type: String,
    })
    public name: string;

}