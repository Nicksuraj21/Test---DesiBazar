import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import CustomSelect from "../../components/CustomSelect";

const formatDateTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const getStatusColor = (status) => {
  if (status === "Order Placed") return "bg-gray-200 text-gray-700";
  if (status === "Packed") return "bg-yellow-200 text-yellow-800";
  if (status === "Out for delivery") return "bg-blue-200 text-blue-800";
  if (status === "Delivered") return "bg-green-200 text-green-800";
  if (status === "Cancelled" || status === "Canceled") return "bg-red-200 text-red-700";
  return "bg-gray-200";
};

const ORDER_STATUS_OPTIONS = [
  "Order Placed",
  "Packed",
  "Out for delivery",
  "Delivered",
  "Cancelled",
];

/** Admin can still change Delivered; cancelled rows are not in this list anyway. */
const isOrderStatusLocked = (status) =>
  status === "Cancelled" || status === "Canceled";

const AdminUpiHistory = () => {
  const { axios, currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ limit: 100, loading: true });

  const refetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/admin/upi-order-history", {
        params: { limit: 150 },
      });
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        setMeta((m) => ({
          ...m,
          limit: data.limit ?? data.orders.length,
        }));
      }
    } catch {
      /* ignore */
    }
  }, [axios]);

  const changeStatus = async (orderId, status) => {
    const current = orders.find((o) => String(o._id) === String(orderId));
    if (current && isOrderStatusLocked(current.status)) {
      toast.error("This order cannot be edited");
      return;
    }

    const normalizedStatus =
      status === "Canceled" || status === "Cancelled" ? "Cancelled" : status;

    setOrders((prev) =>
      prev.map((o) =>
        String(o._id) === String(orderId) ? { ...o, status: normalizedStatus } : o
      )
    );

    try {
      const { data } = await axios.post("/api/admin/order-status", {
        orderId,
        status,
      });
      if (data.success) {
        toast.success(data.message || "Status updated");
      } else {
        toast.error(data.message || "Could not update status");
      }
    } catch (e) {
      toast.error(e.message || "Could not update status");
    }
    await refetchOrders();
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/upi-order-history", {
          params: { limit: 150 },
        });
        if (!cancelled && data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
          setMeta({
            limit: data.limit ?? data.orders.length,
            loading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setOrders([]);
          setMeta((m) => ({ ...m, loading: false }));
          toast.error("Could not load UPI order history");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [axios]);

  const openMap = (location) => {
    if (!location?.lat || !location?.lng) {
      toast.error("Location not available");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="no-scrollbar h-[95vh] flex-1 overflow-y-scroll">
      <div className="space-y-4 p-4 md:p-10">
        <div className="max-w-4xl border-b border-slate-200/80 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">UPI order history</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Full order details (same layout idea as seller Orders). Up to {meta.limit} newest paid
            UPI rows in this window.
          </p>
          {meta.loading && (
            <p className="mt-2 text-xs font-medium text-slate-400">Loading…</p>
          )}
        </div>

        {!meta.loading &&
          orders.map((order) => (
            <div
              key={String(order._id)}
              className="flex max-w-4xl flex-col justify-between gap-5 rounded-md border border-gray-300 p-4 sm:p-5 md:flex-row"
            >
              <div className="flex min-w-0 w-full flex-col gap-2 md:w-auto">
                <p className="text-xs font-medium text-gray-500">
                  Order ID: {String(order._id).slice(-6)}
                </p>

                <div className="flex gap-3 md:gap-4">
                  <img
                    className="h-8 w-8 shrink-0 object-contain md:h-12 md:w-12"
                    src={assets.box_icon}
                    alt=""
                  />

                  <div>
                    {(order.items || []).map((item, index) => (
                      <p key={index} className="font-medium">
                        {item.product?.name || "Deleted Product"}
                        <span className="text-primary"> x {item.quantity}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {(order.subtotal != null ||
                  order.deliveryCharge > 0 ||
                  order.discount > 0 ||
                  (order.rewardPointsUsed || 0) > 0) && (
                  <div className="mt-1 text-xs text-gray-600">
                    {order.subtotal != null && (
                      <p>
                        Subtotal: {currency}
                        {Number(order.subtotal).toLocaleString("en-IN")}
                      </p>
                    )}
                    {(order.discount || 0) > 0 && (
                      <p>
                        Discount: −{currency}
                        {Number(order.discount).toLocaleString("en-IN")}
                      </p>
                    )}
                    <p>
                      Delivery:{" "}
                      {order.deliveryCharge ? (
                        <>
                          {currency}
                          {Number(order.deliveryCharge).toLocaleString("en-IN")}
                        </>
                      ) : (
                        "Free"
                      )}
                    </p>
                    {(order.rewardPointsUsed || 0) > 0 && (
                      <p className="text-amber-800">
                        Reward points used: {currency}
                        {Number(order.rewardPointsUsed).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="min-w-0 w-full text-sm text-black/70 md:w-auto">
                <p className="font-medium">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>{order.address?.street}</p>
                <p>{order.address?.city}</p>
                {order.address?.state && <p>{order.address.state}</p>}
                <p>{order.address?.phone}</p>
              </div>

              <div className="w-full shrink-0 text-left md:w-auto md:text-center">
                <p className="text-lg font-medium">
                  {currency}
                  {Number(order.amount || 0).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</p>
              </div>

              <div className="flex w-full min-w-0 flex-col items-start gap-2 md:w-auto md:min-w-[15rem] md:items-end">
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>

                <CustomSelect
                  aria-label="Order status"
                  value={order.status}
                  onChange={(v) => void changeStatus(order._id, v)}
                  options={ORDER_STATUS_OPTIONS}
                  disabled={isOrderStatusLocked(order.status)}
                  className="w-full max-w-xs md:max-w-none md:w-auto md:min-w-[9.5rem]"
                  menuMinWidth={240}
                  menuItemsNoWrap
                  triggerClassName={[
                    "!px-2 !py-1 !gap-1 !shadow-none md:!min-h-0",
                    isOrderStatusLocked(order.status)
                      ? "!bg-gray-200 !cursor-not-allowed"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  triggerIconClassName="!h-3.5 !w-3.5"
                />

                <p className="w-full text-xs text-gray-500 md:max-w-[15rem] md:text-right">
                  {order.paymentType} •{" "}
                  {order.paymentType === "COD" ? "Pay on Delivery" : order.paymentStatus}
                </p>
                {order.razorpayPaymentId && (
                  <p className="max-w-[15rem] break-all text-[10px] text-slate-500 md:text-right">
                    Razorpay: {order.razorpayPaymentId}
                  </p>
                )}

                {order.location?.lat && order.location?.lng && (
                  <button
                    type="button"
                    onClick={() => openMap(order.location)}
                    className="inline-flex w-[60%] shrink-0 items-center justify-start gap-1 rounded bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700 md:w-auto"
                  >
                    📍 Track on Map
                  </button>
                )}
              </div>
            </div>
          ))}

        {!meta.loading && orders.length === 0 && (
          <div className="max-w-4xl rounded-md border border-gray-200 bg-white p-8 text-center text-sm text-slate-500">
            No UPI orders in this window.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpiHistory;
