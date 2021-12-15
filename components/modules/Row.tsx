import { useStore } from "@store/StoreProvider";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import Record from "@models/Record";
import Columns from "./Columns";
import { useState } from "react";

interface RowProps {
  record: Record;
  index: number;
}

const Row = observer(({ record, index }: RowProps) => {
  const store = useStore();
  const kids = record.kids;

  const hasChildren = Object.keys(kids).length > 0;
  const [isFolded, setIsFolded] = useState<Boolean>(true);

  autorun((reaction) => {
    reaction.trace();
    console.log(record);
  });
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
        <Columns data={Object.values(record.data)} />
        <td>
          <button
            className="btn-delete"
            onClick={() => record.removeMe(index, store)}
          >
            delete
          </button>
        </td>
      </tr>
      {hasChildren ? (
        <tr style={isFolded ? { display: "none" } : null}>
          <td colSpan={20}>
            {Object.keys(kids).map((kidName, ind) => (
              <div>
                <h3>{kidName}</h3>
                <table key={ind}>
                  <tr className="column-names">
                    <td>{/*Fold Button */}</td>
                    <Columns
                      data={Object.keys(kids[kidName].records[0].data)}
                    />
                    <td>{/* Delete Button */}</td>
                  </tr>
                  {kids[kidName].records.map((rec, inde) => (
                    <Row key={inde} index={inde} record={rec} />
                  ))}
                </table>
              </div>
            ))}
          </td>
        </tr>
      ) : null}
    </>
  );
});

export default Row;
