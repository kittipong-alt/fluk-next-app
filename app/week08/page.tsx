import { Suspense } from "react";
import Loading from "./components/Loading";
import { ShopItem } from "./components/ShopItem";
import ShopList from "./components/ShopList";

export default function ShopHome() {

return (
   <div className="max-w-3xl mx-auto mt-6">
    <h1 className="text-3xl font-bold">ร้านค้า (Shop List)
    </h1>
    <Suspense fallback={<Loading />}>
    <ShopList data={ShopItem} />
    </Suspense>
   </div>
);

}