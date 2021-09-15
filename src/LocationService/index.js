import { PermissionsAndroid } from 'react-native';

import GeolocationService from 'react-native-geolocation-service';

async function fetchCurrentLatLng() {
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

  const position = await new Promise((resolve, reject) => {
    GeolocationService.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: false,
      },
    );
  });

  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
}

export {
  fetchCurrentLatLng,
};
