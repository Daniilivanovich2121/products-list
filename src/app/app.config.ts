import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {productsReducer} from './components/products/store/products.reducer';
import * as productsEffects from './components/products/store/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(), provideStore(), provideEffects(productsEffects), provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode()
  })
  ,provideState({name: "Products", reducer: productsReducer}),]
};
