// import Address from "../models/Address.js"


// // Add Address : /api/address/add
// export const addAddress = async(req, res)=>{
//     try {
//         const { address, userId } = req.body
//         await Address.create({...address, userId})
//         res.json({success: true, message: "Address added successfully"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// // Get Address : /api/address/get
// export const getAddress = async(req, res)=>{
//     try {
//         const { userId } = req.body
//         const addresses = await Address.find({userId})
//         res.json({success: true, addresses})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }
























import Address from "../models/Address.js"

// ADD ADDRESS
export const addAddress = async(req, res)=>{
    try {
        const { address } = req.body
        const userId = req.userId   // auth middleware se

        await Address.create({...address, userId})

        res.json({
            success: true,
            message: "Address added successfully"
        })
    } catch (error) {
        res.json({ success:false, message:error.message })
    }
}

// GET ADDRESS
export const getAddress = async(req, res)=>{
    try {
        const userId = req.userId

        const addresses = await Address.find({userId})

        res.json({
            success: true,
            addresses
        })
    } catch (error) {
        res.json({ success:false, message:error.message })
    }
}
