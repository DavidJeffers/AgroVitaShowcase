const NaturalFertilization = () => {
  return (
    <svg
      width="600"
      height="400"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>
        <style>
          {`
            @keyframes decompose {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(20px) rotate(10deg); opacity: 0; }
            }
            
            @keyframes nutrientFlow {
              0% { transform: translateY(0); opacity: 0; }
              50% { transform: translateY(40px); opacity: 1; }
              100% { transform: translateY(80px); opacity: 0; }
            }

                @keyframes wormMovement {
              0% { transform: scale(1); }
              50% { transform: scale(0.8); }
              100% { transform: scale(1); }
            }

            @keyframes microbeMovement {
              0% { transform: translate(200px, 0) rotate(0deg); }
              33% { transform: translate(200px, -5px) rotate(120deg); }
              66% { transform: translate(200px, 5px) rotate(240deg); }
              100% { transform: translate(200px, 0) rotate(360deg); }
            }

            .decomposing-matter { animation: decompose 4s infinite; }
            .nutrient { animation: nutrientFlow 3s infinite; }
            .worm { animation: wormMovement 6s infinite; }
            .microbe { animation: microbeMovement 4s infinite; }
          `}
        </style>

        <pattern
          id="compostPattern"
          patternUnits="userSpaceOnUse"
          width="40"
          height="40"
        >
          <path
            d="M0,20 Q10,0 20,20 Q30,40 40,20"
            stroke="#8D6E63"
            fill="none"
          />
          <circle cx="10" cy="20" r="3" fill="#795548" />
          <circle cx="30" cy="20" r="3" fill="#795548" />
        </pattern>
      </defs>
      {[...Array(2)].map((_, i) => (
        <g key={i} transform={`translate(${90 + i * 80}, ${165})`}>
          {/* Body */}
          <ellipse cx="0" cy="0" rx="30" ry="20" fill="#8B4513" />
          {/* Head */}
          <rect x="20" y="-15" width="20" height="15" fill="#8B4513" />
          {/* Snout */}
          <rect x="35" y="-10" width="8" height="8" fill="#A0522D" />
          {/* Eyes */}
          <circle cx="32" cy="-12" r="1.5" fill="black" />
          {/* Ears */}
          <path d="M22,-15 L18,-22 L26,-15 Z" fill="#8B4513" />
          {/* Legs */}
          <rect x="-22" y="13" width="5" height="25" fill="#8B4513" />
          <rect x="-10" y="13" width="5" height="25" fill="#8B4513" />
          <rect x="10" y="13" width="5" height="25" fill="#8B4513" />
          <rect x="19" y="13" width="5" height="25" fill="#8B4513" />
          {/* Spots */}
          <ellipse cx="-10" cy="-5" rx="8" ry="6" fill="white" />
          <ellipse cx="10" cy="5" rx="6" ry="8" fill="white" />
          {/* Tail */}
          <path
            d="M-30,-5 Q-35,0 -30,10"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
          />
        </g>
      ))}

      {/* Main Soil Layer */}
      <rect x="0" y="200" width="600" height="120" fill="url(#soilGradient)" />
      {/* Compost Pile */}
      <g transform="translate(50, 200)">
        {/* <path d="M0,50 Q75,-20 150,50" fill="#8D6E63" /> */}
        {/* Decomposing Matter */}
        {[...Array(5)].map((_, i) => (
          <g
            key={i}
            className="decomposing-matter"
            style={{ animationDelay: `${i * 0.8}s` }}
          >
            <rect x={20 + i * 25} y="10" width="15" height="5" fill="#A1887F" />
            <circle cx={25 + i * 25} y="12" r="3" fill="#795548" />
          </g>
        ))}
      </g>
      {/* Cover Crops */}
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`translate(${300 + i * 40}, 200)`}>
          <path
            d={`M0,0 C-10,-20 -5,-40 0,-50 C5,-40 10,-20 0,0`}
            fill="#4CAF50"
          />
          <path
            d={`M-5,0 C-15,-15 -10,-30 -5,-35 C0,-30 5,-15 -5,0`}
            fill="#2E7D32"
          />
        </g>
      ))}
      {/* Nutrient Flows */}
      {[...Array(12)].map((_, i) => (
        <g
          key={i}
          className="nutrient"
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          <circle cx={275 * 400} cy={200} r="3" fill="#8BC34A" opacity="0.7" />
        </g>
      ))}
      {/* Soil Life */}
      {/* Worms */}
      {[...Array(4)].map((_, i) => (
        <g key={i} transform={`translate(${100 + i * 150}, 280)`}>
          <g className="worm" style={{ animationDelay: `${i * 2}s` }}>
            <path
              d="M0,0 Q5,-5 10,0 Q15,5 20,0 Q25,-5 30,0"
              stroke="#8D6E63"
              strokeWidth="4"
              fill="none"
            />
          </g>
        </g>
      ))}
      {/* Microbes */}
      {[...Array(8)].map((_, i) => (
        <g
          key={i}
          transform={`translate(${350 + i * 50}, ${260 + (i % 3) * 30})`}
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          <g className="microbe" style={{ animationDelay: `${i * 0.5}s` }}>
            <circle r="2" fill="#81C784" />
            <circle r="1" cx="1" cy="1" fill="#66BB6A" />
          </g>
        </g>
      ))}
      {/* Root Systems */}
      {[...Array(6)].map((_, i) => (
        <g key={i} transform={`translate(${320 + i * 40}, 180)`}>
          <path
            d={`M0,20 C-10,40 -5,60 0,80 C5,60 10,40 0,20`}
            stroke="#5D4037"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={`M-2,40 C-12,50 -8,70 -2,80`}
            stroke="#5D4037"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d={`M2,40 C12,50 8,70 2,80`}
            stroke="#5D4037"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
};

export default NaturalFertilization;
