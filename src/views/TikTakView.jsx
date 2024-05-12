import TikTakBoard from "../components/TikTakBoardComponents/TikTakBoard";
import {useState} from "react";
import SideToolBar from "../components/TikTakBoardComponents/SideToolBar";

export function TikTakView() {

    const [scale, setScale] = useState(1)
    const [selectedType, setSelectedType] = useState(null)
    const [username, setUsername] = useState(null)

    return <div className='h-screen w-screen d-center'>
        <SideToolBar setScale={setScale}
                     scale={scale}
                     selectedType={selectedType}
                     setSelectedType={setSelectedType}
                     username={username}
                     setUsername={setUsername}
        />
        <TikTakBoard scale={scale} username={username} selectedType={selectedType}/>
    </div>
}