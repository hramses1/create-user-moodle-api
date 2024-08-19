// src/Data/initDatabase.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js';

export const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  lang: {
    type: DataTypes.STRING,
    defaultValue: 'en',
  },
  timezone: {
    type: DataTypes.STRING,
    defaultValue: 'UTC',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: false }); // No borra la tabla si ya existe
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
