const Nature = () => {
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
                      @keyframes cowWalk {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(116px, 0px)  }
              52% { transform: translate(116px, 0px)  }
              98% { transform: translate(0, 0) }
            }
                       @keyframes cowFlip {
                0% { transform: scale(1,1) }
                50% { transform: scale(1,1) }
                52% { transform: scale(-1,1) }
                98% { transform: scale(-1,1) }
                100% { transform: scale(1,1) }
                }
            @keyframes butterflyFloat {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(20px, -15px) rotate(10deg); }
              50% { transform: translate(40px, 0) rotate(0deg); }
              75% { transform: translate(20px, 15px) rotate(-10deg); }
            }
               .cow { animation: cowWalk 15s infinite; }
            .cowFlip { animation: cowFlip 15s infinite; }
            .butterfly { animation: butterflyFloat 8s infinite; }
          `}
        </style>
      </defs>

      {/* Sun */}
      <circle cx="500" cy="80" r="40" fill="#FFD700" />

      {/* Mountains */}
      <path d="M0 250 L150 100 L300 250 L450 150 L600 250" fill="#808080" />

      {/* Ground */}
      <rect x="0" y="250" width="600" height="120" fill="#228B22" />

      <g transform="translate(250, 250)">
        {/* Main barn structure */}
        <rect x="-60" y="-80" width="120" height="80" fill="#C41E3A" />
        {/* Roof */}
        <path d="M-70 -80 L0 -120 L70 -80" fill="#8B4513" stroke="#8B4513" />
        {/* Front door */}
        <rect x="-15" y="-40" width="30" height="40" fill="#8B4513" />
        <circle cx="10" cy="-20" r="2" fill="#FFD700" /> {/* Door handle */}
        {/* Windows */}
        <rect x="-45" y="-60" width="20" height="20" fill="white" />
        <path d="M-45 -50 h20 M-35 -60 v20" stroke="#8B4513" />
        <rect x="25" y="-60" width="20" height="20" fill="white" />
        <path d="M25 -50 h20 M35 -60 v20" stroke="#8B4513" />
        {/* Upper window in triangular part */}
        <circle cx="0" cy="-100" r="10" fill="white" />
        <path d="M-7 -100 h14 M0 -107 v14" stroke="#8B4513" />
        {/* Wood texture lines */}
        <path
          d="M-60 -60 h120 M-60 -40 h120"
          stroke="#A31030"
          strokeWidth="1"
        />
      </g>

      {/* Wooden Fence */}
      <g transform="translate(320, 250)">
        {/* Fence posts */}
        <rect x="0" y="-40" width="8" height="40" fill="#8B4513" />
        <rect x="40" y="-40" width="8" height="40" fill="#8B4513" />
        <rect x="80" y="-40" width="8" height="40" fill="#8B4513" />
        <rect x="120" y="-40" width="8" height="40" fill="#8B4513" />

        {/* Horizontal rails */}
        <rect x="0" y="-35" width="128" height="6" fill="#A0522D" />
        <rect x="0" y="-15" width="128" height="6" fill="#A0522D" />

        {/* Wood grain details */}
        <path
          d="M4 -40 v40 M44 -40 v40 M84 -40 v40 M124 -40 v40"
          stroke="#6B3813"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </g>
      <g transform="translate(440, 250)">
        {/* Fence posts */}
        <rect x="0" y="-40" width="8" height="40" fill="#8B4513" />
        <rect x="40" y="-40" width="8" height="40" fill="#8B4513" />
        <rect x="80" y="-40" width="8" height="40" fill="#8B4513" />
        <rect x="120" y="-40" width="8" height="40" fill="#8B4513" />

        {/* Horizontal rails */}
        <rect x="0" y="-35" width="128" height="6" fill="#A0522D" />
        <rect x="0" y="-15" width="128" height="6" fill="#A0522D" />

        {/* Wood grain details */}
        <path
          d="M4 -40 v40 M44 -40 v40 M84 -40 v40 M124 -40 v40"
          stroke="#6B3813"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </g>

      {/* Trees */}
      <g transform="translate(100, 200)">
        <rect x="-10" y="0" width="20" height="60" fill="#8B4513" />
        <path d="M-30 0 L0 -50 L30 0 Z" fill="#006400" />
      </g>

      <g transform="translate(500, 220)">
        <rect x="-10" y="0" width="20" height="60" fill="#8B4513" />
        <path d="M-30 0 L0 -50 L30 0 Z" fill="#006400" />
      </g>

      <g transform="translate(420, 280)">
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

      {/* Butterflies */}
      <g transform="translate(200, 280)">
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

export default Nature;
