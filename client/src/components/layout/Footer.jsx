import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 cursor-pointer group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
                E
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">ShopNow</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your ultimate destination for premium products at unbeatable prices. Shop smart, live better.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-wide uppercase text-sm">Shop</h3>
            <ul className="space-y-3">
              {['All Products', 'Categories', 'Featured', 'New Arrivals'].map((item) => (
                <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-wide uppercase text-sm">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Track Order', 'Returns', 'Contact Us'].map((item) => (
                <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-wide uppercase text-sm">Newsletter</h3>
            <p className="text-sm text-slate-500 mb-3">Subscribe for exclusive offers.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" />
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">© 2024 ShopNow. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {['Twitter', 'Facebook', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-sm text-slate-400 hover:text-primary-600 transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
