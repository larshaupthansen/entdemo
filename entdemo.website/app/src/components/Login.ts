
/// <reference path="../../../tools/typings/tsd.d.ts" />

/// <reference path="../model/profile.ts" />

/* tslint:disable */ 
import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {IAuthenticationService,AuthenticationService,ExternalLoginViewModel} from 'app/service/authenticationservice'

@Component({
  selector: 'login',
  // `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a recursive
  // list of more bindings.
   injectables: [
    
  ]
})

// 
@View({
  templateUrl: 'app/views/components/login.html',
  directives: [For, If]
})
/* tslint:enable */


class Login {

  loggedIn: boolean;
  profile: model.Profile = new model.Profile();
  authenticationService : IAuthenticationService;
  loginProviders: ExternalLoginViewModel[];

  constructor() {
  
      this.authenticationService = new AuthenticationService();
      
      this.loginProviders = new Array<ExternalLoginViewModel[]>();
      this.loginProviders.push( {
        Name: 'test',
        Url : ''
        
      });
      
      var callback = (data: ExternalLoginViewModel[]) => this.loginProviders = data;
      this.authenticationService.getLoginProviders(callback); 
      
      this.loggedIn = sessionStorage.getItem('Bearer') != null;
      if (this.loggedIn) {
        this.getProfile();
      }
  }


  loginLinkedIn() : boolean {

    this.authenticationService.redirectToLinkedLogin();
    return true;
  }

  getProfile()  {
    this.authenticationService.getLinkedInProfile( function(data: model.Profile) {this.profile = data });
  }

  logoutLinkedIn(): boolean {
    return true;
  }

}
