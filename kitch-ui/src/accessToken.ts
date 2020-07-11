import Cookies from "universal-cookie";

export enum AccessTokenSource {
    SessionStorage = "SessionStorage",
    Cookies = "Cookies"
}
export interface AccessToken {
    token?: string,
    source?: AccessTokenSource;
}
const OneDay = 24 * 60 * 60 * 1000;

export function saveAccessToken(token: string) {
    window.sessionStorage.setItem("access_token", token);
    setInterval(() => {
        window.sessionStorage.removeItem("access_token");
    }, OneDay);
}


export default function getAccessToken(): AccessToken {
    let token = window.sessionStorage.getItem("access_token");
    if (token) {
        return { token, source: AccessTokenSource.SessionStorage }
    };
    const cookies = new Cookies(document.cookie);
    token = cookies.get("__Secure-access_token");
    if (token === undefined || token === null) {
        return {};
    }
    return { token, source: AccessTokenSource.SessionStorage };
}
