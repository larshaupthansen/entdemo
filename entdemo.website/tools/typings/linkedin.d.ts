interface LinkedInUser {
    authorize(callback : () => void, scope: any);

    logout(callback : () => void, scope: any);

    isAuthorized(): boolean;

    refresh();
}

interface LinkedInAPI {

    Raw(query: string): any;
}

interface LinkedInEvent {

    on(linkedIn : LinkedIn, event: string, callback : () => void)
}

interface LinkedIn {

    User: LinkedInUser;
    API: LinkedInAPI;
    Event: LinkedInEvent;
} 


declare module "tools/typings/linkedin" {


    export = IN ;
        
}

declare var IN : LinkedIn;