import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import UserSettings from '../models/user-settings.model.js';
import type { LoginDto, RegisterDto, UpdateProfileDto } from './dto/auth.dto.js';

export type SafeUser = {
  id: number;
  name: string;
  email: string;
  plan: string;
  model: string;
  theme: string;
  language: string;
  accent_color: string;
  higher_intelligence: boolean;
  dictation: boolean;
  custom_instructions: string;
  about_user: string;
  response_style: string;
  email_notifications: boolean;
  push_notifications: boolean;
  chat_updates: boolean;
  product_announcements: boolean;
  remember_preferences: boolean;
  personalized_suggestions: boolean;
  content_customization: boolean;
  adaptive_responses: boolean;
  web_search: boolean;
  code_interpreter: boolean;
  data_analysis: boolean;
  image_generation: boolean;
  voice_input: boolean;
  voice_output: boolean;
  voice_activation: boolean;
  language_detection: boolean;
  content_filtering: boolean;
  safety_warnings: boolean;
  parental_controls: boolean;
  safe_search: boolean;
  data_retention_days: number;
  cache_enabled: boolean;
  created_at: Date;
  updated_at: Date;
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private async getOrCreateSettings(user: User): Promise<UserSettings> {
    const existing = await UserSettings.findOne({ where: { user_id: user.id } });
    if (existing) return existing;

    return UserSettings.create({
      user_id: user.id,
      model: user.model,
      theme: user.theme,
      language: user.language,
      accent_color: 'default',
      higher_intelligence: true,
      dictation: true,
      custom_instructions: user.custom_instructions || '',
      about_user: user.about_user || '',
      response_style: user.response_style || 'default',
    });
  }

  private async toSafeUser(user: User): Promise<SafeUser> {
    const settings = await this.getOrCreateSettings(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: settings.plan,
      model: settings.model,
      theme: settings.theme,
      language: settings.language,
      accent_color: settings.accent_color,
      higher_intelligence: settings.higher_intelligence,
      dictation: settings.dictation,
      custom_instructions: settings.custom_instructions || '',
      about_user: settings.about_user || '',
      response_style: settings.response_style || 'default',
      email_notifications: settings.email_notifications,
      push_notifications: settings.push_notifications,
      chat_updates: settings.chat_updates,
      product_announcements: settings.product_announcements,
      remember_preferences: settings.remember_preferences,
      personalized_suggestions: settings.personalized_suggestions,
      content_customization: settings.content_customization,
      adaptive_responses: settings.adaptive_responses,
      web_search: settings.web_search,
      code_interpreter: settings.code_interpreter,
      data_analysis: settings.data_analysis,
      image_generation: settings.image_generation,
      voice_input: settings.voice_input,
      voice_output: settings.voice_output,
      voice_activation: settings.voice_activation,
      language_detection: settings.language_detection,
      content_filtering: settings.content_filtering,
      safety_warnings: settings.safety_warnings,
      parental_controls: settings.parental_controls,
      safe_search: settings.safe_search,
      data_retention_days: settings.data_retention_days,
      cache_enabled: settings.cache_enabled,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  private signToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }

  async register(dto: RegisterDto) {
    const existing = await User.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await User.create({
      name: dto.name.trim(),
      email: dto.email.toLowerCase().trim(),
      password: hashedPassword,
    });
    await this.getOrCreateSettings(user);

    return {
      message: 'User created successfully',
      token: this.signToken(user),
      user: await this.toSafeUser(user),
    };
  }

  async login(dto: LoginDto) {
    const user = await User.findOne({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      token: this.signToken(user),
      user: await this.toSafeUser(user),
    };
  }

  async getProfile(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return this.toSafeUser(user);
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await User.findByPk(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const settings = await this.getOrCreateSettings(user);

    if (dto.name !== undefined) user.name = dto.name.trim();
    if (dto.plan !== undefined) settings.plan = dto.plan;
    if (dto.model !== undefined) settings.model = dto.model;
    if (dto.theme !== undefined) settings.theme = dto.theme;
    if (dto.language !== undefined) settings.language = dto.language;
    if (dto.accent_color !== undefined) settings.accent_color = dto.accent_color;
    if (dto.higher_intelligence !== undefined) {
      settings.higher_intelligence = dto.higher_intelligence;
    }
    if (dto.dictation !== undefined) settings.dictation = dto.dictation;
    if (dto.custom_instructions !== undefined) settings.custom_instructions = dto.custom_instructions;
    if (dto.about_user !== undefined) settings.about_user = dto.about_user;
    if (dto.response_style !== undefined) {
      settings.response_style = dto.response_style;
    }
    const settingKeys = [
      'email_notifications',
      'push_notifications',
      'chat_updates',
      'product_announcements',
      'remember_preferences',
      'personalized_suggestions',
      'content_customization',
      'adaptive_responses',
      'web_search',
      'code_interpreter',
      'data_analysis',
      'image_generation',
      'voice_input',
      'voice_output',
      'voice_activation',
      'language_detection',
      'content_filtering',
      'safety_warnings',
      'parental_controls',
      'safe_search',
      'data_retention_days',
      'cache_enabled',
    ] as const;
    for (const key of settingKeys) {
      if (dto[key] !== undefined) settings[key] = dto[key] as never;
    }
    user.updated_at = new Date();
    await user.save();
    settings.updated_at = new Date();
    await settings.save();

    return {
      message: 'Profile updated',
      user: await this.toSafeUser(user),
    };
  }
}
