import { Table, Image } from 'react-bootstrap';

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
                  {column.accessor === 'weather' ? (
                    <Image src={row[column.accessor]} roundedCircle style={{ width: '60px', height: '60px' }} />
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