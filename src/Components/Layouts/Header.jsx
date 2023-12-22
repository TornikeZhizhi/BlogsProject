import "./Header.css";
import Logo from "../../assets/imgs/react.svg";
function Header() {
  return (
    <div className="header">
      <a href="logo">
        <img src={Logo} alt="logo" />
      </a>
      <button>შესვლა</button>
    </div>
  );
}

export default Header;
