import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const StoreSettings = () => {
  const { axios, setStoreAcceptingOrders } = useAppContext();
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const toggleInFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get("/api/seller/store-settings");
        if (!cancelled && data.success) {
          const v = !!data.acceptingOrders;
          setAcceptingOrders(v);
          setStoreAcceptingOrders(v);
        }
      } catch {
        if (!cancelled) toast.error("Could not load store settings");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [axios, setStoreAcceptingOrders]);

  const toggleAcceptingOrders = async () => {
    if (toggleInFlightRef.current) return;
    const next = !acceptingOrders;
    toggleInFlightRef.current = true;
    setAcceptingOrders(next);
    setStoreAcceptingOrders(next);
    try {
      const { data } = await axios.put("/api/seller/store-settings", {
        acceptingOrders: next,
      });
      if (data.success) {
        const v = !!data.acceptingOrders;
        setAcceptingOrders(v);
        setStoreAcceptingOrders(v);
        toast.success(next ? "Accepting orders" : "Not accepting orders");
      } else {
        setAcceptingOrders(!next);
        setStoreAcceptingOrders(!next);
        toast.error(data.message || "Could not update");
      }
    } catch (e) {
      setAcceptingOrders(!next);
      setStoreAcceptingOrders(!next);
      toast.error(e.message || "Could not update");
    } finally {
      toggleInFlightRef.current = false;
    }
  };

  return (
    <div className="no-scrollbar h-[95vh] flex-1 overflow-y-scroll">
      <div className="mx-auto max-w-3xl space-y-8 p-5 md:p-10">
        <div className="border-b border-slate-200/80 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Store</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Control whether customers can place new orders from the site. When turned off, checkout
            is paused: the cart shows a clear message and new orders are blocked on the server as well.
          </p>
        </div>

        <div className="max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/5 ring-1 ring-slate-900/[0.03]">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-900">Accept new orders</p>
            <p className="text-xs leading-relaxed text-slate-500">
              {acceptingOrders
                ? "Customers can use Place order / Pay on the cart."
                : "Checkout is disabled for customers until you turn this on."}
            </p>
            <div className="flex w-fit items-center gap-3 rounded-xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-200/60">
              <button
                type="button"
                role="switch"
                aria-checked={acceptingOrders}
                aria-label={
                  acceptingOrders
                    ? "Store is accepting new customer orders"
                    : "Store is not accepting new customer orders"
                }
                onClick={() => void toggleAcceptingOrders()}
                className={`relative h-9 w-[3.25rem] shrink-0 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  acceptingOrders
                    ? "bg-emerald-600 shadow-inner shadow-emerald-900/20"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none absolute top-1 left-1 h-7 w-7 rounded-full bg-white shadow-md ${
                    acceptingOrders ? "translate-x-[1.35rem]" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`min-w-[2.25rem] text-xs font-bold uppercase tracking-wide ${
                  acceptingOrders ? "text-emerald-800" : "text-amber-800"
                }`}
              >
                {acceptingOrders ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
