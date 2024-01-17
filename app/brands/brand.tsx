import Image from 'next/image'

export default function BrandPage(
  { brand,
    brand_results,
    filterResults = false
  }:
  { brand: string,
    brand_results: Array<{name : string, domain : string, icon : string, brandId : string}>,
    filterResults?: boolean
}) {
  const allowedDomains = ['com', 'uk', 'org', 'app'];

  const renderResults = () => {
    let brandToMap;

    if (filterResults) {
      brandToMap = brand_results.filter(({ domain }) => {
        const splitDomain = domain.split('.');
        const lastDomainSegment = splitDomain[splitDomain.length - 1];
        if (allowedDomains.includes(lastDomainSegment)) return true;
        return false
      });
    } else {
      brandToMap = brand_results
    }

    return brandToMap.map(({ name, domain, icon, brandId }) => (
        <div key={brandId} className="p-8 px-0 flex flex-auto flex-row">
          <img src={icon} className="rounded-xl" width="50" height="50"></img>
          <div className="flex-col p-4 py-0">
            <h3 className="text-lg">{name}</h3>
            <a
              href={`https://www.${domain}`}
              target="blank_"
            >
              {domain}
            </a>
          </div>
        </div>
      )
    )
  };

  return (
    <div className="">
      <h2 className="text-xl">{brand}{filterResults ? ' (Filtered)' : ''}</h2>
      {
        !filterResults &&
        <button
          className="absolute top-0 right-0 text-xl p-8 close"
          onClick={() => window.location.href='/brands'}
        >
          X
        </button>
      }
      <div>
        {renderResults()}
      </div>
    </div>
  )
}
