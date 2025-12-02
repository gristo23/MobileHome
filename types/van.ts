// types/van.ts
export type van = {
  id: string;
  title: string;
  location: string;
  image: string;      // suur pilt (detailvaates)
  thumbnail: string;  // väike pilt (listis)
  description: string;
  features: string[];
  price: number;
};
