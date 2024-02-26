import { Link } from "react-router-dom"
import logo from "../assets/images/logo.svg"
import '../assets/scss/page/catalog.scss'
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../store/theme-context";
import { setLoading } from "../component/Loader/loaderSlice";
import Loader from "../component/Loader";
import { useDispatch } from "react-redux";
import api from '../service/api'

const Catalog = () => {
    const { getPromoList, HOST_URL } = api()
    const [list, setList] = useState([]);
    const { setThemeCode } = useContext(ThemeContext)
    const dispatch = useDispatch()

    useEffect(() => {
        setThemeCode('catalog');
        loadIndex();
    }, [])

    const loadIndex = async () => {
        dispatch(setLoading(true));
        const data = await getPromoList();
        setList(data)
        dispatch(setLoading(false));
    }

    return (
        <>
            <Loader />
            <header className="catalog-header">
                <div className="catalog-nav">
                    <h2 className="catalog-nav-logo"><img src={logo} alt="" /></h2>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="catalog-gallery" >
                        {list.map(item => (
                            <div className="promo-item" key={item.slug}>
                                <Link to={'/' + item.slug} className="wrap">
                                    <div className="promo-img">
                                        <img src={HOST_URL + item.img} />
                                    </div>
                                    <div className="promo-content">
                                        <h5>{item.heading}</h5>
                                        <p>End Date：{new Date(item.endDate).toLocaleString('zh')}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Catalog