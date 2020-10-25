const bcrypt = require('bcrypt')
const { User } = require('../../../models')
const validator = require('fastest-validator')

module.exports = async (request, response) => {
    const rules = {
        name: 'string|empty:false',
        email: 'string|empty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    const v = new validator()
    const validate = v.validate(request.body, rules)

    if(validate.length) {
        return response.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const check = await User.findOne({
        where: {email: request.body.email}
    })

    if(check){
        return response.status(409).json({
            status: 'error',
            message: 'email already exist'
        })
    } else {
        const userData = {
            email: request.body.email,
            password: await bcrypt.hash(request.body.password, 10),
            name: request.body.name,
            profession: request.body.profession,
            role: 'student'
        }

        const data = await User.create(userData)

        return response.status(200).json({
            status: 'success',
            message: 'user successfully created',
            data: data
        })
    }
    

}