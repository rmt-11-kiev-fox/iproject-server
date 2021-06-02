const express = require("express");
const router = express();
const Controller = require("../controllers/review");
// const authentication = require("../middlewares/authentication");
const { reviewAuthorization } = require("../middlewares/authorization");

router.get("/reviews", Controller.ShowAllMovieReview);
router.post("/reviews", Controller.addReview);
// router.get(
//   "/reviews/:reviewId",
//   reviewAuthorization,
//   Controller.ShowAOneReview
// );
// router.use("/reviews", reviewAuthorization);
router.use("/reviews", reviewAuthorization);
router.put("/reviews", Controller.putEditReview);
router.delete("/reviews", Controller.deleteReviewlist);

module.exports = router;
