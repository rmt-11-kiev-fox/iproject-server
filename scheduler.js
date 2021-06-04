const cron = require('node-cron');
const { Product, Category, Like, BidList } = require('./models');


class Tasks {
  static closeBid (io) {
    return cron.schedule('*/1 * * * *', async () =>  {
      const products = await Product.findAll({where: {status: 'available'}})
      // console.log(io, 'io');
      console.log('product', products.length)
      for(const product of products) {
        const now = new Date()
        console.log(product.endBid, now);
        if(product.endBid <= now){
          console.log('iffff')
          const update = await product.update({
            status: 'closed',
          })
          io.emit(`closeBid-${product.id}`)
          console.log('up',update.dataValues);
        }
      }
      
      // open

    });
  }

  static openBid (io) {
    return cron.schedule('*/1 * * * * *', async () =>  {
      const products = await Product.findAll({where: {status: 'unavailable'}})
      // console.log(io, 'io');
      console.log('product', products.length)
      for(const product of products) {
        const now = new Date()
        console.log(product.endBid, now);
        if(product.startBid >= now){
          console.log('iffff')
          const update = await product.update({
            status: 'available',
          })
          io.emit(`openBid-${product.id}`)
          console.log('up',update.dataValues);
        }
      }
      
      // open

    });
  }
}

module.exports = Tasks

