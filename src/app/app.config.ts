import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes ,
     withViewTransitions() ),
      provideClientHydration() ,
     provideHttpClient(withFetch()),
     provideAnimations(),
    //  importProvidersFrom( BrowserAnimationsModule ) ,
    ]
};

