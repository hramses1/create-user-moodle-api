import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize-config.js";
// Suponiendo que tengas modelos de Course y Role
import { Course } from "./CourseModel.js";  
import { Role } from "./RoleModel.js";
import { User } from './UserModel.js';

export const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Así no se requieren campos createdAt o updatedAt
  }
);

// Establecer relaciones (esto puede ir en otro archivo donde configurar todas las relaciones)
User.hasMany(Enrollment, { foreignKey: "userId" });
Enrollment.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(Enrollment, { foreignKey: "courseId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

Role.hasMany(Enrollment, { foreignKey: "roleId" });
Enrollment.belongsTo(Role, { foreignKey: "roleId" });
