import { RouterLink } from "@angular/router";
import { Deserializable } from "./Deserializable";


export class AuthenticationResponse implements Deserializable{
          
    
          jwtoken!: String;
          refreshToken!: String;

          deserializable(input: any): this {
            Object.assign(this, input)
            //this.role = new RouterLink().deserialize(input.car);
            return this;
        }
  }

    // getJwtToken() : String {
    //     return `${this.jwtToken}`;
    // }

    // getRefereshToken() : String {
    //     return `${this.refreshToken}`;
    // }

