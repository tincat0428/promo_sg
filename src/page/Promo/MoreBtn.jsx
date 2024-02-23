import { t } from "i18next"
import { useDispatch } from "react-redux"
import { showModal } from "../../component/modal/modalSlice"
import Modal from "../../component/modal"

const MoreBtn = ({ html }) => {
    const dispatch = useDispatch()
    return (
        <>
            <button className="btn-more" onClick={(e) => dispatch(showModal(true)) && e.stopPropagation()}>
                {t('TermsConditions')}
            </button >
            <Modal>
                <strong className='title'>{t('TermsConditions')}</strong>
                <div className='content' dangerouslySetInnerHTML={{ __html: html }}></div>
            </Modal>
        </>
    )
}

export default MoreBtn