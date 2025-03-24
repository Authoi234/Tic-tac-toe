const Square = ({ player, index, onClick }) => {
    const scale = player ? "scale-100" : "scale-0";
    const textColor = player === "X" ? "text-green-400" : "text-cyan-400";
    const hoverStyle = "transition-all duration-500 hover:scale-105 transform"

    return (
        <div {...{onClick}} data-box-index={index} className={`h-32 w-32 border font-bold border-slate-300 player-text text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}>
            <span data-box-index={index} className={`transform transition-all duration-500 ease-out font-bold ${scale} ${textColor}`}>{player}</span>
        </div>
    );
};

export default Square;