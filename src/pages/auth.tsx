import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = new URL(window.location.href).hash.split("access_token=")[1];
    window.history.replaceState(null, "", window.location.pathname);

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    if (token && uuidRegex.test(token)) {
      sessionStorage.setItem("token", token);
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthPage;
