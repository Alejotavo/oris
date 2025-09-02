
type Props = {
  data: string[] | null;
};

function VisualBoard({ data }: Props) {
  return (
    <div>
      <h2>Visual Board</h2>
      {/* Aquí puedes agregar la representación visual de los estados de las luces y ambientes */}
      <ul>
        <li style={{ color: data?.includes("kitchen_on") || data?.includes("all_on") ? "red" : "blue" }}>Kitchen</li>
        <li style={{ color: data?.includes("living_on") || data?.includes("all_on") ? "red" : "blue" }}>Living</li>
        <li style={{ color: data?.includes("bedroom_on") || data?.includes("all_on") ? "red" : "blue" }}>Bedroom</li>
        <li style={{ color: data?.includes("bathroom_on") || data?.includes("all_on") ? "red" : "blue" }}>Bathroom</li>
      </ul>
    </div>
  );
}

export default VisualBoard;