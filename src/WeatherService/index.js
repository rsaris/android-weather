import { stringify } from 'query-string';

const URL_BASE = 'https://api.weather.gov';
const PHL_LAT='40.0026767';
const PHL_LNG='-75.2581117';

const PHL_STATION_ID='KPHL';
const PHL_WFO='PHI';
const PHL_X_Y='45,77';

async function makeRequest(path, params = {}) {
  try {
    const response = await fetch(`${URL_BASE}/${path}?${stringify(params)}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function loadPoint(lat = PHL_LAT, lng = PHL_LNG) {
  return makeRequest(`points/${lat},${lng}`);
}

export async function loadPhillyForecast(lat = PHL_LAT, lng = PHL_LNG) {
  const response = await fetch(`https://api.weather.gov/gridpoints/${PHL_WFO}/${PHL_X_Y}/forecast`);
  const responseJson = await response.json();
  return responseJson.properties.periods[0].detailedForecast;
}
