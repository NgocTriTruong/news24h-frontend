import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("access_token", token);
      window.close(); // đóng tab login
    }
  }, []);

  return <p>Đang xử lý đăng nhập...</p>;
};

export default OAuthCallback;
