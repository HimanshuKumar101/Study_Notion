const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");


exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // Validate the subsection exists
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ 
        success: false, 
        message: "Subsection not found" 
      });
    }

    // Verify course exists and the user is enrolled
    const course = await Course.findById(courseId).select("studentsEnrolled");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    if (!course.studentsEnrolled.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "You must enroll in this course first",
        enrollmentRequired: true
      });
    }

    // Check for existing course progress
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });
    
    console.log("New Progress Created:", courseProgress);

    if (!courseProgress) {
      // First-time progress entry
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [subsectionId],
      });

      return res.status(200).json({ 
        success: true, 
        message: "Progress started" 
      });
    }

    // Add the subsection if not already completed
    if (!courseProgress.completedVideos.includes(subsectionId)) {
      courseProgress.completedVideos.push(subsectionId);
      await courseProgress.save();
      return res.status(200).json({ 
        success: true, 
        message: "Progress updated" 
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: "Already completed" 
      });
    }

  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};


exports.getProgressPercentage = async (req, res) => {
  const { courseId } = req.body
  const userId = req.user.id

  if (!courseId) {
    return res.status(400).json({ error: "Course ID not provided." })
  }


   
  try {
    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
      .populate({
        path: "courseID",
        populate: {
          path: "courseContent",
        },
      })
      .exec()

    if (!courseProgress) {
      return res
        .status(400)
        .json({ error: "Can not find Course Progress with these IDs." })
    }
    console.log(courseProgress, userId)
    let lectures = 0
    courseProgress.courseID.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })

    let progressPercentage =
      (courseProgress.completedVideos.length / lectures) * 100

    // To make it up to 2 decimal point
    const multiplier = Math.pow(10, 2)
    progressPercentage =
      Math.round(progressPercentage * multiplier) / multiplier

    return res.status(200).json({
      data: progressPercentage,
      message: "Succesfully fetched Course progress",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
