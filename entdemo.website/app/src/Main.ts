/* tslint:disable */ 

import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {} from 'tools/typings/linkedin';
@Component({
  selector: 'entdemo-app',
  injectables: []
  })



@View({
  templateUrl: 'views/main.html',
  directives: [For, If]
})
/* tslint:enable */

class Main {

  loggedIn: boolean;
  profile: any; // test

  constructor() {

      this.loggedIn = IN.User.isAuthorized();
  }


  loginLinkedIn() : boolean {
          console.log('LOGGED IN');

      IN.User.authorize(() => {
          this.loggedIn = true;
          IN.API.Raw('/people/~:(id,formatted-name,location,headline,industry,picture-url,email-address)').result(function(data) {
                    console.log(data);
                    this.profile = data;
                }).error(function(error) {console.log(error); });
        }, null);
      return true;
  }

  logoutLinkedIn(): boolean {
      console.log('LOGGED OUT');
      IN.User.logout(() => {
          this.loggedIn = false;
      }, null);
    return true;
  }

}
bootstrap(Main);
