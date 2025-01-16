import express from "express";
import {
    changeJobApplicationsStatus, changeVisibility,
    getCompanyData,
    getCompanyJobApplicants, getCompanyPostedJobs,
    loginCompany,
    postJob,
    registerCompany
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import {protectCompany} from "../middleware/authMiddleware.js";

const router = express.Router();

//Register a company
router.post('/register',upload.single('image'),registerCompany)

//Company login
router.post('/login',loginCompany)

//Get company data
router.get('/company',protectCompany,getCompanyData)

//Post a job
router.post('/post-job',protectCompany,postJob)

//Get Applicants data
router.get('/applicants',protectCompany,getCompanyJobApplicants)

// Get job lists
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

// Change Application Status
router.post('/change-status',protectCompany,changeJobApplicationsStatus)

// Change applications visibility
router.post('/change-visibility',protectCompany,changeVisibility)

export default router;

