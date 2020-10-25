const { User } = require('../../../models')
const bcrypt = require('bcrypt')
const validator = require('fastest-validator')
const v = new validator()

module.exports = async (request, response) => {
    const rules = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }
 
    const validate = v.validate(request.body, rules)

    if(validate.length) {
        return response.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findOne({
        where: {
            email: request.body.email
        }
    })
    
    if(!user) {
        return response.status(404).json({
            status: 'error',
            message: 'email not found'
        })
    }
    const isValidPassword = await bcrypt.compare(request.body.password, user.password)
    if(!isValidPassword) {
        return response.status(404).json({
            status: 'error',
            message: 'password invalid'
        })
    }

    
    const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        profession: user.profession
    }

    response.json({
        status: 'success',
        data: data
    })
}