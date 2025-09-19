import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'gani@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Gani123!' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
