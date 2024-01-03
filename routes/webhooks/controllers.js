const {Stripe}= require('../../common/helpers/stripe')
const { failedResponse, successResponse } = require("../../common/helpers/httpResponse");
const { Invoice } = require("../../schemas/invoice");
const { Order } = require("../../schemas/order");

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

const recieveWebhook= async(req,res)=>{
  const sig = req.headers['stripe-signature'];

  try{
    const event = Stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      endpointSecret
    );

    if(event.type!=="checkout.session.completed"){
      return res.status(200).send('OKAY')
    }


    const invoice= await Invoice.findById(event.data.object.metadata.invoice)

    if(!invoice){
      return res.status(200).send('OKAY')
    }
    invoice.status= 'paid'
    await invoice.save()

    await Promise.all(invoice.cartItems.map(async(item)=>{
      const order= new Order({
        user: invoice.user,
        vendor: item.product.vendor,
        invoice: invoice._id
      })
     return await order.save()
    }))

    return res.status(200).send('OKAY')
  } catch (err) {
    console.log(err);
    return failedResponse({
      res,
      err,
      status: 400
    })
  }

}


module.exports = {
  recieveWebhook
}