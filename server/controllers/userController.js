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
    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {
        // Fix: Use an object with the correct filter
        const isAlreadyApplied = await JobApplication.find({ jobId, userId });
        
        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Job already Applied" });
        }

        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.json({ success: false, message: "Job not found" });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now(),
        });

        res.json({ success: true, message: 'Applied Successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth.userId;

        // Corrected the query to filter by `userId`
        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image') // Populate company details
            .populate('jobId', 'title description location category level salary') // Populate job details
            .exec();

        if (!applications || applications.length === 0) {
            return res.json({ success: false, message: "No applications found" });
        }

        return res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile =req.file
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
