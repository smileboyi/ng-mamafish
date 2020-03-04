import { IsString, IsEmail, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsString()
  @Length(2, 15)
  readonly username?: string;

  @ApiModelProperty()
  @IsEmail()
  readonly email?: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;
}
