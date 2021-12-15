import { useStore } from "@store/StoreProvider";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import Record from "model/Record";

interface RowComp {
  record: Record;
  index: number;
}

const Row = observer(({ record, index }: RowComp) => {
  const store = useStore();
  const kids = record.kids;

  autorun((reaction) => {
    reaction.trace();
    console.log(record);
  });
  return (
    <>
      <div style={{ backgroundColor: "pink" }}>
        {JSON.stringify(Object.values(record.data))}
      </div>
      <button onClick={() => record.removeMe(index, store)}>delete</button>
      {Object.keys(kids).length > 0 ? (
        <div style={{ backgroundColor: "grey", padding: "10px" }}>
          {Object.keys(kids).map((kidName, ind) => (
            <div key={ind}>
              <h4>{kidName}</h4>
              <div>
                {JSON.stringify(Object.keys(kids[kidName].records[0].data))}
              </div>
              <div>
                {kids[kidName].records.map((rec, inde) => (
                  <Row key={inde} index={inde} record={rec}></Row>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
});

export default Row;
