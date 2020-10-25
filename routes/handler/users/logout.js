const { User, RefreshToken } = require('../../../models')

module.exports = async (request, response) => {
    const userId = request.body.user_id

    const user = await User.findByPk(userId)

    if(!user) {
        return response.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    await RefreshToken.destroy({
        where: {
            id: userId
        }
    })

    return response.status(200).json({
        status: 'success',
        message: 'refresh token deleted'
    })
}