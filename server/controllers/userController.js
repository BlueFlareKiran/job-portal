import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import {v2 as cloudinay} from "cloudinary";

// Get user data
export const getUserData = async (req, res) => {
    const userId = req.auth.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({success: false, message: "User does not exist"});
        }
        res.json({success: true, user});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Apply for a JOb
export const applyForJob = async (req, res) => {
    const {jobId} = req.body;
    const userId = req.auth.userId;
    try {
        const isAleradyApplied = await JobApplication.find(jobId, userId);
        if (!isAleradyApplied.length > 0) {
            return res.json({success: false, message: "Job already Applied"});
        }
        const jobData = await Job.findById(jobId)
        if (!jobData) {
            return res.json({success: false, message: "Job not found"});
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now(),
        })
        res.json({success: true, message: 'Applied Successfully'});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const application = await JobApplication.find(userId).populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary').exec()
        if (!application) {
            return res.json({success: false, message: "Application not found"});
        }
        return res.json({success: true, application});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile =req.resumeFile
        const userData=await User.findById(userId)
        if (resumeFile) {
            const resumeUpload= await cloudinay.uploader.upload(resumeFile.path)
            userData.resume=resumeUpload.secure_url;
        }
        await userData.save()
        return res.json({success: true, message: 'Successfully Updated Resume'});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
