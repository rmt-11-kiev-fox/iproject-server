const router = require("express").Router();
const product = require("../controllers/productController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", product.getAll);

router.use(authentication);
router.post("/add", product.addProduct);
router.get("/myList", product.getAllRec);

router.use("/:id", authorization);
router.delete("/:id/myList", product.delete);

module.exports = router;
