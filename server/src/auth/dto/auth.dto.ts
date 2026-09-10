import {
  IsEmail,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
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
  @IsIn(['free', 'pro'])
  plan?: string;

  @IsOptional()
  @IsIn(['dark', 'light', 'system'])
  theme?: string;

  @IsOptional()
  @IsIn(['auto', 'en', 'ur', 'hi', 'ar', 'es', 'fr', 'de', 'zh'])
  language?: string;

  @IsOptional()
  @IsIn(['default', 'blue', 'purple', 'pink', 'orange'])
  accent_color?: string;

  @IsOptional()
  @IsBoolean()
  higher_intelligence?: boolean;

  @IsOptional()
  @IsBoolean()
  dictation?: boolean;

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

  @IsOptional() @IsBoolean() email_notifications?: boolean;
  @IsOptional() @IsBoolean() push_notifications?: boolean;
  @IsOptional() @IsBoolean() chat_updates?: boolean;
  @IsOptional() @IsBoolean() product_announcements?: boolean;
  @IsOptional() @IsBoolean() remember_preferences?: boolean;
  @IsOptional() @IsBoolean() personalized_suggestions?: boolean;
  @IsOptional() @IsBoolean() content_customization?: boolean;
  @IsOptional() @IsBoolean() adaptive_responses?: boolean;
  @IsOptional() @IsBoolean() web_search?: boolean;
  @IsOptional() @IsBoolean() code_interpreter?: boolean;
  @IsOptional() @IsBoolean() data_analysis?: boolean;
  @IsOptional() @IsBoolean() image_generation?: boolean;
  @IsOptional() @IsBoolean() voice_input?: boolean;
  @IsOptional() @IsBoolean() voice_output?: boolean;
  @IsOptional() @IsBoolean() voice_activation?: boolean;
  @IsOptional() @IsBoolean() language_detection?: boolean;
  @IsOptional() @IsBoolean() content_filtering?: boolean;
  @IsOptional() @IsBoolean() safety_warnings?: boolean;
  @IsOptional() @IsBoolean() parental_controls?: boolean;
  @IsOptional() @IsBoolean() safe_search?: boolean;
  @IsOptional() @IsInt() @Min(1) @Max(3650) data_retention_days?: number;
  @IsOptional() @IsBoolean() cache_enabled?: boolean;
}
