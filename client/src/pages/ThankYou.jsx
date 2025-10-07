
import { CheckCircle, Phone, Mail, } from 'lucide-react';

const Thankyou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon with Animation */}


        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
          {/* Brand Name */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 tracking-tight">
              Yousuf Engineering
            </h1>
            <p className="text-gray-500 text-sm">Climate Control Solutions</p>
          </div>

          {/* Thank You Message */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <CheckCircle className="w-24 h-24 text-green-500 relative animate-bounce" strokeWidth={2} />
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We&apos;ve received your information successfully. Our team will review your inquiry and get back to you within 24 hours.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Contact Information */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Need Immediate Assistance?
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <a
                href="tel:01714028279"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 group"
              >
                <div className="bg-blue-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Call Us</p>
                  <p className="text-blue-600 font-semibold">01714-028-279</p>
                </div>
              </a>


              <a
                href="mailto:yousufengineering2024@gmai.com"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group"
              >
                <div className="bg-green-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email Us</p>
                  <p className="text-green-600 font-semibold text-xs">yousufengineering2024@gmai.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = '/shop'}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Back to Shop
            </button>
            <button
              onClick={() => window.location.href = '/gallery'}
              className="flex-1 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              View Services
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Trusted by leading businesses across Bangladesh
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            🌟 We appreciate your interest in Yousuf Engineering
          </p>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;