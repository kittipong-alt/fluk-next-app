import { Suspense } from "react";
import Loading from "./components/Loading";
import { ShopItem } from "./components/ShopItem";
import ShopList from "./components/ShopList";

export default async function ShopHome() {

   let shops = {};

   try {
  const shopData = await fetch(`http://localhost:3000/shops`);
  if (!shopData.ok){
   console.log(`Network response ไม่ได้ กรุณาตรวจสอบ API.`);
   }
   shops = await shopData.json();

   }catch(error) {
      console.log(`Error fetching data: ${error}`);
   }

return (
   <div className="max-w-3xl mx-auto mt-6">
    <h1 className="text-3xl font-bold">ร้านค้า (Shop List)
    </h1>
    <Suspense fallback={<Loading />}>
    <ShopList data={shops} />
    </Suspense>
   </div>
);

}