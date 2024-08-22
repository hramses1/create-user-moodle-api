import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js';

export const Course = sequelize.define('Course', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    shortname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });
  