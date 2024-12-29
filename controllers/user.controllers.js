exports.register = async(req, res) => {
    try {
        const { email, first_name, last_name, age, date_of_birth, phone_number, password, confirm_password } = req.body

        return res.status(200).json({
            data: {
                email, first_name, last_name, age, date_of_birth, phone_number, password, confirm_password
            },
            msg: 'User registration successfull'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({data: error})
    }
}