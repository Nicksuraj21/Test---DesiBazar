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
















import React from 'react'
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
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // GOOGLE LOGIN (popup "One moment please" / gsi/transform = Google's own UI; cannot be removed.
    // use_fedcm_for_button uses browser FedCM on supported Chrome → often skips that extra popup.)
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);

            const { data } = await axios.post('/api/user/google-login', {
                token: credentialResponse.credential
            });

            if (data.success) {
                setUser(data.user);
                setShowUserLogin(false);
                toast.success("Google Login Success");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Google Login Failed");
        } finally {
            setLoading(false);
        }
    };

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

                <div className="w-full flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => toast.error("Google Login Failed")}
                        use_fedcm_for_button
                    />
                </div>

            </form>
        </div>
    )
}

export default Login