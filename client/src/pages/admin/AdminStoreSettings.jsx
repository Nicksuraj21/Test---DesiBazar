import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminStoreSettings = () => {
  const { axios, setStoreCodEnabled, refreshStoreAcceptingOrders } = useAppContext();
  const [codEnabled, setCodEnabled] = useState(true);
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [currentMonthUpi, setCurrentMonthUpi] = useState({ amount: 0, orders: 0 });
  const codToggleInFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/store-settings");
        if (!cancelled && data.success) {
          const c = data.codEnabled === false ? false : true;
          setCodEnabled(c);
          setStoreCodEnabled(c);
          setAcceptingOrders(!!data.acceptingOrders);
          setCurrentMonthUpi({
            amount: Math.round(
              Number(data.totalUpiPaidAmount ?? data.currentMonthUpiPaidAmount) || 0
            ),
            orders: Math.max(
              0,
              Math.floor(Number(data.totalUpiPaidOrders ?? data.currentMonthUpiPaidOrders) || 0)
            ),
          });
        }
      } catch {
        if (!cancelled) toast.error("Could not load store settings");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [axios, setStoreCodEnabled]);

  const toggleCodEnabled = async () => {
    if (codToggleInFlightRef.current) return;
    const next = !codEnabled;
    codToggleInFlightRef.current = true;
    setCodEnabled(next);
    setStoreCodEnabled(next);
    try {
      const { data } = await axios.put("/api/admin/store-settings", {
        codEnabled: next,
      });
      if (data.success) {
        const c = data.codEnabled === false ? false : true;
        setCodEnabled(c);
        setStoreCodEnabled(c);
        toast.success(next ? "COD shown at checkout" : "COD hidden — UPI only");
        void refreshStoreAcceptingOrders();
      } else {
        setCodEnabled(!next);
        setStoreCodEnabled(!next);
        toast.error(data.message || "Could not update");
      }
    } catch (e) {
      setCodEnabled(!next);
      setStoreCodEnabled(!next);
      toast.error(e.message || "Could not update");
    } finally {
      codToggleInFlightRef.current = false;
    }
  };

  return (
    <div className="no-scrollbar h-[95vh] flex-1 overflow-y-scroll">
      <div className="mx-auto max-w-3xl space-y-8 p-5 md:p-10">
        <div className="border-b border-slate-200/80 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Admin — Store</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Cash on Delivery is controlled here only. Sellers can still pause new orders from the
            seller Store page.
          </p>
        </div>

        <div className="max-w-lg rounded-2xl border border-slate-200/90 bg-white p-5 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/[0.03]">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Read-only</p>
          <p className="mt-1 text-sm text-slate-700">
            Accepting new orders:{" "}
            <span className="font-semibold text-slate-900">
              {acceptingOrders ? "On" : "Off"}
            </span>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">Delivered Upi Order Only</p>
          <p className="mt-1 text-sm font-medium text-slate-800 tabular-nums">
            ₹{currentMonthUpi.amount.toLocaleString("en-IN")} · {currentMonthUpi.orders} order(s)
          </p>
        </div>

        <div className="max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/[0.03]">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-900">Cash on Delivery (COD)</p>
            <p className="text-xs leading-relaxed text-slate-500">
              {codEnabled
                ? "Customers can choose COD or UPI on the cart payment step."
                : "COD is hidden; checkout shows UPI only (online payment)."}
            </p>
            <div className="flex w-fit items-center gap-3 rounded-xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-200/60">
              <button
                type="button"
                role="switch"
                aria-checked={codEnabled}
                aria-label={
                  codEnabled
                    ? "Cash on Delivery is offered at checkout"
                    : "Cash on Delivery is turned off at checkout"
                }
                onClick={() => void toggleCodEnabled()}
                className={`relative h-9 w-[3.25rem] shrink-0 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  codEnabled
                    ? "bg-emerald-600 shadow-inner shadow-emerald-900/20"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none absolute top-1 left-1 h-7 w-7 rounded-full bg-white shadow-md ${
                    codEnabled ? "translate-x-[1.35rem]" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`min-w-[2.25rem] text-xs font-bold uppercase tracking-wide ${
                  codEnabled ? "text-emerald-800" : "text-amber-800"
                }`}
              >
                {codEnabled ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreSettings;
