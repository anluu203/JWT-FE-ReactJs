import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function HomePage() {
  let navigation = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigation("/login");
    }
  }, []);
  return (
    <>
      <h1>This is home page</h1>
    </>
  );
}
