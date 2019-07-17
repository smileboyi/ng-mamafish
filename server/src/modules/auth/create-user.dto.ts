import {
  IsInt,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
