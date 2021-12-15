import Record from "@models/Record";

export interface RecordData {
  [key: string]: string;
}

export interface RecordKids {
  [key: string]: {
    records: Record[];
  };
}

export default interface RecordType {
  parentRecord: Record;
  titleGroup: string;
  data: RecordData;
  kids: RecordKids;
}
