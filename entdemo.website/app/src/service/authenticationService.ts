/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../model/Profile.ts" />



export interface IAuthenticationService {
      
      getLinkedInProfile(callback: (data:model.Profile) => void);
      getLoginProviders(callback: (data: ExternalLoginViewModel[])=> void); 
      
}
/* tslint:disable */
//import {Injectable} from 'angular2/di';
//@Injectable()
/* tslint:enable */ 

// From AccountController
export class UserInfoViewModel {
      email: string;
      hasRegistered: boolean;
      loginProvider: string;      
}

export class ExternalLoginViewModel {
      Name: string;
      Url: string;
      State: string;      
}

export class AuthenticationService  implements IAuthenticationService {

	public redirectToLinkedLogin() {
		var currentUrl: URL = new URL(window.location.href);
      var callbackUrl = currentUrl.origin +  '/LinkedIn/Auth';
      var url: string = ' https://www.linkedin.com/uas/oauth2/authorization?response_type=code'
       +  '&client_id=' + '77ne8opwwucq5l'
       +  '&redirect_uri=' + encodeURI(callbackUrl)
       +  '&state=' + '987654321'
       +  '&scope=r_basicprofile%20r_emailaddress';

      window.location.href = url;
	}


      public getLoginProviders(callback: (data: ExternalLoginViewModel[])=> void) {
                  
            $.ajax( {
                  url: "/api/Account/ExternalLogins",
                  method: "GET",
                  data: {                        
                        returnUrl: "/signin-linkedin.html",
                        generateState: true
                  },
                  success : function(providerList: ExternalLoginViewModel[]) {
                    
                    console.log(providerList);
                    callback(providerList);
                },

                error: function(data) {
                     console.log("ERROR");
                    console.log(data);
                }
            });
      }
      
	public getLinkedInProfile(callback: (data:model.Profile) => void) {
		 $.ajax({
            url: '/LinkedIn/Proxy',
            method: 'POST',
            data: {
                accessToken:  sessionStorage.getItem('Bearer'),
                url: 'https://api.linkedin.com/v1/people/~:(id,formatted-name,email-address,headline,industry,picture-url)?format=json'
            },
            success: function(data) {
                console.log(data);
                
                $.ajax( {
                  url: "/api/Account/UserInfo",
                  method: "GET",
                  beforeSend(xhr: JQueryXHR) {
                        xhr.setRequestHeader("Authorization", "Bearer "+sessionStorage.getItem('Bearer'));
                  },
                  
                  success : function(userInfo: UserInfoViewModel) {
                    
                    console.log(userInfo);
                },

                error: function(data) {
                     console.log("ERROR");
                    console.log(data);
                },
            });
                callback(data);
            }
        });
	}
}
