import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize-config.js';  // Asegúrate de que la ruta de importación sea correcta

export const Organization = sequelize.define('Organization', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT,
    unsigned: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  abbreviation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  degree_abbreviation: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: '',
  },
  origin: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  rest_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  modality: {
    type: DataTypes.ENUM('presential', 'virtual', 'semipresential'),
    allowNull: true,
  },
  additional_data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  translations: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  parent: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  importance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'organizations', // Asegúrate de que el nombre de la tabla sea correcto
  paranoid: true, // Esto habilita el "soft delete"
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

