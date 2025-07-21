const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'mission-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// @route   POST /api/missions
// @desc    Create a new mission
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { missionTitle, shortDescription, date, time, place, fullDescription } = req.body;

    // Validate required fields
    if (!missionTitle || !shortDescription || !date || !place || !fullDescription) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    // Create mission object
    const missionData = {
      missionTitle,
      shortDescription,
      date,
      place,
      fullDescription
    };

    // Add optional fields
    if (time) missionData.time = time;
    if (req.file) missionData.image = req.file.path;

    // Create and save mission
    const mission = new Mission(missionData);
    const savedMission = await mission.save();

    res.status(201).json({
      success: true,
      message: 'Mission created successfully',
      data: savedMission
    });
  } catch (error) {
    console.error('Error creating mission:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating mission',
      error: error.message
    });
  }
});

// @route   GET /api/missions
// @desc    Get all missions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions
    });
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching missions',
      error: error.message
    });
  }
});

// @route   GET /api/missions/:id
// @desc    Get single mission by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mission
    });
  } catch (error) {
    console.error('Error fetching mission:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mission',
      error: error.message
    });
  }
});

// @route   PUT /api/missions/:id
// @desc    Update mission
// @access  Public
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { missionTitle, shortDescription, date, time, place, fullDescription } = req.body;

    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Update fields
    mission.missionTitle = missionTitle || mission.missionTitle;
    mission.shortDescription = shortDescription || mission.shortDescription;
    mission.date = date || mission.date;
    mission.time = time !== undefined ? time : mission.time;
    mission.place = place || mission.place;
    mission.fullDescription = fullDescription || mission.fullDescription;

    if (req.file) {
      mission.image = req.file.path;
    }

    const updatedMission = await mission.save();

    res.status(200).json({
      success: true,
      message: 'Mission updated successfully',
      data: updatedMission
    });
  } catch (error) {
    console.error('Error updating mission:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating mission',
      error: error.message
    });
  }
});

// @route   DELETE /api/missions/:id
// @desc    Delete mission
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    await Mission.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Mission deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting mission:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting mission',
      error: error.message
    });
  }
});

module.exports = router;