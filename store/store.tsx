import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import Record, { IRecordKids } from "@models/Record";

enableStaticRendering(typeof window === "undefined");

export class Store {
  records: Record[] = [];

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

  convertToRecords = (jsonData: Record[], parent = null, title = null) => {
    const records: Record[] = [];
    jsonData.forEach((jsonRecord: Record) => {
      const record = new Record(parent, title, jsonRecord.data);
      const kids: IRecordKids = {};
      Object.keys(jsonRecord.kids).forEach((kidTitle: string) => {
        kids[kidTitle] = { records: [] };
        kids[kidTitle].records = this.convertToRecords(
          jsonRecord.kids[kidTitle].records,
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
