import { motion } from "framer-motion";
import Slider from "./Slider";
import TypeButtons from "./TypeButtons";
import FluidTextField from "./NameField";

export default function SideToolBar({setScale, scale, selectedType, setSelectedType, username, setUsername}) {

    return <motion.div className="absolute top-0 left-0 mt-4 ml-4 bg-white rounded-lg shadow-md p-2 w-25 h-[90vh]"
    >
        <Slider setScale={setScale} scale={scale}/>
        <TypeButtons selectedType={selectedType} setSelectedType={setSelectedType}/>
        <FluidTextField username={username}
                        setUsername={setUsername}/>
    </motion.div>
}