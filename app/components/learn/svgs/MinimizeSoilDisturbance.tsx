const MagnifyingGlass = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying Glass Handle */}
      <rect
        x="130"
        y="130"
        width="70"
        height="15"
        rx="7.5"
        transform="rotate(45 130 130)"
        fill="#888"
      />

      {/* Magnifying Glass Circle */}
      <circle
        cx="90"
        cy="90"
        r="60"
        stroke="#444"
        strokeWidth="8"
        fill="none"
      />

      {/* Microorganisms */}
      <circle cx="70" cy="70" r="5" fill="#2ca02c" />
      <circle cx="100" cy="50" r="8" fill="#d62728" />
      <circle cx="80" cy="110" r="6" fill="#1f77b4" />
      <path
        d="M50 90 Q60 80 70 90 T90 90"
        stroke="#ff7f0e"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M110 80 C120 60 140 70 130 90"
        stroke="#9467bd"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
};

const MinimizeSoilDisturbance = () => {
  return (
    // <Box sx={{ overflow: "hidden" }}>
    <svg
      style={{
        // position: "fixed",
        // top: 0,
        // left: 0,
        // width: "100vw",
        // height: "100%",
        overflow: "hidden", // Add this to prevent scrolling
      }}
      width="600"
      height="400"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>
        <pattern
          id="mycorrhizae"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          {/* <path
              d="M0,50 Q25,30 50,50 Q75,70 100,50"
              fill="none"
              stroke="#DAA520"
              strokeWidth="1.5"
            /> */}
          <path
            d="M0,30 Q25,50 50,30 Q75,10 100,30"
            fill="none"
            stroke="#DAA520"
            strokeWidth="1.5"
          />
          <path
            d="M0,70 Q25,90 50,70 Q75,50 100,70"
            fill="none"
            stroke="#DAA520"
            strokeWidth="1.5"
          />
          <path
            d="M50,0 Q30,25 50,50 Q70,75 50,100"
            fill="none"
            stroke="#DAA520"
            strokeWidth="1.5"
          />
          <circle cx="25" cy="45" r="2" fill="#DAA520" />
          {/* <circle cx="75" cy="55" r="2" fill="#DAA520" /> */}
          <circle cx="45" cy="75" r="2" fill="#DAA520" />
        </pattern>

        <style>
          {`
              @keyframes waterFlow {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(100px); opacity: 0; }
              }
              
              @keyframes carbonSequester {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(50px); opacity: 0.3; }
              }
                @keyframes earthWorms {
                    0% { transform: translate(0, 0); opacity: 1; }
                    50% { transform: translate(2px ,1px); opacity: 1; }
                    100% { transform: translate(0, 0); opacity: 1; }
                }

                @keyframes earthWormsReverse {
                    0% { transform: translate(0, 0); opacity: 1; }
                    50% { transform: translate(-2px ,1px); opacity: 1; }
                    100% { transform: translate(0, 0); opacity: 1; }
                }
              
                @keyframes fungalNetworks {
                    0% { transform: translatey(50px); opacity: 1; }
                    100% { transform: translatey(0); opacity: 1; }
                }

              .water-animate {
                animation: waterFlow 4s infinite;
              }
              
              .carbon-animate {
                animation: carbonSequester 4s infinite;
              }

              .fungal-networks {
                animation: fungalNetworks 10s infinite;
              }
                .earth-worms {
                    animation: earthWorms 5s infinite;
                }
                     .earth-worms-reverse {
                    animation: earthWormsReverse 5s infinite;
                }
            `}
        </style>
      </defs>
      {/* Soil Layers */}
      <rect x="0" y="150" width="800" height="250" fill="url(#soilGradient)" />
      {/* Fungal Networks */}
      <rect
        x="0"
        y="200"
        width="800"
        height="150"
        fill="url(#mycorrhizae)"
        opacity="0.6"
      />
      <text
        //   className="fungal-networks"
        x="220"
        y="265"
        fill="#333"
        fontSize="17"
        stroke="#333"
        strokeWidth="1.8"
      >
        Fungal Networks
      </text>
      <text
        //   className="fungal-networks"
        x="440"
        y="185"
        fill="#333"
        fontSize="17"
        stroke="#333"
        strokeWidth="1.8"
      >
        Roots
      </text>
      <text
        //   className="fungal-networks"
        x="25"
        y="327"
        fill="#333"
        fontSize="17"
        stroke="#333"
        strokeWidth="1.8"
      >
        Small-Organisms
      </text>
      <text
        //   className="fungal-networks"
        x="285"
        y="365"
        fill="#333"
        fontSize="17"
        stroke="#333"
        strokeWidth="1.8"
      >
        Micro-Organisms
      </text>
      <g transform={`translate(370, 250), scale(0.7, 0.7)`}>
        <MagnifyingGlass />
      </g>
      {/* Plant Groups */}
      {[100, 300, 500].map((x, i) => (
        <g key={i} transform={`translate(${x}, 140)`}>
          <path
            d="M0,0 C-20,-20 -10,-40 0,-50 C10,-40 20,-20 0,0"
            fill="#006400"
          />
          <path
            d="M-10,0 C-30,-20 -20,-40 -10,-50 C0,-40 10,-20 -10,0"
            fill="#006400"
          />
          <path
            d="M10,0 C-10,-20 0,-40 10,-50 C20,-40 30,-20 10,0"
            fill="#006400"
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            stroke="#48240a"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,50 C-20,70 -40,60 -60,80"
            stroke="#48240a"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,50 C20,70 40,60 60,80"
            stroke="#48240a"
            strokeWidth="2"
            fill="none"
          />
        </g>
      ))}
      <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6495ED" />
        <stop offset="100%" stopColor="#4169E1" />
      </linearGradient>
      <filter id="dropShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="0" dy="2" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Water Drops */}
      {[160, 360, 560].map((x, i) => (
        <path
          key={i}
          className="water-animate"
          d={`M${x},100         C${x},100 ${x - 7.5},110 ${
            x - 7.5
          },117.5        C${x - 7.5},122.5 ${x - 3.75},125 ${x},125        C${
            x + 3.75
          },125 ${x + 7.5},122.5 ${x + 7.5},117.5        C${
            x + 7.5
          },110 ${x},100 ${x},100 Z`}
          fill="url(#dropGradient)"
          filter="url(#dropShadow)"
        />
      ))}
      {/* Carbon Sequestration */}
      {[150, 350, 550].map((x, i) => (
        <text
          key={i}
          className="carbon-animate"
          x={x}
          y="190"
          fill="#333"
          fontSize="17"
          stroke="#333"
          strokeWidth="1"
        >
          CO₂
        </text>
      ))}
      {/* Earthworms */}
      <ellipse
        className="earth-worms"
        cx={20}
        cy={290}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse
        className="earth-worms-reverse"
        cx={22}
        cy={300}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse
        className="earth-worms"
        cx={16}
        cy={310}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse
        className="earth-worms-reverse"
        cx={25}
        cy={305}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse cx={120} cy={290} rx="4" ry="2" fill="#48240a" />
      <ellipse
        className="earth-worms"
        cx={122}
        cy={300}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse cx={116} cy={310} rx="4" ry="2" fill="#48240a" />
      <ellipse
        className="earth-worms-reverse"
        cx={125}
        cy={305}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse
        className="earth-worms-reverse"
        cx={220}
        cy={290}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse cx={222} cy={300} rx="4" ry="2" fill="#48240a" />
      <ellipse
        className="earth-worms"
        cx={216}
        cy={310}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse cx={225} cy={305} rx="4" ry="2" fill="#48240a" />

      <ellipse
        className="earth-worms"
        cx={520}
        cy={290}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse
        className="earth-worms-reverse"
        cx={522}
        cy={300}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      <ellipse cx={516} cy={310} rx="4" ry="2" fill="#48240a" />
      <ellipse
        className="earth-worms-reverse"
        cx={525}
        cy={305}
        rx="4"
        ry="2"
        fill="#48240a"
      />
      {/* Ground Cover */}
      {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map(
        (x, i) => (
          <path
            key={i}
            d={`M${x},150 Q${x + 20},140 ${x + 40},150`}
            fill="#228B22"
          />
        )
      )}
    </svg>
    // </Box>
  );
};

export default MinimizeSoilDisturbance;
