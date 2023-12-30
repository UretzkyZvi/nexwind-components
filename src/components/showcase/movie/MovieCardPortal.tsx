import { FC } from "react";
import ReactDOM from "react-dom";

interface MovieCardPortalProps {
  children: React.ReactNode;
}

const MovieCardPortal: FC<MovieCardPortalProps> = ({ children }) => {
  const portalRoot = document.getElementById("portal-root"); // ensure you have this div in your index.html
  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

export default MovieCardPortal;
