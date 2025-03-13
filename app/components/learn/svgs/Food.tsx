const Food = () => {
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
      @keyframes fruitBounce {
        0%, 100% { transform: translateY(-180px); }
        100% { transform: translateY(0); }
      }

          @keyframes juiceMove {
              0% { opacity: .1; }
              100% { opacity: 1, }
            }

      .bouncing-fruit { animation: fruitBounce 3s  }
        .juice { animation: juiceMove 3s }
    `}
        </style>
      </defs>

      {/* <!-- Wooden Board --> */}
      <path d="M50 150 L550 150 L520 300 L80 300 Z" fill="#8B4513" />
      <path d="M80 300 L520 300 L500 350 L100 350 Z" fill="#654321" />

      {/* <!-- Wood Grain --> */}
      <g stroke="#6B3813" strokeWidth="1" opacity="0.3">
        <path d="M100 170 L500 170" />
        <path d="M90 200 L510 200" />
        <path d="M85 230 L515 230" />
        <path d="M80 260 L520 260" />
        <path d="M80 290 L520 290" />
      </g>

      {/* <!-- Steak --> */}
      <g transform="translate(300, 225)">
        {/* <!-- Main steak body --> */}
        <path
          d="M-80,-40 C-70,-50 70,-50 80,-40 C90,-20 90,20 80,40 C70,50 -70,50 -80,40 C-90,20 -90,-20 -80,-40"
          fill="#B22222"
        />

        {/* <!-- Fat marbling --> */}
        <path
          d="M-60,-20 C-40,-20 -20,-25 0,-20"
          stroke="#FFF5EE"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M20,-10 C40,-10 50,-15 70,-10"
          stroke="#FFF5EE"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M-50,10 C-30,10 -10,5 10,10"
          stroke="#FFF5EE"
          strokeWidth="4"
          fill="none"
        />

        {/* <!-- Grill marks --> */}
        <path d="M-60,-30 L-40,-30" stroke="#4A0404" strokeWidth="4" />
        <path d="M-20,-30 L0,-30" stroke="#4A0404" strokeWidth="4" />
        <path d="M20,-30 L40,-30" stroke="#4A0404" strokeWidth="4" />
        <path d="M-60,0 L-40,0" stroke="#4A0404" strokeWidth="4" />
        <path d="M-20,0 L0,0" stroke="#4A0404" strokeWidth="4" />
        <path d="M20,0 L40,0" stroke="#4A0404" strokeWidth="4" />
      </g>

      {/* <!-- Orange --> */}
      <g transform="translate(150, 200)">
        <g className="bouncing-fruit">
          <circle cx="0" cy="0" r="30" fill="#FFA500" />
          <path
            d="M0,-30 C10,-30 15,-25 15,-20"
            stroke="#228B22"
            strokeWidth="2"
          />
          <path d="M-5,-28 L5,-28" stroke="#228B22" strokeWidth="2" />
          {/* <!-- Orange segments suggestion --> */}
          <path
            d="M0,-20 L0,20"
            stroke="#FF8C00"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <path
            d="M-17,10 L17,10"
            stroke="#FF8C00"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <path
            d="M-17,-10 L17,-10"
            stroke="#FF8C00"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </g>
      </g>

      {/* <!-- Apple --> */}
      <g transform="translate(450, 200)">
        <g className="bouncing-fruit">
          <circle cx="0" cy="0" r="25" fill="#FF0000" />
          <path d="M0,-25 C-10,-35 10,-35 0,-25" fill="#228B22" />
          <path d="M-2,-27 L2,-23" stroke="#228B22" strokeWidth="2" />
        </g>
      </g>

      {/* <!-- Grapes --> */}
      <g transform="translate(500, 250)">
        <g className="bouncing-fruit">
          <g transform="rotate(-30)">
            {/* <!-- Grape cluster --> */}
            <circle cx="0" cy="0" r="8" fill="#4B0082" />
            <circle cx="-9" cy="5" r="8" fill="#4B0082" />
            <circle cx="9" cy="5" r="8" fill="#4B0082" />
            <circle cx="-4" cy="15" r="8" fill="#4B0082" />
            <circle cx="4" cy="15" r="8" fill="#4B0082" />
            {/* <!-- Stem --> */}
            <path
              d="M0,-8 C-10,-20 10,-20 0,-8"
              stroke="#228B22"
              strokeWidth="2"
              fill="none"
            />
          </g>
        </g>
      </g>

      {/* <!-- Juice drops --> */}
      <g className="juice" style={{ animationDelay: `0s` }}>
        <circle cx="450" cy="219" r="8" fill="#FF0000" opacity="0.3" />
      </g>

      <g className="juice">
        <circle cx="150" cy="221" r="10" fill="#FFA500" opacity="0.3" />
      </g>

      <g className="juice">
        <circle cx="500" cy="265" r="5" fill="#4B0082" opacity="0.2" />
      </g>

      {/* <!-- Herbs for garnish --> */}
      <g transform="translate(250, 180)">
        <path d="M0,0 C-10,-10 -20,-5 -15,5 C-10,15 0,10 0,0" fill="#228B22" />
        <path d="M10,0 C20,-10 30,-5 25,5 C20,15 10,10 10,0" fill="#228B22" />
      </g>
    </svg>
  );
};

export default Food;
