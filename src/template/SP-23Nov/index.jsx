import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/agencyfb/style.css";
import api from "../../service/api";
import coin from './assets/images/deco/coin.webp';
import peo_b from './assets/images/deco/peo_b.webp';
import peo_g from './assets/images/deco/peo_g.webp';
import bg from './assets/images/bg.webp'
import { useEffect, useRef, useState } from 'react';
import RWD from '../../service/RWD';
import tag_cn from './assets/images/banner_img/icon_cn.webp'
import tag_en from './assets/images/banner_img/icon_en.webp'
import i18n from '../../service/i18n';
import EventGroup from './EventGroup';
import CurrTable from '../../page/Promo/CurrTable';
import DateHeading from './DateHeading';
import MoreBtn from '../../page/Promo/MoreBtn';
import PointTable from '../../page/Promo/PointTable';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [deco, setDeco] = useState([])

    useEffect(() => {
        parseContent();
        decoMouse();
    }, [pageData])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    const decoMouse = () => {
        if (isMobile) return;
        document.addEventListener("mousemove", parallax);

        function parallax(e) {
            let _w = window.innerWidth / 2;
            let _h = window.innerHeight / 2;
            let _mouseX = e.clientX;
            let _mouseY = e.clientY;
            let _depth1 = `${0 - (_mouseX - _w) * 0.005}%, ${0 - (_mouseY - _h) * 0.005}%`;
            let _depth2 = `${0 - (_mouseX - _w) * 0.02}%, ${0 - (_mouseY - _h) * 0.02}%`;
            let _depth3 = `${0 - (_mouseX - _w) * 0.01}%, ${0 - (_mouseY - _h) * 0.01}%`;
            setDeco([_depth1, _depth2, _depth3])
        }
    }

    return (
        <main className="">
            <section className="banner">
                <img className="bn-bg"
                    src={isMobile ? (HOST_URL + pageData.images.mobile) : bg}
                    style={isMobile ? null : { transform: `translate(${deco[0]}) scale(1.1)` }} />
                {!isMobile && <>
                    {i18n.language == 'zh-CN'
                        ? <img className="bn-tag" src={tag_cn} />
                        : <img className="bn-tag" src={tag_en} />}

                    <div className="bn-money" >
                        <img src={HOST_URL + pageData.images.title} />
                    </div>
                    <img className="deco-1" style={{ transform: `translate(${deco[2]})` }} src={coin} />
                    <img className="deco-2" style={{ transform: `translate(${deco[1]})` }} src={peo_b} />
                    <img className="deco-3" style={{ transform: `translate(${deco[1]})` }} src={peo_g} />
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <div className="tournament-block">
                        <EventGroup eventList={pageData.eventList} />
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                    </div>                    
                    <PointTable htmlString={sec[1]}/>
                    <CurrTable htmlString={sec[sec.length - 1]} />
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;