const { User } = require('../../../models')

module.exports = async (request, response) => {
    const userIds = request.query.user_ids || []

    const attributes = {
        attributes: ['id', 'name', 'role', 'profession', 'email', 'avatar']
    }

    if(userIds.length) {
        attributes.where = {
            id: userIds
        }
    }

    const data = await User.findAll(attributes)

    return response.status(200).json({
        status: 'success',
        data: data
    })
}