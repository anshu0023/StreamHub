import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-6 text-xl">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
      </div>

      {/* Footer Links */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center sm:text-left text-sm">
        <div className="space-y-2">
          <p>Audio Description</p>
          <p>Investor Relations</p>
          <p>Legal Notices</p>
        </div>
        <div className="space-y-2">
          <p>Help Centre</p>
          <p>Jobs</p>
          <p>Cookie Preferences</p>
        </div>
        <div className="space-y-2">
          <p>Gift Cards</p>
          <p>Terms of Use</p>
          <p>Corporate Information</p>
        </div>
        <div className="space-y-2">
          <p>Media Centre</p>
          <p>Privacy</p>
          <p>Contact Us</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-base">
        Made with ❤️ © 2025 StreamHub
      </div>
    </footer>
  );
};

export default Footer;
