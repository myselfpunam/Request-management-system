function Sidebar({ currentPage, onNavigate }) {
  const links = ['Dashboard', 'New Request', 'All Requests']

  return (
    <aside className="w-full bg-slate-900 p-6 text-white md:min-h-screen md:w-64">

      <h1 className="mb-10 text-2xl font-bold">
        RequestHub
      </h1>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => onNavigate(link)}
            className={`rounded-lg px-4 py-3 text-left transition ${
              currentPage === link
                ? 'bg-blue-600'
                : 'hover:bg-slate-800'
            }`}
          >
            {link}
          </button>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar