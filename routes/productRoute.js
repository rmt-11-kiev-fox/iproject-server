const router = require("express").Router();
const product = require("../controllers/productController");
const authentication = require("../middlewares/authentication");
const auth = require("../middlewares/authentication");

router.get("/", product.getAll);
// router.get("/types", product.getByType);
// router.get("/brands", product.getByBrand);
// router.get("/categories", product.getByCategory);
// router.get("/tags", product.getByTag);

router.use(authentication);

router.post("/add", product.addProduct);
module.exports = router;
