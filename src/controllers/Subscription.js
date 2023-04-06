const { conn } = require('../db');
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

const createPayment = async (req, res) => {
    try {
        const { paymentId, productTitle, price, status, userId } = req.body

        if (paymentId && productTitle && price && status && userId) {
            const payment = await conn.model('PaymentInfo').create({
                id: paymentId,
                productTitle: productTitle,
                price: price,
                status: status,
                UserId: userId
            })
            if (payment) {
                const updatedRows = await conn.model('User').update({
                    isPremium: true,
                }, {
                    where: {
                        id: userId
                    }
                })
                console.log("Updated rows:", updatedRows);
                console.log(payment.toJSON());
                return res.status(200).send('Pago realizado exitosamente')
            }
            return res.status(400).send('No se pudo registrar el pago')
        }
        return res.status(400).send("Faltan datos")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createSubscription,
    createPayment
}