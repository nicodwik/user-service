const { User, RefreshToken } = require('../../../models')
const validator = require('fastest-validator')
const v = new validator()

module.exports = async (request, response) => {
    const userId = request.body.user_id
    const refreshToken = request.body.refresh_token

    const rules = {
        refresh_token: 'string',
        user_id: 'number'
    }

    const validate = v.validate(request.body, rules)
    if(validate.length) {
        return response.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findByPk(userId)
    if(!user) {
        return response.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }
    
    const createdRefreshToken = await RefreshToken.create({
        token: refreshToken,
        user_id: userId
    })

    return response.status(200).json({
        status: 'success',
        data: {
            id: createdRefreshToken.id
        }
    })
}