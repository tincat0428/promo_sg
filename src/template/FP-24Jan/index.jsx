import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/agencyfb/style.css";
import api from "../../service/api";
import bg from './assets/images/banner_img/bg.webp';
import bg_deco from './assets/images/banner_img/title_character.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '../../service/RWD';
import i18n from '../../service/i18n';
import EventGroup from './EventGroup';
import CurrTable from '../../page/Promo/CurrTable';
import DateHeading from './DateHeading';
import MoreBtn from '../../page/Promo/MoreBtn';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [deco, setDeco] = useState([])

    useEffect(() => {
        parseContent();
    }, [pageData])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <main className="">
            {!isMobile && <>
                <canvas id="canvas" ></canvas>
                <img className="bg" src={bg} />
                <img className="deco-bg" src={bg_deco} />
            </>}
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : <>
                    <div className="bn-title">
                        <img src={HOST_URL + pageData.images.title} />
                    </div>
                    <div className="bn-money" style={{'--imgUrl': HOST_URL + pageData.images.money}}>
                        <img src={HOST_URL + pageData.images.money} />
                    </div>
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <div className="event-block">
                        <EventGroup eventList={pageData.eventList} />
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                    </div>
                    <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                    <CurrTable htmlString={sec[sec.length - 1]} />
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;