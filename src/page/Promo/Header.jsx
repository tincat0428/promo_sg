import { connect, useSelector } from "react-redux";
import logo from "../../assets/images/spade_logo.png"
import { Link } from "react-router-dom";
import RWD from "../../service/RWD";
import i18n from "../../service/i18n";
import { useEffect, useRef, useState } from "react";

const Header = ({ langList }) => {
    const ref = useRef();
    const { isMobile } = RWD()
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        // 關閉彈窗事件
        const bodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            } else {
                setShowMenu(false)
            }
        };
        document.body.addEventListener("click", bodyClick);

        // component destroy
        return () => {
            document.body.removeEventListener("click", bodyClick);
        };
    }, [])

    const changeLoclae = () => {
        if(isMobile) setShowMenu(false);
        document.body.classList.remove(i18n.language);
    }

    return (
        <header className="header">
            <div className="nav">
                <h2 className="nav-logo"><img src={logo} alt="" /></h2>
                <div ref={ref} className="language-dropdown dropdown">
                    {isMobile && <div className="default dropdown-btn" onClick={() => setShowMenu(true)}>
                        <i className={`flag ${i18n.language}`}></i>
                    </div>}
                    <ul className={`list dropdown-list ${(isMobile && showMenu) ? 'active' : ''}`} >
                        {langList.map(lang => (
                            <li key={lang}>
                                <Link to={`?lang=${lang}`} onClick={() => changeLoclae()}>
                                    <i className={`flag ${lang}`}></i>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header