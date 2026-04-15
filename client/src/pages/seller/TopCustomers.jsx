import React, { useCallback, useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext"
import { assets } from "../../assets/assets"
import toast from "react-hot-toast"

const TopCustomers = () => {
  const { currency, axios } = useAppContext()
  const [customers, setCustomers] = useState([])
  const [monthLabel, setMonthLabel] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchTopCustomers = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/order/seller/top-customers-month")
      if (data.success) {
        setCustomers(data.customers || [])
        setMonthLabel(data.monthLabel || "")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [axios])

  useEffect(() => {
    fetchTopCustomers()
    const id = setInterval(fetchTopCustomers, 120000)
    return () => clearInterval(id)
  }, [fetchTopCustomers])

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="space-y-4 p-4 md:p-10">
        <div className="flex max-w-4xl flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Top customers</h1>
            <p className="mt-1 text-sm text-gray-600">
              Top 5 by spend this calendar month
              {monthLabel ? <span className="text-gray-500"> — {monthLabel}</span> : null}
            </p>
            <p className="mt-1 max-w-2xl text-xs text-gray-500">
              Non-cancelled orders only; same payment rules as the main orders list (COD or paid online).
            </p>
          </div>
          <button
            type="button"
            onClick={() => fetchTopCustomers()}
            disabled={loading}
            className="shrink-0 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        <div className="max-w-4xl rounded-md border border-amber-200/80 bg-amber-50/40 p-4 sm:p-5">
          {loading && customers.length === 0 ? (
            <div className="space-y-2">
              <div className="h-3 w-full max-w-md animate-pulse rounded bg-amber-100" />
              <div className="h-3 w-full max-w-sm animate-pulse rounded bg-amber-100/80" />
              <div className="h-3 w-full max-w-lg animate-pulse rounded bg-amber-100/60" />
            </div>
          ) : customers.length === 0 ? (
            <p className="text-sm text-gray-600">No qualifying orders in this month yet.</p>
          ) : (
            <ul className="divide-y divide-amber-200/60 rounded-md border border-amber-200/60 bg-white">
              {customers.map((c, idx) => (
                <li
                  key={String(c.userId)}
                  className="flex flex-col gap-1 px-3 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={c.profileImage || assets.profile_icon}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = assets.profile_icon;
                        }}
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-bold text-white shadow">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900">{c.name || "Customer"}</p>
                      <p className="truncate text-xs text-gray-500">
                        {[c.phone, c.email].filter(Boolean).join(" · ") || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 pl-11 text-xs sm:pl-0 sm:text-sm">
                    <span className="text-gray-600">
                      <span className="text-gray-400">Orders</span>{" "}
                      <span className="font-semibold text-gray-800">{c.orderCount}</span>
                    </span>
                    <span className="text-gray-600">
                      <span className="text-gray-400">Total</span>{" "}
                      <span className="font-semibold text-green-700">
                        {currency}
                        {c.totalSpent}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopCustomers
