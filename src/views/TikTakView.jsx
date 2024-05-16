import TikTakBoard from "../components/TikTakBoardComponents/TikTakBoard";
import {useEffect, useState} from "react";
import SideToolBar from "../components/TikTakBoardComponents/SideToolBar";
import {socket} from "../contexts/WebsocketContext";
import {PRIMARY, SECONDARY} from "../helpers/constants";
import EmojiFloat from "../components/TikTakBoardComponents/EmojiFloat";
import {useLocation} from "react-router-dom";
import FluidDiv from "../components/TikTakBoardComponents/CopyButton";
import IceSVG from "../assets/svg/IceSVG";

export function TikTakView() {

    const [scale, setScale] = useState(1)
    const [selectedType, setSelectedType] = useState(null)
    const [username, setUsername] = useState(null)
    const [emojiArr, setEmojiArr] = useState([])

    const location = useLocation()

    useEffect(() => {
        setUsername(location.state.name)

        socket.on("selectBtnTypeMsg", (data) => {
            const {message} = data

            if (!selectedType) {
                setSelectedType(message === PRIMARY ? SECONDARY : PRIMARY)
            }
        })

        socket.on("shareEmojiMsg", (data) => {
            const {message} = data

            const shallow = [...emojiArr]
            shallow.push(message)
            setEmojiArr(shallow)
        })

        return () => {
            socket.off('selectBtnTypeMsg')
            socket.off('shareEmojiMsg')
        }
    }, [selectedType, emojiArr]);

    return <div className='h-screen w-screen d-center overflow-hidden'>
        <SideToolBar setScale={setScale}
                     scale={scale}
                     selectedType={selectedType}
                     setSelectedType={setSelectedType}
                     username={username}
                     setUsername={setUsername}
        />
        <TikTakBoard scale={scale} username={username} selectedType={selectedType} setSelectedType={setSelectedType}/>
        <FluidDiv />
        {/*<div className='absolute right-0 bottom-[-100px]'>*/}
        {/*    <IceSVG />*/}
        {/*</div>*/}
        {
            emojiArr.map((e, index) => {
                return <EmojiFloat emoji={e} key={index}/>
            })
        }
    </div>
}