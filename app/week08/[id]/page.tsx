import Link from "next/link";
import { ShopItem } from "../components/ShopItem";
import Loading from "../components/Loading";
import { Suspense } from "react";
import { Itim } from "next/font/google";

export default async function ShopDetail({ params}){
  // Object destructuring
  const {id} = await params;

  const shop = ShopItem.find(
    item => item.id === Number(id)
  );

return (
<Suspense fallback={<Loading />}>
<div className="w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold">
        Shop Detail
      </h1>

      <div
        key={shop.id} className="border rounded-lg p-4 m-4">
        <p className="mt-4 font-semibold">
          shop name: {shop.name}
        </p>
        <p className="my-4">
          Category: {shop.category}
        </p>
        <p className="my-4">
         Open Status: {shop.openStatus}
        </p>
      </div>

      <Link href=" /week08  " className="bg-gray-600 text-white px-4 py-2 rounded">Back</Link>

    </div>

</Suspense>
)

}