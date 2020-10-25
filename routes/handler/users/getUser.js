const { User } = require('../../../models')

module.exports = async (request, response) => {
    const user = await User.findByPk(request.params.id)

    if(!user) {
        return response.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    return response.status(200).json({
        status: 'success',
        data: user
    })
}