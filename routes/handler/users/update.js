const { User } = require('../../../models')
const bcrypt = require('bcrypt')
const validator = require('fastest-validator')
const v = new validator()

module.exports = async (request, response) => {
    const rules = {
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
        avatar: 'string|optional'
    }
 
    const validate = v.validate(request.body, rules)

    if(validate.length) {
        return response.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findByPk(request.params.id)
    
    if(!user) {
        return response.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    const email = request.body.email
    if(email) {
        const checkEmail = await User.findOne({
            where : { email: email }
        })
        console.log(checkEmail)
        console.log(email)
        console.log(user.email)

        if(checkEmail && email !== user.email) {
            return response.status(409).json({
                status: 'error',
                message: 'email already exist'
            })
        }
    }
    

    const password = await bcrypt.hash(request.body.password, 10)
    const { name, profession, avatar } = request.body
    
    await user.update({
        name,
        email,
        profession,
        avatar,
        password
    })
    // const data = {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     password: user.password,
    //     profession: user.profession
    // }

    return response.status(200).json({
        status: 'success',
        data: {
            id: user.id,
            name,
            email,
            profession,
            avatar
        }
    })
}