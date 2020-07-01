const functions = require('firebase-functions');
const express = require('express')
const crypto = require('crypto')
const bp = require('body-parser')
const cors = require('cors')
const rzp = require('razorpay')
var admin = require("firebase-admin");

var serviceAccount = require("./ofs.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://online-shop-32976.firebaseio.com"
});

const keys = {
    razorpay_key: {
        key_id: 'rzp_live_cBbJTiUVjvXaY4',
        key_secret: 'asA84HWEFfV8vqwzN424h6dS'
    },
    razorpay_test_key: {
        key_id: 'rzp_test_xQoYrmqy6S6WlL',
        key_secret: 'qZfN0HAboAMrJhENMPxN58WM'
    }
}

const instance = new rzp(keys.razorpay_test_key)
const app = express()
app.use(cors())
app.use(bp.json())
app.post('/create_order',async(req,res)=>{
    let amount = req.body.amount;
    let order_obj = req.body.order 
    if(amount && parseInt(amount) !=NaN){
        let ops = {
            amount:parseInt(amount)*100,
            payment_capture:0,
            currency:"INR",
            receipt:"USER ID: "+ req.body.user_id
        }
        let order_id = null
        console.log(amount,order_obj,ops)
        await instance.orders.create(ops,async (err,order)=>{
            console.log(err,order)
            if(err){
                console.log(err)
            }else{
                order_id = order.id
            }
        })
        if(order_id==null){
            res.json({code:400,msg:'error'})
            return
        }


        await admin.firestore().collection('users').doc(req.body.user_id).collection('orders').doc(order_id).set({
            cart:order_obj['cart'],
            price:order_obj['price'],
            date:order_obj['date'],
            user_details:order_obj['user']
        })
        await admin.firestore().collection('razorpay_orders').doc(order_id).set({
            user_id:req.body.user_id,
            price:order_obj['price'],
            date:order_obj['date'],
            cart:order_obj['cart'],
            user:order_obj['user']
        })
        res.json({order_id:order_id,code:200})

    }else{
        res.json({
            msg:'Error!',
            code:401
        })
    }
})

async function get_order(order_id){
    let data = null;
    let firestore = admin.firestore()
    await firestore.collection('razorpay_orders').doc(order_id).get().then(r=>{
        data = r.data()
    }).catch(e=>{
    
    })
    return data
}

app.post('/capture_transaction',async(req,res)=>{

    let signature = req.body.razorpay_signature
    let order_id = req.body.razorpay_order_id
    let payment_id = req.body.razorpay_payment_id
    console.log(signature,order_id,payment_id)
    let transaction_data = await get_order(order_id)
    
    if(transaction_data){
        if(signature == crypto.createHmac('SHA256', keys.razorpay_test_key.key_secret).update(order_id + '|' + payment_id).digest('hex')){
            instance.payments.capture(payment_id,parseInt(transaction_data.price)*100,async function (err,payment){
                if(err){
                    res.json({code:400,msg:'capture failed'})
                }else{
                    console.log(transaction_data)
                    let order = transaction_data.cart
                    const firestore = admin.firestore()
                    await firestore.collection('users').doc(transaction_data.user_id).collection('orders').doc(order_id).update({payment_id:payment_id})
                    await firestore.collection('razorpay_orders').doc(order_id).update({payment_id:payment_id})
                    for(var i=0;i<order.length;i++){
                        const dec = admin.firestore.FieldValue.increment(-order[i].count)

                        firestore.collection('products').doc(order[i].doc_id).update({
                            quantity:dec
                        })
                    }

                    res.json({code:200,msg:'payment success'})
                    
                }
            })
        }else{
            res.json({
                msg:'capture failed',
                code:401
            })
        }
    }else{
        res.json({
            msg:'capture failed',
            code:404
        })
    }

})
app.post('/capture_transaction_webhook',async(req,res)=>{

    let contains = req.body.contains
    let payment_found = false;
    for(var i=0;i<contains.length;i++){
        if(contains[i]=='payment'){
            payment_found=true
            break
        }
    }
    if(payment_found){

        let signature = req.get('X-Razorpay-Signature')
        let secret = "secretkey123890"
        
        if(true){
            if(signature == crypto.createHmac('SHA256', secret).update(JSON.stringify(req.body)).digest('hex')){
                let payment_id = req.body.payload.payment.entity.id
                let order_id = req.body.payload.payment.entity.order_id
                let transaction_data = await get_order(order_id)
                instance.payments.capture(payment_id,parseInt(transaction_data.price)*100,async function (err,payment){
                    if(err){
                        res.json({code:400,msg:'capture failed'})
                    }else{
                        console.log(transaction_data)
                        let order = transaction_data.cart
                        const firestore = admin.firestore()
                        await firestore.collection('users').doc(transaction_data.user_id).collection('orders').doc(order_id).update({payment_id:payment_id})
                        await firestore.collection('razorpay_orders').doc(order_id).update({payment_id:payment_id})
                        for(var i=0;i<order.length;i++){
                            const dec = admin.firestore.FieldValue.increment(-order[i].count)
    
                            firestore.collection('products').doc(order[i].doc_id).update({
                                quantity:dec
                            })
                        }
    
                        res.json({code:200,msg:'payment success'})
                        
                    }
                })
            }else{
                res.json({
                    msg:'capture failed',
                    code:401
                })
            }
        }else{
            res.json({
                msg:'capture failed',
                code:404
            })
        }
    }


})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.payment = functions.https.onRequest(app);
