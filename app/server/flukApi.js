import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import db from "./config/firebase.js";

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

// Object array
app.get('/', (req, res)=>{
    res.send('Kittipong')

})
app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})

const myShop = [
    {
        shopId: 100,
        shopName: "Adidas",
        shopContact:"admin.adidas@gmail.com",
        shopAddress:"Dindaeng,Bangkok,10400",
        shopOpen:true
    },
    {
    shopId: 200,
        shopName: "Mcshop",
        shopContact:"mc.shop@gmail.com",
        shopAddress:"Bangyhai,Nontaburi,10400",
        shopOpen:true
  },
  {
    shopId: 300,
        shopName: "Uniqlo",
        shopContact:"admin.uniqlo@gmail.com",
        shopAddress:"Huai Khwang,Bangkok,10400",
        shopOpen:true
  },
]
async function getShop() {
   const result = [];
   const shopDocs = db.collection('shops_new').get();
    shopDocs.forEach(doc => {
    result.push({
     id: doc.id,
     ...doc.data()
  });
});

  return result;
}

// httip://localhost:3000/api/shops
app.get('/api/shops',async (req, res) => {
  try {
    const snapshot = await db
      .collection("shops_new")
      .orderBy("shopName", "desc")
      .get();

    const shops = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(shops);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch shops",
      error: error.message,
    });
  }
});
app.get('/shops{/:shopId}', (req, res, next) => {
 // res.set('Content-type', 'application/json')
 
  try {
    let shid = Number(req.params.shopId);
    if(isNaN(shid)){
        getShops().then((jsonData) => {
         return  res.json(jsonData);
      }
     ).catch((error) => {
       return res.json({
      message: error
    });
  })
  res.end();
      //  res.json(myShop);
      //  res.send("Please provide the specific shop ID, please try again.");
      //  throw new Error('Please provide the specific shop ID, please try again.');
    }
    const myRes = myShop.filter(
        myObj => { return (myObj.shopId === shid) }
    );

    const isEmptyArray = Array.isArray(myRes) && myRes.length === 0;
    if(isEmptyArray){
        
     res.send("Please provide the specific shop ID, please try again.");
     throw new Error("Shop ID not found, please try again.");
    }
    
    // let myText = '';
    // myText+= `<h1>Shop information:</h1><hr/>`;
    // myText+= `<b>Shop ID:</b> ${myRes[0].shopId}<br/>`;
    // myText+= `<b>Name:</b> ${myRes[0].shopName}<br/>`;
    // myText+= `<b>Contact:</b> ${myRes[0].shopContact}<br/>`;
    // myText+= `<b>Address:</b> ${myRes[0].shopAddress}<br/>`;
   //  myText+= `<b>Shop Status:</b> ${myRes[0].shopOpen}<br/>`;
    // res.send(myText);
    res.json(myRes[0]); // {..}
  }catch (error){
    next(error);
  }
    
});
// การอ่านข้อมูลร้านค้าจากไฟร์เบสด้วย id (Method: GET)
// Endpoint: http://localhos:xxxx/api/shops/100
app.get('/api/shops/:id', async (req, res) => {
    try {
      const doc = await db
      .collection("shops_new")
    .doc(req.params.id)
    .get();

      res.json({
  id: doc.id,
  ...doc.data(),
      });
    } catch (error) {
      res.status(500).json(
  {
    message: "FAILED: Error with retrieving shop using the shopId.",
    error: error.message
  }
      );
    }
});

// การลบข้อมูลร้านค้าจากไฟร์เบสด้วย id (Method: DELETE)
const deleteShop = async (req, res) => {
    const ShopRef = db
      .collection("shops_new")
      .doc(req.params.id);
 
    await ShopRef.delete();
 
    res.status(200).json({
      message: "Shop deleted successfully",
      id: req.params.id,
    });
}
 
// App route:/api/shops/:id (Method: DELETE)
// Endpoint: http://localhost:xxxx/api/shops/100
app.delete('/api/shops/:id', (req, res) => {
  try {
    deleteShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to deletingshop.",
      error: error.message,
    });
  }
});

// การสร้างข้อมูลร้านค้าในไฟร์เบส (Method: POST)
const createShop = async (req, res) => {
    const {
      shopName,
      shopAddress,
      shopContact,
      shopOpen,
    } = req.body;
 
    if (!shopName || !shopContact || !shopAddress) {
      return res.status(400).json({
     
  message: "Name, address and contact are required",
      });
    }
 
    const shopRef = await db.collection("shops_new").doc();
    const newId = shopRef.id; // Access the generated ID
 
    const newShop = {
      shopId: newId,
      shopName,
      shopAddress,
      shopContact,
      shopOpen: shopOpen === 'true',
    };
 
    const docRef = await db
      .collection("shops_new")
      .add(newShop);
 
    res.status(201).json({
      id: docRef.id,
      ...newShop,
    });
}
 
// App route: /api/shops(Method: POST)
// Endpoint: http://localhost:xxxx/api/shops
app.post('/api/shops', (req, res) => {
  try {
    createShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to addingshop.",
      error: error.message,
    });
  }
});