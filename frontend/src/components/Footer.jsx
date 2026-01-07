import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
        
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Flowyy.</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Redefining the digital shopping experience with seamless flow and curated quality.
            </p>
            <div className="flex space-x-5">
              <Instagram size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={20} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>


          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Journal</a></li>
              <li><a href="/sustainability" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-white font-semibold mb-6">Stay in Flow</h3>
            <p className="text-sm mb-4">Subscribe to get special offers and first looks.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-3 px-5 pr-12 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-1.5 rounded-full hover:bg-slate-200 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

 
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-500">
            © {currentYear} Flowyy Ecommerce Platform. Built for the modern web.
          </div>
          

          <div className="flex items-center space-x-4 opacity-60 grayscale">
            <span className="text-[10px] font-bold tracking-widest uppercase">Visa</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Mastercard</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Stripe</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;