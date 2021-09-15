import { stringify } from 'query-string';

// Points API : https://api.weather.gov/points/40.0027,-75.2581
// Forecast API: https://api.weather.gov/gridpoints/PHI/45,77/forecast
// Hourly Forecast: https://api.weather.gov/gridpoints/PHI/45,77/forecast/hourly

const URL_BASE = 'https://api.weather.gov';

async function makeRequest(path, params = {}) {
  try {
    const response = await fetch(`${URL_BASE}/${path}?${stringify(params)}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

function fetchPoint(lat, lng) {
  return makeRequest(`points/${lat},${lng}`);
}

async function fetchForecastUrls(lat, lng) {
  const { properties: { forecast, forecastHourly }} = await fetchPoint(lat, lng);
  return { forecast, forecastHourly };
}

export {
  fetchForecastUrls,
};
