import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Send, CheckCircle, User, Mail, Phone, GraduationCap, FileText, ArrowLeft, Sparkles, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OTPModal from './OTPModal';

const SubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isStudent: false,
    collegeName: '',
    projectDescription: '',
    budget: '' // <-- Add this line
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
          budget: Number(formData.budget), // <-- Add this line
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
  // ...existing code...

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-black dark:via-gray-900 dark:to-green-900/40 py-20 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 dark:bg-green-950/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-green-200 dark:border-green-700">
            <div className="relative mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-bounce-slow" />
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse-slow"></div>
            </div>
            <h2 className="text-4xl font-bold text-green-900 dark:text-green-200 mb-6">
              Thank You!
            </h2>
            <p className="text-xl text-green-800 dark:text-green-200 mb-8 leading-relaxed">
              Your project submission has been received successfully. Our team will review your request and get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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
                    budget: '' // <-- Add this line to reset budget
                  });
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Submit Another Project
              </button>
              <button
                onClick={() => navigate('/')}
                className="text-green-900 dark:text-green-200 px-8 py-4 rounded-xl font-semibold border-2 border-green-200 dark:border-green-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // OTP Modal
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-black dark:via-gray-900 dark:to-green-900/40 py-20 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-300/20 to-green-500/20 dark:from-green-800/10 dark:to-green-900/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/20 to-green-400/20 dark:from-green-900/10 dark:to-green-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-green-900 dark:text-green-200 hover:text-green-700 dark:hover:text-green-400 mb-8 group transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </button>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-900/70 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-6 animate-pulse-slow">
            <Sparkles className="h-4 w-4 text-green-500 dark:text-green-300" />
            <span>Let's Build Something Amazing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 dark:text-green-200 mb-6">
            Submit Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 dark:from-green-300 dark:to-green-500">
              Dream Project
            </span>
          </h1>
          <p className="text-xl text-green-800 dark:text-green-200 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your idea to life? Fill out the form below and we'll get started on transforming your vision into reality.
          </p>
        </div>
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/50 dark:bg-green-950/50 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-green-800">
            <Zap className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Fast Response</h3>
            <p className="text-sm text-green-800 dark:text-green-200">Get a response within 24 hours</p>
          </div>
          <div className="text-center p-6 bg-white/50 dark:bg-green-950/50 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-green-800">
            <Target className="h-8 w-8 text-green-700 dark:text-green-300 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Custom Solutions</h3>
            <p className="text-sm text-green-800 dark:text-green-200">Tailored to your specific needs</p>
          </div>
          <div className="text-center p-6 bg-white/50 dark:bg-green-950/50 backdrop-blur-sm rounded-2xl border border-green-100 dark:border-green-800">
            <Sparkles className="h-8 w-8 text-green-700 dark:text-green-300 mx-auto mb-3" />
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Modern Tech</h3>
            <p className="text-sm text-green-800 dark:text-green-200">Latest frameworks and tools</p>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-green-950/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-green-200 dark:border-green-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 ${
                  errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-300 dark:border-green-600'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 ${
                  errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-300 dark:border-green-600'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
          </div>
          {/* Phone */}
          <div className="mb-8">
            <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 ${
                errors.phone ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-300 dark:border-green-600'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
          </div>
          {/* Student Status */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/50 rounded-xl">
              <input
                type="checkbox"
                id="isStudent"
                name="isStudent"
                checked={formData.isStudent}
                onChange={handleInputChange}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-green-300 dark:border-green-600 rounded"
              />
              <label htmlFor="isStudent" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200">
                <GraduationCap className="h-4 w-4" />
                <span>I am currently a student</span>
              </label>
            </div>
          </div>
          {/* College Name (conditional) */}
          {formData.isStudent && (
            <div className="mb-8 animate-fade-in">
              <label htmlFor="collegeName" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
                <GraduationCap className="h-4 w-4" />
                <span>College/University Name</span>
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 ${
                  errors.collegeName ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-300 dark:border-green-600'
                }`}
                placeholder="Enter your college or university name"
              />
              {errors.collegeName && <p className="text-red-500 text-sm mt-2">{errors.collegeName}</p>}
            </div>
          )}
          {/* Project Description */}
          <div className="mb-10">
            <label htmlFor="projectDescription" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
              <FileText className="h-4 w-4" />
              <span>Project Description</span>
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows={8}
              className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none bg-white dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 ${
                errors.projectDescription ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-300 dark:border-green-600'
              }`}
              placeholder="Describe your project idea in detail. Include features, target audience, preferred technologies, timeline, and any specific requirements..."
            />
            <div className="flex justify-between items-center mt-3">
              {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription}</p>}
              <p className="text-green-700 dark:text-green-300 text-sm ml-auto">
                {formData.projectDescription.length}/1000 characters
              </p>
            </div>
          </div>
          {/* Budget */}
          <div className="mb-10">
            <label htmlFor="budget" className="flex items-center space-x-2 text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
              <span>Estimated Budget (INR)</span>
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 ${
                errors.budget ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-300 dark:border-green-600'
              }`}
              placeholder="Enter your estimated budget"
              min="1"
              step="any"
            />
            {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget}</p>}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 px-8 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Send className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Submit Project Request</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionPage;