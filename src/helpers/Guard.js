import Auth from "./Auth";

class Guard {
  user(to, from, next) {
    Auth.isLogged() ? next() : next(`/signin?redirect=${to.fullPath}`);
  }

  guest(to, from, next) {
    Auth.isGuest() ? next() : next("/");
  }
}

export default new Guard();
