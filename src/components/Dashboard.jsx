function Dashboard() {

  const stats = [
    { title: 'Total Requests', count: 12 },
    { title: 'Pending', count: 5 },
    { title: 'Approved', count: 4 },
    { title: 'Completed', count: 3 },
  ]

  return (
    <div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          Welcome to your request management system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-800">
              {item.count}
            </h3>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Dashboard