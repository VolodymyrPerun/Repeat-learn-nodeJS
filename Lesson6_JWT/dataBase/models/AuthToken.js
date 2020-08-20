module.exports = (sequelize, DataTypes) => {

    const AuthToken = sequelize.define('AuthToken', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
            create_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: 'auth_token',
            timestamps: false
        })

    const User = sequelize.import('./User.js')

    AuthToken.belongsTo(User, {foreignKey: 'userId'})

    return AuthToken;
};
