import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import Record, { IRecordKids } from "model/Record";

enableStaticRendering(typeof window === "undefined");

export class Store {
  records: Record[];

  constructor() {
    makeAutoObservable(this);
  }

  fetch = () => {
    const fetchData = async () => {
      fetch("http://localhost:3000/api/data")
        .then((res) => res.json())
        .then((data: Record[]) => {
          this.records = this.convertToRecords(data);
        });
    };
    fetchData();
  };

  convertToRecords = (data: Record[], parent = null, title = null) => {
    const records: Record[] = [];
    data.forEach((el: Record) => {
      const record = new Record(parent, title, el.data);
      const kids: IRecordKids = {};
      Object.keys(el.kids).forEach((kidTitle: string) => {
        kids[kidTitle] = { records: [] };
        kids[kidTitle].records = this.convertToRecords(
          el.kids[kidTitle].records,
          record,
          kidTitle
        );
      });
      record.kids = kids;
      records.push(record);
    });
    return records;
  };
}
