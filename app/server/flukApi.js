import express from "express";

const app = express()
const port = 3000
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
        shopContact:"kittipong9160@gmail.com",
        shopAddress:"Dindaeng,Bangkok,10400",
        shopOpen:true
    },
]
app.get('/shops{/:shopId}', (req, res, next) => {
  try {
    let shid = Number(req.params.shopId);
    if(isNaN(shid)){
        res.json(myShop);
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