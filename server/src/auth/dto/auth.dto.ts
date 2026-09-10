import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsIn(['openai/gpt-oss-120b'])
  model?: string;

  @IsOptional()
  @IsIn(['dark', 'light', 'system'])
  theme?: string;

  @IsOptional()
  @IsIn(['en', 'ur', 'hi', 'ar', 'es', 'fr', 'de', 'zh'])
  language?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  custom_instructions?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  about_user?: string;

  @IsOptional()
  @IsIn(['default', 'concise', 'detailed', 'friendly', 'professional'])
  response_style?: string;
}
