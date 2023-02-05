const userModel = (sequelize, Sequelize) => {
    const User = sequelize.define("tb_m_user", {
        email: {
            type: Sequelize.STRING
        },
        fullName: {
            type: Sequelize.STRING
        },
        no_telpon: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User
}

export default userModel;