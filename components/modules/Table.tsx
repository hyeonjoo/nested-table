import { observer } from "mobx-react-lite";
import Record from "@models/Record";
import Row from "./Row";

interface TableProps {
  records: Record[];
}

const Table = observer(({ records }: TableProps) => {
  const headers = Object.keys(records[0].data);
  return (
    <table>
      <thead>
        <tr>
          <th>{/* Fold Button */}</th>
          {headers.map((record, index) => (
            <th key={index}>{record}</th>
          ))}
          <th>{/* Delete Button */}</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <Row key={index} index={index} record={record} />
        ))}
      </tbody>
    </table>
  );
});

export default Table;
