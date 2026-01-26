import { IsString, IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    name: string
}
