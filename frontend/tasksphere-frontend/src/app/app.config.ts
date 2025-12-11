import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpLink } from 'apollo-angular/http';
import { routes } from './app.routes';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { provideHttpClient } from '@angular/common/http';

export function apolloOptionsFactory(
  httpLink: HttpLink
): ApolloClientOptions {
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: 'http://localhost:4000/graphql'
    })
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    Apollo,
    HttpLink,
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloOptionsFactory,
      deps: [HttpLink]
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ]
};
