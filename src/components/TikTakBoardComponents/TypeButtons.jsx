import {motion} from "framer-motion";
import {PRIMARY, SECONDARY} from "../../helpers/constants";
import {socket} from "../../contexts/WebsocketContext";
import {useLocation} from "react-router-dom";

export default function TypeButtons({selectedType, setSelectedType}) {

    const location = useLocation()

    const isSelectedType = (type) => {
        return type === selectedType
    }

    const handleSelectedType = (type) => {
        if (!selectedType) {
            setSelectedType(type )
            socket.emit('selectBtnTypeMsg', {type, code: location.state.code})
        }
    }

    return (
        <div className='flex gap-2 mt-3'>
            <motion.div
                variants={{
                    hidden: {x: -20, opacity: 0},
                    visible: {
                        x: 0,
                        opacity: 1
                    }
                }}
                transition={{delay: 0.5}}
                initial='hidden'
                animate='visible'
                onClick={() => handleSelectedType(PRIMARY)}
                className={`w-50 ${!isSelectedType(PRIMARY) ? 'bg-zinc-900' : 'bg-sky-900' } text-center text-cyan-500 rounded-lg shadow-md h-20 d-center font-bold pointer`}
            >
                <motion.button whileHover={{scale: 1.05}}
                               whileTap={{scale: 0.97}} style={{fontSize: '2.5rem'}}>O
                </motion.button>
            </motion.div>
            <motion.div
                variants={{
                    hidden: {x: 20, opacity: 0},
                    visible: {
                        x: 0,
                        opacity: 1
                    }
                }}
                transition={{delay: 0.5}}
                initial='hidden'
                animate='visible'
                onClick={() => handleSelectedType(SECONDARY)}
                className={`w-50 ${!isSelectedType(SECONDARY) ? 'bg-zinc-900' : 'bg-sky-900' } text-center text-cyan-500 rounded-lg shadow-md h-20 d-center font-bold pointer`}
            >
                <motion.button whileHover={{scale: 1.05}}
                               whileTap={{scale: 0.97}} style={{fontSize: '2.5rem'}}>X
                </motion.button>
            </motion.div>
        </div>
    );
}