import { columns } from "../../components/dashboard/column";
import { DataTable } from "../../components/dashboard/data-table";
import { data } from "../../data/artwork";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
