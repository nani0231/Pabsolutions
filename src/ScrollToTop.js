import { useEffect } from "react";
import { useLocation } from "react-router";
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location]);
  return null
};
export default ScrollToTop;
