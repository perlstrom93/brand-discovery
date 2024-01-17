"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Brand from './brand';

export default function BrandsPage() {
  const jsonData = require('../../public/BRANDS_OUTPUT.json');
  const entries = Object.entries(jsonData);
  const sortedEntries = entries.sort((a: any, b: any) => a[1].INDEX - b[1].INDEX);
  const sortedBrands = Object.fromEntries(sortedEntries);
  const keys = Object.keys(sortedBrands);

  const brandParam = useSearchParams().get('brand');

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(keys);

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Use filter to get the matching items
    const filteredItems = keys.filter(brand =>
      brand.toLowerCase().includes(query.toLowerCase())
    );

    // Update the filtered data state
    setFilteredData(filteredItems);
  };

  const renderBrands = () => {
    const brandsList = filteredData.map((key, i) => {
      const {TIER: tier, INDEX: index} = jsonData[key];

      return (
        <li key={index}>
          <Link className="flex flex-auto flex-row" href={`/brands?brand=${key}`}>
            <p className="w-12 pr-1 text-right">{index}.</p>
            {key}
            <p className="pl-3">{tier}</p>
          </Link>
        </li>
      )
    });

    return brandsList;
  }

  return (
    <main className="flex min-h-screen max-h-screen flex-row justify-between p-24">
      <div className="z-10 p-8 w-1/3 items-left flex-auto flex-col justify-start font-mono text-sm lg:flex relative">
        <div className="flex flex-initial flex-row relative">
          <h1 className="text-2xl">Brands</h1>
          <input
            className="mx-8 my-2 px-4 w-full rounded text-black max-h-5"
            type="text"
            placeholder="Search Brands..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <ol className="overflow-y-scroll overscroll-auto max-h-screen">
          {renderBrands()}
        </ol>
      </div>
      { brandParam &&
        <div className="z-10 w-2/3 flex-auto flex-row lg:flex relative">
          <div className="z-10 p-8 w-1/3 items-left flex-auto flex-col justify-between font-mono text-sm lg:flex relative">
            <Brand brand={brandParam} brand_results={jsonData[brandParam]['RESPONSE']} filterResults />
          </div>
          <div className="z-10 p-8 w-1/3 items-left flex-auto flex-col justify-between font-mono text-sm lg:flex relative">
            <Brand brand={brandParam} brand_results={jsonData[brandParam]['RESPONSE']} />
          </div>
        </div>
      }
    </main>
  )
}
