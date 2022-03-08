export class IUser {
    firstname:string;
    lastname:string;
    street:string;
    city:string;
    country:string;
    email:string;
    payment:string;

    constructor(firstname:string, lastname:string, street:string, city:string, country:string, email:string, payment:string){

        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.city = city;
        this.country = country;
        this.email = email
        this.payment = payment
        

    }
    

}