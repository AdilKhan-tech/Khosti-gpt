import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

export type UserSettingsAttributes = {
  id: number;
  user_id: number;
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

type UserSettingsCreation = Optional<
  UserSettingsAttributes,
  | 'id'
  | 'plan'
  | 'model'
  | 'theme'
  | 'language'
  | 'accent_color'
  | 'higher_intelligence'
  | 'dictation'
  | 'custom_instructions'
  | 'about_user'
  | 'response_style'
  | 'email_notifications'
  | 'push_notifications'
  | 'chat_updates'
  | 'product_announcements'
  | 'remember_preferences'
  | 'personalized_suggestions'
  | 'content_customization'
  | 'adaptive_responses'
  | 'web_search'
  | 'code_interpreter'
  | 'data_analysis'
  | 'image_generation'
  | 'voice_input'
  | 'voice_output'
  | 'voice_activation'
  | 'language_detection'
  | 'content_filtering'
  | 'safety_warnings'
  | 'parental_controls'
  | 'safe_search'
  | 'data_retention_days'
  | 'cache_enabled'
  | 'created_at'
  | 'updated_at'
>;

export class UserSettings extends Model<
  UserSettingsAttributes,
  UserSettingsCreation
> implements UserSettingsAttributes {
  declare id: number;
  declare user_id: number;
  declare plan: string;
  declare model: string;
  declare theme: string;
  declare language: string;
  declare accent_color: string;
  declare higher_intelligence: boolean;
  declare dictation: boolean;
  declare custom_instructions: string;
  declare about_user: string;
  declare response_style: string;
  declare email_notifications: boolean;
  declare push_notifications: boolean;
  declare chat_updates: boolean;
  declare product_announcements: boolean;
  declare remember_preferences: boolean;
  declare personalized_suggestions: boolean;
  declare content_customization: boolean;
  declare adaptive_responses: boolean;
  declare web_search: boolean;
  declare code_interpreter: boolean;
  declare data_analysis: boolean;
  declare image_generation: boolean;
  declare voice_input: boolean;
  declare voice_output: boolean;
  declare voice_activation: boolean;
  declare language_detection: boolean;
  declare content_filtering: boolean;
  declare safety_warnings: boolean;
  declare parental_controls: boolean;
  declare safe_search: boolean;
  declare data_retention_days: number;
  declare cache_enabled: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

UserSettings.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    plan: { type: DataTypes.STRING, allowNull: false, defaultValue: 'free' },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'openai/gpt-oss-120b',
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'dark',
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'en',
    },
    accent_color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default',
    },
    higher_intelligence: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    dictation: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    custom_instructions: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    about_user: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    response_style: { type: DataTypes.STRING, allowNull: false, defaultValue: 'default' },
    email_notifications: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    push_notifications: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    chat_updates: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    product_announcements: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    remember_preferences: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    personalized_suggestions: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    content_customization: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    adaptive_responses: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    web_search: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    code_interpreter: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    data_analysis: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    image_generation: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    voice_input: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    voice_output: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    voice_activation: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    language_detection: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    content_filtering: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    safety_warnings: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    parental_controls: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    safe_search: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    data_retention_days: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
    cache_enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'user_settings', timestamps: false },
);

export default UserSettings;
