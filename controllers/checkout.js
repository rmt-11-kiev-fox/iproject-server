const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
module.exports = class Controller {

  static async createProduct(req, res, next) {
    console.log("masukk ek rdfasdfdsf<.,.,.,.,.,.,.");
    const { name, amount } = req.body.product
    try {
      const newProduct = await stripe.products.create({ name });
      const newPrice = await stripe.prices.create({
        product: newProduct.id,
        unit_amount: amount * 100,
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
        success_url: 'http://localhost:8080/checkout/success?id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price: priceId,
          quantity: 1
        }]
      })
      console.log(session, "<<<< ni cehckout");
      res.status(200).json({ id: session.id })

    } catch (err) {
      console.log(err);
    }
  }

  static async checkoutSession(req, res, next) {
    const sessionId = req.query.id
    console.log(sessionId);

    try {
      const lineItemsList = await stripe.checkout.sessions.listLineItems(
        sessionId,
        { limit: 5 }
      )

      const lineItemsData = lineItemsList.data[0]
      res.status(200).json(lineItemsData)
    } catch (err) {
      console.log(err);
    }

  }

  static async getProduct(req, res, next) {
    const productId = req.params.id

    try {
      const product = await stripe.products.retrieve(productId)
      console.log(product)
      res.status(200).json(product)
    } catch (err) {
      console.log(err);
    }
  }

  // static async checkoutSession(req, res, next) {
  //   try {
  //     const session = await stripe.checkout.sessions.retrieve(req.query.id, {
  //       expand: ['line_items']
  //     })
  //     console.log(session);
  //     res.status(200).json(session)

  //   } catch (err) {
  //     console.log(err);
  //   }

  // }
}