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
  id: string;
  titleGroup: string;
  parentRecord: Record;
  data: RecordData;
  kids: RecordKids;
}
