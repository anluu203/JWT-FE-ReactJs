import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@/hooks/useContext";
interface PrivateRoutersProps {
  component: ComponentType;
}
const PrivateRouters: React.FC<PrivateRoutersProps> = ({
  component: Component,
}) => {
  const context = useContext(AppContext);
  if (!context) {
    return <div>Error: AppContext is not available!</div>;
  }
  const { user } = context;
  return user.isAuthenticated === true ? <Component /> : <Navigate to="/login" replace />;
};
export default PrivateRouters;
