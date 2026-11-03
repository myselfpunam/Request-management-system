
import { useState, useEffect } from 'react'

import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import RequestForm from './components/RequestForm'
import RequestList from './components/RequestList'
import RequestDetails from './components/RequestDetails'

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [editingRequest, setEditingRequest] = useState(null)

  const [requests, setRequests] = useState(() => {
    try {
      const savedRequests = localStorage.getItem('requests')
      return savedRequests ? JSON.parse(savedRequests) : []
    } catch (error) {
      console.error('Unable to load saved requests:', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests))
  }, [requests])

  function handleAddRequest(newRequest) {
    setRequests((previousRequests) => [
      newRequest,
      ...previousRequests,
    ])
  }

  function handleUpdateRequest(updatedRequest) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === updatedRequest.id
          ? updatedRequest
          : request
      )
    )

    setSelectedRequest(updatedRequest)
    setEditingRequest(null)
    setCurrentPage('Request Details')
  }

  function handleUpdateStatus(id, newStatus) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    )

    setSelectedRequest((previousRequest) =>
      previousRequest?.id === id
        ? { ...previousRequest, status: newStatus }
        : previousRequest
    )
  }

  function handleDeleteRequest(id) {
    setRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== id)
    )

    if (selectedRequest?.id === id) {
      setSelectedRequest(null)
      setCurrentPage('All Requests')
    }
  }

  function handleViewRequest(request) {
    setSelectedRequest(request)
    setEditingRequest(null)
    setCurrentPage('Request Details')
  }

  function handleEditRequest(request) {
    setEditingRequest(request)
    setCurrentPage('Edit Request')
  }

  function handleBackToRequests() {
    setSelectedRequest(null)
    setEditingRequest(null)
    setCurrentPage('All Requests')
  }

  function handleCancelEdit() {
    setEditingRequest(null)
    setCurrentPage('Request Details')
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setEditingRequest(null)
          setCurrentPage(page)
        }}
      />

      <main className="min-w-0 flex-1 p-6 md:p-8">
        {currentPage === 'Dashboard' && (
          <Dashboard requests={requests} />
        )}

        {currentPage === 'New Request' && (
          <RequestForm
            key="new-request"
            onSubmitRequest={handleAddRequest}
          />
        )}

        {currentPage === 'All Requests' && (
          <RequestList
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            onDeleteRequest={handleDeleteRequest}
            onViewRequest={handleViewRequest}
          />
        )}

        {currentPage === 'Request Details' && (
          <RequestDetails
            request={selectedRequest}
            onBack={handleBackToRequests}
            onEdit={handleEditRequest}
          />
        )}

        {currentPage === 'Edit Request' && editingRequest && (
          <div className="space-y-5">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-white"
            >
              ← Cancel Editing
            </button>

            <RequestForm
              key={`edit-${editingRequest.id}`}
              initialData={editingRequest}
              isEditing={true}
              onSubmitRequest={handleUpdateRequest}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
