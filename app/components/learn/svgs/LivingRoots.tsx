const LivingRoots = () => {
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
            @keyframes microbeMove {
              0% { transform: translate(0, 0); }
              50% { transform: translate(5px, 5px); }
              100% { transform: translate(0, 0); }
            }

              @keyframes butterflyFlight1 {
               0% { transform: translate(0, 5) rotate(0deg); }
               25% { transform: translate(100px, -5dpx) rotate(10deg); }
               50% { transform: translate(150px, 10px) rotate(-5deg); }
               75% { transform: translate(100px, -20px) rotate(10deg); }
               100% { transform: translate(0, 5) rotate(0deg); }
             }

                @keyframes butterflyFlight2 {
                0% { transform: translate(-100px, 5) rotate(0deg); }
                25% { transform: translate(0px, 10px) rotate(-10deg); }
                50% { transform: translate(100px, 5) rotate(5deg); }
                75% { transform: translate(-100px, -20px) rotate(-10deg); }
                100% { transform: translate(-100px, 5) rotate(0deg); }
                }
            
            @keyframes nutrientFlow {
              0% { opacity: 0; transform: translateY(0); }
              50% { opacity: 1; transform: translateY(-10px); }
              100% { opacity: 0; transform: translateY(-20px); }
            }
            .butterfly1 {
               animation: butterflyFlight1 18s infinite;
             }
            .butterfly2 {
               animation: butterflyFlight2 18s infinite;
             }
            .microbe {
              animation: microbeMove 3s infinite ease-in-out;
            }
            
            .nutrient {
              animation: nutrientFlow 4s infinite linear;
            }
          `}
        </style>
      </defs>

      {/* Sun */}

      {/* Soil */}
      <rect x="0" y="200" width="600" height="180" fill="url(#soilGradient)" />

      <g transform="translate(250, 180)">
        <g className="butterfly2">
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

      <g className="butterfly1">
        <circle cx="10" cy="180" r="3" fill="#FFD700" />
        <circle cx="15" cy="180" r="3" fill="#FFD700" />
        <path d="M10,180 L15,183 L10,186" fill="none" stroke="#000" />
      </g>

      {/* Plants showing seasonal progression */}
      {[...Array(5)].map((_, i) => (
        <g key={i} transform={`translate(${100 + i * 100}, 180)`}>
          {/* Main stem */}
          {i !== 4 && (
            <path
              d="M0,20 L0,-30"
              stroke="#3D1F00"
              strokeWidth="3"
              fill="none"
            />
          )}
          {i === 4 && (
            <path
              d="M0,20 L0,-0"
              stroke="#3D1F00"
              strokeWidth="3"
              fill="none"
            />
          )}

          {/* Spring - Full leaves */}
          {i === 0 &&
            [...Array(6)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 60})`}>
                <path
                  d={`M0,${-20 + j * 5} C-15,${-25 + j * 5} -20,${
                    -15 + j * 5
                  } -15,${-10 + j * 5} C-10,${-5 + j * 5} -5,${-5 + j * 5} 0,${
                    -20 + j * 5
                  }`}
                  fill="#90EE90"
                />
                <path
                  d={`M0,${-20 + j * 5} C15,${-25 + j * 5} 20,${
                    -15 + j * 5
                  } 15,${-10 + j * 5} C10,${-5 + j * 5} 5,${-5 + j * 5} 0,${
                    -20 + j * 5
                  }`}
                  fill="#98FB98"
                />
              </g>
            ))}

          {/* Summer/Fall - Varying leaf colors */}
          {(i === 1 || i === 2) &&
            [...Array(6)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 60})`}>
                <path
                  d={`M0,${-20 + j * 5} C-15,${-25 + j * 5} -20,${
                    -15 + j * 5
                  } -15,${-10 + j * 5} C-10,${-5 + j * 5} -5,${-5 + j * 5} 0,${
                    -20 + j * 5
                  }`}
                  fill={i === 1 ? "#228B22" : "#DAA520"}
                />
                <path
                  d={`M0,${-20 + j * 5} C15,${-25 + j * 5} 20,${
                    -15 + j * 5
                  } 15,${-10 + j * 5} C10,${-5 + j * 5} 5,${-5 + j * 5} 0,${
                    -20 + j * 5
                  }`}
                  fill={i === 1 ? "#32CD32" : "#D2691E"}
                />
              </g>
            ))}

          {/* Winter - Bare branches */}
          {i === 3 &&
            [...Array(4)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 60})`}>
                {/* <path
                  d={`M0,${-20 + j * 5} C-15,${-25 + j * 5} -20,${
                    -15 + j * 5
                  } -15,${-10 + j * 5} C-10,${-5 + j * 5} -5,${-5 + j * 5} 0,${
                    -20 + j * 5
                  }`}
                  fill={"#DAA520"}
                /> */}
                <path
                  d={`M0,${-20 + j * 2} C15,${-25 + j * 5} 2,${-1 + j * 5} 15,${
                    -10 + j * 0
                  } C10,${-5 + j * 2} 2,${-5 + j * 2} 0,${-20 + j * 0}`}
                  fill={"#D2691E"}
                />
              </g>
            ))}
        </g>
      ))}

      {/* Root System */}
      {[...Array(5)].map((_, i) => (
        <g key={i} transform={`translate(${100 + i * 100}, 200)`}>
          <path
            d={`M0,0 C-30,40 -20,80 -40,120 M0,0 C30,40 20,80 40,120 M0,0 C-10,40 -5,80 -15,120 M0,0 C10,40 5,80 15,120`}
            stroke="#8B4513"
            strokeWidth="3"
            fill="none"
          />

          {/* Microbes */}
          {[...Array(3)].map((_, j) => (
            <g
              key={j}
              className="microbe"
              style={{ animationDelay: `${j * 0.5}s` }}
            >
              <circle cx={-20 + j * 20} cy={50 + j * 30} r="5" fill="#9ACD32" />
            </g>
          ))}

          {/* Nutrients */}
          {[...Array(4)].map((_, k) => (
            <g
              key={k}
              className="nutrient"
              style={{ animationDelay: `${k * 1}s` }}
            >
              <circle cx={-15 + k * 10} cy={80 + k * 20} r="3" fill="#FFD700" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

export default LivingRoots;
