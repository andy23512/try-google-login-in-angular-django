import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import {
  HttpClientModule,
  HttpClient,
  HttpClientXsrfModule
} from '@angular/common/http';

export function getCsrfToken(http: HttpClient) {
  return () => http.get('/api/csrf').toPromise();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'try-google-csrf',
      headerName: 'X-CSRFToken'
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getCsrfToken,
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
