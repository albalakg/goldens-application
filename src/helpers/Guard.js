import Auth from "./Auth";

class Guard {
  admin(to, from, next) {
    Auth.isLogged() ? next() : next("/login");
  }

  guest(to, from, next) {
    Auth.isGuest() ? next() : next("/home");
  }
}

export default new Guard();
