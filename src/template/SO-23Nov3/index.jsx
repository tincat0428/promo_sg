import './assets/scss/app.scss';
import "../../assets/fonts/poppins/style.css";
import api from "../../service/api";
import coin_l from './assets/images/deco/coin_l.webp';
import coin_r from './assets/images/deco/coin_r.webp';
import coin_d from './assets/images/deco/coin_d.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '../../service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '../../service/util';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const loading = useSelector((state) => state.loading.value);

    return (
        <main>
            {!isMobile && <>
                <img class="deco-img-1" src={coin_l} />
                <img class="deco-img-2" src={coin_r} />
            </>}
            <section class="banner">
                <img data-device="web" class="bn-bg" src="./asset/images/banner_img/web/kv1_bg.webp" />
                <img data-device="mobile" class="bn-bg" src="./asset/images/banner_img/mobile/mob.webp?v=20231109" />
                <div data-device="web" class="bn-title">
                    <img data-aos="fade-up" src="./asset/images/banner_img/web/t1.webp" />
                </div>
                <div data-device="web" class="bn-money">
                    <img data-aos="fade-up" data-aos-delay="300" src="./asset/images/banner_img/web/bonus.webp" />
                </div>
                <div data-device="web" class="bn-info">
                    <img data-aos="fade-up" data-aos-delay="600" src="./asset/images/banner_img/web/t2.webp" />
                </div>
                <div class="heading-date" data-aos="fade-up" data-aos-delay="900">
                    <strong id="headingDate"></strong><span class="gmt">[GMT+8]</span>
                </div>
            </section>
            <section class="index">
                <div class="container">
                    <h2 data-translate="EventTime"></h2>
                    <div class="tournament-main">
                        <template id="event-item">
                            <div class="event-item" data-aos="fade-up" data-aos-delay="0">
                                <strong class="date"></strong>
                                <div class="time-box">
                                    <span class="gmt">GMT+8</span>
                                    <strong class="time"></strong>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div id="pageContent"></div>
                    <h2 data-translate="TermsConditions"></h2>
                    <div class="info-content" id="TCBlock"></div>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;