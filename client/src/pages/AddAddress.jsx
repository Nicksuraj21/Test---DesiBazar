// import React, { useEffect, useState } from 'react'
// import { assets } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// // Input Field Component
// const InputField = ({ type, placeholder, name, handleChange, address })=>(
//     <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
//     type={type}
//     placeholder={placeholder}
//     onChange={handleChange}
//     name={name}
//     value={address[name]}
//     required
//      />
// )

// const AddAddress = () => {

//     const {axios, user, navigate} = useAppContext();

//     const [address, setAddress] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         street: '',
//         city: '',
//         state: '',
//         zipcode: '',
//         country: '',
//         phone: '',
//     })

//     const handleChange = (e)=>{
//         const { name, value } = e.target;

//         setAddress((prevAddress)=>({
//             ...prevAddress,
//             [name]: value,
//         }))
//         console.log(address);
        
//     }



//     const onSubmitHandler = async (e)=>{
//         e.preventDefault();
//         try {
//             const {data} = await axios.post('/api/address/add', {address});

//             if (data.success){
//                 toast.success(data.message)
//                 navigate('/cart')
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         if(!user){
//             navigate('/cart')
//         }
//     },[])

//   return (
//     <div className='mt-16 pb-16'>
//       <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
//       <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
//             <div className='flex-1 max-w-md'>
//              <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

//                 <div className='grid grid-cols-2 gap-4'>
//                     <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name"/>
//                     <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name"/>
//                 </div>

//                 <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email address" />
//                 <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

//                 <div className='grid grid-cols-2 gap-4'>
//                     <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
//                     <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
//                 </div>

//                 <div className='grid grid-cols-2 gap-4'>
//                     <InputField handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip code" />
//                     <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
//                 </div>

//                 <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

//                 <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
//                     Save address
//                 </button>


//              </form>
//             </div>
//             <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
//       </div>
//     </div>
//   )
// }

// export default AddAddress

































// import React, { useEffect, useRef, useState } from 'react'
// import { assets } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// // Input Field Component
// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//   <input
//     className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
//     type={type}
//     placeholder={placeholder}
//     onChange={handleChange}
//     name={name}
//     value={address[name]}
//     required
//   />
// )

// const AddAddress = () => {
//   const { axios, user, navigate } = useAppContext()
//   const locationRef = useRef(null)

//   const [address, setAddress] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: '',
//     lat: null,
//     lng: null,
//   })

//   // Input change
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setAddress(prev => ({ ...prev, [name]: value }))
//   }

//   // Google Places Autocomplete
//   useEffect(() => {
//     if (!window.google || !locationRef.current) return

//     const autocomplete = new window.google.maps.places.Autocomplete(
//       locationRef.current,
//       {
//         types: ['geocode'], // area/society/landmark
//         componentRestrictions: { country: 'in' },
//       }
//     )

//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace()
//       if (!place.geometry) return

//       setAddress(prev => ({
//         ...prev,
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//         street: place.formatted_address || prev.street,
//       }))
//     })
//   }, [])

//   // Use current location button
//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error('Location not supported')
//       return
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setAddress(prev => ({
//           ...prev,
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         }))
//         toast.success('Location captured 📍')
//       },
//       () => toast.error('Location permission denied')
//     )
//   }

//   // Submit handler
//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     try {
//       const { data } = await axios.post('/api/address/add', { address })
//       if (data.success) {
//         toast.success(data.message)
//         navigate('/cart')
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!user) navigate('/cart')
//   }, [])

//   return (
//     <div className='mt-16 pb-16'>
//       <p className='text-2xl md:text-3xl text-gray-500'>
//         Add Shipping <span className='font-semibold text-primary'>Address</span>
//       </p>

//       <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
//         <div className='flex-1 max-w-md'>
//           <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

//             {/* 🔍 LOCATION SEARCH */}
//             <input
//               ref={locationRef}
//               type='text'
//               placeholder='Search area, society, landmark'
//               className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
//             />

