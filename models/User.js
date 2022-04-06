module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      status: {
        type: DataType.STRING,
        defaultValue: "active",
        allowNull: false,
      },
    },
    {
      updatedAt: "updateTimestamp",
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      onDelete: "cascade",
      foreignKey: "role_id",
    });
  };
  return User;
};
