
/// <reference path="../../tools/typings/tsd.d.ts" />

/// <reference path="model/profile.ts" />

/* tslint:disable */ 
import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {bind} from 'angular2/di';

import {IAuthenticationService,AuthenticationService,ExternalLoginViewModel} from 'app/service/authenticationservice'
import {Login} from 'app/components/login'

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

  time: string;

  constructor() {
  
      this.time = '';

      setInterval(function() {
        this.time = (new Date()).toString();
        }.bind(this), 1);

  }
}
bootstrap(Main);
