import router from '../router'
import axios from "axios";
import store from '../store'

const COOKIE_NAME = 'GoldensToken';

class Auth {
    login(data) {
        try {
            this.createCookie(data);
            axios.defaults.headers.common["Authorization"] = `Bearer ${this.token()}`;
        } catch(err) {
            console.error('err', err);
        }
    }

    createCookie(data) {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if(isSafari) {
            document.cookie = `${COOKIE_NAME}=${this.encrypt(data)};expires=${new Date(data.expired_at)}`;
        } else {
            document.cookie = `${COOKIE_NAME}=${this.encrypt(data)};SameSite=Lax;secure;expires=${new Date(data.expired_at)}`;
        }
    }

    logout() {
        if('/signout' !== window.location.hash.replace('#', '')) {
            router.push('/signout')
        }
        store.dispatch('AppState/setIsLoadingState', false)
    }
    
    get() {
        const data =  this.decrypt();
        if(!data) {
            this.deleteCookie();
            return null;
        }

        return data;
    }

    id() {
        return this.get() ? this.get().id : null;
    }

    token() {
        return this.get() ? this.get().token : '';
    }

    firstName() {
        return this.get() ? this.get().first_name : '';
    }

    lastName() {
        return this.get() ? this.get().last_name : '';
    }

    role() {
        return this.get() ? this.get().role : '';
    }

    email() {
        return this.get() ? this.get().email : '';
    }

    image() {
        return this.get() && this.get().image ? this.get().image : '';
    }

    courses() {
        return this.get() && this.get().courses ? this.get().courses : '';
    }

    fullName() {
        const data = this.get();
        return data ? data.first_name + ' ' + data.last_name : '';
    }
    
    isLogged() {
        return !!this.get();
    }
    
    isGuest() {
        return !this.get();
    }

    encrypt(data) {
        return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    }

    decrypt() {
        const cookie = this.getCookie();
        if(!cookie) {
            return null;
        } 

        return JSON.parse(decodeURIComponent(escape(atob(cookie))));
    }

    getCookie() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${COOKIE_NAME}=`);
        if (parts.length === 2) 
            return parts.pop().split(';').shift();
        else '';
    }

    deleteCookie() {
        document.cookie = `${COOKIE_NAME}=1;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
}

export default new Auth;
