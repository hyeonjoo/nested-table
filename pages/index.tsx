import Table from "@components/modules/Table";
import Container from "@components/templates/Container";
import { useStore } from "@store/StoreProvider";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const IndexPage = observer(() => {
  const store = useStore();
  const records = store.records;

  useEffect(() => {
    store.fetch();
  }, []);

  return (
    <Container>
      {records?.length > 0 ? <Table records={records} /> : <h2>Empty :)</h2>}
      <br />
      <RecordsToJSON />
    </Container>
  );
});

const RecordsToJSON = observer(() => {
  const store = useStore();
  const [recordsInJSON, setRecordsInJSON] = useState(store.recordsToJSON());
  return (
    <>
      <button onClick={() => setRecordsInJSON(store.recordsToJSON())}>
        Extract JSON
      </button>
      <p>{recordsInJSON}</p>
    </>
  );
});

export default IndexPage;
