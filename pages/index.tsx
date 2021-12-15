import Table from "@components/modules/Table";
import Container from "@components/templates/Container";
import { useStore } from "@store/StoreProvider";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const IndexPage = observer(() => {
  const store = useStore();
  const records = store.records;

  useEffect(() => {
    store.fetch();
  }, []);

  return (
    <Container>
      {records?.length > 0 ? <Table records={records} /> : <h2>Empty :)</h2>}
    </Container>
  );
});

export default IndexPage;
