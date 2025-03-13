const WaterCycle = () => {
  return (
    <svg
      width="600"
      height="400"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .sun { fill: #ffcc00; }
          .cloud { fill: #e0e0e0; }
          .rain { stroke: #6cb1fc; stroke-width: 2; fill: none; }
          .ground { fill: #75a140; }
          .river { fill: #419aff; }
          .evaporation { stroke: #6cb1fc; stroke-width: 2; fill: none; }
          .cow { fill: #4d2600; }
          .cow-spot { fill: #000; }

          .animate-cloud { animation: cloudMove 10s linear infinite; }
          .animate-rain { animation: rainDrops 1s linear infinite; }
          .animate-evaporation { animation: evaporationMove 6s ease-in-out infinite; }

          @keyframes cloudMove {
            0% { transform: translateX(0); }
            50% { transform: translateX(40px); }
            100% { transform: translateX(0); }
          }
          @keyframes rainDrops {
            0% { transform: translateY(0); opacity: 0; }
            25% { opacity: 1; }
            75% { opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
          }
          @keyframes evaporationMove {
            0% { transform: translateY(0); opacity: 0.5; }
            50% { opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0.5; }
          }
        `}
      </style>

      {/* Sun */}
      <circle className="sun" cx="50" cy="50" r="30" />

      {/* Clouds & Rain */}
      <g className="animate-cloud">
        <path
          className="cloud"
          d="M200,100 a30,20 0 0,0 -50,0 a30,20 0 0,0 -30,30 a30,20 0 0,1 20,20 h60 a30,20 0 0,1 20,-20 a30,20 0 0,0 -30,-30 z"
        />
        <g transform="translate(150,140)">
          <line className="rain animate-rain" x1="0" y1="0" x2="0" y2="10" />
          <line className="rain animate-rain" x1="5" y1="0" x2="5" y2="10" />
          <line className="rain animate-rain" x1="10" y1="0" x2="10" y2="10" />
          <line className="rain animate-rain" x1="15" y1="0" x2="15" y2="10" />
        </g>
      </g>

      {/* Ground and River */}
      <path className="ground" d="M0,250 L600,250 L600,400 L0,400 Z" />
      <path
        className="river"
        d="M20,300 Q150,280 200,350 Q250,380 300,300 Q350,280 400,350 Q450,380 500,300 L500,370 L20,370 Z"
      />

      {/* Evaporation Arrows */}
      {[100, 350, 500].map((x, i) => (
        <g key={i} transform={`translate(${x},300)`}>
          <polyline
            className="evaporation animate-evaporation"
            points="0,0 10,-10"
          />
          <polyline
            className="evaporation animate-evaporation"
            points="5,0 15,-10"
          />
          <polyline
            className="evaporation animate-evaporation"
            points="10,0 20,-10"
          />
        </g>
      ))}

      {/* Cows */}
      {[50, 250, 450].map((x, i) => (
        <g key={i} transform={`translate(${x}, 230) scale(0.7)`}>
          <rect className="cow" x="0" y="0" width="30" height="20" rx="5" />
          <circle className="cow-spot" cx="10" cy="7" r="4" />
          <circle className="cow-spot" cx="20" cy="12" r="3" />
          <rect className="cow" x="8" y="20" width="4" height="10" />
          <rect className="cow" x="18" y="20" width="4" height="10" />
          <circle className="cow" cx="25" cy="5" r="5" />
        </g>
      ))}
    </svg>
  );
};

export default WaterCycle;
