/* eslint-disable react/prop-types */
const AllPrinciples = () => {
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
      {[250, 550, 999, 1400].map((x, i) => (
        <g key={i} className="animate-tree" style={{ zIndex: "-100" }}>
          <rect
            x={x}
            y="443"
            width="15"
            height="50"
            fill="#8B5A2B"
            style={{ zIndex: "-1" }}
          />
          <circle cx={x + 7} cy="420" r="30" fill="#228B22" />
          <circle cx={x + 18} cy="410" r="18" fill="#228B22" />
          <circle cx={x - 4} cy="410" r="18" fill="#228B22" />
          <circle cx={x + 18} cy="431" r="17" fill="#228B22" />
          <circle cx={x - 4} cy="431" r="17" fill="#228B22" />
          {/* <circle cx={x - 4} cy="420" r="10" fill="#228B22" /> */}
          {/* <circle cx={x - 4} cy="430" r="15" fill="#228B22" /> */}
        </g>
      ))}

      {/* <!-- Cows --> */}
      <Cow x={550} />
      <Cow x={1850} />
      <Cow x={3050} />
      <Cow x={4000} />

      <g id="grass-blade" transform="translate(0, 559)">
        <path
          d="M0 0 Q2 -20 4 0 T8 0 Q6 -25 12 0"
          fill="green"
          stroke="green"
          strokeWidth="1"
          style={{ opacity: ".5", zIndex: -1000 }}
        />
      </g>
      <use href="#grass-blade" x="10" />
      <use href="#grass-blade" x="20" />
      <use href="#grass-blade" x="30" />
      <use href="#grass-blade" x="40" />
      <use href="#grass-blade" x="50" />
      <use href="#grass-blade" x="60" />
      <use href="#grass-blade" x="70" />
      <use href="#grass-blade" x="80" />
      <use href="#grass-blade" x="90" />
      <use href="#grass-blade" x="100" />
      <use href="#grass-blade" x="110" />
      <use href="#grass-blade" x="120" />
      <use href="#grass-blade" x="130" />
      <use href="#grass-blade" x="140" />
      <use href="#grass-blade" x="150" />
      <use href="#grass-blade" x="160" />
      <use href="#grass-blade" x="170" />
      <use href="#grass-blade" x="180" />
      <use href="#grass-blade" x="190" />
      <use href="#grass-blade" x="200" />
      <use href="#grass-blade" x="210" />
      <use href="#grass-blade" x="220" />
      <use href="#grass-blade" x="230" />
      <use href="#grass-blade" x="240" />
      <use href="#grass-blade" x="250" />
      <use href="#grass-blade" x="260" />
      <use href="#grass-blade" x="270" />
      <use href="#grass-blade" x="280" />
      <use href="#grass-blade" x="290" />
      <use href="#grass-blade" x="300" />
      <use href="#grass-blade" x="310" />
      <use href="#grass-blade" x="320" />
      <use href="#grass-blade" x="330" />
      <use href="#grass-blade" x="340" />
      <use href="#grass-blade" x="350" />
      <use href="#grass-blade" x="360" />
      <use href="#grass-blade" x="370" />
      <use href="#grass-blade" x="380" />
      <use href="#grass-blade" x="390" />
      <use href="#grass-blade" x="400" />
      <use href="#grass-blade" x="410" />
      <use href="#grass-blade" x="420" />
      <use href="#grass-blade" x="430" />
      <use href="#grass-blade" x="440" />
      <use href="#grass-blade" x="450" />
      <use href="#grass-blade" x="460" />
      <use href="#grass-blade" x="470" />
      <use href="#grass-blade" x="480" />
      <use href="#grass-blade" x="490" />
      <use href="#grass-blade" x="500" />
      <use href="#grass-blade" x="510" />
      <use href="#grass-blade" x="520" />
      <use href="#grass-blade" x="530" />
      <use href="#grass-blade" x="540" />
      <use href="#grass-blade" x="550" />
      <use href="#grass-blade" x="560" />
      <use href="#grass-blade" x="570" />
      <use href="#grass-blade" x="580" />
      <use href="#grass-blade" x="590" />
      <use href="#grass-blade" x="600" />
      <use href="#grass-blade" x="610" />
      <use href="#grass-blade" x="620" />
      <use href="#grass-blade" x="630" />
      <use href="#grass-blade" x="640" />
      <use href="#grass-blade" x="650" />
      <use href="#grass-blade" x="660" />
      <use href="#grass-blade" x="670" />
      <use href="#grass-blade" x="680" />
      <use href="#grass-blade" x="690" />
      <use href="#grass-blade" x="700" />
      <use href="#grass-blade" x="710" />
      <use href="#grass-blade" x="720" />
      <use href="#grass-blade" x="730" />
      <use href="#grass-blade" x="740" />
      <use href="#grass-blade" x="750" />
      <use href="#grass-blade" x="760" />
      <use href="#grass-blade" x="770" />
      <use href="#grass-blade" x="780" />
      <use href="#grass-blade" x="790" />
      <use href="#grass-blade" x="800" />
      <use href="#grass-blade" x="810" />
      <use href="#grass-blade" x="820" />
      <use href="#grass-blade" x="830" />
      <use href="#grass-blade" x="840" />
      <use href="#grass-blade" x="850" />
      <use href="#grass-blade" x="860" />
      <use href="#grass-blade" x="870" />
      <use href="#grass-blade" x="880" />
      <use href="#grass-blade" x="890" />
      <use href="#grass-blade" x="900" />
      <use href="#grass-blade" x="910" />
      <use href="#grass-blade" x="920" />
      <use href="#grass-blade" x="930" />
      <use href="#grass-blade" x="940" />
      <use href="#grass-blade" x="950" />
      <use href="#grass-blade" x="960" />
      <use href="#grass-blade" x="970" />
      <use href="#grass-blade" x="980" />
      <use href="#grass-blade" x="990" />
      <use href="#grass-blade" x="1000" />
      <use href="#grass-blade" x="1010" />
      <use href="#grass-blade" x="1020" />
      <use href="#grass-blade" x="1030" />
      <use href="#grass-blade" x="1040" />
      <use href="#grass-blade" x="1050" />
      <use href="#grass-blade" x="1060" />
      <use href="#grass-blade" x="1070" />
      <use href="#grass-blade" x="1080" />
      <use href="#grass-blade" x="1090" />
      <use href="#grass-blade" x="1100" />
      <use href="#grass-blade" x="1110" />
      <use href="#grass-blade" x="1120" />
      <use href="#grass-blade" x="1130" />
      <use href="#grass-blade" x="1140" />
      <use href="#grass-blade" x="1150" />
      <use href="#grass-blade" x="1160" />
      <use href="#grass-blade" x="1170" />
      <use href="#grass-blade" x="1180" />
      <use href="#grass-blade" x="1190" />
      <use href="#grass-blade" x="1200" />
      <use href="#grass-blade" x="1210" />
      <use href="#grass-blade" x="1220" />
      <use href="#grass-blade" x="1230" />
      <use href="#grass-blade" x="1240" />
      <use href="#grass-blade" x="1250" />
      <use href="#grass-blade" x="1260" />
      <use href="#grass-blade" x="1270" />
      <use href="#grass-blade" x="1280" />
      <use href="#grass-blade" x="1290" />
      <use href="#grass-blade" x="1300" />
      <use href="#grass-blade" x="1310" />
      <use href="#grass-blade" x="1320" />
      <use href="#grass-blade" x="1330" />
      <use href="#grass-blade" x="1340" />
      <use href="#grass-blade" x="1350" />
      <use href="#grass-blade" x="1360" />
      <use href="#grass-blade" x="1370" />
      <use href="#grass-blade" x="1380" />
      <use href="#grass-blade" x="1390" />
      <use href="#grass-blade" x="1400" />
      <use href="#grass-blade" x="1410" />
      <use href="#grass-blade" x="1420" />
      <use href="#grass-blade" x="1430" />
      <use href="#grass-blade" x="1440" />
      <use href="#grass-blade" x="1450" />
      <use href="#grass-blade" x="1460" />
      <use href="#grass-blade" x="1470" />
      <use href="#grass-blade" x="1480" />
      <use href="#grass-blade" x="1490" />
      <use href="#grass-blade" x="1500" />
      <use href="#grass-blade" x="1510" />
      <use href="#grass-blade" x="1520" />
      <use href="#grass-blade" x="1530" />
      <use href="#grass-blade" x="1540" />
      <use href="#grass-blade" x="1550" />
      <use href="#grass-blade" x="1560" />
      <use href="#grass-blade" x="1570" />
      <use href="#grass-blade" x="1580" />
      <use href="#grass-blade" x="1590" />
      <use href="#grass-blade" x="1600" />
      <use href="#grass-blade" x="1610" />
      <use href="#grass-blade" x="1620" />
      <use href="#grass-blade" x="1630" />
      <use href="#grass-blade" x="1640" />
      <use href="#grass-blade" x="1650" />
      <use href="#grass-blade" x="1660" />
      <use href="#grass-blade" x="1670" />
      <use href="#grass-blade" x="1680" />
      <use href="#grass-blade" x="1690" />
      <use href="#grass-blade" x="1700" />
      <use href="#grass-blade" x="1710" />
      <use href="#grass-blade" x="1720" />
      <use href="#grass-blade" x="1730" />
      <use href="#grass-blade" x="1740" />
      <use href="#grass-blade" x="1750" />
      <use href="#grass-blade" x="1760" />
      <use href="#grass-blade" x="1770" />
      <use href="#grass-blade" x="1780" />
      <use href="#grass-blade" x="1790" />
      <use href="#grass-blade" x="1800" />
      <use href="#grass-blade" x="1810" />
      <use href="#grass-blade" x="1820" />
      <use href="#grass-blade" x="1830" />
      <use href="#grass-blade" x="1840" />
      <use href="#grass-blade" x="1850" />
      <use href="#grass-blade" x="1860" />
      <use href="#grass-blade" x="1870" />
      <use href="#grass-blade" x="1880" />
      <use href="#grass-blade" x="1890" />
      <use href="#grass-blade" x="1900" />
      <use href="#grass-blade" x="1910" />
      <use href="#grass-blade" x="1920" />
      <use href="#grass-blade" x="1930" />
      <use href="#grass-blade" x="1940" />
      <use href="#grass-blade" x="1950" />
      <use href="#grass-blade" x="1960" />
      <use href="#grass-blade" x="1970" />
      <use href="#grass-blade" x="1980" />
      <use href="#grass-blade" x="1990" />
      <use href="#grass-blade" x="2000" />
      <use href="#grass-blade" x="2010" />
      <use href="#grass-blade" x="2020" />
      <use href="#grass-blade" x="2030" />
      <use href="#grass-blade" x="2040" />
      <use href="#grass-blade" x="2050" />
      <use href="#grass-blade" x="2060" />
      <use href="#grass-blade" x="2070" />
      <use href="#grass-blade" x="2080" />
      <use href="#grass-blade" x="2090" />
      <use href="#grass-blade" x="2100" />
      <use href="#grass-blade" x="2110" />
      <use href="#grass-blade" x="2120" />
      <use href="#grass-blade" x="2130" />
      <use href="#grass-blade" x="2140" />
      <use href="#grass-blade" x="2150" />
      <use href="#grass-blade" x="2160" />
      <use href="#grass-blade" x="2170" />
      <use href="#grass-blade" x="2180" />
      <use href="#grass-blade" x="2190" />
      <use href="#grass-blade" x="2200" />
      <use href="#grass-blade" x="2210" />
      <use href="#grass-blade" x="2220" />
      <use href="#grass-blade" x="2230" />
      <use href="#grass-blade" x="2240" />
      <use href="#grass-blade" x="2250" />
      <use href="#grass-blade" x="2260" />
      <use href="#grass-blade" x="2270" />
      <use href="#grass-blade" x="2280" />
      <use href="#grass-blade" x="2290" />

      {/* <!-- Crops --> */}
      <g id="grass-blade2" transform="translate(0, 490)">
        <path
          d="M0 0 Q2 -20 4 0 T8 0 Q6 -25 12 0"
          fill="green"
          stroke="green"
          strokeWidth=".5"
          style={{ opacity: ".5", scale: ".5", zIndex: -1000 }}
        />
      </g>
      <use href="#grass-blade2" x="10" />
      <use href="#grass-blade2" x="20" />
      <use href="#grass-blade2" x="30" />
      <use href="#grass-blade2" x="40" />
      <use href="#grass-blade2" x="50" />
      <use href="#grass-blade2" x="60" />
      <use href="#grass-blade2" x="70" />
      <use href="#grass-blade2" x="80" />
      <use href="#grass-blade2" x="90" />
      <use href="#grass-blade2" x="100" />
      <use href="#grass-blade2" x="110" />
      <use href="#grass-blade2" x="120" />
      <use href="#grass-blade2" x="130" />
      <use href="#grass-blade2" x="140" />
      <use href="#grass-blade2" x="150" />
      <use href="#grass-blade2" x="160" />
      <use href="#grass-blade2" x="170" />
      <use href="#grass-blade2" x="180" />
      <use href="#grass-blade2" x="190" />
      <use href="#grass-blade2" x="200" />
      <use href="#grass-blade2" x="210" />
      <use href="#grass-blade2" x="220" />
      <use href="#grass-blade2" x="230" />
      <use href="#grass-blade2" x="240" />
      <use href="#grass-blade2" x="250" />
      <use href="#grass-blade2" x="260" />
      <use href="#grass-blade2" x="270" />
      <use href="#grass-blade2" x="280" />
      <use href="#grass-blade2" x="290" />
      <use href="#grass-blade2" x="300" />
      <use href="#grass-blade2" x="310" />
      <use href="#grass-blade2" x="320" />
      <use href="#grass-blade2" x="330" />
      <use href="#grass-blade2" x="340" />
      <use href="#grass-blade2" x="350" />
      <use href="#grass-blade2" x="360" />
      <use href="#grass-blade2" x="370" />
      <use href="#grass-blade2" x="380" />
      <use href="#grass-blade2" x="390" />
      <use href="#grass-blade2" x="400" />
      <use href="#grass-blade2" x="410" />
      <use href="#grass-blade2" x="420" />
      <use href="#grass-blade2" x="430" />
      <use href="#grass-blade2" x="440" />
      <use href="#grass-blade2" x="450" />
      <use href="#grass-blade2" x="460" />
      <use href="#grass-blade2" x="470" />
      <use href="#grass-blade2" x="480" />
      <use href="#grass-blade2" x="490" />
      <use href="#grass-blade2" x="500" />
      <use href="#grass-blade2" x="510" />
      <use href="#grass-blade2" x="520" />
      <use href="#grass-blade2" x="530" />
      <use href="#grass-blade2" x="540" />
      <use href="#grass-blade2" x="550" />
      <use href="#grass-blade2" x="560" />
      <use href="#grass-blade2" x="570" />
      <use href="#grass-blade2" x="580" />
      <use href="#grass-blade2" x="590" />
      <use href="#grass-blade2" x="600" />
      <use href="#grass-blade2" x="610" />
      <use href="#grass-blade2" x="620" />
      <use href="#grass-blade2" x="630" />
      <use href="#grass-blade2" x="640" />
      <use href="#grass-blade2" x="650" />
      <use href="#grass-blade2" x="660" />
      <use href="#grass-blade2" x="670" />
      <use href="#grass-blade2" x="680" />
      <use href="#grass-blade2" x="690" />
      <use href="#grass-blade2" x="700" />
      <use href="#grass-blade2" x="710" />
      <use href="#grass-blade2" x="720" />
      <use href="#grass-blade2" x="730" />
      <use href="#grass-blade2" x="740" />
      <use href="#grass-blade2" x="750" />
      <use href="#grass-blade2" x="760" />
      <use href="#grass-blade2" x="770" />
      <use href="#grass-blade2" x="780" />
      <use href="#grass-blade2" x="790" />
      <use href="#grass-blade2" x="800" />
      <use href="#grass-blade2" x="810" />
      <use href="#grass-blade2" x="820" />
      <use href="#grass-blade2" x="830" />
      <use href="#grass-blade2" x="840" />
      <use href="#grass-blade2" x="850" />
      <use href="#grass-blade2" x="860" />
      <use href="#grass-blade2" x="870" />
      <use href="#grass-blade2" x="880" />
      <use href="#grass-blade2" x="890" />
      <use href="#grass-blade2" x="900" />
      <use href="#grass-blade2" x="910" />
      <use href="#grass-blade2" x="920" />
      <use href="#grass-blade2" x="930" />
      <use href="#grass-blade2" x="940" />
      <use href="#grass-blade2" x="950" />
      <use href="#grass-blade2" x="960" />
      <use href="#grass-blade2" x="970" />
      <use href="#grass-blade2" x="980" />
      <use href="#grass-blade2" x="990" />
      <use href="#grass-blade2" x="1000" />
      <use href="#grass-blade2" x="1010" />
      <use href="#grass-blade2" x="1020" />
      <use href="#grass-blade2" x="1030" />
      <use href="#grass-blade2" x="1040" />
      <use href="#grass-blade2" x="1050" />
      <use href="#grass-blade2" x="1060" />
      <use href="#grass-blade2" x="1070" />
      <use href="#grass-blade2" x="1080" />
      <use href="#grass-blade2" x="1090" />
      <use href="#grass-blade2" x="1100" />
      <use href="#grass-blade2" x="1110" />
      <use href="#grass-blade2" x="1120" />
      <use href="#grass-blade2" x="1130" />
      <use href="#grass-blade2" x="1140" />
      <use href="#grass-blade2" x="1150" />
      <use href="#grass-blade2" x="1160" />
      <use href="#grass-blade2" x="1170" />
      <use href="#grass-blade2" x="1180" />
      <use href="#grass-blade2" x="1190" />
      <use href="#grass-blade2" x="1200" />
      <use href="#grass-blade2" x="1210" />
      <use href="#grass-blade2" x="1220" />
      <use href="#grass-blade2" x="1230" />
      <use href="#grass-blade2" x="1240" />
      <use href="#grass-blade2" x="1250" />
      <use href="#grass-blade2" x="1260" />
      <use href="#grass-blade2" x="1270" />
      <use href="#grass-blade2" x="1280" />
      <use href="#grass-blade2" x="1290" />
      <use href="#grass-blade2" x="1300" />
      <use href="#grass-blade2" x="1310" />
      <use href="#grass-blade2" x="1320" />
      <use href="#grass-blade2" x="1330" />
      <use href="#grass-blade2" x="1340" />
      <use href="#grass-blade2" x="1350" />
      <use href="#grass-blade2" x="1360" />
      <use href="#grass-blade2" x="1370" />
      <use href="#grass-blade2" x="1380" />
      <use href="#grass-blade2" x="1390" />
      <use href="#grass-blade2" x="1400" />
      <use href="#grass-blade2" x="1410" />
      <use href="#grass-blade2" x="1420" />
      <use href="#grass-blade2" x="1430" />
      <use href="#grass-blade2" x="1440" />
      <use href="#grass-blade2" x="1450" />
      <use href="#grass-blade2" x="1460" />
      <use href="#grass-blade2" x="1470" />
      <use href="#grass-blade2" x="1480" />
      <use href="#grass-blade2" x="1490" />
      <use href="#grass-blade2" x="1500" />
      <use href="#grass-blade2" x="1510" />
      <use href="#grass-blade2" x="1520" />
      <use href="#grass-blade2" x="1530" />
      <use href="#grass-blade2" x="1540" />
      <use href="#grass-blade2" x="1550" />
      <use href="#grass-blade2" x="1560" />
      <use href="#grass-blade2" x="1570" />
      <use href="#grass-blade2" x="1580" />
      <use href="#grass-blade2" x="1590" />
      <use href="#grass-blade2" x="1600" />
      <use href="#grass-blade2" x="1610" />
      <use href="#grass-blade2" x="1620" />
      <use href="#grass-blade2" x="1630" />
      <use href="#grass-blade2" x="1640" />
      <use href="#grass-blade2" x="1650" />
      <use href="#grass-blade2" x="1660" />
      <use href="#grass-blade2" x="1670" />
      <use href="#grass-blade2" x="1680" />
      <use href="#grass-blade2" x="1690" />
      <use href="#grass-blade2" x="1700" />
      <use href="#grass-blade2" x="1710" />
      <use href="#grass-blade2" x="1720" />
      <use href="#grass-blade2" x="1730" />
      <use href="#grass-blade2" x="1740" />
      <use href="#grass-blade2" x="1750" />
      <use href="#grass-blade2" x="1760" />
      <use href="#grass-blade2" x="1770" />
      <use href="#grass-blade2" x="1780" />
      <use href="#grass-blade2" x="1790" />
      <use href="#grass-blade2" x="1800" />
      <use href="#grass-blade2" x="1810" />
      <use href="#grass-blade2" x="1820" />
      <use href="#grass-blade2" x="1830" />
      <use href="#grass-blade2" x="1840" />
      <use href="#grass-blade2" x="1850" />
      <use href="#grass-blade2" x="1860" />
      <use href="#grass-blade2" x="1870" />
      <use href="#grass-blade2" x="1880" />
      <use href="#grass-blade2" x="1890" />
      <use href="#grass-blade2" x="1900" />
      <use href="#grass-blade2" x="1910" />
      <use href="#grass-blade2" x="1920" />
      <use href="#grass-blade2" x="1930" />
      <use href="#grass-blade2" x="1940" />
      <use href="#grass-blade2" x="1950" />
      <use href="#grass-blade2" x="1960" />
      <use href="#grass-blade2" x="1970" />
      <use href="#grass-blade2" x="1980" />
      <use href="#grass-blade2" x="1990" />
      <use href="#grass-blade2" x="2000" />
      <use href="#grass-blade2" x="2010" />
      <use href="#grass-blade2" x="2020" />
      <use href="#grass-blade2" x="2030" />
      <use href="#grass-blade2" x="2040" />
      <use href="#grass-blade2" x="2050" />
      <use href="#grass-blade2" x="2060" />
      <use href="#grass-blade2" x="2070" />
      <use href="#grass-blade2" x="2080" />
      <use href="#grass-blade2" x="2090" />
      <use href="#grass-blade2" x="2100" />
      <use href="#grass-blade2" x="2110" />
      <use href="#grass-blade2" x="2120" />
      <use href="#grass-blade2" x="2130" />
      <use href="#grass-blade2" x="2140" />
      <use href="#grass-blade2" x="2150" />
      <use href="#grass-blade2" x="2160" />
      <use href="#grass-blade2" x="2170" />
      <use href="#grass-blade2" x="2180" />
      <use href="#grass-blade2" x="2190" />
      <use href="#grass-blade2" x="2200" />
      <use href="#grass-blade2" x="2210" />
      <use href="#grass-blade2" x="2220" />
      <use href="#grass-blade2" x="2230" />
      <use href="#grass-blade2" x="2240" />
      <use href="#grass-blade2" x="2250" />
      <use href="#grass-blade2" x="2260" />
      <use href="#grass-blade2" x="2270" />
      <use href="#grass-blade2" x="2280" />
      <use href="#grass-blade2" x="2290" />

      <Sheep flipped={true} x={-200} />
      <Sheep flipped={true} x={-260} />
      <Sheep flipped={true} x={-400} />
      <Sheep flipped={true} x={-500} />
      <Sheep flipped={true} x={1020} />
      <Sheep flipped={true} x={1100} />
      <Sheep flipped={true} x={1160} />
    </svg>
    // </Box>
  );
};

