import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import bg from "./assets/images/bg/img_TopBG.webp"
import { useEffect, useState } from 'react';
import api from '../../service/api';
import RWD from '../../service/RWD';
import CurrTable from '../../page/Promo/CurrTable';
import bubbles from './assets/js/bubbles'
import { htmlImg, mergedArray } from '../../service/util';
import MoreBtn from '../../page/Promo/MoreBtn';
import EventGroup from './EventGroup';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
        if (!isMobile) bubbles();
    }, [pageData])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <>
            <img className="top-bg" src={bg} />
            <main>
                <canvas className="bubbles"></canvas>
                <section className="banner">
                    <img className='bn-bg' src={HOST_URL + (isMobile ? pageData.images.mobile : pageData.images.title)} />
                </section>
                <section className="index">
                    {!isMobile && <div className="bn-money" data-device="web">
                        <img src={HOST_URL + pageData.images.money} />
                    </div>}
                    <strong className="bn-date" id="headingDate">
                        2024 年 1月 29 日
                        -
                        2024 年 4月 22 日
                    </strong>
                    <strong className="bn-time" id="headingTime">12:00 PM - 11:59 AM <span className="gmt">[GMT+8]</span></strong>
                    <EventGroup eventList={mergedArray(pageData.eventList)}/>
                    <div className="container">
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                        <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                        {(sec[2] && sec[2].match(/img/g) !== null) && <div className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[2]) }}></div>}
                        <CurrTable htmlString={sec[sec.length - 1]} />
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
            </main>
        </>
    );
};

export default TemplateComponent;