import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Vali' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'vali@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Vali1234!' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
