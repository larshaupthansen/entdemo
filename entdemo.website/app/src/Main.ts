
/// <reference path="../../tools/typings/tsd.d.ts" />

/// <reference path="model/profile.ts" />

/* tslint:disable */ 
import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {AuthenticationService} from 'app/service/authenticationservice'

@Component({
  selector: 'entdemo-app',
   injectables: [
  ]
})

@View({
  templateUrl: 'app/views/main.html',
  directives: [For, If]
})
/* tslint:enable */


class Main {

  loggedIn: boolean;
  profile: model.Profile = new model.Profile();
  time: string;
  authenticationService: AuthenticationService;


  constructor(authenticationService : AuthenticationService) {

      this.time = '';
      this.loggedIn = sessionStorage.getItem('Bearer') != null;
      if (this.loggedIn) {
        this.getProfile();
      }

      setInterval(function() {
        this.time = (new Date()).toString();
        }.bind(this), 1);

  }


  loginLinkedIn() : boolean {

    this.authenticationService.redirectToLinkedLogin();
    return true;
  }

  getProfile()  {
   // this.authenticationService.getProfile( (data: Profile) => this.profile = data );
  }

  logoutLinkedIn(): boolean {
    return true;
  }

}
bootstrap(Main, [
  bind(AuthenticationService).toValue(new AuthenticationService())
], () => { });
