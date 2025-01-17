import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class User extends Model<UserAttributes> {
  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string) {
    return bcrypt.compare(password, this.getDataValue('password'));
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'User'
});

export default User;