export default AllPrinciples;

export const Sheep = ({ flipped = false, x = 0 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g
        transform={flipped ? "scale(-1,1)" : "scale(1,1)"}
        style={{ zIndex: 100 }}
      >
        <g>
          {/* Sheep Body */}
          <ellipse
            cx={x + 20}
            cy={flipped ? 470 : 510}
            rx="20"
            ry="15"
            fill="#FFFFFF"
            stroke="#D3D3D3"
            strokeWidth="2"
          />

          {/* Head */}
          <circle cx={x - 5} cy={flipped ? 478 : 508} r="8" fill="#D3D3D3" />

          {/* Ears */}
          <ellipse
            cx={x - 10}
            cy={flipped ? 465 : 505}
            rx="5"
            ry="3"
            fill="#D3D3D3"
          />
          <ellipse
            cx={x}
            cy={flipped ? 465 : 505}
            rx="5"
            ry="3"
            fill="#D3D3D3"
          />

          {/* Eyes */}
          <circle cx={x - 7} cy={flipped ? 467 : 507} r="2" fill="#000" />
          <circle cx={x - 3} cy={flipped ? 467 : 507} r="2" fill="#000" />

          {/* Legs */}
          <rect
            x={x + 9}
            y={flipped ? 483 : 523}
            width="3"
            height="10"
            fill="#555"
          />
          <rect
            x={x + 15}
            y={flipped ? 483 : 523}
            width="3"
            height="10"
            fill="#555"
          />
          <rect
            x={x + 25}
            y={flipped ? 483 : 523}
            width="3"
            height="10"
            fill="#555"
          />
          <rect
            x={x + 30}
            y={flipped ? 483 : 523}
            width="3"
            height="10"
            fill="#555"
          />

          {/* Animation */}
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={"-2000 0"}
            dur="50s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </svg>
  );
};

