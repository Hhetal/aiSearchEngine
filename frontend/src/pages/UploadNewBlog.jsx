

import React, { useState, useRef } from 'react';
import Navbar2 from '../componennts/navbar2';
import uploadIMG from '../images/Upload-PNG-Image-File.png';
import rightImg from "../images/upload.png";
import '../App.css';
import JoditEditor from 'jodit-pro-react';
import { useNavigate } from 'react-router-dom';

const UploadNewBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [link, setLink] = useState('');
  const [type, setType] = useState('');
  const [priceType, setPriceType] = useState('free');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  // New function to compress images
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for image compression
          const canvas = document.createElement('canvas');
          
          // Calculate new dimensions (max width/height of 800px)
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
          
          if (width > height && width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress the image
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the compressed data URL (reduce quality to 0.7 or 70%)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Updated image change handler with compression
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a GIF (don't compress GIFs as they lose animation)
      if (file.type === 'image/gif') {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // For other image types, compress them
        try {
          const compressedImage = await compressImage(file);
          setImage(null); // We're not using the file anymore
          setPreview(compressedImage);
        } catch (error) {
          console.error("Error compressing image:", error);
          // Fallback to original method if compression fails
          setImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  // Updated submit handler with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const title = e.target[0].value;
    const description = e.target[1].value;
    
    // Check if content is too large before sending
    const contentSize = new Blob([content]).size;
    const imageSize = preview ? new Blob([preview]).size : 0;
    const totalSize = contentSize + imageSize;
    
    // If total size is greater than ~9MB (adjusted for other fields)
    if (totalSize > 9 * 1024 * 1024) {
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMessage.textContent = 'Content too large! Please use smaller images or reduce content size.';
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
      
      setIsSubmitting(false);
      return;
    }

    const blogData = {
      title,
      description,
      content,
      imageUrl: preview,
      link,
      type,
      priceType,
      createdAt: new Date().toISOString(),
      rating: Number(rating),
      review,
    };

    try {
      const response = await fetch('http://localhost:3000/api/ai-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        let errorMessage = "Error uploading blog. Please try again.";
        
        if (response.status === 413) {
          errorMessage = "Content too large! Please use smaller images or reduce content size.";
        }
        
        throw new Error(errorMessage);
      }

      // Show success message with animation
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50';
      successMessage.textContent = 'Blog uploaded successfully!';
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
      
      // Reset form
      e.target.reset();
      setContent('');
      setPreview(null);
      setLink('');
      setType('');
      setPriceType('free');
      setRating(0);
      setReview('');

      // Navigate back after successful upload
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Error uploading blog:', error);
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMessage.textContent = error.message === "Failed to fetch" 
        ? "Unable to connect to server. Please make sure the backend server is running on port 3000."
        : error.message;
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBack}
            className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center space-x-2 group"
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Form Section */}
              <div className="flex-1 p-6 lg:p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Upload New Blog</h3>
                  <p className="mt-1 text-sm text-gray-600">Share your AI tool or resource with the community</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Form fields remain the same, just adjusting some spacing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter a catchy title"
                        required
                      />
                    </div>

                    {/* Website Link */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website Link
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="https://example.com"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Describe your AI tool or resource"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tool Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select type</option>
                        <option value="image">Image</option>
                        <option value="text">Text</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="business">Business</option>
                        <option value="code">Code</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Price Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price Type
                      </label>
                      <div className="flex space-x-6 mt-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="priceType"
                            value="free"
                            checked={priceType === 'free'}
                            onChange={() => setPriceType('free')}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Free</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="priceType"
                            value="paid"
                            checked={priceType === 'paid'}
                            onChange={() => setPriceType('paid')}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Paid</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rating Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-xl ${
                              rating >= star ? 'text-yellow-400' : 'text-gray-300'
                            } hover:text-yellow-400 focus:outline-none transition-colors`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-xs text-gray-600">
                          ({rating} out of 5)
                        </span>
                      </div>
                    </div>

                    {/* Review Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Review
                      </label>
                      <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Share your experience..."
                        rows="2"
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload with reduced height */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tool Image or GIF
                    </label>
                    <div 
                      className="mt-1 flex justify-center px-4 pt-3 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
                      style={{ minHeight: '200px' }}
                    >
                      <div className="space-y-1 text-center">
                        <input
                          type="file"
                          id="realInput"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*,.gif"
                        />
                        {preview ? (
                          <div className="relative group">
                            <img
                              src={preview}
                              alt="Preview"
                              className="mx-auto rounded-lg shadow-lg"
                              style={{ maxHeight: '180px', width: 'auto', objectFit: 'contain' }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => document.getElementById('realInput').click()}
                                className="px-3 py-1 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm"
                              >
                                Change Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => document.getElementById('realInput').click()}
                            className="flex flex-col items-center justify-center h-40"
                          >
                            <div className="relative">
                              <img
                                src={uploadIMG}
                                alt="Upload"
                                className="mx-auto h-20 w-auto animate-bounce"
                                style={{ animationDuration: '2s' }}
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-700">
                              Drop your image here, or click to select
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, JPEG, or GIF up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Editor with reduced height */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Content
                    </label>
                    <div className="h-48">
                      <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onChange={(newContent) => setContent(newContent)}
                        className="border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        'Upload Blog'
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Image Section */}
              <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-50 to-gray-50 items-center justify-center p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/30 rounded-full filter blur-3xl"></div>
                  <img
                    src={rightImg}
                    alt="Upload Illustration"
                    className="relative w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadNewBlog;