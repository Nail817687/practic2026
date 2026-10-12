import { useEffect, useState } from "react"

export default function SliderHome() {
    let [current, setCurrent] = useState(0)

    let slider = [
        <div>
            <h3>Колледж Хекслет Казахстан</h3>
            <p>Современное IT-образование: программирование, компьютерные сети и информационные системы</p>
        </div>,
        <div>
            <h3>Учись на практике</h3>
            <p>Теория, презентации преподавателя, задания и тесты — на каждом занятии</p>
        </div>,
        <div>
            <h3>Всё под рукой</h3>
            <p>Личный кабинет: курсы, расписание, посещаемость, оценки и обратная связь</p>
        </div>
    ]

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slider.length)
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [current, slider.length])

    return (
        <div className="slider-block">
            {slider[current]}

                {slider.map((item, index) => {
                return <button key={index} onClick={() => {
                    setCurrent(index)
                }} className={index == current ? 'active-slider' : 'gray'}>
                    —
                </button>
            })}

        </div>
    )
}