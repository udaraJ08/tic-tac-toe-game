import TikTakBoard from "../components/TikTakBoardComponents/TikTakBoard";
import Slider from "../components/TikTakBoardComponents/Slider";
import {useState} from "react";

export function TikTakView() {

    const [scale, setScale] = useState(1)

    return <div className='h-screen w-screen d-center'>
        <Slider setScale={setScale} scale={scale}/>
        <TikTakBoard scale={scale}/>
    </div>
}