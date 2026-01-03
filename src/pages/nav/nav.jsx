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
          <NavLink title="Home" to="/">
            <img src={homeIcon} alt="" />
            Bosh Sahifa
          </NavLink>
        </li>
        <li>
          <NavLink to="/stars">
            <img src={starsIcon} alt="" />
            Stars
          </NavLink>
        </li>
        <li>
          <NavLink to="/premium">
            <img src={premiumIcon} alt="" />
            Premium
          </NavLink>
        </li>
        <li>
          <NavLink to="/referal">
            <img src={referalIcon} alt="" />
            Referal
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <img src={settingsIcon} alt="" />
            Sozlamalar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;