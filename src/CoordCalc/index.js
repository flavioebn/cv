import { useState } from "react";

const CoordCalc = () => {
  const [coordOne, setCoordOne] = useState(
    "-26.986264354766984, -48.634128539364006"
  );
  const [coordTwo, setCoordTwo] = useState(
    "-26.98638604165659, -48.633032299886786"
  );
  const [coordThree, setCoordThree] = useState(
    "-26.987119540398105, -48.633267479290204"
  );
  const [coordFour, setCoordFour] = useState(
    "-26.986879548248634, -48.63434095947031"
  );
  const [results, setResults] = useState([]);

  const handleCalculate = (coordA, coordB, indexA, indexB) => {
    const parseCoord = (coord) => {
      const [lat, lon] = coord.split(",").map((c) => parseFloat(c.trim()));
      return { lat, lon };
    };

    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const toDegrees = (radians) => (radians * 180) / Math.PI;
    const R = 6371e3; // Earth's radius in meters

    const c1 = parseCoord(coordA);
    const c2 = parseCoord(coordB);
    const φ1 = toRadians(c1.lat);
    const φ2 = toRadians(c2.lat);
    const Δλ = toRadians(c2.lon - c1.lon);
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    const bearing = (toDegrees(θ) + 360) % 360;
    console.log(`Bearing: ${bearing.toFixed(2)}°`);

    const Δφ = φ2 - φ1;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    console.log(`Distance: ${distance.toFixed(2)} meters`);
    setResults((prevResults) => [
      ...prevResults,
      { indexA, indexB, distance: distance.toFixed(2) },
    ]);
    console.log(results);
  };

  const calculateBetweenAllCoords = () => {
    setResults([]);
    const coords = [coordOne, coordTwo, coordThree, coordFour];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        console.log(`Calculating between coord ${i + 1} and coord ${j + 1}`);
        handleCalculate(coords[i], coords[j], i, j);
      }
    }
  };

  return (
    <div className="coord-calc" style={{ padding: "16px" }}>
      <h2>coordCalc</h2>
      <input
        type="text"
        placeholder="coordOne"
        value={coordOne}
        onChange={(e) => setCoordOne(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="coordTwo"
        value={coordTwo}
        onChange={(e) => setCoordTwo(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="coordThree"
        value={coordThree}
        onChange={(e) => setCoordThree(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="coordFour"
        value={coordFour}
        onChange={(e) => setCoordFour(e.target.value)}
      />
      <button onClick={calculateBetweenAllCoords}>Calcular</button>
      <div>
        <h3>Resultados:</h3>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              Entre o ponto {result.indexA + 1} e ponto {result.indexB + 1}:{" "}
              {result.distance} metros;
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoordCalc;
