import Job from "../models/Job.js";


// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({visible: true})
            .populate({path: "companyId", select: '-password'})
        res.header('Access-Control-Allow-Origin', 'https://job-portal-client-ten-wheat.vercel.app'); // Crucial line
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
        res.json({success: true, jobs})
    } catch (err) {
        res.json({success: false, message: err.message})
    }
}

//Get a sing job by  ID
export const getJobById = async (req, res) => {
    try {
        const {id} = req.params
        const job = await Job.findById(id).populate({
            path: 'companyId', select: '-password'
        })
        if (!job){
            return res.json({
                success: false,
                message: "Job not found"
            })
        }
        res.json({success: true,job})
    } catch (err) {
        res.json({success: false, message: err.message})
    }
}