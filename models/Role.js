module.exports = (sequelize, DataType) => {
  const Role = sequelize.define("Role", {
    role_id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      onDelete: "cascade",
      foreignKey: "role_id",
    });
  };
  return Role;
};
