import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 relative bottom-0 w-full mt-auto">
    <div className="mx-auto flex justify-between items-center">
        <div>
            <p className="font-semibold text-lg">Contact Us</p>
            <p>Email: info@example.com</p>
            <p>Phone: +91 123 456 7890</p>
        </div>
        <div>
            <p className="font-semibold text-lg">Follow Us</p>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>
        </div>
    </div>
    <div className="mt-4 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
</footer>

  )
}

export default Footer