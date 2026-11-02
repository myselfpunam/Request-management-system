import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import RequestForm from './components/RequestForm'

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-slate-100 md:flex">

      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="flex-1 p-6 md:p-8">

        {currentPage === 'Dashboard' && <Dashboard />}

        {currentPage === 'New Request' && <RequestForm />}

        {currentPage === 'All Requests' && (
          <h2 className="text-3xl font-bold text-slate-800">
            All Requests
          </h2>
        )}

      </main>
    </div>
  )
}

export default App