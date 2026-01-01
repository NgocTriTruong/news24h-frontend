const BACKEND_URL = "https://api.animalsfeeds.online";

export const authApi = {
  loginGoogle() {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  },

  loginFacebook() {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/facebook`;
  },

  loginZalo() {
    window.location.href = `${BACKEND_URL}/auth/zalo/login`;
  }
};
