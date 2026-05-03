import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const { isAdmin, setIsAdmin, navigate, axios } = useAppContext();
  const location = useLocation();
  const adminBase = useMemo(
    () => (location.pathname.startsWith("/link/admin") ? "/link/admin" : "/admin"),
    [location.pathname]
  );
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("/api/admin/login", { userId, password });
      if (data.success) {
        setIsAdmin(true);
        navigate(adminBase);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      navigate(adminBase);
    }
  }, [isAdmin, adminBase, navigate]);

  return (
    !isAdmin && (
      <form
        onSubmit={onSubmitHandler}
        className="flex min-h-screen items-center text-sm text-gray-600"
      >
        <div className="m-auto flex min-w-80 flex-col items-start gap-5 rounded-lg border border-gray-200 p-8 py-12 shadow-xl sm:min-w-88">
          <p className="m-auto text-2xl font-medium">
            <span className="text-primary">Admin</span> Login
          </p>
          <div className="w-full">
            <p>User ID</p>
            <input
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              type="text"
              placeholder="ADMIN_USER_ID from env"
              className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
              required
              autoComplete="username"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="ADMIN_PASSWORD from env"
              className="mt-1 w-full rounded border border-gray-200 p-2 outline-primary"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-primary py-2 text-white"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default AdminLogin;
