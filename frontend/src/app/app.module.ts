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
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';
import { tap } from 'rxjs/operators';

let googleClientId;

export function getAuthSettings(http: HttpClient) {
  return () =>
    http
      .get('/api/get_auth_setting')
      .pipe(
        tap(
          (authSettings: any) => (googleClientId = authSettings.googleClientId)
        )
      )
      .toPromise();
}

export function provideConfig() {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(googleClientId)
    }
  ]);
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
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getAuthSettings,
      multi: true,
      deps: [HttpClient]
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
