export type Campus = {
  id: string;
  city: "Hyderabad" | "Vijayawada" | "Guntur" | "Vizag";
  state: string;
  name: string;
  area: string;
  type: string;
  audience: string;
  image: string;
  mapsQuery: string;
};

export const campuses: Campus[] = [
  { id: "01", city: "Hyderabad", state: "Telangana", name: "Harvard Campus", area: "MADHAPUR", type: "Residential Campus", audience: "Boys Campus", image: "/images/campus/branches/hyderabad-harvard-madhapur.jpg", mapsQuery: "Dhanik Bharat Harvard Campus - MADHAPUR Hyderabad" },
  { id: "02", city: "Hyderabad", state: "Telangana", name: "MIT Campus", area: "MADHAPUR", type: "Residential Campus", audience: "Boys Campus", image: "/images/campus/branches/hyderabad-mit-madhapur.jpg", mapsQuery: "Dhanik Bharat MIT Campus - MADHAPUR Hyderabad" },
  { id: "03", city: "Hyderabad", state: "Telangana", name: "Caltech Campus", area: "BONGULURU", type: "Residential Campus", audience: "Boys Campus", image: "/images/campus/branches/hyderabad-caltech-bonguluru.jpg", mapsQuery: "Dhanik Bharat Caltech Campus - BONGULURU Hyderabad" },
  { id: "04", city: "Hyderabad", state: "Telangana", name: "Stanford Campus", area: "MADHAPUR", type: "Residential Campus", audience: "Girls Campus", image: "/images/campus/branches/hyderabad-stanford-madhapur.jpg", mapsQuery: "Dhanik Bharat Stanford Campus - MADHAPUR Hyderabad" },
  { id: "05", city: "Hyderabad", state: "Telangana", name: "Boston Campus", area: "MADINAGUDA", type: "Day Scholar Campus", audience: "Day Scholar", image: "/images/campus/branches/hyderabad-boston-madinaguda.jpg", mapsQuery: "Dhanik Bharat Boston Campus - MADINAGUDA Hyderabad" },
  { id: "06", city: "Hyderabad", state: "Telangana", name: "Michigan Campus", area: "KUKATPALLY", type: "Day Scholar Campus", audience: "Day Scholar", image: "/images/campus/branches/hyderabad-michigan-kukatpally.jpg", mapsQuery: "Dhanik Bharat Michigan Campus - KUKATPALLY Hyderabad" },
  { id: "07", city: "Hyderabad", state: "Telangana", name: "Cornell Campus", area: "LBNAGAR", type: "Day Scholar / Semi-Residential Campus", audience: "Day / Semi-Residential", image: "/images/campus/branches/hyderabad-cornell-lbnagar.jpg", mapsQuery: "Dhanik Bharat Cornell Campus - LBNAGAR Hyderabad" },
  { id: "08", city: "Vijayawada", state: "Andhra Pradesh", name: "Harvard Campus", area: "RAMAVARAPADU", type: "Residential / Semi-Residential / Day Scholar Campus", audience: "Boys Campus", image: "/images/campus/branches/vijayawada-harvard-ramavarapadu.jpg", mapsQuery: "Dhanik Bharat Harvard Campus - RAMAVARAPADU Vijayawada" },
  { id: "09", city: "Vijayawada", state: "Andhra Pradesh", name: "Stanford Campus", area: "RAMAVARAPADU", type: "Residential / Semi-Residential / Day Scholar Campus", audience: "Girls Campus", image: "/images/campus/branches/vijayawada-stanford-ramavarapadu.jpg", mapsQuery: "Dhanik Bharat Stanford Campus - RAMAVARAPADU Vijayawada" },
  { id: "10", city: "Vijayawada", state: "Andhra Pradesh", name: "Boston Campus", area: "LABBIPET", type: "Day Scholar / Semi-Residential Campus", audience: "Day / Semi-Residential", image: "/images/campus/branches/vijayawada-boston-labbipet.jpg", mapsQuery: "Dhanik Bharat Boston Campus - LABBIPET Vijayawada" },
  { id: "11", city: "Guntur", state: "Andhra Pradesh", name: "Harvard Campus", area: "PEDDAPALAKLURU", type: "Residential Campus", audience: "Boys Campus", image: "/images/campus/branches/guntur-harvard-peddapalakur.jpg", mapsQuery: "Dhanik Bharat Harvard Campus - PEDDAPALAKLURU Guntur" },
  { id: "12", city: "Guntur", state: "Andhra Pradesh", name: "Stanford Campus", area: "REDDY PALEM", type: "Residential Campus", audience: "Girls Campus", image: "/images/campus/branches/guntur-stanford-reddy-palem.jpg", mapsQuery: "Dhanik Bharat Stanford Campus - REDDY PALEM Guntur" },
  { id: "13", city: "Guntur", state: "Andhra Pradesh", name: "Queensland", area: "ASHOKNAGAR", type: "Residential Campus", audience: "Girls Campus", image: "/images/campus/branches/guntur-queensland-ashok-nagar.jpg", mapsQuery: "Dhanik Bharat Queensland - ASHOKNAGAR Guntur" },
  { id: "14", city: "Guntur", state: "Andhra Pradesh", name: "Boston Campus", area: "ZUDIO BUILDING", type: "Day Scholar / Semi-Residential Campus", audience: "Day / Semi-Residential", image: "/images/campus/branches/guntur-boston-zudio-building.jpg", mapsQuery: "Dhanik Bharat Boston Campus - ZUDIO BUILDING Guntur" },
  { id: "15", city: "Vizag", state: "Andhra Pradesh", name: "Harvard Campus", area: "CARSHED JUNCTION", type: "Residential / Semi-Residential / Day Scholar Campus", audience: "Boys Campus", image: "/images/campus/branches/vizag-harvard-carshed-junction.jpg", mapsQuery: "Dhanik Bharat Harvard Campus - CARSHED JUNCTION Vizag" },
  { id: "16", city: "Vizag", state: "Andhra Pradesh", name: "Stanford Campus", area: "CARSHED JUNCTION", type: "Residential / Semi-Residential / Day Scholar Campus", audience: "Girls Campus", image: "/images/campus/branches/vizag-stanford-carshed-junction.jpg", mapsQuery: "Dhanik Bharat Stanford Campus - CARSHED JUNCTION Vizag" },
];

export const cities = ["Hyderabad", "Vijayawada", "Guntur", "Vizag"] as const;
