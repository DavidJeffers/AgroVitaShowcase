const Animals = () => {
  return (
    <svg
      width="600"
      height="300"
      viewBox="0 0 600 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            @keyframes butterflyFloat {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(20px, -15px) rotate(10deg); }
              50% { transform: translate(40px, 0) rotate(0deg); }
              75% { transform: translate(20px, 15px) rotate(-10deg); }
            }

            @keyframes cowWalk {
              0%, 100% { transform: translate(0, 0); }
              47% { transform: translate(115px, -41px) }
              48% { transform: translate(116px, -41px) }
              49% { transform: translate(115px, -41px) }
              50% { transform: translate(116px, -41px)  }
              52% { transform: translate(116px, -41px)  }
              98% { transform: translate(0, 0) }
            }
                       @keyframes cowFlip {
                0% { transform: scale(1,1) }
                50% { transform: scale(1,1) }
                52% { transform: scale(-1,1) }
                98% { transform: scale(-1,1) }
                100% { transform: scale(1,1) }
                }

            @keyframes sheepWalk {
              0%, 100% { transform: translate(0, 0); }
              48% { transform: translate(550px, 0) }
              50% { transform: translate(550px, 0)  }
              98% { transform: translate(0, 0) }
            }
            @keyframes sheepFlipp {
                0% { transform: scale(-1,1) }
                48% { transform: scale(-1,1) }
                50% { transform: scale(1,1) }
                98% { transform: scale(1,1) }
                100% { transform: scale(-1,1) }
                }

   

            .sheep { animation: sheepWalk 20s infinite; }
            .cow { animation: cowWalk 15s infinite; }
            .cowFlip { animation: cowFlip 15s infinite; }
          
            .sheepFlip { animation: sheepFlipp 20s infinite; }
            .butterfly { animation: butterflyFloat 8s infinite; }
          `}
        </style>
      </defs>
      {/* Sun */}
      {/* <circle cx="500" cy="80" r="40" fill="#FFD700" /> */}
      {/* Ground */}
      <rect x="0" y="150" width="600" height="120" fill="#228B22" />

      {/* Trees */}
      <g transform="translate(100, 100)">
        <rect x="-10" y="0" width="20" height="60" fill="#8B4513" />
        <path d="M-30 0 L0 -50 L30 0 Z" fill="#006400" />
      </g>

      <g id="grass-blade" transform="translate(480, 167)">
        <path
          d="M0 0 Q2 -20 4 0 T8 0 Q6 -25 12 0"
          fill="green"
          stroke="#006400"
          strokeWidth="2"
          style={{ opacity: "1", zIndex: -1000 }}
        />
      </g>
      <use href="#grass-blade" x="10" />
      <use href="#grass-blade" x="-10" y="-10" />
      <use href="#grass-blade" x="20" />
      <use href="#grass-blade" x="30" />
      <use href="#grass-blade" x="30" y="-10" />
      <use href="#grass-blade" x="40" />

      <g transform="translate(500, 120)">
        <rect x="-10" y="0" width="20" height="60" fill="#8B4513" />
        <path d="M-30 0 L0 -50 L30 0 Z" fill="#006400" />
      </g>
      <use
        href="#grass-blade"
        x="10"
        y="10"
        style={{
          opacity: 0.8,
        }}
      />
      <use
        href="#grass-blade"
        x="-10"
        y="10"
        style={{
          opacity: 0.8,
        }}
      />
      <use
        href="#grass-blade"
        x="-10"
        style={{
          opacity: 0.8,
        }}
      />
      <use
        href="#grass-blade"
        x="20"
        y="10"
        style={{
          opacity: 0.8,
        }}
      />
      <use
        href="#grass-blade"
        x="30"
        y="10"
        style={{
          opacity: 0.8,
        }}
      />
      <use
        href="#grass-blade"
        x="30"
        y="10"
        style={{
          opacity: 0.8,
        }}
      />
      <use
        href="#grass-blade"
        x="40"
        y="10"
        style={{
          opacity: 0.8,
        }}
      />

      <g transform="translate(320, 200)">
        <g className="cow">
          <g className="cowFlip">
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
      </g>

      <g transform={"translate(18, -270)"} style={{ zIndex: 10000 }}>
        <g className="sheep">
          {/* Sheep Body */}
          <ellipse
            className="sheepFlip"
            cx={20}
            cy={510}
            rx="20"
            ry="15"
            fill="#FFFFFF"
            stroke="#D3D3D3"
            strokeWidth="2"
          />
          {/* Head */}
          <circle cx={5} cy={508} r="8" fill="#D3D3D3" className="sheepFlip" />
          {/* Ears */}
          <ellipse
            cx={10}
            cy={505}
            rx="5"
            ry="3"
            fill="#D3D3D3"
            className="sheepFlip"
          />
          <ellipse
            cx={0}
            cy={505}
            rx="5"
            ry="3"
            fill="#D3D3D3"
            className="sheepFlip"
          />
          {/* Eyes */}
          <circle cx={7} cy={507} r="2" fill="#000" className="sheepFlip" />
          <circle cx={3} cy={507} r="2" fill="#000" className="sheepFlip" />
          {/* Legs */}
          <rect
            x={9}
            y={523}
            width="3"
            height="10"
            fill="#555"
            className="sheepFlip"
          />
          <rect
            x={15}
            y={523}
            width="3"
            height="10"
            fill="#555"
            className="sheepFlip"
          />
          <rect
            x={25}
            y={523}
            width="3"
            height="10"
            fill="#555"
            className="sheepFlip"
          />
          <rect
            x={30}
            y={523}
            width="3"
            height="10"
            fill="#555"
            className="sheepFlip"
          />
        </g>
      </g>

      {/* Butterflies */}
      <g transform="translate(200, 130)">
        <g className="butterfly">
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
    </svg>
  );
};

export default Animals;
