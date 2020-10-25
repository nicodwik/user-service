const { RefreshToken } = require('../../../models')

module.exports = async (request, response) => {
    const refreshToken = request.query.refresh_token
    
    const data = await RefreshToken.findOne({
        where: {
            token: refreshToken
        }
    })

    if(!data) {
        return response.status(400).json({
            status: 'error',
            message: 'invalid token'
        })
    }

    return response.status(200).json({
        status: 'success',
        token: data.token,
        data: data
    })
    
}