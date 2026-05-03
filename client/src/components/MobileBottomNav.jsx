import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const IconHome = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconShop = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M16 11V7a4 4 0 00-8 0v4M4 9h16l-1 12H5L4 9z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconOrders = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUser = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const tabClass = (isActive) =>
  `flex flex-1 flex-col items-center justify-end gap-0.5 pb-1.5 pt-2 transition-colors ${
    isActive ? "text-primary" : "text-slate-400"
  }`;

const MobileBottomNav = () => {
  const { getCartCount, user, setShowUserLogin, navigate } = useAppContext();
  const location = useLocation();
  const count = getCartCount();

  if (location.pathname.includes("seller")) return null;
  const p = (location.pathname.replace(/\/+$/, "") || "/").toLowerCase();
  if (p === "/admin" || p.startsWith("/admin/") || p === "/link/admin" || p.startsWith("/link/admin/"))
    return null;

  const onProfile = () => {
    if (user) navigate("/profile");
    else setShowUserLogin(true);
  };

  const onOrders = () => {
    if (user) navigate("/my-orders");
    else setShowUserLogin(true);
  };

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] md:hidden"
      aria-label="Main mobile navigation"
    >
      <div className="pointer-events-auto mx-3 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="relative flex w-full max-w-md items-end rounded-[2rem] border border-white/70 bg-white/98 px-1 shadow-[0_8px_32px_-4px_rgba(5,150,105,0.2),0_4px_16px_-4px_rgba(15,23,42,0.12)]">
          <NavLink to="/" end className={({ isActive }) => tabClass(isActive)}>
            <IconHome className="h-6 w-6 shrink-0" />
            <span className="text-[10px] font-medium leading-none">Home</span>
          </NavLink>

          <NavLink to="/products" className={({ isActive }) => tabClass(isActive)}>
            <IconShop className="h-6 w-6 shrink-0" />
            <span className="text-[10px] font-medium leading-none">Shop</span>
          </NavLink>

          <div className="relative flex w-[4.25rem] shrink-0 justify-center">
            <NavLink
              to="/cart"
              className="absolute -top-7 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dull text-white shadow-lg shadow-emerald-600/35 ring-4 ring-white/90 transition active:scale-95"
              aria-label={`Cart${count ? `, ${count} items` : ""}`}
            >
              <img src={assets.nav_cart_icon} alt="" className="h-7 w-7 opacity-95 brightness-0 invert" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-slate-900 px-0.5 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </NavLink>
            <div className="h-[3.25rem] w-full" aria-hidden />
          </div>

          <button
            type="button"
            onClick={onOrders}
            className={`${tabClass(location.pathname === "/my-orders")} border-0 bg-transparent`}
          >
            <IconOrders className="h-6 w-6 shrink-0" />
            <span className="text-[10px] font-medium leading-none">Orders</span>
          </button>

          <button
            type="button"
            onClick={onProfile}
            className={`${tabClass(location.pathname === "/profile")} border-0 bg-transparent`}
          >
            <IconUser className="h-6 w-6 shrink-0" />
            <span className="text-[10px] font-medium leading-none">Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
