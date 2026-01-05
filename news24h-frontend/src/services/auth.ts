// const BACKEND_URL = "https://api.animalsfeeds.online";
const BACKEND_URL = "localhost:8080";

export const authApi = {
  loginGoogle() {
    window.open(
      `${BACKEND_URL}/oauth2/authorization/google`,
      "_blank"
    );
  },

  loginFacebook() {
    window.open(
      `${BACKEND_URL}/oauth2/authorization/facebook`,
      "_blank"
    );
  },

  loginZalo() {
    window.open(
      `${BACKEND_URL}/auth/zalo/login`,
      "_blank"
    );
  }
};
