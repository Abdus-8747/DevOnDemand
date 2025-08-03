import React, { useState } from 'react';
import OTPModal from './OTPModal';
import { Send, CheckCircle, User, Mail, Phone, GraduationCap, FileText } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isStudent: false,
    collegeName: '',
    projectDescription: '',
    budget: '' // <-- Add budget field
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.isStudent && !formData.collegeName.trim()) newErrors.collegeName = 'College name is required for students';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    else if (formData.projectDescription.length < 50) newErrors.projectDescription = 'Please provide at least 50 characters for your project description';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) newErrors.budget = 'Budget must be a positive number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          projectIdea: formData.projectDescription,
          budget: Number(formData.budget), // <-- Add budget to payload
          isStudent: formData.isStudent,
          collegeName: formData.isStudent ? formData.collegeName : undefined,
        };
        const res = await axiosInstance.post('/user/submit', payload);
        if (res.data && res.data.success) {
          setShowOtpModal(true);
        } else {
          alert(res.data?.message || 'Failed to submit. Please try again.');
        }
      } catch (err: any) {
        alert(err?.response?.data?.message || 'Failed to submit. Please try again.');
      }
    }
  };

  const handleOtpVerify = async (otp: string) => {
    setIsVerifying(true);
    setOtpError(null);
    try {
      const res = await axiosInstance.post('/user/verify-otp', {
        email: formData.email,
        otp,
      });
      if (res.data && res.data.success) {
        setShowOtpModal(false);
        setIsSubmitted(true);
      } else {
        setOtpError(res.data?.message || 'Invalid OTP. Please try again.');
      }
    } catch (err: any) {
      setOtpError(err?.response?.data?.message || 'Invalid OTP. Please try again.');
    }
    setIsVerifying(false);
  };

  const handleResendOtp = async () => {
    setOtpError(null);
    try {
      const res = await axiosInstance.post('/user/resend-otp', {
        email: formData.email,
      });
      if (res.data && res.data.success) {
        setOtpError('A new OTP has been sent to your email.');
      } else {
        setOtpError(res.data?.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      setOtpError(err?.response?.data?.message || 'Failed to resend OTP.');
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (showOtpModal) {
    return (
      <OTPModal
        email={formData.email}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
        error={otpError || undefined}
        isVerifying={isVerifying}
        onResend={handleResendOtp}
      />
    );
  }

  if (isSubmitted) {
    return (
      <section id="submission-form" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-50 rounded-2xl p-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your project submission has been received and verified successfully. Our team will review your request and get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  isStudent: false,
                  collegeName: '',
                  projectDescription: '',
                  budget: ''
                });
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Submit Another Project
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    
    <section id="submission-form" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Submit Your Project
          </h2>
          <p className="text-lg text-gray-600">
            Ready to bring your idea to life? Fill out the form below and we'll get started on your project.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-green-50 dark:bg-green-950 rounded-2xl p-8 shadow-lg border border-green-100 dark:border-green-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-green-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-green-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
          
          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-green-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          {/* Student Status */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isStudent"
                name="isStudent"
                checked={formData.isStudent}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
              />
              <label htmlFor="isStudent" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <GraduationCap className="h-4 w-4" />
                <span>I am currently a student</span>
              </label>
            </div>
          </div>

          
          
          {/* College Name (conditional) */}
          {formData.isStudent && (
            <div className="mb-6">
              <label htmlFor="collegeName" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                <GraduationCap className="h-4 w-4" />
                <span>College/University Name</span>
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.collegeName ? 'border-red-500 bg-red-50' : 'border-green-300'
                }`}
                placeholder="Enter your college or university name"
              />
              {errors.collegeName && <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>}
            </div>
          )}
          
          {/* Project Description */}
          <div className="mb-8">
            <label htmlFor="projectDescription" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="h-4 w-4" />
              <span>Project Description</span>
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none ${
                errors.projectDescription ? 'border-red-500 bg-red-50' : 'border-green-300'
              }`}
              placeholder="Describe your project idea in detail. Include features, target audience, preferred technologies, timeline, and any specific requirements..."
            />
            <div className="flex justify-between items-center mt-2">
              {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription}</p>}
              <p className="text-gray-500 text-sm ml-auto">
                {formData.projectDescription.length}/500 characters
              </p>
            </div>
          </div>

          {/* Budget */}
          <div className="mb-8">
            <label htmlFor="budget" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
              <span>Estimated Budget (INR)</span>
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.budget ? 'border-red-500 bg-red-50' : 'border-green-300'
              }`}
              placeholder="Enter your estimated budget"
              min="1"
              step="any"
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Submit Project Request</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmissionForm;