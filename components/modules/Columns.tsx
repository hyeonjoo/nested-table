import { HTMLAttributes } from "react";

interface ColumnsProps extends HTMLAttributes<HTMLTableColElement> {
  data: string[];
}

const Columns = ({ data }: ColumnsProps) => {
  return (
    <>
      {data.map((value, index) => (
        <td key={index} style={{ flex: "1 1 0" }}>
          {value}
        </td>
      ))}
    </>
  );
};

export default Columns;
