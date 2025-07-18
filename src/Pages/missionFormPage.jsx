"use client"

import { useState } from "react"
import "../styles/missionForm.css"

const MissionFormPage = () => {
  const [formData, setFormData] = useState({
    missionTitle: "",
    shortDescription: "",
    date: "",
    time: "",
    place: "",
    fullDescription: "",
    image: null,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.missionTitle.trim()) {
      newErrors.missionTitle = "Mission title is required"
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.place.trim()) {
      newErrors.place = "Location is required"
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = "Full description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleInputChange("image", file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success modal
      setShowSuccessModal(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
        setFormData({
          missionTitle: "",
          shortDescription: "",
          date: "",
          time: "",
          place: "",
          fullDescription: "",
          image: null,
        })
        // Reset file input
        const fileInput = document.getElementById("image-upload")
        if (fileInput) fileInput.value = ""
      }, 3000)
    } catch (error) {
      console.error("Error submitting mission:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="mission-form-container">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="web-overlay"></div>
        <div className="logo-background"></div>
      </div>

      {/* Header */}
      <div className="form-header">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </div>
        <h1 className="form-title">NEW MISSION LOG</h1>
        <p className="form-subtitle">Document your latest mission for the Web-Crawler Database</p>
        <div className="title-divider"></div>
      </div>

      {/* Form Card */}
      <div className="form-card">
        <div className="card-header">
          <div className="card-icon">M</div>
          <h2>Mission Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="mission-form">
          {/* Mission Title */}
          <div className="form-group">
            <label htmlFor="missionTitle" className="form-label">
              <span className="label-icon">📝</span>
              Mission Title *
            </label>
            <input
              type="text"
              id="missionTitle"
              value={formData.missionTitle}
              onChange={(e) => handleInputChange("missionTitle", e.target.value)}
              placeholder="e.g., Night Patrol"
              className={`form-input ${errors.missionTitle ? "error" : ""}`}
            />
            {errors.missionTitle && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errors.missionTitle}
              </div>
            )}
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label htmlFor="shortDescription" className="form-label">
              <span className="label-icon">📄</span>
              Short Description *
            </label>
            <input
              type="text"
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              placeholder="Brief mission summary (1-2 lines)"
              className={`form-input ${errors.shortDescription ? "error" : ""}`}
            />
            {errors.shortDescription && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errors.shortDescription}
              </div>
            )}
          </div>

          {/* Date and Time Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                <span className="label-icon">📅</span>
                Date *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={`form-input ${errors.date ? "error" : ""}`}
              />
              {errors.date && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.date}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time" className="form-label">
                <span className="label-icon">🕐</span>
                Time (Optional)
              </label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Place */}
          <div className="form-group">
            <label htmlFor="place" className="form-label">
              <span className="label-icon">📍</span>
              Location *
            </label>
            <input
              type="text"
              id="place"
              value={formData.place}
              onChange={(e) => handleInputChange("place", e.target.value)}
              placeholder="e.g., Queens Rooftop"
              className={`form-input ${errors.place ? "error" : ""}`}
            />
            {errors.place && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errors.place}
              </div>
            )}
          </div>

          {/* Full Description */}
          <div className="form-group">
            <label htmlFor="fullDescription" className="form-label">
              <span className="label-icon">📋</span>
              Full Mission Report *
            </label>
            <textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => handleInputChange("fullDescription", e.target.value)}
              placeholder="Detailed mission story and outcomes..."
              rows="6"
              className={`form-textarea ${errors.fullDescription ? "error" : ""}`}
            />
            {errors.fullDescription && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errors.fullDescription}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image-upload" className="form-label">
              <span className="label-icon">📷</span>
              Mission Photo (Optional)
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="image-upload" className="file-upload-label">
                <div className="upload-icon">📤</div>
                <span className="upload-text">
                  {formData.image ? formData.image.name : "Click to upload mission photo"}
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit">
            <button type="submit" disabled={isSubmitting} className={`submit-button ${isSubmitting ? "loading" : ""}`}>
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Logging Mission...
                </>
              ) : (
                <>
                  <span className="button-icon">✅</span>
                  Log Mission
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h3 className="modal-title">Mission Logged Successfully!</h3>
            <p className="modal-message">
              Your mission has been added to the Web-Crawler Database. Great work, Spider-Man!
            </p>
            <button onClick={closeModal} className="modal-close-button">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MissionFormPage
