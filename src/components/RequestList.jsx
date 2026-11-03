
import { useState } from 'react'

function RequestList({
  requests = [],
  onUpdateStatus,
  onDeleteRequest,
  onViewRequest,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredRequests = requests.filter((request) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      request.title?.toLowerCase().includes(search) ||
      request.requesterName?.toLowerCase().includes(search)

    const matchesCategory =
      categoryFilter === 'All' ||
      request.category === categoryFilter

    const matchesPriority =
      priorityFilter === 'All' ||
      request.priority === priorityFilter

    const matchesStatus =
      statusFilter === 'All' ||
      request.status === statusFilter

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriority &&
      matchesStatus
    )
  })

  function clearFilters() {
    setSearchTerm('')
    setCategoryFilter('All')
    setPriorityFilter('All')
    setStatusFilter('All')
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this request?'
    )

    if (confirmed) {
      onDeleteRequest(id)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          All Requests
        </h1>
        <p className="mt-2 text-slate-500">
          Manage, search and filter all submitted requests.
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Search by title or requester..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search requests"
            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="IT Support">IT Support</option>
            <option value="Maintenance">Maintenance</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Showing {filteredRequests.length} of {requests.length} requests
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {filteredRequests.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-700">
              No requests found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">Requester</th>
                  <th className="px-5 py-4 font-semibold">Title</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Priority</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {request.requesterName}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800">
                      {request.title}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {request.category}
                    </td>

                    <td className="px-5 py-4">
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

                    <td className="px-5 py-4">
                      <select
                        value={request.status}
                        onChange={(e) =>
                          onUpdateStatus(request.id, e.target.value)
                        }
                        aria-label={`Change status for ${request.title}`}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {request.createdAt}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onViewRequest(request)}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(request.id)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestList
