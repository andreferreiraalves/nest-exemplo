import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
    @IsString({ message: 'Nome não pode estar em branco' })
    @IsNotEmpty({ message: 'Este campo não pode ser vazio' })
    name: string;
}