import router from '../router'
import axios from "axios";
import store from '../store'

const TOKEN_NAME = 'GAT';

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
        localStorage.setItem(TOKEN_NAME, this.encrypt(data))
    }

    logout() {
        if('/signout' !== window.location.pathname) {
            router.push('/signout')
        }
        this.deleteToken();
        store.dispatch('AppState/setIsLoadingState', false)
    }
    
    get() {
        const data =  this.decrypt();
        if(!data) {
            this.deleteToken();
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
        const token = this.getToken();
        if(!token) {
            return null;
        } 

        return JSON.parse(decodeURIComponent(escape(atob(token))));
    }

    getToken() {
        return localStorage.getItem(TOKEN_NAME);
    }

    deleteToken() {
        localStorage.removeItem(TOKEN_NAME);
    }
}

export default new Auth;
