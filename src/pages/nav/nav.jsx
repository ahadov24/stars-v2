import homeIcon from "../../assets/homeIcon.png";
import premiumIcon from "../../assets/premiumIcon.png";
import referalIcon from "../../assets/referalIcon.png";
import settingsIcon from "../../assets/settingsIcon.png";
import starsIcon from "../../assets/starsIcon.png";
import './nav.scss';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink title="Home" to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={homeIcon} alt="" />
            Bosh Sahifa
          </NavLink>
        </li>
        <li>
          <NavLink to="/stars" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={starsIcon} alt="" />
            Stars
          </NavLink>
        </li>
        <li>
          <NavLink to="/premium" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={premiumIcon} alt="" />
            Premium
          </NavLink>
        </li>
        <li>
          <NavLink to="/referal" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={referalIcon} alt="" />
            Referal
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active-link" : "")}>
            <img src={settingsIcon} alt="" />
            Sozlamalar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;