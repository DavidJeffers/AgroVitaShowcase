const SoilCoverage = () => {
  return (
    <svg
      width="600"
      height="400"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
       
           @keyframes butterflyFlight1 {
               0% { transform: translate(0, 0) rotate(0deg); }
               25% { transform: translate(100px, -20px) rotate(10deg); }
               50% { transform: translate(200px, 0px) rotate(-5deg); }
               75% { transform: translate(100px, 20px) rotate(10deg); }
               100% { transform: translate(0, 0) rotate(0deg); }
             }
             @keyframes butterflyFlight2 {
               0% { transform: translate(-100px, 0) rotate(0deg); }
               25% { transform: translate(0px, 10px) rotate(-10deg); }
               50% { transform: translate(100px, 0px) rotate(5deg); }
               75% { transform: translate(-100px, 20px) rotate(-10deg); }
               100% { transform: translate(-100px, 0) rotate(0deg); }
             }


             @keyframes pollinatorMove {
               0% { transform: translateX(-20px); }
               100% { transform: translateX(600px); }
             }

             .butterfly1 {
               animation: butterflyFlight1 18s infinite;
             }
             .butterfly2 {
               animation: butterflyFlight2 18s infinite;
             }
              .pollinator {
               animation: pollinatorMove 15s infinite linear;
            }
          
          `}
        </style>

        <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>

        <pattern
          id="residuePattern"
          patternUnits="userSpaceOnUse"
          width="20"
          height="10"
        >
          <line x1="0" y1="5" x2="20" y2="5" stroke="#DEB887" strokeWidth="3" />
        </pattern>

        <style>
          {`
            @keyframes dewDrops {
              0% { opacity: 0.4; }
              50% { opacity: 0.8; }
              100% { opacity: 0.4; }
            }
            .dew {
              animation: dewDrops 4s infinite;
            }
          `}
        </style>
      </defs>

      {/* Sun */}
      <circle cx="500" cy="70" r="40" fill="#FFD700" />
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          className="sun-ray"
          x1="500"
          y1="70"
          x2={500 + Math.cos((i * Math.PI) / 4) * 70}
          y2={75 + Math.sin((i * Math.PI) / 4) * 70}
          stroke="#FFD700"
          strokeWidth="4"
        />
      ))}
      <g transform="translate(200, 180)">
        <g className="butterfly1">
          <path
            d="M0,0 C-10,-10 -15,-5 -10,0 C-15,5 -10,10 0,0"
            fill="#FF69B4"
          />
          <path d="M0,0 C10,-10 15,-5 10,0 C15,5 10,10 0,0" fill="#FF69B4" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#333" strokeWidth="1.5" />
          <path d="M0,-3 Q-3,-6 -4,-8" fill="none" stroke="#333" />
          <path d="M0,-3 Q3,-6 4,-8" fill="none" stroke="#333" />
        </g>
      </g>

      <g transform="translate(200, 190)">
        <g className="butterfly2">
          <path d="M0,0 C-10,-10 -15,-5 -10,0 C-15,5 -10,10 0,0" fill="red" />
          <path d="M0,0 C10,-10 15,-5 10,0 C15,5 10,10 0,0" fill="red" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#333" strokeWidth="1.5" />
          <path d="M0,-3 Q-3,-6 -4,-8" fill="none" stroke="#333" />
          <path d="M0,-3 Q3,-6 4,-8" fill="none" stroke="#333" />
        </g>
      </g>

      <g className="pollinator">
        <circle cx="10" cy="180" r="3" fill="#FFD700" />
        <circle cx="15" cy="180" r="3" fill="#FFD700" />
        <path d="M10,180 L15,183 L10,186" fill="none" stroke="#000" />
      </g>
      {/* Base Soil */}
      <rect x="0" y="230" width="600" height="100" fill="url(#soilGradient)" />

      {/* Crop Residue Layer */}
      <rect
        x="0"
        y="225"
        width="600"
        height="15"
        fill="url(#residuePattern)"
        opacity="0.9"
      />

      {/* Dense Ground Cover Plants */}
      {Array.from({ length: 30 }, (_, i) => (
        <g key={i} transform={`translate(${i * 20},  50)`}>
          {/* Taller plants */}
          <path
            d={`M${10},180 C${5},170 ${0},165 ${10},160 C${20},165 ${15},170 ${10},180`}
            fill="#228B22"
          />
          {/* Shorter plants */}
          <path
            d={`M${5},180 C${0},175 ${-2},172 ${5},170 C${12},172 ${10},175 ${5},180`}
            fill="#32CD32"
          />
        </g>
      ))}

      {/* Dew/Moisture Drops */}
      {Array.from({ length: 15 }, (_, i) => (
        <circle
          key={i}
          className="dew"
          cx={40 * i + 10}
          cy={234}
          r="2"
          fill="#B0E0E6"
        />
      ))}

      {/* Living Roots */}
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <path
            d={`M${60 * i + 30},240 C${60 * i + 20},320 ${60 * i + 40},240 ${
              60 * i + 30
            },280`}
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={`M${60 * i + 30},320 C${60 * i + 40},330 ${60 * i + 20},250 ${
              60 * i + 35
            },260`}
            stroke="#8B4513"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
};

export default SoilCoverage;
