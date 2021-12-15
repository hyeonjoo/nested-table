import { Store } from "@store/store";
import { makeAutoObservable } from "mobx";

export interface IRecordData {
  [key: string]: string;
}

export interface IRecordKids {
  [key: string]: {
    records: Record[];
  };
}

interface IRecord {
  parentRecord: Record;
  titleGroup: string;
  data: IRecordData;
  kids: IRecordKids;
}

class Record implements IRecord {
  readonly titleGroup: string;
  readonly parentRecord: Record;
  readonly data: IRecordData;
  kids: IRecordKids;
  constructor(parentRecord: Record, titleGroup: string, data: IRecordData) {
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

export default Record;
