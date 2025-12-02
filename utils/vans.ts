import { van as Van } from "../types/van";

export const vans: Van[] = [
  {
    id: "1",
    title: "Volkswagen California",
    location: "Tallinn",
    image: "https://example.com/california.jpg",
    thumbnail: "https://example.com/california-thumb.jpg",
    price: 120,
    description: "Kompaktne matkaauto 4 inimesele.",
    features: ["Köök", "Voodi", "Päikesepaneelid"],
  },
  {
    id: "2",
    title: "Fiat Ducato Camper",
    location: "Tartu",
    image: "https://example.com/ducato.jpg",
    thumbnail: "https://example.com/ducato-thumb.jpg",
    price: 95,
    description: "Ruumikas ja mugav pikemaks reisiks.",
    features: ["WC", "Dušš", "GPS"],
  },
];
