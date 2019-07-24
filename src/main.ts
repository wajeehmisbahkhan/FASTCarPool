import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Dynamically load map script
const script = document.createElement('script');  // create a script DOM node
// tslint:disable-next-line: max-line-length
script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMaps.apiKey}&region=PK&libraries=geometry,places`; // set its src to the provided URL
document.head.appendChild(script);


if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
