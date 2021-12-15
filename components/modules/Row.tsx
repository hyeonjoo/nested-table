import { observer } from "mobx-react-lite";
import Record from "model/Record";

interface RowComp {
  record: Record;
}

const Row = observer(({ record }: RowComp) => {
  const kids = record.kids;
  return (
    <>
      <div style={{ backgroundColor: "pink" }}>
        {JSON.stringify(Object.values(record.data))}
      </div>
      <button
        onClick={() => {
          console.log("delete");
        }}
      >
        delete
      </button>
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
                  <Row key={inde} record={rec}></Row>
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
