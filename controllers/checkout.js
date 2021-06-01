const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
module.exports = class Controller {

  static async createProduct(req, res, next) {
    const { name, amount } = req.body.product
    try {
      const newProduct = await stripe.products.create({ name });
      const newPrice = await stripe.prices.create({
        product: newProduct.id,
        unit_amount: amount,
        currency: 'usd',
      })
      const productData = {
        productId: newProduct.id,
        priceId: newPrice.id
      }

      res.status(200).json(productData)
    } catch (err) {
      console.log(err);
    }

  }

  static async checkout(req, res, next) {
    const { priceId } = req.body
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/checkout/success?id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price: priceId,
          quantity: 1
        }]
      })
      res.json({
        id: session.id
      })

    } catch (err) {
      console.log(err);
    }
  }

  static async checkoutSession(req, res, next) {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.id, {
        expand: ['line_items']
      })
      console.log(session);
      res.status(200).json(session)

    } catch (err) {
      console.log(err);
    }

  }
}