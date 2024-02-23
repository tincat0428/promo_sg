import { Children, cloneElement, useEffect, useRef, useState } from "react";

export const DropDown = ({ children, className, button }) => {
    const ref = useRef();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // 關閉彈窗事件
        const bodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            } else {
                setOpen(false)
            }
        };
        document.body.addEventListener("click", bodyClick);

        // component destroy
        return () => {
            document.body.removeEventListener("click", bodyClick);
        };
    }, [])

    return (
        <div className={`${className} dropdown`}>
            <button ref={ref}  onClick={(e) => setOpen(!open)} className="dropdown-btn default">{button}</button>
            {Children.map(children, child =>
                cloneElement(child, {
                    className: `dropdown-list ${child.props.className} ${open ? 'active' : ''}`
                })
            )}
        </div>
    )
}