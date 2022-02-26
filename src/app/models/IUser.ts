export class IUser {
    firstname:string;
    lastname:string;
    street:string;
    zip:string;
    city:string;
    country:string;
    phoneNr:string;
    email:string;

    constructor(firstname:string, lastname:string, street:string, zip:string, city:string, country:string, phoneNr:string, email:string){

        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.zip = zip;
        this.city = city;
        this.country = country;
        this.phoneNr = phoneNr;
        this.email = email

    }
    

}