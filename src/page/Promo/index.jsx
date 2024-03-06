import { useContext, useEffect, useState } from "react";
import Header from "./Header"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../service/api";
import { ThemeContext } from "../../store/theme-context";
import Loader from "../../component/Loader";
import locale from "../../service/locale";
import Footer from "./Footer";
import i18n from "../../service/i18n";
import SideLink from "./SideLink";
import GoTopBtn from "../../component/GoTopBtn";
import { setLoading } from "../../component/Loader/loaderSlice";
import { useDispatch } from "react-redux";

const Promo = () => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { getPageData, getLangList } = api();
    const { getDefaultLang } = locale()
    const { setThemeCode } = useContext(ThemeContext)
    const [importedComponent, setImportedComponent] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [langList, setLangList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        console.log('promo')
        setLoading(true);
        (async () => {
            // 取得語系列表
            const langList = await getLangList(params.slug);
            setLangList(langList)
            // 確認語系是否支援
            let newLang = searchParams.get('lang') || getDefaultLang()
            if (!langList.includes(newLang)) newLang = langList[0]
            i18n.changeLanguage(newLang);
            document.body.classList.add(newLang)
            loadIndex();
        })()
    }, [searchParams]);

    useEffect(() => {
        importComponent();
    }, [pageData]);

    // 注入模板
    const importComponent = async () => {
        if (!pageData) return
        setThemeCode(pageData.theme);
        const module = await import(`../../template/${pageData.theme}/index.jsx`)
        const TemplateComponent = module.default;
        setImportedComponent(<TemplateComponent pageData={pageData} />);
        dispatch(setLoading(false))
    };

    const loadIndex = async () => {
        dispatch(setLoading(true));
        const data = await getPageData(params.slug, i18n.language)
        if (!data.theme) {
            setLoading(false)
            return navigate('/')
        }
        setPageData(data);
        document.title = data.heading
    }

    return (
        <>
            <Loader />
            <Header langList={langList} />
            {importedComponent}
            {pageData && <SideLink data={pageData.side_link} />}
            <GoTopBtn />
            <Footer />
        </>
    )
}

export default Promo