import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';

interface ImageAttributes {
  id: string;
  url: string;
  title: string;
  description: string;
  userId: string;
  approved: boolean;
}

class Image extends Model<ImageAttributes> {}

Image.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Image'
});

export default Image;