import {motion} from 'framer-motion'

export default function FluidTextField({username, setUsername}) {

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <motion.input
            variants={{
                hidden: {y: 20, opacity: 0},
                visible: {
                    y: 0,
                    opacity: 1
                }
            }}
            disabled
            transition={{delay: 0.5}}
            initial='hidden'
            animate='visible'
            type="text"
            value={username}
            onChange={handleChange}
            className="appearance-none mt-3 bg-gray-100 rounded-lg py-2 px-4 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name..."
        />
    );
}