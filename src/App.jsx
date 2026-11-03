
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import RequestForm from './components/RequestForm'
import RequestList from './components/RequestList'

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')

  // Load saved requests from localStorage
  const [requests, setRequests] = useState(() => {
    try {
      const savedRequests = localStorage.getItem('requests')
      return savedRequests ? JSON.parse(savedRequests) : []
    } catch (error) {
      console.error('Unable to load saved requests:', error)
      return []
    }
  })

  // Save requests whenever the list changes
  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests))
  }, [requests])

  // Add a new request
  function handleAddRequest(newRequest) {
    setRequests((previousRequests) => [newRequest, ...previousRequests])
  }

  // Update request status
  function handleUpdateStatus(id, newStatus) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
      )
    )
  }

  // Delete a request
  function handleDeleteRequest(id) {
    setRequests((previousRequests) =>
      previousRequests.filter((request) => request.id !== id)
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="min-w-0 flex-1 p-6 md:p-8">
        {currentPage === 'Dashboard' && (
          <Dashboard requests={requests} />
        )}

        {currentPage === 'New Request' && (
          <RequestForm onSubmitRequest={handleAddRequest} />
        )}

        {currentPage === 'All Requests' && (
          <RequestList
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            onDeleteRequest={handleDeleteRequest}
          />
        )}
      </main>
    </div>
  )
}

export default App
