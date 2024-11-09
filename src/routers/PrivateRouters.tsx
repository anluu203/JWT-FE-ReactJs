import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoutersProps {
  component: ComponentType;
}
const PrivateRouters: React.FC<PrivateRoutersProps> = ({
  component: Component,
}) => {
  let session = sessionStorage.getItem("account");
  //kiểm tra session có tồn tại ko, nếu k tồn tại thì đẩy trang về login
  return session ? <Component /> : <Navigate to="/login" replace />;
};
export default PrivateRouters;
