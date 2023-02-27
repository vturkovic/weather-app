import { Table, Image } from 'react-bootstrap';
import { TABLE_COLUMN_ACCESSOR_WEATHER, WEATHER_TABLE_IMAGE_SIZE } from '@constants';

const TableComponent = ({tableColumnData, tableRowData}: {tableColumnData: any, tableRowData: any}) => {
  return (
    <Table striped bordered borderless hover variant="dark">
      <thead>
        <tr>
          {tableColumnData.map((column: any)=> (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRowData.map((row: any) => (
          <tr key={row.date}>
            {tableColumnData.map((column: any) => (
              <td key={`${row.date}-${column.accessor}`}>
                {column.accessor === TABLE_COLUMN_ACCESSOR_WEATHER ? (
                  <Image src={row[column.accessor]} roundedCircle style={{ width: WEATHER_TABLE_IMAGE_SIZE, height: WEATHER_TABLE_IMAGE_SIZE }} />
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
  
export default TableComponent;