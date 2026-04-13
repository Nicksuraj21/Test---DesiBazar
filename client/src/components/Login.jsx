// import React from 'react'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';

// const Login = () => {

//     const {setShowUserLogin, setUser, axios, navigate} = useAppContext()

//     const [state, setState] = React.useState("login");
//     const [name, setName] = React.useState("");
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");

//     const onSubmitHandler = async (event)=>{
//         try {
//             event.preventDefault();

//             const {data} = await axios.post(`/api/user/${state}`,{
//                 name, email, password
//             });
//             if (data.success){
//                 navigate('/')
//                 setUser(data.user)
//                 setShowUserLogin(false)
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }



//     }

//   return (
//     <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>

//       <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
//             <p className="text-2xl font-medium m-auto">
//                 <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
//             </p>
//             {state === "register" && (
//                 <div className="w-full">
//                     <p>Name</p>
//                     <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
//                 </div>
//             )}
//             <div className="w-full ">
//                 <p>Email</p>
//                 <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
//             </div>
//             <div className="w-full ">
//                 <p>Password</p>
//                 <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
//             </div>
//             {state === "register" ? (
//                 <p>
//                     Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             ) : (
//                 <p>
//                     Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             )}
//             <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
//                 {state === "register" ? "Create Account" : "Login"}
//             </button>
//         </form>
//     </div>
//   )
// }

// export default Login































// import React from 'react'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import { GoogleLogin } from '@react-oauth/google';

// const Login = () => {

//     const {setShowUserLogin, setUser, axios, navigate} = useAppContext()

//     const [state, setState] = React.useState("login");
//     const [name, setName] = React.useState("");
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");

//     const onSubmitHandler = async (event)=>{
//         try {
//             event.preventDefault();

//             const {data} = await axios.post(`/api/user/${state}`,{
//                 name, email, password
//             });

//             if (data.success){
//                 navigate('/')
//                 setUser(data.user)
//                 setShowUserLogin(false)
//                 toast.success("Login Success")
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // 🔥 GOOGLE LOGIN HANDLER
//     const handleGoogleSuccess = async (credentialResponse) => {
//         try {

//             const { data } = await axios.post('/api/user/google-login', {
//                 token: credentialResponse.credential
//             });

//             if (data.success) {
//                 setUser(data.user)
//                 navigate('/')
//                 setShowUserLogin(false)
//                 toast.success("Google Login Success")
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error("Google Login Failed")
//         }
//     }

//   return (
//     <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>

//       <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">

//             <p className="text-2xl font-medium m-auto">
//                 <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
//             </p>

//             {state === "register" && (
//                 <div className="w-full">
//                     <p>Name</p>
//                     <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
//                 </div>
//             )}

//             <div className="w-full ">
//                 <p>Email</p>
//                 <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
//             </div>

//             <div className="w-full ">
//                 <p>Password</p>
//                 <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
//             </div>

//             {state === "register" ? (
//                 <p>
//                     Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             ) : (
//                 <p>
//                     Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             )}

//             <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
//                 {state === "register" ? "Create Account" : "Login"}
//             </button>

//             {/* 🔥 Divider */}
//             <div className="w-full flex items-center gap-2">
//                 <div className="flex-1 h-px bg-gray-300"></div>
//                 <p className="text-gray-400 text-xs">OR</p>
//                 <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             {/* 🔥 GOOGLE LOGIN BUTTON */}
//             <div className="w-full flex justify-center">
//                 <GoogleLogin
//                     onSuccess={handleGoogleSuccess}
//                     onError={() => toast.error("Google Login Failed")}
//                 />
//             </div>

//         </form>
//     </div>
//   )
// }

// export default Login

































// import React from 'react'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import { GoogleLogin } from '@react-oauth/google';

// const Login = () => {

//     const {setShowUserLogin, setUser, axios} = useAppContext()

//     const [state, setState] = React.useState("login");
//     const [name, setName] = React.useState("");
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const [loading, setLoading] = React.useState(false); // 🔥 NEW

//     const onSubmitHandler = async (event)=>{
//         event.preventDefault();

//         if (loading) return;
//         setLoading(true);

//         try {
//             const {data} = await axios.post(`/api/user/${state}`,{
//                 name, email, password
//             });

