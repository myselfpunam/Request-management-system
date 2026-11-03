
import { useState } from 'react'

const emptyForm = {
  requesterName: '',
  title: '',
  category: '',
  priority: '',
  description: '',
}

function RequestForm({
  onSubmitRequest,
  initialData = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    ...(initialData || {}),
  }))

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (isSubmitting) return

    const newErrors = {}

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'Requester name is required.'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Request title is required.'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.'
    }

    if (!formData.priority) {
      newErrors.priority = 'Please select a priority.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    const requestData = {
      ...formData,
      id: initialData?.id ?? Date.now(),
      status: initialData?.status ?? 'Pending',
      createdAt: initialData?.createdAt ?? new Date().toLocaleDateString(),
    }

    try {
      onSubmitRequest(requestData)

      if (!isEditing) {
        setFormData(emptyForm)
      }

      setErrors({})
      setSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {isEditing ? 'Edit Request' : 'New Request'}
        </h1>

        <p className="mt-2 text-slate-500">
          {isEditing
            ? 'Update the information for this request.'
            : 'Fill in the form to submit a new request.'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-xl bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <label
            htmlFor="requesterName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Requester Name *
          </label>

          <input
            id="requesterName"
            name="requesterName"
            type="text"
            value={formData.requesterName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.requesterName)}
            aria-describedby={errors.requesterName ? 'requesterName-error' : undefined}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.requesterName && (
            <p id="requesterName-error" className="mt-1 text-sm text-red-600">
              {errors.requesterName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Request Title *
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            placeholder="Enter request title"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Category *
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? 'category-error' : undefined}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select category</option>
              <option value="IT Support">IT Support</option>
              <option value="Maintenance">Maintenance</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>

            {errors.category && (
              <p id="category-error" className="mt-1 text-sm text-red-600">
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Priority *
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? 'priority-error' : undefined}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            {errors.priority && (
              <p id="priority-error" className="mt-1 text-sm text-red-600">
                {errors.priority}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description *
          </label>

          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
            placeholder="Describe your request..."
            className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? 'Please wait...'
            : isEditing
              ? 'Update Request'
              : 'Submit Request'}
        </button>
      </form>

      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          onClick={() => setSuccess(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>

            <h2
              id="success-title"
              className="mt-5 text-2xl font-bold text-slate-800"
            >
              {isEditing ? 'Request Updated!' : 'Request Submitted!'}
            </h2>

            <p className="mt-2 text-slate-500">
              {isEditing
                ? 'Your request has been updated successfully.'
                : 'Your request has been submitted successfully.'}
            </p>

            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestForm
