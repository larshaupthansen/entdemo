
module model  {
  export  class Profile {
    public id: string;
    public formattedName: string;
    public headline: string;
    public industry: string;
    public image: string;
    public location: any;
    public emailAddress: string;
    public pictureUrl: string;
  
    constructor() {
      this.id = '';
    }
   
  }
  

}