//             <button
//               type='button'
//               onClick={getCurrentLocation}
//               className='text-primary text-xs mt-1'
//             >
//               📍 Use my current location
//             </button>

//             {/* Name fields */}
//             <div className='grid grid-cols-2 gap-4'>
//               <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name' />
//               <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
//             </div>

//             {/* Email & Street */}
//             <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email address' />
//             <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street' />

//             {/* City & State */}
//             <div className='grid grid-cols-2 gap-4'>
//               <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
//               <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State' />
//             </div>

//             {/* Zip & Country */}
//             <div className='grid grid-cols-2 gap-4'>
//               <InputField handleChange={handleChange} address={address} name='zipcode' type='number' placeholder='Zip code' />
//               <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />
//             </div>

//             {/* Phone */}
//             <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone' />

//             {/* Submit button */}
//             <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
//               Save address
//             </button>
//           </form>
//         </div>

//         <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt='Add Address' />
//       </div>
//     </div>
//   )
// }

// export default AddAddress




























// import React, { useEffect, useState } from 'react'
// import { assets } from '../assets/assets'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast'

// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//     <input
//         className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
//         type={type}
//         placeholder={placeholder}
//         onChange={handleChange}
//         name={name}
//         value={address[name]}
//         required
//     />
// )

// const AddAddress = () => {

//     const { axios, user, navigate } = useAppContext();

//     const [address, setAddress] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         street: '',
//         city: '',
//         state: '',
//         zipcode: '',
//         country: '',
//         phone: '',
//     });

//     const [saving, setSaving] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();

//         if (saving) return;
//         setSaving(true);

//         try {
//             const { data } = await axios.post('/api/address/add', address); // ✅ FIXED (no nested object)

//             if (data.success) {
//                 toast.success("Address Added Successfully");
//                 navigate('/cart', { state: { refresh: true } }); // ✅ important
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setSaving(false);
//         }
//     };

//     useEffect(() => {
//         if (!user) {
//             navigate('/cart');
//         }
//     }, [user]);

//     return (
//         <div className='mt-16 pb-16'>
//             <p className='text-2xl md:text-3xl text-gray-500'>
//                 Add Shipping <span className='font-semibold text-primary'>Address</span>
//             </p>

//             <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
//                 <div className='flex-1 max-w-md'>
//                     <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

//                         <div className='grid grid-cols-2 gap-4'>
//                             <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
//                             <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name" />
//                         </div>

//                         <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email address" />
//                         <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

//                         <div className='grid grid-cols-2 gap-4'>
//                             <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
//                             <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
//                         </div>

//                         <div className='grid grid-cols-2 gap-4'>
//                             <InputField handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip code" />
//                             <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
//                         </div>

//                         <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

//                         <button
//                             disabled={saving}
//                             className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition uppercase disabled:opacity-60'
//                         >
//                             {saving ? "Saving..." : "Save Address"}
//                         </button>

//                     </form>
//                 </div>

//                 <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
//             </div>
//         </div>
//     );
// };

// export default AddAddress;





























import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// INPUT FIELD COMPONENT
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-600 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
)

const AddAddress = () => {

  const { axios, user, navigate } = useAppContext()

  const [loading, setLoading] = useState(false)

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // SUBMIT
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Login required")
      return navigate("/cart")
    }

    setLoading(true)

    try {
      const { data } = await axios.post('/api/address/add', {
        address,
        userId: user._id   // 🔥 IMPORTANT FIX
      })

      if (data.success) {
        toast.success("Address added")
        navigate('/cart')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // USER CHECK
  useEffect(() => {
    if (!user) navigate('/cart')
  }, [user])

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">

        {/* FORM */}
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email address" />
            <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip code" />
              <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
            </div>

            <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone" />

            <button
              disabled={loading}
              className="w-full mt-6 bg-primary text-white py-3 rounded uppercase disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>

          </form>
        </div>

        {/* IMAGE */}
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  )
}

export default AddAddress
