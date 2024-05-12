import {motion} from "framer-motion";
import TikTakSquare from "./TikTakSquare";
import {initBoard} from "../../helpers/constants";
import {useState} from "react";

export default function TikTakBoard({scale}) {

    const container = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            scale: scale,
            transition: {
                delay: 0.2,
                staggerChildren: 0.3
            }
        }
    };;

    return (
        <motion.div
            className="grid grid-cols-3 gap-1"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {initBoard?.map((e) => (
                <motion.div
                    variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: {
                            y: 0,
                            opacity: 1
                        }
                    }}
                    className="bg-zinc-900 text-center rounded-lg shadow-md w-24 h-24 d-center font-bold"
                >
                    <TikTakSquare key={e.number} data={e}/>
                </motion.div>
            ))}
        </motion.div>
    );
}