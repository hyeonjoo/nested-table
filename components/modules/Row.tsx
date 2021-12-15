import { useStore } from "@store/StoreProvider";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import Record from "@models/Record";
import Columns from "./Columns";

interface RowProps {
  record: Record;
  index: number;
}

const Row = observer(({ record, index }: RowProps) => {
  const store = useStore();
  const kids = record.kids;

  autorun((reaction) => {
    reaction.trace();
    console.log(record);
  });
  return (
    <>
      <tr>
        <td>
          <button>fold</button>
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
      {Object.keys(kids).length > 0 ? (
        <tr>
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
