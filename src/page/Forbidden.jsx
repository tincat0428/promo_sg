import { useContext, useEffect } from 'react'
import '../assets/scss/page/forbidden.scss'
import { ThemeContext } from '../store/theme-context'

const Forbidden = () => {
    const { setThemeCode } = useContext(ThemeContext)

    useEffect(() => {
        setThemeCode('forbidden')
    })

    return (
        <div className="container">
            <div className="forbidden-sign"></div>
            <h1>Access to this page is restricted.</h1>
            <p>Ensure you have sufficient permissions to access the same.</p>
        </div>
    )
}

export default Forbidden