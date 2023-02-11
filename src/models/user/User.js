
const userModel = (sequelize, Sequelize) => {
    const User = sequelize.define("tb_user_profile", {
        email: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        birth_date: {
            type: Sequelize.DATE
        }
    }, {timestamps: false});

    return User
}

export default userModel;