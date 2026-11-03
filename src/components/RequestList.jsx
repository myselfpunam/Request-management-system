
import { useState } from 'react'

function RequestList({ requests }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Search and filter requests
  const filteredRequests = requests.filter((request) => {
    const searchMatch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requesterName.toLowerCase().includes(searchTerm.toLowerCase())

    const categoryMatch =
      categoryFilter === 'All' || request.category === categoryFilter

    const priorityMatch =
      priorityFilter === 'All' || request.priority === priorityFilter

    const statusMatch =
      statusFilter === 'All' || request.status === statusFilter

    return searchMatch && categoryMatch && priorityMatch && statusMatch
  })

  // Reset all filters
  function clearFilters() {
    setSearchTerm('')
    setCategoryFilter('All')
    setPriorityFilter('All')
    setStatusFilter('All')
  }

  const selectClass =
    'rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-700 outline-none focus:border-blue-500'

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          All Requests
        </h2>

        <p className="mt-2 text-slate-500">
          Search, filter and manage all submitted requests.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

        <div className="mb-4">
          <label
            htmlFor="request-search"
            className="mb-2 block font-medium text-slate-700"
          >
            Search Requests
          </label>

          <input
            id="request-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or requester name..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Category Filter */}
          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={selectClass}
          >
            <option value="All">All Categories</option>
            <option value="IT Support">IT Support</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Other">Other</option>
          </select>

          {/* Priority Filter */}
          <select
            aria-label="Filter by priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={selectClass}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Status Filter */}
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={selectClass}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Clear Filters */}
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Clear Filters
          </button>

        </div>
      </div>

      {/* Results Count */}
      <p className="mb-4 text-sm text-slate-500">
        Showing {filteredRequests.length} of {requests.length} requests
      </p>

      {/* Request Table */}
      {filteredRequests.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700">
            No requests found
          </h3>

          <p className="mt-2 text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[750px] text-left">

            <thead className="border-b bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="p-4">Requester</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b transition hover:bg-slate-50 last:border-0"
                >
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

                  <td className="p-4 text-sm text-slate-500">
                    {request.createdAt || '—'}
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
