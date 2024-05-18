import TikTakBoard from "../components/TikTakBoardComponents/TikTakBoard";
import {useEffect, useState} from "react";
import SideToolBar from "../components/TikTakBoardComponents/SideToolBar";
import {socket} from "../contexts/WebsocketContext";
import {
    BOO_EFFECT,
    COOL_EFFECT,
    GOOD_EFFECT,
    HAHA_EFFECT,
    HMM_EFFECT,
    PRIMARY,
    SECONDARY,
    YAY_EFFECT
} from "../helpers/constants";
import EmojiFloat from "../components/TikTakBoardComponents/EmojiFloat";
import {useLocation} from "react-router-dom";
import FluidDiv from "../components/TikTakBoardComponents/CopyButton";
import haha from '../assets/audio/haha.mp3'
import cool from '../assets/audio/cool.mp3'
import horror from '../assets/audio/horror.mp3'
import thinking from '../assets/audio/haha.mp3'
import yay from '../assets/audio/yay.mp3'
import ohh from '../assets/audio/ohh.mp3'
import copyAudio from '../assets/audio/copy.mp3'

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

        socket.on('audioEffects', data => {

            let audio;

            switch (data) {
                case HAHA_EFFECT:
                    audio = new Audio(haha)
                    break;
                case YAY_EFFECT:
                    audio = new Audio(yay)
                    break;
                case BOO_EFFECT:
                    audio = new Audio(horror)
                    break;
                case COOL_EFFECT:
                    audio = new Audio(cool)
                    break;
                case HMM_EFFECT:
                    audio = new Audio(thinking)
                    break;
                case GOOD_EFFECT:
                    audio = new Audio(ohh)
                    break;
                default:
                    return;
            }

            audio.play()
        })

        socket.on("connectRoom", async data => {
            const shallow = [...emojiArr]
            shallow.push(`${data} connected`)
            setEmojiArr(shallow)
            const audio = new Audio(copyAudio)
            await audio.play()
        })

        return () => {
            socket.off('selectBtnTypeMsg')
            socket.off('shareEmojiMsg')
            socket.off('audioEffects')
            socket.off('connectRoom')
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