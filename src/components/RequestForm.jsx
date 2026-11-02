import { useState } from 'react'

function RequestForm() {
  const [formData, setFormData] = useState({
    requesterName: '',
    title: '',
    category: '',
    priority: '',
    description: '',
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })

    setSuccess(false)
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
      setSuccess(true)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
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

        {success && (
          <p role="status" className="text-sm font-medium text-green-600">
            Request submitted successfully!
          </p>
        )}

      </form>
    </div>
  )
}

export default RequestForm