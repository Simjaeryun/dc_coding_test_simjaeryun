import { useEffect, useRef, useState } from "react";

export default function Info() {
    const path = process.env.PUBLIC_URL;
    const url = `${path}/data/dc_coding_test_data_sample.json`

    //좌우 슬라이드 
    const [dcData, setDcData] = useState([]);
    const [isClick, setIsClick] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    //상하 슬라이드 
    const [isDrag, setIsDrag] = useState(false);
    const [startY, setStartY] = useState(0);
    const [endY, setEndY] = useState(0);

    const info = useRef(null);
    const slider = useRef(null);

    const handleDown = (e) => {
        setIsClick(true)
        setStartX(e.pageX || e.touches[0].pageX)
        setScrollLeft(slider.current.scrollLeft)
    }
    const handleMove = (e) => {
        if (!isClick) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX;
        const dist = (x - startX);
        slider.current.scrollLeft = scrollLeft - dist
    }
    const handleEnd = (e) => {
        setIsClick(false)
    }

    useEffect(() => {
        fetch(url)
            .then(data => data.json())
            .then(data => {
                setDcData(data)
            })
    }, [url])

    return (
        <section
            className={endY - startY > 40 ? "info off" : "info"}
            ref={info}
            onMouseDown={(e) => {
                setIsDrag(true)
                setStartY(e.pageY);
            }}
            onMouseUp={(e) => {
                setIsDrag(false)
                setEndY(e.pageY);
            }}
            onMouseMove={(e) => {
                if (!isDrag) return
                e.preventDefault();
            }}
        >
            <div
                className={isClick ? "info_container active" : "info_container"}
                ref={slider}
                onMouseDown={handleDown}
                onTouchStart={handleDown}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchEnd={handleEnd}
            >
                {dcData.map((data, idx) => {
                    if (data.keyword.length > 4) data.keyword.splice(4, data.keyword.length)
                    return (
                        <div className="info_card" key={idx}>
                            <div className="info_card_handle"></div>
                            <div className="info_card_content">
                                <div className="info_card_img">
                                    <img src={data.image} alt="" />
                                </div>
                                <div className="info_card_txt">
                                    <div className="info_card_txt_title">
                                        <h1>{data.branch === null ? `${idx + 1}. ${data.nm} ` : `${idx + 1}. ${data.nm} ${data.branch} `}</h1>
                                        <p>
                                            {`${data.area} | ${data.distance} `}
                                        </p>
                                    </div>
                                    <div className="info_card_txt_desc">
                                        <h2>{data.category}</h2>
                                        <h3>{data.keyword}</h3>
                                        <ul className="info_card_txt_desc_list">
                                            <li className="info_card_txt_desc_item">
                                                {data.score}
                                                <span>점</span>
                                            </li>
                                            <li className="info_card_txt_desc_item">
                                                <img
                                                    src={`${path} /image/score.png`}
                                                    alt="별"
                                                />
                                                {`${data.user_score} (${data.review_cnt}명)`}
                                            </li>
                                            <li className="info_card_txt_desc_item">
                                                <img
                                                    src={`${path} /image/fav.png`}
                                                    alt="별"
                                                />
                                                {data.favorites_cnt}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section >
    )
}