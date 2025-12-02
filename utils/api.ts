// utils/api.ts
import type { van } from "../types/van";

const cities = ["Tallinn", "Tartu", "Pärnu", "Haapsalu"];
const gearboxes = ["Automaat", "Manuaal"];
const seatOptions = [2, 3, 4, 5, 6];

// Turvaline helper tagab, et URL on string ja https
function safeUrl(url: any, id: number, size: "small" | "large") {
  const fallback =
    size === "small"
      ? `https://picsum.photos/150?random=${id}`
      : `https://picsum.photos/800/500?random=${id}`;

  if (typeof url !== "string" || url.length === 0) return fallback;

  // JSONPlaceholder URLid on HTTP ja väga suured — teisendame HTTPS-iks
  const fixed = url.replace("http://", "https://");

  return fixed.startsWith("https") ? fixed : fallback;
}

export async function fetchVans(): Promise<van[]> {
  try {
    // Võtame 20 kuulutust — piiramatu kogus crashib Androidis rasvaste piltide tõttu
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=10"
    );

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();

    return (data as any[]).map((item: any) => {
      const id = Number(item.id) || Math.floor(Math.random() * 100000);

      // Kasutame listivaates ainult thumbnailit — detailis suurt pilti
      const thumbnail = safeUrl(item.thumbnailUrl, id, "small");
      const image = safeUrl(item.url, id, "large");

      return {
        id: String(id),
        title: String(item.title ?? "Matkaauto"),
        location: cities[id % cities.length],
        image,      // suur pilt detailivaates
        thumbnail,  // thumbnail listivaates
        description: "Demo kuulutus: " + String(item.title ?? "Matkaauto"),
        features: ["Köök", "Kliima", "WC"],
        price: 100 + (id % 60),
        gearbox: gearboxes[id % gearboxes.length],
        seats: seatOptions[id % seatOptions.length],
        petsAllowed: id % 2 === 0,
      } as van;
    });
  } catch (err) {
    console.error("API fetch error:", err);

    // Fallback demo andmetega
    return [
      {
        id: "demo-1",
        title: "Volkswagen California",
        location: "Tallinn",
        image: "https://i.postimg.cc/3xPsmXCm/vwcalifornia.jpg",
        thumbnail: "https://i.postimg.cc/3xPsmXCm/vwcalifornia-thumbnail.jpg",
        description: "Kompaktne matkaauto 3 inimesele.",
        features: ["Köök", "külmkapp", "Päikesepaneelid"],
        price: 95,
        gearbox: "Manuaal",
        seats: 3,
        petsAllowed: true,
      },
      {
        id: "demo-2",
        title: "Ford Trigano Ci",
        location: "Pärnu",
        image: "https://i.postimg.cc/0NYBmt7c/austrias.jpg",
        thumbnail: "https://i.postimg.cc/0NYBmt7c/austrias-thumbnail.jpg",
        description: "Kompaktne ja mugav pikemaks reisiks.",
        features: ["Diisel", "Köök", "WC"],
        price: 110,
        gearbox: "Manuaal",
        seats: 4,
        petsAllowed: false,
      },
      {
        id: "demo-3",
        title: "Ford Sunlight",
        location: "Tartu",
        image:
          "https://i.postimg.cc/W4GHr90f/k-3589239-Sunlight-Thermofenstermatte-T-Modell-FORD.jpg",
        thumbnail:
          "https://i.postimg.cc/W4GHr90f/k-3589239-Sunlight-Thermofenstermatte-T-Modell-FORD-thumbnail.jpg",
        description: "Mugav ja luksuslik pikemaks reisiks",
        features: ["Automaat", "Köök", "WC", "Kliima"],
        price: 180,
        gearbox: "Automaat",
        seats: 5,
        petsAllowed: true,
      },
    ] as unknown as van[];
  }
}
