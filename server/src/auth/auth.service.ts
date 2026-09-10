import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import type { LoginDto, RegisterDto, UpdateProfileDto } from './dto/auth.dto.js';

export type SafeUser = {
  id: number;
  name: string;
  email: string;
  model: string;
  theme: string;
  language: string;
  custom_instructions: string;
  about_user: string;
  response_style: string;
  created_at: Date;
  updated_at: Date;
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      model: user.model,
      theme: user.theme,
      language: user.language,
      custom_instructions: user.custom_instructions || '',
      about_user: user.about_user || '',
      response_style: user.response_style || 'default',
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

    return {
      message: 'User created successfully',
      token: this.signToken(user),
      user: this.toSafeUser(user),
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
      user: this.toSafeUser(user),
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

    if (dto.name !== undefined) user.name = dto.name.trim();
    if (dto.model !== undefined) user.model = dto.model;
    if (dto.theme !== undefined) user.theme = dto.theme;
    if (dto.language !== undefined) user.language = dto.language;
    if (dto.custom_instructions !== undefined) {
      user.custom_instructions = dto.custom_instructions;
    }
    if (dto.about_user !== undefined) user.about_user = dto.about_user;
    if (dto.response_style !== undefined) {
      user.response_style = dto.response_style;
    }
    user.updated_at = new Date();
    await user.save();

    return {
      message: 'Profile updated',
      user: this.toSafeUser(user),
    };
  }
}