export const Cow = ({ flipped = false, x = 0 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g transform={flipped ? "scale(-1,1)" : "scale(1,1)}"}>
        <g>
          {/* Cow Body */}
          {/* <rect
            x={x}
            y={flipped ? "469" : "505"}
            width="50"
            height="35"
            fill="#A0522D"
            radius="1"
          /> */}

          {/* <ellipse
            cx={x + 20}
            cy={flipped ? 470 : 510}
            rx="20"
            ry="15"
            fill="#FFFFFF"
            stroke="#D3D3D3"
            strokeWidth="2"
          /> */}

          <ellipse
            cx={x + 20}
            cy={flipped ? "469" : "522"}
            rx="30"
            ry="20"
            fill="#A0522D"
          />

          <ellipse
            cx={x + 10}
            cy={flipped ? "469" : "524"}
            rx="5"
            ry="3"
            fill="#8B4513"
            style={{ opacity: ".5" }}
          />

          <ellipse
            cx={x + 20}
            cy={flipped ? "469" : "514"}
            rx="5"
            ry="3"
            fill="#8B4513"
            style={{ opacity: ".5" }}
          />
          <ellipse
            cx={x + 30}
            cy={flipped ? "469" : "524"}
            rx="5"
            ry="3"
            fill="#8B4513"
            style={{ opacity: ".5" }}
          />

          {/* Head */}
          <g transform={`translate(-22, 5)`}>
            <rect
              x={x}
              y={flipped ? "469" : "505"}
              width="20"
              height="20"
              fill="#A0522D"
            />
            {/* Ears */}
            <rect
              x={x - 4}
              y={flipped ? "469" : "505"}
              width="5"
              height="7"
              fill="#8B4513"
            />
            <rect
              x={x + 15}
              y={flipped ? "469" : "505"}
              width="5"
              height="7"
              fill="#8B4513"
            />

            {/* Eyes */}
            <circle
              cx={x + 5}
              cy={flipped ? "479" : "515"}
              //   cy="510"
              r="2"
              fill="#000"
            />
            <circle
              cx={x + 10}
              cy={flipped ? "479" : "515"}
              r="2"
              fill="#000"
            />

            {/* Tail */}
            {/* Tail */}
            {/* <g
              transform="translate(20,10)"
              dangerouslySetInnerHTML={{ __html: tailAnimation }}
            >
              <rect
                x="0"
                y="0"
                width="10"
                height="5"
                fill="#A0522D"
                transform="rotate(45 0,0)"
              />
            </g> */}
            {/* Tail */}
            <rect
              x={x + 71}
              y={flipped ? "476" : "512"}
              width="2"
              height="10"
              fill="#8B4513"
            />

            {/* <g transform={`translate(20, 10)`}> */}
            {/* <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 10"
              to="30 10"
              dur="1s"
              repeatCount="indefinite"
            /> */}

            {/* <rect
              x={x}
              y={flipped ? "480" : "500"}
              width="10"
              height="5"
              fill="#A0522D"
              transform="rotate(45 0,0)"
            /> */}
            {/* </g> */}
          </g>

          {/* Legs */}
          <rect
            x={x}
            y={flipped ? "499" : "530"}
            width="5"
            height="25"
            fill="#A0522D"
          />
          <rect
            x={x + 10}
            y={flipped ? "499" : "530"}
            width="5"
            height="25"
            fill="#A0522D"
          />
          <rect
            x={x + 28}
            y={flipped ? "499" : "530"}
            width="5"
            height="25"
            fill="#A0522D"
          />
          <rect
            x={x + 38}
            y={flipped ? "499" : "530"}
            width="5"
            height="25"
            fill="#A0522D"
          />

          {/* Animation */}
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={"-2000 0"}
            dur="50s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </svg>
  );
};
