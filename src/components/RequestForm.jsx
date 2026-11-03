import { useState } from 'react'

const initialFormData = {
  requesterName: '',
  title: '',
  category: '',
  priority: '',
  description: '',
}

function RequestForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {}

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'Name is required'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Request title is required'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.priority) {
      newErrors.priority = 'Please select a priority'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {

      console.log('Submitted Request:', formData)

      // Clear all form fields
      setFormData(initialFormData)

      // Clear validation errors
      setErrors({})

      // Show success popup
      setSuccess(true)
    }
  }

  function closeModal() {
    setSuccess(false)
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <>
      <div className="max-w-3xl">

        <h2 className="text-3xl font-bold text-slate-800">
          New Request
        </h2>

        <p className="mt-2 mb-8 text-slate-500">
          Submit a new request using the form below.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
        >

          {/* Requester Name */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Requester Name *
            </label>

            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your name"
            />

            {errors.requesterName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.requesterName}
              </p>
            )}
          </div>

          {/* Request Title */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Request Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter request title"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select category</option>
              <option value="IT Support">IT Support</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Other">Other</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Priority *
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">
                {errors.priority}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={inputClass}
              placeholder="Describe your request..."
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Submit Request
          </button>

        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close success message"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              &times;
            </button>

            {/* Success Icon */}
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2
              id="success-title"
              className="mb-3 text-2xl font-bold text-slate-800"
            >
              Request Submitted!
            </h2>

            <p className="mb-6 text-slate-500">
              Your request has been submitted successfully.
              We will review it shortly.
            </p>

            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Done
            </button>

          </div>
        </div>
      )}
    </>
  )
}

export default RequestForm