const mercadopago = require('../lib/mercadoPago')

const createSubscription = (req, res) => {
    try {
        const { title, description, price, user } = req.body
        mercadopago.preferences.create({
            binary_mode: true,
            purpose: 'wallet_purchase',
            items: [
                {
                    id: 'SUB-PREMIUM-123',
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
                success: `http://localhost:3000/premium`,
                failure: `http://localhost:3000/premium`,
                pending: `http://localhost:3000/premium`
            }
        }).then(prefResponse => {
            console.log(prefResponse.body);
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