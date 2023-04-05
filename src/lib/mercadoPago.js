const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
    // client_id: process.env.MP_CLIENT_ID,
    // client_secret: process.env.MP_CLIENT_SECRET
})

module.exports = mercadopago