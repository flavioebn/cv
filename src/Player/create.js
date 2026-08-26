import { useState } from "react";

const classesDnd = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

const CreatePlayer = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [level, setLevel] = useState(1);

  const handleAddClass = () => {
    if (selectedClass && level > 0) {
      setSelectedClasses([...selectedClasses, { class: selectedClass, level }]);
      setSelectedClass("");
      setLevel(1);
    }
  };

  const handleDeleteClass = (index) => {
    setSelectedClasses(selectedClasses.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Selecione suas classes e níveis</h3>
      <div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="" disabled>
            Escolha uma classe
          </option>
          {classesDnd.map((dndClass) => (
            <option key={dndClass} value={dndClass}>
              {dndClass}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          max="20"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          placeholder="Nível"
        />
        <button onClick={handleAddClass}>Adicionar Classe</button>
      </div>

      <h4>Classes Selecionadas:</h4>
      <ul>
        {selectedClasses.map((c, index) => (
          <li key={index}>
            {c.class} - Nível {c.level}
            <button onClick={() => handleDeleteClass(index)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatePlayer;
