import { useContext, useEffect } from 'react'
import '../assets/scss/page/forbidden.scss'
import { ThemeContext } from '../store/theme-context'
import { Helmet } from 'react-helmet'

const Forbidden = () => {
    const { setThemeCode } = useContext(ThemeContext)

    useEffect(() => {
        setThemeCode('forbidden')
    })

    return (
        <main>
            <div className="container">
                <Helmet>
                    <title>'Oops!'</title>
                    <meta name="description" content='Oops!' />
                </Helmet>
                <div className="forbidden-sign"></div>
                <h1>Access to this page is restricted.</h1>
                <p>Ensure you have sufficient permissions to access the same.</p>
            </div>
        </main>
    )
}

export default Forbidden