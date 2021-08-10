const routes = require("express").Router();
const { ProductController } = require("../controllers");
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
  getAllProduct,
  changeStatusProduct,
  getAllFilteredProduct,
} = ProductController;
const { authentication } = require("../middlewares/authentications");
const { authorizationProduct } = require("../middlewares/authorizations");

routes.use(authentication);

routes.get("/all-product", getAllProduct);
routes.get("/all-product-filter/", getAllFilteredProduct);
routes.get("/products", getProduct);
routes.post("/products", createProduct);
routes.get("/products/:id", getOneProduct);
routes.patch("/products/:id", changeStatusProduct);
routes.delete("/products/:id", authorizationProduct, deleteProduct);
routes.put("/products/:id", authorizationProduct, updateProduct);

module.exports = routes;
