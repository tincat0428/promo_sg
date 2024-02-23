import { Link } from "react-router-dom"
import logo from "../assets/images/logo.svg"
import '../assets/scss/page/catalog.scss'
import { useContext, useEffect } from "react"
import { ThemeContext } from "../store/theme-context"

const Catalog = () => {
    const { setThemeCode } = useContext(ThemeContext)

    useEffect(()=>{
        setThemeCode('catalog')
    })
    
    return (
        <>
            <header className="catalog-header">
                <div className="catalog-nav">
                    <h2 className="catalog-nav-logo"><img src={logo} alt="" /></h2>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="catalog-gallery" >
                        <div className="promo-item">
                            <Link to="/playandwin_Feb_May" className="wrap">
                                <div className="promo-img">
                                    <img src="../playandwin_Feb_May/asset/images/banner_img/og.jpg" />
                                </div>
                                <div className="promo-content">
                                    <h5>Spadegaming Promotion</h5>
                                    <p>End Date：2024/5/27 11:59:00</p>
                                </div>
                            </Link>
                        </div>

                        <div className="promo-item">
                            <Link to="/playandwin_Feb_May_BBIN" className="wrap">
                                <div className="promo-img">
                                    <img src="../playandwin_Feb_May_BBIN/asset/images/banner_img/og.jpg" />
                                </div>
                                <div className="promo-content">
                                    <h5>Spadegaming Promotion</h5>
                                    <p>End Date：2024/5/27 11:59:00</p>
                                </div>
                            </Link>
                        </div>

                        <div className="promo-item">
                            <Link to="/Fishing_Tournament_Jan_Apr" className="wrap">
                                <div className="promo-img">
                                    <img src="../Fishing_Tournament_Jan_Apr/asset/images/banner_img/og.jpg" />
                                </div>
                                <div className="promo-content">
                                    <h5>Fishing Frenzy Tournament</h5>
                                    <p>End Date：2024/4/22 11:59:00</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Catalog