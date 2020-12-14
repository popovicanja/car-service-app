function getManufactures() {
  return [
    { id: 1, name: "Peugeot" },
    { id: 2, name: "Volkswagen" },
    { id: 3, name: "Citroen" },
    { id: 4, name: "Audi" },
    { id: 5, name: "Bmw" },
    { id: 6, name: "Seat" },
    { id: 7, name: "Alfa Romeo" },
    { id: 8, name: "Kia" },
    { id: 9, name: "Hyndai" },
    { id: 10, name: "Honda" },
    { id: 11, name: "Toyota" },
  ];
}

function getServices() {
  return [
    { id: 1, name: "Zamjena ulja i filtera", price: 500 },
    { id: 2, name: "Servis klima uredjaja", price: 299 },
    { id: 3, name: "Promjena Pakni", price: 450 },
    { id: 4, name: "Promjena guma", price: 100 },
    { id: 5, name: "Balansiranje guma", price: 50 },
    { id: 6, name: "Zamjena ulja u kocnicama", price: 229 },
  ];
}

export { getManufactures, getServices };
