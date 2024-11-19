import * as jwt_decode from "jwt-decode";

export class TokenDecoder{
    static getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode.jwtDecode(token);
        } catch(Error) {
          return null;
        }
      }
}