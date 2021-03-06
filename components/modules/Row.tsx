import { useStore } from "@store/StoreProvider";
import { observer } from "mobx-react-lite";
import Record from "@models/Record";
import { useState } from "react";
import Table from "./Table";
import { RecordKids } from "@models/RecordType";

interface DataColumnsProps {
  record: Record;
  index: string;
}

const DataColumns = observer(({ record, index }: DataColumnsProps) => {
  const store = useStore();
  const dataColumns = Object.values(record.data);
  return (
    <>
      {dataColumns.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
      <td>
        <button onClick={() => record.removeMe(index, store)}>Delete</button>
      </td>
    </>
  );
});

interface ChildrenProps {
  kids: RecordKids;
}

const Children = observer(({ kids }: ChildrenProps) => {
  const children = Object.keys(kids);
  return (
    <td colSpan={20}>
      {children.map((kidName) => (
        <div key={kidName}>
          <h3>{kidName}</h3>
          <Table records={kids[kidName].records} />
        </div>
      ))}
    </td>
  );
});

interface RowProps {
  record: Record;
  index: string;
}

const Row = observer(({ record, index }: RowProps) => {
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
        <DataColumns record={record} index={index} />
      </tr>
      {hasChildren ? (
        <tr style={isFolded ? { display: "none" } : null}>
          <Children kids={kids} />
        </tr>
      ) : null}
    </>
  );
});

export default Row;
