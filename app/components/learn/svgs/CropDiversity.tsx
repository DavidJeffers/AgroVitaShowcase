const CropDiversity = () => {
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
            @keyframes slideAndLoop {
              0% { transform: translateX(0); }
              100% { transform: translateX(-600px); }
            }
           @keyframes butterflyFlight1 {
               0% { transform: translate(-100, 0) rotate(0deg); }
               25% { transform: translate(100px, -20px) rotate(10deg); }
               50% { transform: translate(200px, 0px) rotate(-5deg); }
               75% { transform: translate(100px, 20px) rotate(10deg); }
               100% { transform: translate(0, 0) rotate(0deg); }
             }
             @keyframes butterflyFlight2 {
               0% { transform: translate(100px, 0) rotate(0deg); }
               25% { transform: translate(200px, 10px) rotate(-10deg); }
               50% { transform: translate(300px, 0px) rotate(5deg); }
               75% { transform: translate(200px, 20px) rotate(-10deg); }
               100% { transform: translate(100px, 0) rotate(0deg); }
             }

                 @keyframes graze {
               0% { transform: translateX(0); }
               50% { transform: translateX(20px); }
               100% { transform: translateX(0); }
             }

             @keyframes pollinatorMove {
               0% { transform: translateX(-20px); }
               100% { transform: translateX(600px); }
             }

               .cow {
               animation: graze 5s infinite;
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
            .sliding-section {
              animation: slideAndLoop 20s infinite linear;
            }
          `}
        </style>
        <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>
      </defs>

      <rect x="0" y="300" width="1800" height="100" fill="url(#soilGradient)" />

      <g className="sliding-section">
        {[0, 600, 1200].map((baseX) => (
          <g key={baseX} transform={`translate(${baseX},0)`}>
            {/* Base grass sections */}
            {[0, 150, 300, 360].map((x, i) => (
              <rect
                key={i}
                x={x}
                y="150"
                width="250"
                height="150"
                fill={
                  i % 4 === 0
                    ? "#8FBC8F"
                    : i % 4 === 1
                    ? "#8E7944"
                    : i % 4 === 2
                    ? "#556B2F"
                    : "#9ACD32"
                }
              />
            ))}

            {/* Cover crops */}
            {[260, 280, 300, 320, 340].map((x) => (
              <g key={x} transform={`translate(${x}, 210)`}>
                <path
                  d="M0,0 C-10,-20 -5,-30 0,-40 C5,-30 10,-20 0,0"
                  fill="#556B2F"
                />
              </g>
            ))}

            {[260, 280, 300, 320, 340].map((x) => (
              <g key={x} transform={`translate(${x}, 280)`}>
                <path
                  d="M0,0 C-10,-20 -5,-30 0,-40 C5,-30 10,-20 0,0"
                  fill="#556B2F"
                />
              </g>
            ))}

            {/* First cow */}
            <g transform="translate(480, 230)">
              <g className="cow">
                <ellipse cx="0" cy="0" rx="25" ry="15" fill="#F5F5DC" />
                <rect x="15" y="-15" width="15" height="12" fill="#F5F5DC" />
                <rect x="26" y="-17" width="5" height="5" fill="#F5F5DC" />
                <rect x="15" y="-17" width="5" height="5" fill="#F5F5DC" />
                <ellipse cx="30" cy="-8" rx="3" ry="2" fill="#FFA07A" />
                <rect x="-15" y="10" width="4" height="15" fill="#F5F5DC" />
                <rect x="-5" y="10" width="4" height="15" fill="#F5F5DC" />
                <rect x="5" y="10" width="4" height="15" fill="#F5F5DC" />
                <rect x="15" y="10" width="4" height="15" fill="#F5F5DC" />
                <ellipse cx="-10" cy="-5" rx="8" ry="6" fill="#8B4513" />
                <ellipse cx="10" cy="5" rx="6" ry="4" fill="#8B4513" />
              </g>
            </g>

            {/* Second cow */}
            <g transform="translate(420, 260)">
              <g className="cow">
                <ellipse cx="0" cy="0" rx="25" ry="15" fill="#F5F5DC" />
                <rect x="15" y="-15" width="15" height="12" fill="#F5F5DC" />
                <rect x="26" y="-17" width="5" height="5" fill="#F5F5DC" />
                <rect x="15" y="-17" width="5" height="5" fill="#F5F5DC" />
                <ellipse cx="30" cy="-8" rx="3" ry="2" fill="#FFA07A" />
                <rect x="-15" y="10" width="4" height="15" fill="#F5F5DC" />
                <rect x="-5" y="10" width="4" height="15" fill="#F5F5DC" />
                <rect x="5" y="10" width="4" height="15" fill="#F5F5DC" />
                <rect x="15" y="10" width="4" height="15" fill="#F5F5DC" />
                <ellipse cx="5" cy="-5" rx="8" ry="6" fill="#8B4513" />
                <ellipse cx="-10" cy="5" rx="6" ry="4" fill="#8B4513" />
              </g>
            </g>

            {/* Labels */}
            <text
              x="60"
              y="170"
              fill="#000"
              fontSize="13"
              stroke="#000"
              strokeWidth="1"
            >
              Alfalfa
            </text>
            <text
              x="180"
              y="170"
              fill="#000"
              fontSize="13"
              stroke="#000"
              strokeWidth="1"
            >
              Legumes
            </text>
            <text
              x="280"
              y="170"
              fill="#000"
              fontSize="13"
              stroke="#000"
              strokeWidth="1"
            >
              Cover Crops
            </text>
            <text
              x="460"
              y="170"
              fill="#000"
              fontSize="13"
              stroke="#000"
              strokeWidth="1"
            >
              Grass
            </text>
          </g>
        ))}
      </g>
      <text
        //   className="fungal-networks"
        x="250"
        y="350"
        fill="#333"
        fontSize="17"
        stroke="#333"
        strokeWidth="1.8"
      >
        Healthy Soil
      </text>

      <g className="pollinator">
        <circle cx="10" cy="120" r="3" fill="#FFD700" />
        <circle cx="15" cy="120" r="3" fill="#FFD700" />
        <path d="M10,120 L15,123 L10,126" fill="none" stroke="#000" />
      </g>
    </svg>
  );
};

export default CropDiversity;
