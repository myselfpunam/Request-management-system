
function RequestDetails({ request, onBack, onEdit }) {
  if (!request) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">
          Request not found
        </h2>

        <button
          onClick={onBack}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to Requests
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Request Details
          </h1>
          <p className="mt-2 text-slate-500">
            View complete information about this request.
          </p>
        </div>

        <button
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
        >
          ← Back
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm text-slate-500">
              Request ID: {request.id}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-800">
              {request.title}
            </h2>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {request.status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Requester Name</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.requesterName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Category</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.category}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Priority</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.priority}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Submission Date</p>
            <p className="mt-1 font-semibold text-slate-800">
              {request.createdAt}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-800">
            Description
          </h3>

          <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-600">
            {request.description || 'No description provided.'}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => onEdit(request)}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Edit Request
          </button>

          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Back to Requests
          </button>
        </div>
      </div>
    </div>
  )
}

export default RequestDetails
