import { ApiProperty } from "@nestjs/swagger";

export class UserInput {

    @ApiProperty({
        description: 'The name of the user',
        example: "John Doe",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: "jonhdoe@gmail.com",
        type: String,
    })
    public email: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The password of the user',
        example: "DusneyXD2",
        type: String,
    })
    public password: string;
}