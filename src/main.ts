import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

  mapboxgl.accessToken = 'pk.eyJ1IjoibWFxYWxoZXIiLCJhIjoiY2wwM2ludnBhMWR5NjNibWxjb2gwdGwyYSJ9.JxgD6N5vYbPHAJegJ0Z2Pg';


if(!navigator.geolocation){
  alert('Navegador no soporta la Geolocation');
  throw new Error('Navegador no soporta la Geolocation');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
