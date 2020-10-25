
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          profession: {
            type: DataTypes.STRING,
            allowNull: true
          },
          avatar: {
            type: DataTypes.STRING,
            allowNull: true
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
          role: {
            type: DataTypes.ENUM,
            values: ['admin', 'student'],
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at'
        }
    }, {
        tableName: 'users',
        timestamps: true
    })

    return User
}