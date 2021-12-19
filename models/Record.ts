import { Store } from "@store/store";
import RecordType, { RecordData, RecordKids } from "@models/RecordType";
import { makeAutoObservable } from "mobx";

export default class Record implements RecordType {
  readonly id: string;
  readonly titleGroup: string;
  readonly parentRecord: Record;
  readonly data: RecordData;
  kids: RecordKids;

  constructor(
    id: string,
    parentRecord: Record,
    titleGroup: string,
    data: RecordData
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.parentRecord = parentRecord;
    this.titleGroup = titleGroup;
    this.data = data;
  }

  removeKid = (title: string, index: number) => {
    this.kids[title].records.splice(index, 1);
    if (this.kids[title].records.length === 0) {
      delete this.kids[title];
    }
  };
  removeMe = (id: string, store: Store) => {
    if (this.parentRecord) {
      console.log(this.parentRecord.kids, this.titleGroup);
      const index = this.parentRecord.kids[this.titleGroup].records.findIndex(
        (el) => el.id === id
      );
      this.parentRecord.removeKid(this.titleGroup, index);
    } else {
      const index = store.records.findIndex((el) => el.id === id);
      store.records.splice(index, 1);
    }
  };

  getObj = () => {
    let retKids = {};
    for (const [key, kidObj] of Object.entries(this.kids)) {
      let ret = [];
      kidObj.records.forEach((kid: Record) => {
        ret.push(kid.getObj());
      });
      retKids[key] = {
        records: ret,
      };
    }
    return {
      data: this.data,
      kids: retKids,
    };
  };
}
