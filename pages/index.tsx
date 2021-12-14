import Container from "@components/templates/Container";
import { useStore } from "@store/StoreProvider";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const IndexPage = observer(() => {
  const store = useStore();
  autorun(() => {
    console.log(JSON.stringify(store.records));
  });
  useEffect(() => {
    store.fetch();
  }, []);
  return (
    <Container>
      <p>Hello World</p>
    </Container>
  );
});

export default IndexPage;
