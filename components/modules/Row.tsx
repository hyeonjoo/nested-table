import { useStore } from "@store/StoreProvider";
import { observer } from "mobx-react-lite";
import Record from "@models/Record";
import { useState } from "react";
import Table from "./Table";

interface RowProps {
  record: Record;
  index: number;
}

const Row = observer(({ record, index }: RowProps) => {
  const store = useStore();
  const kids = record.kids;

  const hasChildren = Object.keys(kids).length > 0;
  const [isFolded, setIsFolded] = useState<Boolean>(true);

  return (
    <>
      <tr>
        <td>
          {hasChildren ? (
            <button onClick={() => setIsFolded(!isFolded)}>
              {isFolded ? "▶" : "▼"}
            </button>
          ) : null}
        </td>
        {Object.values(record.data).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
        <td>
          <button onClick={() => record.removeMe(index, store)}>Delete</button>
        </td>
      </tr>
      {hasChildren ? (
        <tr style={isFolded ? { display: "none" } : null}>
          <td colSpan={20}>
            {Object.keys(kids).map((kidName, index) => (
              <div key={index}>
                <h3>{kidName}</h3>
                <Table records={kids[kidName].records} />
              </div>
            ))}
          </td>
        </tr>
      ) : null}
    </>
  );
});

export default Row;
