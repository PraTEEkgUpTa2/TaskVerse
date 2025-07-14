import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { DotMap } from "@/components/ui/travel-connect-signin-1";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  
  const navigate = useNavigate();

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    if (name === "avatar") setAvatar(files[0]);
    if (name === "coverImage") setCoverImage(files[0]);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref) {
    setReferralCode(ref);

    axios.post("/api/v1/users/track", { referralCode: ref });
  }
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if(avatar) data.append("avatar", avatar);
    if(coverImage) data.append("coverImage", coverImage);
    if (referralCode) data.append("referralCode", referralCode);

    try {
      const res = await axios.post("api/v1/users/register", data);
      if (res.status === 201) {
        alert("Registration successful!");
        // Redirect to login page or home page
        navigate("/login");

      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
    
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl overflow-hidden rounded-2xl flex bg-white dark:bg-gray-800 shadow-xl"
      >
        {/* Left side - Map */}
        <div className="hidden lg:block w-1/2 h-[700px] relative overflow-hidden border-r border-gray-100 dark:border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-indigo-900">
            <DotMap />
            
            {/* Logo and text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-6"
              >
                <Link to="/" className="inline-block">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                      <img 
                        alt="TaskVerse logo" 
                        src="https://i.ibb.co/F4JFprqJ/logo-1-removebg-preview.png" 
                        className="w-8 h-8"
                      />
                    </div>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      TaskVerse
                    </span>
                  </div>
                </Link>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
              >
                Join TaskVerse
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-sm text-center text-gray-600 dark:text-gray-300 max-w-xs"
              >
                Connect with thousands of productive users worldwide and take your productivity to the next level
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 max-h-[700px] flex flex-col justify-center">
        <div className="p-8 md:p-10 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-6">
              <Link to="/" className="inline-block">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <img 
                      alt="TaskVerse logo" 
                      src="https://i.ibb.co/F4JFprqJ/logo-1-removebg-preview.png" 
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskVerse</span>
                </div>
              </Link>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800 dark:text-white">Create Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Join thousands of productive users today</p>
            
            {/* Google Signup */}
            <div className="mb-6">
              <button 
                className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 text-gray-700 dark:text-gray-200 shadow-sm"
                onClick={() => console.log("Google sign-up")}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fillOpacity=".54"
                  />
                  <path
                    fill="#4285F4"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#34A853"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="#EA4335" d="M1 1h22v22H1z" fillOpacity="0" />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username <span className="text-blue-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>
                
              
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-blue-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password <span className="text-blue-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-3 py-2 pr-10 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
             
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Avatar 
                </label>
                <input
                  id="avatar"
                  type="file" name="avatar" onChange={handleFileChange} accept="image/*"
                                    
                  className="flex h-10 w-full rounded-md border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Image
                </label>
                <input
                  id="cover-image"
                  type="file" name="coverImage" onChange={handleFileChange} accept="image/*"
                  placeholder="john@example.com"
                  
                  className="flex h-10 w-full rounded-md border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 rounded border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700" 
                  required 
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="pt-2"
              >
                <button
                  type="submit"
                  className={`w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg transition-all duration-300 font-semibold ${
                    isHovered ? "shadow-lg shadow-blue-200" : ""
                  }`}
                >
                  <span className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  {isHovered && (
                    <motion.span
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ filter: "blur(8px)" }}
                    />
                  )}
                </button>
              </motion.div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
