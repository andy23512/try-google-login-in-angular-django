import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private apollo: Apollo) {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      console.log(user);
      this.user = user;
      this.loggedIn = user != null;
      this.apollo
        .mutate({
          mutation: gql`
            mutation SocialAuth($accessToken: String!) {
              socialAuth(accessToken: $accessToken, provider: "google-oauth2") {
                social {
                  uid
                }
                token
              }
            }
          `,
          variables: {
            accessToken: user.authToken
          }
        })
        .subscribe(console.log);
    });
  }
}
