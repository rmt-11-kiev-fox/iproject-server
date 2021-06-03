const { Product, Category, Like, BidList } = require('../models');
const product = require('../routes/product');
// const io = require('../')

class productController {
  // constructor(io) {
  //   this.io = io
  // }
 
  // fetch product can both
  static fetchProduct(req, res, next){
    console.log('gamasuk');
    Product.findAll({
      include: {
        model: Category,
        attributes: ['name']
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    .then((product) => {
      console.log('masukkkkk');
      res.status(200).json({product})
    })
    .catch(err => {
      console.log(err, 'ererere');
      next(err)
    })
  }
  // add product only admin
  static async addProduct(req, res, next){
    try{
      let item = req.body
      let created = await Product.create(item)
      const category = await Category.findByPk(created.category_id, {
        attributes: ['id','name']
      })
      return res.status(201).json({
        product: {
          id: created.id,
          title: created.title,
          artist: created.artist,
          image_url: created.image_url,
          description: created.description,
          status: created.status,
          category_id: category.name,
          startBid: created.startBid,
          endBid: created.endBid
        }
      })
    } catch (err) {
      return next(err)
    } 
  }
  // find product by id can both
  static findProduct(req, res, next){
    let { id } = req.params
    Product.findOne({
      where: {id},
      include:{
        model: Category,
        attributes:['name']
      }})
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }
  // edit product only admin
  static async editProduct(req, res, next){
    try{ 
      const { id } = req.params
      let updateProduct = {
        category_id: +req.body.category_id,
        title: req.body.title,
        artist: req.body.artist,
        image_url: req.body.image_url,
        description: req.body.description,
        status: req.body.status,
        startBid: req.body.startBid,
        endBid: req.body.endBid
      }
      const updated = await Product.update(updateProduct, {where: { id }, returning:true})
      const category = await Category.findByPk(updated[1][0].category_id, {
        attributes: ['id','name']
      })
      if(!updated)return next({code: 400})
      else return res.status(201).json({
        updated: {
          category_id: category.name,
          title: updated[1][0].title,
          artist: updated[1][0].artist,
          image_url: updated[1][0].image_url,
          description: updated[1][0].description,
          status: updated[1][0].status,
          startBid: updated[1][0].startBid,
          endBid: updated[1][0].endBid
        }
      })
    } catch (err) {
      // console.log(err)
      return next(err)
    } 
  }
  // update status product only admin
  static updateStatus(req,res, next){
   
      let {id} = req.params
      let {status} = req.body
      Product.update({status}, {where: {id}, returning:true})
  
      .then((data) => {
        if (!data){
          next({
            code: 404,
            msg: 'not found'
          })
  
        } else {
          res.status(200).json(data)
        }
      })
      .catch((err) => {
        // console.log(err, 'wwwoii');
          next(err)
      })
    } 
  // delete product only admin
  static deleteProduct(req, res, next){
    let { id } = req.params
    Product.destroy({ where: { id } })
    
    .then((data) => {
      if(!data) next({code: 400})
      else return res.status(200).json({message: 'Success delete product!'})
    })
    .catch((err) => {
      // console.log(err)
      next(err)
    })
  }
  // fetch like can both with auth
  static async fetchLiked(req, res, next) {
    const user_id = req.currentUser.id
    try {
      const liked = await Like.findAll({
        where: {user_id: user_id},
        include: Product
      });
      return res.status(200).json(liked)
    } catch (err) {
      next(err);
    }
  }
  // add product to like can both with auth
  static async addProductToLiked(req, res, next) {
    const user_id = req.currentUser.id
    const product_id = req.body.product_id
    try {
      const likedProduct = await Like.findOne({
        where: {user_id: user_id, product_id: product_id}
      });
      let action = ''
      if (!likedProduct) {
        action = 'add to'
        await Like.create({
          user_id: user_id, 
          product_id: product_id
        })
      } else {
        action = 'remove from'
        console.log('remove from liked')
        await likedProduct.destroy()
      }
      return res.status(200).json({message: `success ${action} Like`});
    } catch(err) {
      // console.log(err, 'kenapasi');
      next(err)
    }
  }
  // join bid can both with auth
  static async joinBidAuction(req, res, next){
    const io = req.app.get('io');
    let money_offer = req.body.money_offer
    let user_id = req.currentUser.id
    let product_id = req.body.product_id
    let action = ""
    try {
      const check = await BidList.findOne({where: {user_id: user_id}, })
      if(check && money_offer <= check.money_offer){
        action = "sorry, u can't put your offer with the same or less than before"
      } else {
        action = 'success add your offer'
         const newBid = await BidList.create({
          user_id: user_id,
          product_id: product_id,
          money_offer: money_offer
        })
        const product = await Product.findByPk(newBid.product_id);
         const updated = await product.update({currentPrice: newBid.money_offer});
         console.log(updated)
        // update product currentPrice amount
        console.log('pid',newBid.product_id)
        io.emit(`addBid-${newBid.product_id}`, updated)
      }
      return res.status(201).json(action)
    } catch (err) {
      console.log(err);
      next(err)
    }     
  }
  static async getHistoryOfBiding(req, res, next){
    const user_id = req.currentUser.id

    try {
      const history = await BidList.findAll({
        where: {id: user_id}, 
        include: Product
      })

    } catch (err) {
      
    }
  }

  static findBidByProduct(req, res, next){
    
  }
}

module.exports = productController

// module.exports = function (io) {
//   productController =  new productController(io)
//   console.log(productController)
// }