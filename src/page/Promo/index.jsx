import { StrictMode, useContext, useEffect, useState } from "react";
import Header from "./Header"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../service/api";
import { ThemeContext } from "../../store/theme-context";
import { useLoading } from "../../store/loading-context";
import Loader from "../../component/Loader";
import locale from "../../service/locale";
import Footer from "./Footer";
import i18n from "../../service/i18n";
import SideLink from "./SideLink";
import GoTopBtn from "../../component/GoTopBtn";

const Promo = () => {
    const params = useParams();
    const navigate = useNavigate()
    const { getPageData, getLangList } = api();
    const { getDefaultLang } = locale()
    const { setThemeCode } = useContext(ThemeContext)
    const { loading, setLoading } = useLoading();
    const [importedComponent, setImportedComponent] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [langList, setLangList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setLoading(true);
        // 取得語系列表
        (async () => {
            const langList = await getLangList(params.slug);
            setLangList(langList)
        })()
    }, []);

    useEffect(() => {
        // 確認語系是否支援
        let newLang = searchParams.get('lang') || getDefaultLang()
        i18n.changeLanguage(newLang);
        document.body.classList.add(newLang)
        loadIndex();
    }, [searchParams])

    useEffect(() => {
        importComponent();
    }, [pageData]);

    // 注入模板
    const importComponent = async () => {
        if (!pageData) return
        setThemeCode(pageData.theme);
        const module = await import(/* @vite-ignore */ `../../template/${pageData.theme}`)
        const TemplateComponent = module.default;
        setImportedComponent(<TemplateComponent pageData={pageData} />);
        setLoading(false)
    };

    const loadIndex = async () => {
        setLoading(true);
        const data = await getPageData(params.slug, i18n.language)
        if (!data.theme) {
            setLoading(false)
            return navigate('/')
        }
        setPageData(data);
    }

    return (
        <>
            {loading && <Loader />}
            <Header langList={langList} />
            {importedComponent}
            {pageData && <SideLink data={pageData.side_link} />}
            <GoTopBtn />
            <Footer />
        </>
    )
}

export default Promo