class CookieService {

  set(name, value, hours) {
    const ONE_DAY   = hours * 60 * 60 * 1000;
    const date      = new Date();
    
    date.setTime(date.getTime() + (ONE_DAY));

    const expireDate  = date.toUTCString();
    document.cookie   = `${name}=${value}; expires=${expireDate}; path=/; Secure=true;`;
  }

  get(name) {
    const nameEQ = name + "=";
    const cookieArray = document.cookie.split(';');

    for(let index = 0; index < cookieArray.length; index++) {
        let cookie = cookieArray[index];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1,cookie.length);
        }

        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length,cookie.length);
        }
    }
    return null;
  }
  
}

export default new CookieService();
