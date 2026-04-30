export default function TextCircle({ text = "Ochaka Store Fashion Style" }) {
  const chars = text.split("");
  const anglePerChar = 360 / chars.length;
  return (
    <div className="text" id="circularText">
      {chars.map((char, index) => (
        <span
          key={index}
          style={{
            transform: `rotate(${anglePerChar * index}deg)`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