//             if (data.success){
//                 setUser(data.user)
//                 setShowUserLogin(false)
//                 toast.success("Login Success")
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleGoogleSuccess = async (credentialResponse) => {
//         try {
//             setLoading(true);

//             const { data } = await axios.post('/api/user/google-login', {
//                 token: credentialResponse.credential
//             });

//             if (data.success) {
//                 setUser(data.user)
//                 setShowUserLogin(false)
//                 toast.success("Google Login Success")
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error("Google Login Failed")
//         } finally {
//             setLoading(false);
//         }
//     }

//   return (
//     <div onClick={()=> !loading && setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>

//       <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">

//             <p className="text-2xl font-medium m-auto">
//                 <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
//             </p>

//             {state === "register" && (
//                 <div className="w-full">
//                     <p>Name</p>
//                     <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
//                 </div>
//             )}

//             <div className="w-full ">
//                 <p>Email</p>
//                 <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
//             </div>

//             <div className="w-full ">
//                 <p>Password</p>
//                 <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
//             </div>

//             {state === "register" ? (
//                 <p>
//                     Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             ) : (
//                 <p>
//                     Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             )}

//             <button
//                 disabled={loading}
//                 className="bg-primary text-white w-full py-2 rounded-md flex justify-center items-center gap-2"
//             >
//                 {loading && (
//                     <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                 )}

//                 {loading
//                     ? "Please wait..."
//                     : state === "register"
//                     ? "Create Account"
//                     : "Login"}
//             </button>

//             <div className="w-full flex items-center gap-2">
//                 <div className="flex-1 h-px bg-gray-300"></div>
//                 <p className="text-gray-400 text-xs">OR</p>
//                 <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             <div className="w-full flex justify-center">
//                 <GoogleLogin
//                     onSuccess={handleGoogleSuccess}
//                     onError={() => toast.error("Google Login Failed")}
//                 />
//             </div>

//         </form>
//     </div>
//   )
// }

// export default Login































// import React from 'react'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';
// import { GoogleLogin } from '@react-oauth/google';

// const Login = () => {

//     const { setShowUserLogin, setUser, axios } = useAppContext()

//     const [phone, setPhone] = React.useState("");
//     const [otp, setOtp] = React.useState("");
//     const [step, setStep] = React.useState(1); // 1 = phone, 2 = otp
//     const [loading, setLoading] = React.useState(false);

//     // SEND OTP
//     const sendOtp = async (e) => {
//         e.preventDefault();
//         if (loading) return;

//         if (phone.length !== 10) {
//             toast.error("Enter valid number");
//             return;
//         }

//         setLoading(true);

//         try {
//             const { data } = await axios.post('/api/user/send-otp', { phone });

//             if (data.success) {
//                 toast.success("OTP sent");
//                 setStep(2);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error("Failed to send OTP");
//         } finally {
//             setLoading(false);
//         }
//     }

//     // VERIFY OTP
//     const verifyOtp = async (e) => {
//         e.preventDefault();
//         if (loading) return;

//         setLoading(true);

//         try {
//             const { data } = await axios.post('/api/user/verify-otp', { phone, otp });

//             if (data.success) {
//                 setUser(data.user)
//                 setShowUserLogin(false)
//                 toast.success("Login success")
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error("OTP failed")
//         } finally {
//             setLoading(false);
//         }
//     }

//     // GOOGLE LOGIN
//     const handleGoogleSuccess = async (credentialResponse) => {
//         try {
//             setLoading(true);

//             const { data } = await axios.post('/api/user/google-login', {
//                 token: credentialResponse.credential
//             });

//             if (data.success) {
//                 setUser(data.user)
//                 setShowUserLogin(false)
//                 toast.success("Google Login Success")
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error("Google Login Failed")
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div onClick={() => !loading && setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>

//             <form onSubmit={step === 1 ? sendOtp : verifyOtp} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">

//                 <p className="text-2xl font-medium m-auto">
//                     <span className="text-primary">User</span> Login
//                 </p>

//                 {step === 1 && (

//                     <div className="w-full">
//                         <p>Mobile Number</p>

//                         <input
//                             type="tel"
//                             inputMode="numeric"
//                             pattern="[0-9]*"
//                             placeholder="Enter 10 digit number"
//                             value={phone}
//                             maxLength={10}
//                             onChange={(e) => {
//                                 // sirf numbers allow
//                                 let value = e.target.value.replace(/\D/g, "");

//                                 // 10 digit limit
//                                 if (value.length <= 10) {
//                                     setPhone(value);
//                                 }
//                             }}
//                             className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
//                             required
//                         />
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div className="w-full">
//                         <p>Enter OTP</p>
//                         <input
//                             onChange={(e) => setOtp(e.target.value)}
//                             value={otp}
//                             className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
//                             type="number"
//                             required
//                         />
//                     </div>
//                 )}

//                 <button
//                     disabled={loading}
//                     className="bg-primary text-white w-full py-2 rounded-md flex justify-center items-center gap-2"
//                 >
//                     {loading && (
//                         <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                     )}

//                     {loading ? "Please wait..." : step === 1 ? "Send OTP" : "Login"}
//                 </button>

//                 <div className="w-full flex items-center gap-2">
//                     <div className="flex-1 h-px bg-gray-300"></div>
//                     <p className="text-gray-400 text-xs">OR</p>
//                     <div className="flex-1 h-px bg-gray-300"></div>
//                 </div>

//                 <div className="w-full flex justify-center">
//                     <GoogleLogin
//                         onSuccess={handleGoogleSuccess}
//                         onError={() => toast.error("Google Login Failed")}
//                     />
//                 </div>

//             </form>
//         </div>
//     )
// }

// export default Login
















import React, { useCallback, useEffect, useMemo } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const { setShowUserLogin, setUser, axios } = useAppContext()

    const [isSignup, setIsSignup] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    /** DesiBazar Android WebView: Google Identity JS often does not render; native Sign-In supplies the same ID token. */
    const useNativeGoogleInApp = useMemo(() => {
        if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
        if (!/DesiBazarApp\//i.test(navigator.userAgent)) return false;
        return typeof window.DesibazarAndroid !== 'undefined' && window.DesibazarAndroid !== null;
    }, []);

    // Login/Register response me `rewardPoints` missing ho sakta hai.
    // isliye turant `/api/user/is-auth` se fresh user fetch karke UI update karte hain.
    const refreshAuthedUser = useCallback(async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            if (data?.success && data.user) setUser(data.user);
        } catch {
            // Fallback: atleast `data.user` (name/email) already show hoga.
        }
    }, [axios, setUser]);

    // LOGIN / SIGNUP SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {

            const url = isSignup
                ? "/api/user/register"
                : "/api/user/login";

            const payload = isSignup
                ? { name, email, password }
                : { email, password };

            const { data } = await axios.post(url, payload);

            if (data.success) {
                setUser(data.user);
                setShowUserLogin(false);
                toast.success(isSignup ? "Account Created" : "Login Success");
                await refreshAuthedUser();
            } else {

                // 🔥 AUTO SWITCH TO SIGNUP
                if (!isSignup && data.message === "User not found") {
                    setIsSignup(true);
                    toast("Please Sign Up");
                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // GOOGLE LOGIN — browser: @react-oauth/google; Android app: native token via window.__desiBazarResolveNativeGoogle
    const handleGoogleSuccess = useCallback(async (credentialResponse) => {
        try {
            setLoading(true);

            const { data } = await axios.post('/api/user/google-login', {
                token: credentialResponse.credential
            });

            if (data.success) {
                setUser(data.user);
                setShowUserLogin(false);
                toast.success("Google Login Success");
                await refreshAuthedUser();
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error?.message || "Google Login Failed");
        } finally {
            setLoading(false);
        }
    }, [axios, refreshAuthedUser, setShowUserLogin, setUser]);

    useEffect(() => {
        window.__desiBazarResolveNativeGoogle = (token) => {
            if (!token) return;
            void handleGoogleSuccess({ credential: token });
        };
        return () => {
            delete window.__desiBazarResolveNativeGoogle;
        };
    }, [handleGoogleSuccess]);

    return (
        <div
            onClick={() => !loading && setShowUserLogin(false)}
            className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'
        >

            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
            >

                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {isSignup ? "Sign Up" : "Login"}
                </p>

                {/* Name (Signup only) */}
                {isSignup && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                        />
                    </div>
                )}

                {/* Email */}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required
                    />
                </div>

                {/* Password */}
                <div className="w-full">
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                        required
                    />
                </div>

                <button
                    disabled={loading}
                    className="bg-primary text-white w-full py-2 rounded-md flex justify-center items-center gap-2"
                >
                    {loading && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {loading
                        ? "Please wait..."
                        : isSignup ? "Sign Up" : "Login"}
                </button>

                {/* Toggle */}
                <p
                    className="text-xs text-center w-full cursor-pointer text-primary"
                    onClick={() => setIsSignup(!isSignup)}
                >
                    {isSignup
                        ? "Already have an account? Login"
                        : "Don't have an account? Sign Up"}
                </p>

                <div className="w-full flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="text-gray-400 text-xs">OR</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="w-full flex flex-col items-stretch justify-center gap-2">
                    {useNativeGoogleInApp ? (
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => {
                                try {
                                    window.DesibazarAndroid?.requestGoogleSignIn?.();
                                } catch {
                                    toast.error("Google Sign-In unavailable");
                                }
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
                        >
                            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    ) : (
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => toast.error("Google Login Failed")}
                                use_fedcm_for_button
                            />
                        </div>
                    )}
                </div>

            </form>
        </div>
    )
}

export default Login