export default function FluidTextField({username, setUsername}) {

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <input
            type="text"
            value={username}
            onChange={handleChange}
            className="appearance-none mt-3 bg-gray-100 rounded-lg py-2 px-4 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name..."
        />
    );
}