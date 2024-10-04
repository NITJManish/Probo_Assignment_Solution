const express=require("express");
const fluctuatePrice =require("../controller/stock");
const router = express.Router();

router.route("/stock-price").get(fluctuatePrice);

router.route('/trade').post(fluctuatePrice.tradeUtils);

app.route('/summary').get(fluctuatePrice.summaryUtils);


module.exports=router;