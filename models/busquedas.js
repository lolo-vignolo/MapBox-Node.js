require('dotenv').config();
const axios = require('axios');

class Busquedas {
  constructor() {}

  historial = ['castelar', 'New York', 'Tokyo'];

  async ciudad(lugar = '') {
    //peticios HTTP
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: {
          access_token: process.env.TOKEN_CNN,
          limit: 5,
          language: 'es',
          types: 'place',
          proximity: 'ip',
        },
      });

      const resp = await instance.get();
      const placeSearched = resp.data.features;
      return placeSearched.map((place) => ({
        id: place.id,
        name: place.place_name,
        lat: place.center[1],
        lng: place.center[0],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async clima(lat, lng) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat: lat,
          lon: lng,
          appid: process.env.WEATHER_CNN,
          units: 'metric',
        },
      });

      const resp = await instance.get();
      const placeclima = resp.data;
      return placeclima;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async guardarHistorial(ciudad = '') {
    if (this.historial.includes(ciudad.toLocaleLowerCase())) return;
    this.historial.unshift(ciudad.toLocaleLowerCase());
  }
}

module.exports = Busquedas;
