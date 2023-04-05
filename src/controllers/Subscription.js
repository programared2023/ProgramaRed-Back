const mercadopago = require('../lib/mercadoPago')

const createSubscription = (req, res) => {
    try {
        const { title, description, price, user } = req.body
        mercadopago.preferences.create({
            items: [
                {
                    title: title,
                    quantity: 1,
                    description: description,
                    unit_price: price * 1.30
                }
            ],
            payer: {
                name: user.username,
                email: user.email,
                date_created: new Date().toLocaleDateString(),
            },
            auto_return: "approved",
            back_urls: {
                success: `${process.env.FRONT_URL}/premium?success=1`,
                failure: `${process.env.FRONT_URL}/premium?error=1`,
                pending: process.env.FRONT_URL
            }
        }).then(prefResponse => {
            console.log(prefResponse);
            return res.status(200).json({ preferenceId: prefResponse.body.id })
        }).catch(error => {
            console.log(error);
            return res.status(400).send(error)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createSubscription
}