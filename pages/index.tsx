import Columns from "@components/modules/Columns";
import Row from "@components/modules/Row";
import Container from "@components/templates/Container";
import { useStore } from "@store/StoreProvider";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const IndexPage = observer(() => {
  const store = useStore();
  const records = store.records;
  autorun((reaction) => {
    reaction.trace();
    console.log(store.records);
  });
  useEffect(() => {
    store.fetch();
  }, []);
  return (
    <Container>
      {records?.length > 0 ? (
        <table>
          <tr className="column-names">
            <td>{/* Fold Button */}</td>
            <Columns data={Object.keys(records[0].data)} />
            <td>{/* Delete Button */}</td>
          </tr>
          {records.map((record, ind) => (
            <Row key={ind} index={ind} record={record} />
          ))}
        </table>
      ) : (
        <h2>Empty :)</h2>
      )}
    </Container>
  );
});

export default IndexPage;
