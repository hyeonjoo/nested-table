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
        <>
          <div>{JSON.stringify(Object.keys(records[0].data))}</div>
          <div>
            {records.map((record, ind) => (
              <Row key={ind} index={ind} record={record} />
            ))}
          </div>
        </>
      ) : (
        <div>Empty :)</div>
      )}
    </Container>
  );
});

export default IndexPage;
