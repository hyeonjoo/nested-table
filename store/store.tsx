import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { RecordKids } from "@models/RecordType";
import Record from "@models/Record";

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
          this.records = this.convertToRecords(data); // Initialize nested Record instance
        });
    };
    fetchData();
  };

  convertToRecords = (jsonData: Record[], parent = null, title = null) => {
    const records: Record[] = [];
    jsonData.forEach((jsonRecord: Record) => {
      const record = new Record(parent, title, jsonRecord.data);
      const kids: RecordKids = {};
      Object.keys(jsonRecord.kids).forEach((kidTitle: string) => {
        kids[kidTitle] = { records: [] };
        const jsonKidData = jsonRecord.kids[kidTitle].records;
        kids[kidTitle].records = this.convertToRecords(
          jsonKidData,
          record,
          kidTitle
        );
      });
      record.kids = kids;
      records.push(record);
    });
    return records;
  };

  recordsToJSON = () => {
    let ret = [];
    this.records.forEach((record) => {
      ret.push(record.getObj());
    });
    return JSON.stringify(ret);
  };
}
