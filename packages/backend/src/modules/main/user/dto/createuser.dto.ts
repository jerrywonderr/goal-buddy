import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export default CreateUserDto;