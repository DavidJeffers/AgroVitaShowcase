const Explore = ({
  x,
  y,
  animationDelay,
}: {
  x: number | undefined;
  y: number | undefined;
  animationDelay: boolean;
}) => {
  return (
    <svg
      width="100%"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100%",
        overflow: "hidden", // Add this to prevent scrolling
      }}
      viewBox="0 0 100vw 100vh"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
       
           @keyframes butterflyFlight1 {
               0% { transform: translate(-100, 0) rotate(0deg); }
               15% { transform: translate(150px, -10px) rotate(10deg); }
               25% { transform: translate(250px, -20px) rotate(10deg); }
               50% { transform: translate(608px, 6px) rotate(-5deg); }
               51% { transform: translate(608px, 6px) rotate(5deg); }
               75% { transform: translate(400px, -20px) rotate(10deg); }
               100% { transform: translate(-100, 0) rotate(0deg); }
             }
             @keyframes butterflyFlight2 {
               0% { transform: translate(507px, 0) rotate(0deg); }
               5% { transform: translate(555px, -5) rotate(4deg); }
               10% { transform: translate(400px, -2) rotate(-10deg); }
               25% { transform: translate(630px, -2px) rotate(-10deg); }
                35% { transform: translate(630px, 16px) rotate(10deg); }
               50% { transform: translate(532px, 16px) rotate(5deg); }
                51% { transform: translate(532px, 16px) rotate(-5deg); }
                60% { transform: translate(610px, -2px) rotate(-10deg); }
               78% { transform: translate(510px, -2px) rotate(-10deg); }
               90% { transform: translate(305px, 20) rotate(5deg); }
               100% { transform: translate(507px, 0) rotate(0deg); }
             }
               @keyframes butterflyFlight3 {
                0% { transform: translate(700px, 0) rotate(0deg); }
                5% { transform: translate(755px, -5) rotate(4deg); }
                10% { transform: translate(600px, -2) rotate(-10deg); }
                25% { transform: translate(830px, -2px) rotate(-10deg); }
                 35% { transform: translate(830px, 16px) rotate(10deg); }
                50% { transform: translate(732px, 16px) rotate(5deg); }
                78% { transform: translate(715px, -20px) rotate(-10deg); }
                90% { transform: translate(605px, 20) rotate(5deg); }
                100% { transform: translate(700px, 0) rotate(0deg); }
              }
              @keyframes butterflyFlight4 {
                0% { transform: translate(800px, 0) rotate(0deg); }
                5% { transform: translate(855px, -5) rotate(4deg); }
                10% { transform: translate(700px, -2) rotate(-10deg); }
                25% { transform: translate(930px, -2px) rotate(-10deg); }
                50% { transform: translate(832px, 16px) rotate(5deg); }
                78% { transform: translate(710px, -2px) rotate(-10deg); }
                90% { transform: translate(705px, 20) rotate(5deg); }
                100% { transform: translate(800px, 0) rotate(0deg); }
              }
             

             .butterfly1 {
               animation: butterflyFlight1 28s infinite;
             }
             .butterfly2 {
               animation: butterflyFlight2 28s infinite;
             }
              .butterfly3 {
                animation: butterflyFlight3 23s infinite;
              }
              .butterfly4 {
                animation: butterflyFlight4 23s infinite;
              }
         
          `}
        </style>
      </defs>
      <g transform={`translate(${x ? x : 150}, ${y ? y : 30})`}>
        <g className={animationDelay ? "butterfly4" : "butterfly1"}>
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
      {animationDelay ? null : (
        <g transform={`translate(${x ? x : 200}, ${y ? y : 19})`}>
          <g className={animationDelay ? "butterfly3" : "butterfly2"}>
            <path d="M0,0 C-10,-10 -15,-5 -10,0 C-15,5 -10,10 0,0" fill="red" />
            <path d="M0,0 C10,-10 15,-5 10,0 C15,5 10,10 0,0" fill="red" />
            <line
              x1="0"
              y1="-3"
              x2="0"
              y2="3"
              stroke="#333"
              strokeWidth="1.5"
            />
            <path d="M0,-3 Q-3,-6 -4,-8" fill="none" stroke="#333" />
            <path d="M0,-3 Q3,-6 4,-8" fill="none" stroke="#333" />
          </g>
        </g>
      )}
    </svg>
  );
};

export default Explore;
