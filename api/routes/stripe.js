const router=require("express").Router();
const stripe=require("stripe")('sk_test_51KvberEXHCMU0WpMYKZbHSk2VTIefNgzRY2wyqxODnAKTPlcstVD75ARuFfrTpeztM8Frdt4NDORHCTBIr1w1XXj00JS7kLeUd')

router.post("/payment",(req,res)=>{
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
              res.status(500).json(stripeErr);
            } else {
              res.status(200).json(stripeRes);
            }
          }
    )
})

module.exports= router