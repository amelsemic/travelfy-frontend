const getCoordsForAdress = async (address) => {
  const API_KEY = "AIzaSyDzZouwEabkmkSZ1ORWZkE_EE_WRIlVYR4";

  let lat, lng;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );

  let data = await response.json();

  lat = data.results[0].geometry.location.lat;
  lng = data.results[0].geometry.location.lng;

  return {
    lat,
    lng,
  };
};

export default getCoordsForAdress;
