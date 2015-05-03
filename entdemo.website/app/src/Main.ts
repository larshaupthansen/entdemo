
/// <reference path="../../tools/typings/tsd.d.ts" />

/// <reference path="model/profile.ts" />

/* tslint:disable */ 
import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {IAuthenticationService,AuthenticationService,ExternalLoginViewModel} from 'app/service/authenticationservice'

@Component({
  selector: 'entdemo-app',
  // `bindings` can be a list of `Type`, {@link Binding}, {@link ResolvedBinding}, or a recursive
  // list of more bindings.
   injectables: [
    
  ]
})

// 
@View({
  templateUrl: 'app/views/main.html',
  directives: [For, If]
})
/* tslint:enable */


class Main {

  loggedIn: boolean;
  profile: model.Profile = new model.Profile();
  time: string;
  authenticationService : IAuthenticationService;
  loginProviders: ExternalLoginViewModel[];

  constructor() {
  
      this.authenticationService = new AuthenticationService();
      
      this.loginProviders = new Array<ExternalLoginViewModel[]>();
      this.loginProviders.push( {
        Name: "test",
        Url : ""
        
      })
      
      var callback = (data: ExternalLoginViewModel[]) => this.loginProviders = data;
      this.authenticationService.getLoginProviders(callback); 
      
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
    this.authenticationService.getLinkedInProfile( function(data: model.Profile) {this.profile = data });
  }

  logoutLinkedIn(): boolean {
    return true;
  }

}
bootstrap(Main, [ bind(IAuthenticationService).toValue(new AuthenticationService()) ]);
