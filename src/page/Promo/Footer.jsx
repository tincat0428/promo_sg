import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer>
            <p className="copy-right" data-translate="Footer">{t('Footer', { year: new Date().getFullYear() })}</p>
        </footer>
    )
}

export default Footer;