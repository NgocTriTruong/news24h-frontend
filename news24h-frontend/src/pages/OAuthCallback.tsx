import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token && window.opener) {
      window.opener.postMessage(
        { type: "OAUTH_SUCCESS", token },
        "*"
      );
      window.close();
    }
  }, []);

  return <p>Đang xử lý đăng nhập...</p>;
};

export default OAuthCallback;