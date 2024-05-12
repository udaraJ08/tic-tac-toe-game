import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Slider from "./Slider";
import TypeButtons from "./TypeButtons";
import FluidTextField from "./NameField";
import HamburgerSVG from "../../assets/svg/HamburgurSVG";

export default function SideToolBar({
                                        setScale,
                                        scale,
                                        selectedType,
                                        setSelectedType,
                                        username,
                                        setUsername
                                    }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const controls = useAnimation();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        controls.start(isCollapsed ? "visible" : "hidden");
    };

    return (
        <motion.div
            className="absolute top-0 left-0 mt-4 ml-4 bg-white rounded-lg shadow-md p-2 w-25 h-[90vh] z-10"
            initial={{ width: "25%" }}
            animate={controls}
            variants={{
                hidden: { width: "4%" },
                visible: { width: "25%" }
            }}
        >
            {!isCollapsed && (
                <>
                    <Slider setScale={setScale} scale={scale} />
                    <TypeButtons
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                    <FluidTextField username={username} setUsername={setUsername} />
                </>
            )}
            <button
                onClick={toggleSidebar}
                className={`absolute top-0 right-[0] m-2 p-1 rounded-md bg-indigo-300 shadow-md`}
            >
                <HamburgerSVG />
            </button>
        </motion.div>
    );
}