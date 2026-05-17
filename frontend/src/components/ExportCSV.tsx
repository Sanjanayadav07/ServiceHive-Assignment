import { CSVLink } from 'react-csv';

const ExportCSV = ({ data }: any) => {
  return (
    <CSVLink
      data={data}
      filename="leads.csv"
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Export CSV
    </CSVLink>
  );
};

export default ExportCSV;