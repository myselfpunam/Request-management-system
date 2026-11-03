function RequestList({ requests }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          All Requests
        </h2>

        <p className="mt-2 text-slate-500">
          View and manage all submitted requests.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700">
            No requests found
          </h3>
          <p className="mt-2 text-slate-500">
            Submit your first request to see it here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="p-4">Requester</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b last:border-0">
                  <td className="p-4 font-medium text-slate-800">
                    {request.requesterName}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.title}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.category}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        request.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : request.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {request.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RequestList