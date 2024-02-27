import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/roboto/style.css";
import { useEffect, useState } from 'react';
import api from '../../service/api';
import RWD from '../../service/RWD';
import CurrTable from '../../page/Promo/CurrTable';
import { htmlImg, mergedArray } from '../../service/util';
import MoreBtn from '../../page/Promo/MoreBtn';
import EventGroup from './EventGroup';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

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
        <>
            <section className="banner">
                <img className="bn-bg" src={HOST_URL + (isMobile ? pageData.images.mobile : pageData.images.title)} />
                <div className="bn-money">
                    <img src={HOST_URL + pageData.images.money} alt="" />
                </div>
                <strong className="bn-date"></strong>
            </section>
            <main>
                <section className="index">
                    <div className="container">
                        <EventGroup eventList={mergedArray(pageData.eventList)} />
                        <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                        {(sec[2] && sec[2].match(/img/g) !== null) && <div className="gameBlock" dangerouslySetInnerHTML={{ __html: htmlImg(sec[2]) }}></div>}
                        <div className="currency-block">
                            <CurrTable htmlString={sec[sec.length - 1]} />
                        </div>
                        <MoreBtn html={pageData.terms_and_conditions} />
                    </div>
                </section>
            </main >
        </>
    );
};

export default TemplateComponent;