import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

export type UserAttributes = {
  id: number;
  name: string;
  email: string;
  password: string;
  model: string;
  theme: string;
  language: string;
  custom_instructions: string;
  about_user: string;
  response_style: string;
  created_at: Date;
  updated_at: Date;
};

type UserCreation = Optional<
  UserAttributes,
  | 'id'
  | 'model'
  | 'theme'
  | 'language'
  | 'custom_instructions'
  | 'about_user'
  | 'response_style'
  | 'created_at'
  | 'updated_at'
>;

export class User
  extends Model<UserAttributes, UserCreation>
  implements UserAttributes
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare model: string;
  declare theme: string;
  declare language: string;
  declare custom_instructions: string;
  declare about_user: string;
  declare response_style: string;
  declare created_at: Date;
  declare updated_at: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    custom_instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    about_user: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    response_style: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  },
);

export default User;
