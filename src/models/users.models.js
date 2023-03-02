const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Users = db.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender:{
    type: DataTypes.STRING,

  },
  birthday:{
    type: DataTypes.DATE,
  },
  profileImg:{
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'normal'
  },
  isActive:{
    type: DataTypes.STRING,
    defaultValue:true
  }
});

module.exports = Users