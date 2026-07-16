import { useState } from "react";
import { graph } from "./graph";

const idTest = "yq1znk_kdPO-V4lI5rtp-14";

const initialItem = graph.find((i) => i.id === idTest);

const parents = [];

const nodes = graph.filter((i) => i.type === "node");

const looseItems = nodes.filter((i) => {
  const goingTo = graph.filter((j) => j.source === i.id);
  const comingFrom = graph.filter((j) => j.target === i.id);
  if (goingTo.length === 0 && comingFrom.length === 0) {
    return true;
  }
  return false;
});

const idsToIgnore = looseItems.map((i) => i.id);

const filteredNodes = nodes.filter((i) => !idsToIgnore.includes(i.id));

const arrows = graph.filter((i) => i.type === "edge");

filteredNodes.forEach((i) => {
  const arrow = arrows.find((a) => a.target === i.id);
  if (!arrow) {
    console.log(i.label);
  }
});

const links = graph
  .filter((i) => i.type === "edge")
  .map((i) => {
    return {
      from: i.source,
      to: i.target,
    };
  });

const Playground = () => {
  const [graphData, setGraphData] = useState([]);
  const [mainNodes, setMainNodes] = useState([]);
  const [paths, setPaths] = useState([]);

  const getPaths = (id, path = []) => {
    const node = graphData.find((item) => item.id === id);

    if (!node) return [];

    const currentPath = [...path, node.label];

    const edges = graphData.filter(
      (item) => item.type === "edge" && item.source === id,
    );

    if (edges.length === 0) {
      return [currentPath];
    }

    let paths = [];

    for (const edge of edges) {
      paths.push(...getPaths(edge.target, currentPath));
    }

    return paths;
  };

  const handleJSONInput = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const data = jsonData.pages[0].cells;
      console.log(data);
      setGraphData(data);

      const parents = [];

      const nodes = data.filter((i) => i.type === "node");

      const looseItems = nodes.filter((i) => {
        const goingTo = data.filter((j) => j.source === i.id);
        const comingFrom = data.filter((j) => j.target === i.id);
        if (goingTo.length === 0 && comingFrom.length === 0) {
          return true;
        }
        return false;
      });

      const idsToIgnore = looseItems.map((i) => i.id);

      const filteredNodes = nodes.filter((i) => !idsToIgnore.includes(i.id));

      const arrows = data.filter((i) => i.type === "edge");

      filteredNodes.forEach((i) => {
        const arrow = arrows.find((a) => a.target === i.id);
        if (!arrow) {
          parents.push(i);
        }
      });

      setMainNodes(parents);
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
  };

  const handleGeneratePaths = () => {
    const allPaths = mainNodes.map((node) => ({
      node,
      paths: getPaths(node.id),
    }));

    setPaths(allPaths);
  };

  return (
    <div>
      <input
        type="file"
        accept=".json,application/json"
        onChange={handleJSONInput}
      />
      <div>
        <h1>Headers:</h1>
        {mainNodes.map((node) => (
          <p>{node.label}</p>
        ))}
      </div>
      <button onClick={handleGeneratePaths}>Gerar caminhos</button>
      <h2>Caminhos</h2>

      <p>
        <strong>Total de nós principais:</strong> {paths.length}
      </p>

      <p>
        <strong>Total de caminhos:</strong>{" "}
        {paths.reduce((acc, item) => acc + item.paths.length, 0)}
      </p>

      {paths.map((group) => (
        <div
          key={group.node.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 20,
            padding: 12,
          }}
        >
          <h3>
            {group.node.label} ({group.paths.length} caminhos)
          </h3>

          {group.paths.map((path, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              {path.map((label, idx) => (
                <p
                  key={idx}
                  style={{
                    margin: 0,
                    marginLeft: idx * 16,
                  }}
                >
                  ∟ {label}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Playground;
