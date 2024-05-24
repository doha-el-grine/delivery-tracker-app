import { Head } from "@inertiajs/react";

import { AdminMap } from "@/Components/AdminMap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Admin({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Admin
        </h2>
      }
    >
      <Head title="Admin" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <AdminMap />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
