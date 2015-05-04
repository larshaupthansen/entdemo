/* tslint:disable */ 

import {} from 'angular2/angular.http';


/* tslint:enable */

export class LinkedinController {

	private httpService: Http;

	constructor($http: Http) {

		this.httpService = $http;
	}

	getBearerToken(): string {
		return '';
	}
}