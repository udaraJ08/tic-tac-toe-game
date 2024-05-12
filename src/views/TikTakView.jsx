import TikTakBoard from "../components/TikTakBoardComponents/TikTakBoard";
import Slider from "../components/TikTakBoardComponents/Slider";
import {useState} from "react";
import SideToolBar from "../components/TikTakBoardComponents/SideToolBar";

export function TikTakView() {

    const [scale, setScale] = useState(1)
    const [selectedType, setSelectedType] = useState(null)

    return <div className='h-screen w-screen d-center'>
        <SideToolBar setScale={setScale} scale={scale}/>
        <TikTakBoard selectedType={selectedType} setSelectedType={setSelectedType} scale={scale}/>
    </div>
}