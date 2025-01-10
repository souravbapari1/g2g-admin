import { Trash } from "lucide-react";
import React from "react";

const brands = [
  {
    name: "Nike",
    imageUrl:
      "https://www.pocketful.in/blog/wp-content/uploads/2024/09/image-6-1024x576.png",
    url: "https://www.nike.com",
  },
  {
    name: "Adidas",
    imageUrl:
      "https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.png",
    url: "https://www.adidas.com",
  },
  {
    name: "Puma",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg",
    url: "https://us.puma.com",
  },
  {
    name: "Reebok",
    imageUrl:
      "https://www.pngall.com/wp-content/uploads/8/Reebok-Logo-Transparent.png",
    url: "https://www.reebok.com",
  },
  {
    name: "Under Armour",
    imageUrl:
      "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2020/03/11131547/unnamed.png",
    url: "https://www.underarmour.com",
  },
  {
    name: "New Balance",
    imageUrl:
      "https://download.logo.wine/logo/New_Balance/New_Balance-Logo.wine.png",
    url: "https://www.newbalance.com",
  },
  {
    name: "Asics",
    imageUrl: "https://www.finessewebtech.com//userpanel/images/ngo.png",
    url: "https://www.asics.com",
  },
  {
    name: "Vans",
    imageUrl:
      "https://parmaarth.org/public/uploads/all/ngo%20in%20varanasi.png",
    url: "https://www.vans.com",
  },
];

const ClubSponsors: React.FC = () => {
  return (
    <main className="flex-grow  mx-auto mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex flex-col relative items-center justify-center bg-white border-t-4 border-primary/10 border-t-primary border shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="absolute top-4 right-4 bg-red-500 rounded-full p-2 text-white">
              <Trash size={15} />
            </div>
            <img
              src={brand.imageUrl}
              alt={brand.name}
              className="w-24 h-24 object-contain mb-4"
            />
            <p className="text-gray-700 text-sm font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ClubSponsors;
