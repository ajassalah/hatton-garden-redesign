'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Gem, 
  Coffee, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Gem, label: 'Jewellers', href: '/admin/dashboard/jewellers' },
    { icon: Coffee, label: 'Cafes & Dining', href: '/admin/dashboard/cafes' },
    { icon: FileText, label: 'Blog Posts', href: '/admin/dashboard/blog' },
    { icon: ShoppingBag, label: 'Categories', href: '/admin/dashboard/shop-categories' },
    { icon: Users, label: 'Users', href: '/admin/dashboard/users' },
    { icon: Settings, label: 'Settings', href: '/admin/dashboard/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-sm">Hatton Garden Admin</span>
        </div>
        <button onClick={toggleSidebar} className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Backdrop (Mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/10 z-[70] transition-transform duration-300 transform
        lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10 hidden lg:flex">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Gem className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold tracking-tight">Hatton Garden</h2>
              <p className="text-purple-400/60 text-[10px] font-black uppercase tracking-widest">Enterprise Portal</p>
            </div>
          </div>

          <nav className="space-y-1.5 flex-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'group-hover:text-white transition-colors'}`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_purple]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/5 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm uppercase tracking-widest">System Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
