import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  [key: string]: any;
}

export const authUtils = {
  setAccessTokenCookie: (token: string) => {
    Cookies.set("accessToken", token, { expires: 1 });
  },

  removeAccessTokenCookie: () => {
    Cookies.remove("accessToken");
  },

  decodeToken: (token: string): JwtPayload => {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error;
    }
  },

  getUserIdFromToken: (token: string): string => {
    const decoded = authUtils.decodeToken(token);
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  },
};