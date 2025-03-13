const RotationalGrazing = () => {
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
     @keyframes grassCycle1 {
              0%, 100% { fill: #90EE90; }
              5% { fill: #8B9B6D; }
              15% { fill: #8B9B6D; }
              20% { fill: #8B9B6D; }
              25% { fill: #8B9B6D; }
              30% { fill: #8B9B6D; }
              40% { fill: #8B9B6D; }
              50% { fill: #90EE90; }
            }
            
            @keyframes grassCycle2 {
              0% { fill: #90EE90; }
              25% { fill: #90EE90; }
              30% { fill: #8B9B6D; }
              40% { fill: #8B9B6D; }
              45% { fill: #8B9B6D; }
              50% { fill: #8B9B6D; }
              55% { fill: #8B9B6D; }
              65% { fill: #8B9B6D; }
              75% { fill: #90EE90; }
              100% { fill: #90EE90; }
            }
            
            @keyframes grassCycle3 {
              0% { fill: #90EE90; }
              50% { fill: #90EE90; }
              55% { fill: #8B9B6D; }
              65% { fill: #8B9B6D; }
              70% { fill: #8B9B6D; }
              75% { fill: #8B9B6D; }
              80% { fill: #8B9B6D; }
              90% { fill: #8B9B6D; }
              100% { fill: #90EE90; }
            }
            
            @keyframes grassCycle4 {
              0% { fill: #8B9B6D; }
              5% { fill: #8B9B6D; }
              15% { fill: #8B9B6D; }
              25% { fill: #90EE90; }
              75% { fill: #90EE90; }
              80% { fill: #8B9B6D; }
              90% { fill: #8B9B6D; }
              95% { fill: #8B9B6D; }
              100% { fill: #8B9B6D; }
            }

            @keyframes cowMovement {
              0%, 100% { transform: translate(150px, 75px); }
              20% { transform: translate(400px, 75px); }
              21% { transform: translate(395px, 76px); }
              22% { transform: translate(403px, 74px); }
              23% { transform: translate(395px, 76px); }
              24% { transform: translate(403px, 74px); }
              25% { transform: translate(400px, 75px); }
              45% { transform: translate(400px, 275px); }
                46% { transform: translate(395px, 276px); }
                47% { transform: translate(403px, 274px); }
                48% { transform: translate(395px, 276px); }
                49% { transform: translate(403px, 274px); }

              50% { transform: translate(400px, 275px); }
              70% { transform: translate(150px, 275px); }
                71% { transform: translate(145px, 276px); }
                72% { transform: translate(150px, 274px); }
                73% { transform: translate(145px, 276px); }
                74% { transform: translate(153px, 274px); }
              75% { transform: translate(150px, 275px); }
                95% { transform: translate(150px, 75px); }
                96% { transform: translate(145px, 76px); }
                97% { transform: translate(150px, 74px); }
                98% { transform: translate(145px, 76px); }
                99% { transform: translate(151px, 74px); }

            }

            .paddock1 { animation: grassCycle1 50s infinite; }
            .paddock2 { animation: grassCycle2 50s infinite; }
            .paddock3 { animation: grassCycle3 50s infinite; }
            .paddock4 { animation: grassCycle4 50s infinite; }
            .cows { animation: cowMovement 50s infinite linear; }
          `}
        </style>
      </defs>

      {/* Background */}

      {/* Centered grid of paddocks */}
      <g transform="translate(100, 50)">
        {/* Paddocks */}
        <g stroke="#333" strokeWidth="2">
          {/* Top Left Paddock */}
          <rect x="0" y="0" width="200" height="150" className="paddock1" />

          {/* Top Right Paddock */}
          <rect x="200" y="0" width="200" height="150" className="paddock2" />

          {/* Bottom Right Paddock */}
          <rect x="200" y="150" width="200" height="150" className="paddock3" />

          {/* Bottom Left Paddock */}
          <rect x="0" y="150" width="200" height="150" className="paddock4" />
        </g>

        {/* Division lines */}
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="300"
          stroke="#8B4513"
          strokeWidth="4"
        />
        <line
          x1="0"
          y1="150"
          x2="400"
          y2="150"
          stroke="#8B4513"
          strokeWidth="4"
        />
      </g>

      {/* Cow Group */}
      <g className="cows">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 30}, ${i * 20})`}>
            {/* Cow body */}
            <ellipse cx="0" cy="0" rx="15" ry="10" fill="#4A4A4A" />
            {/* Head */}
            <ellipse cx="-12" cy="0" rx="7" ry="5" fill="#4A4A4A" />
            {/* Legs */}
            <line
              x1="-8"
              y1="10"
              x2="-8"
              y2="15"
              stroke="#4A4A4A"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="10"
              x2="8"
              y2="15"
              stroke="#4A4A4A"
              strokeWidth="2"
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

export default RotationalGrazing;
