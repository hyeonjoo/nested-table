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
}

export default Record;
