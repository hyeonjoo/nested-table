import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

export class Store {
  records: object;

  constructor() {
    makeAutoObservable(this);
  }

  fetch = () => {
    const fetchData = async () => {
      fetch("http://localhost:3000/api/data")
        .then((res) => res.json())
        .then((data) => {
          this.records = data;
        });
    };
    fetchData();
  };
}
