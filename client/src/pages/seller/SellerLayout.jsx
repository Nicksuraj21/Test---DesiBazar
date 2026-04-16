import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {

    const { axios, navigate } = useAppContext();

    const sidebarLinks = [
        { name: "Store", path: "/seller/store", icon: assets.box_icon },
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
        { name: "Top customers", path: "/seller/top-customers", icon: assets.star_icon },
        { name: "Reward points", path: "/seller/reward-points", icon: assets.coin_icon },
        { name: "AI Marketing", path: "/seller/ai-marketing", icon: assets.refresh_icon },
    ];

    const logout = async ()=>{
        try {
            const { data } = await axios.get('/api/seller/logout');
            if(data.success){
                toast.success(data.message)
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100/90 via-slate-50 to-white">
            <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm shadow-slate-900/5 backdrop-blur-md md:px-8">
                <Link className="block shrink-0 transition-opacity hover:opacity-90">
                    <img src={assets.logo} alt="DesiBazar" className="h-9 w-auto cursor-pointer md:h-10" />
                </Link>
                <div className="flex items-center gap-3 md:gap-4">
                    <p className="hidden text-sm text-slate-600 sm:block">
                        <span className="font-medium text-slate-800">Admin</span>
                        <span className="text-slate-400"> · </span>
                        <span className="text-slate-500">panel</span>
                    </p>
                    <button
                        type="button"
                        onClick={logout}
                        className="rounded-full border border-slate-300/90 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-3.25rem)]">
                <aside className="flex w-16 shrink-0 flex-col border-r border-slate-200/80 bg-white/80 py-3 md:w-64 md:py-4">
                    <p className="mb-2 hidden px-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400 md:block">
                        Menu
                    </p>
                    <nav className="flex flex-1 flex-col gap-0.5 px-1.5 md:px-2">
                        {sidebarLinks.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.path}
                                end={item.path === "/seller"}
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 rounded-xl py-2.5 pl-2.5 pr-2 transition md:px-3 ${
                                        isActive
                                            ? "bg-primary/12 text-primary shadow-sm ring-1 ring-primary/20"
                                            : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900"
                                    }`
                                }
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/70 bg-white/90 shadow-sm md:h-10 md:w-10">
                                    <img src={item.icon} alt="" className="h-6 w-6 opacity-90 md:h-7 md:w-7" />
                                </span>
                                <span className="hidden text-sm font-medium md:inline">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className="min-w-0 flex-1 bg-slate-50/40">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SellerLayout;