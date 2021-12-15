import { Store } from "@store/store";
import RecordType, { RecordData, RecordKids } from "@models/RecordType";
import { makeAutoObservable } from "mobx";

export default class Record implements RecordType {
  readonly titleGroup: string;
  readonly parentRecord: Record;
  readonly data: RecordData;
  kids: RecordKids;

  constructor(parentRecord: Record, titleGroup: string, data: RecordData) {
    makeAutoObservable(this);
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
  removeMe = (index: number, store: Store) => {
    if (this.parentRecord) this.parentRecord.removeKid(this.titleGroup, index);
    else store.records.splice(index, 1);
  };
}
