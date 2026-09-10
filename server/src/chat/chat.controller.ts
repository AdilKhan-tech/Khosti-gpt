import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '../auth/auth.service.js';
import { JwtAuthGuard, type AuthRequest } from '../auth/jwt-auth.guard.js';
import {
  ChatService,
  type ChatContentPart,
  type ChatMessage,
} from './chat.service.js';

type IncomingMessage = {
  role?: string;
  content?: string;
  images?: string[];
};

type ChatRequestBody = {
  messages?: IncomingMessage[];
  model?: string;
};

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @Post('stream')
  @UseGuards(JwtAuthGuard)
  async stream(
    @Body() body: ChatRequestBody,
    @Req() req: AuthRequest,
    @Res() res: Response,
  ) {
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const cleaned: ChatMessage[] = [];

    for (const m of messages) {
      if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue;

      const text = typeof m.content === 'string' ? m.content.trim() : '';
      const images = Array.isArray(m.images)
        ? m.images.filter(
            (url) =>
              typeof url === 'string' &&
              (url.startsWith('data:image/') || url.startsWith('http')),
          ).slice(0, 4)
        : [];

      if (!text && images.length === 0) continue;

      if (m.role === 'assistant' || images.length === 0) {
        cleaned.push({
          role: m.role,
          content: text || (images.length ? 'Please look at this image.' : ''),
        });
        continue;
      }

      const parts: ChatContentPart[] = [];
      if (text) parts.push({ type: 'text', text });
      for (const url of images) {
        parts.push({ type: 'image_url', image_url: { url } });
      }
      cleaned.push({ role: 'user', content: parts });
    }

    if (cleaned.length === 0) {
      res.status(400).json({ message: 'messages array is required' });
      return;
    }

    const user = await this.authService.getProfile(req.user!.id);
    const model = body.model || user.model || undefined;

    await this.chatService.streamChat(cleaned, res, { model, user });
  }
}
