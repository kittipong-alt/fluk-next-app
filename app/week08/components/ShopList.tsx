'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ShopList({ data}){

 const[keyword, setKeyword]= useState('');

 const filterShop = data.filter(
    item =>{
    const searchText = keyword.toLowerCase();
    return item.name.toLowerCase().includes(searchText);
    }
);
  return (
<div className="max-w-3xl ma-auto p-6">
      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search shop..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mb-4 text-gray-600">
            Found {filterShop.length} shop(s)
        </div>
        <div className="space-y-4">
        {
        /* Display shop */
        filterShop.map(shop => (
         <div key={shop.id} className="border rounded-lg p-4">
           <h2 className="font-semibold">
            {shop.name}
           </h2>
           <p>Open status: {shop.openStatus}</p>
           <Link href={`/week08/${shop.id}`}
           className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded">
           View Detail
           </Link>
         </div>
        ))}
        </div>

      </div>
</div>
  );
}