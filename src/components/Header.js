import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faBatteryThreeQuarters, faWifi } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const getTime = setInterval(() => {
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            setTime(`${hours} : ${minutes < 10 ? `0${minutes}` : minutes}`)
        }, 1000)
        return (() => clearInterval(getTime))
    }, []);

    return (
        <header className="header">
            <div className="header_time">{time}</div>
            <ul className="header_icon_list">
                <div className="header_icon">
                    <FontAwesomeIcon icon={faSignal}></FontAwesomeIcon>
                </div>
                <div className="header_icon">
                    <FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>
                </div>
                <div className="header_icon">
                    <FontAwesomeIcon icon={faBatteryThreeQuarters}></FontAwesomeIcon>
                </div>
            </ul>
        </header>
    )
}