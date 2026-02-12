'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gem, 
  Coffee, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  TrendingUp,
  Eye,
  Star,
  Tags,
  ShoppingBag
} from 'lucide-react';

interface DashboardStats {
  jewellers: number;
  cafes: number;
  blogPosts: number;
  users: number;
  totalViews: number;
  avgRating: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    jewellers: 0,
    cafes: 0,
    blogPosts: 0,
    users: 0,
    totalViews: 0,
    avgRating: 0
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        const response = await fetch('/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('admin_token');
          router.push('/admin');
          return;
        }

        // Fetch stats
        await fetchStats(token);
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/admin');
      }
    };

    verifyAuth();
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const [jewellersRes, cafesRes, blogRes, usersRes] = await Promise.all([
        fetch('/api/admin/jewellers', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/cafes', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/blog', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const jewellersData = await jewellersRes.json();
      const cafesData = await cafesRes.json();
      const blogData = await blogRes.json();
      const usersData = await usersRes.json();

      const totalBlogViews = (blogData.data || []).reduce((sum: number, p: any) => sum + (p.views || 0), 0);
      const totalViews = 12547 + totalBlogViews; // Using base mock + real blog views for now

      setStats({
        jewellers: jewellersData.total || 0,
        cafes: cafesData.total || 0,
        blogPosts: blogData.total || 0,
        users: usersData.total || 0,
        totalViews: totalViews,
        avgRating: 4.7
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: Gem, label: 'Jewellers', href: '/admin/dashboard/jewellers', active: false },
    { icon: Coffee, label: 'Cafes & Dining', href: '/admin/dashboard/cafes', active: false },
    { icon: FileText, label: 'Blog Posts', href: '/admin/dashboard/blog', active: false },
    { icon: ShoppingBag, label: 'Categories', href: '/admin/dashboard/shop-categories', active: false },
    { icon: Users, label: 'Users', href: '/admin/dashboard/users', active: false },
    { icon: Settings, label: 'Settings', href: '/admin/dashboard/settings', active: false },
  ];

  const statCards = [
    { 
      icon: Gem, 
      label: 'Total Jewellers', 
      value: stats.jewellers, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400'
    },
    { 
      icon: Coffee, 
      label: 'Cafes & Restaurants', 
      value: stats.cafes, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400'
    },
    { 
      icon: FileText, 
      label: 'Blog Posts', 
      value: stats.blogPosts, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400'
    },
    { 
      icon: Eye, 
      label: 'Total Views', 
      value: stats.totalViews.toLocaleString(), 
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-black/30 backdrop-blur-xl border-r border-white/10">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold">Hatton Garden</h2>
                <p className="text-gray-400 text-xs">Admin Panel</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
              <p className="text-gray-400">Welcome back! Here's what's happening with your site.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                  <div className="relative">
                    <div className={`inline-flex p-3 ${stat.bgColor} rounded-xl mb-4`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="/admin/dashboard/jewellers"
                  className="flex items-center gap-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Gem className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Manage Jewellers</h3>
                    <p className="text-gray-400 text-sm">Add or edit jeweller listings</p>
                  </div>
                </a>

                <a
                  href="/admin/dashboard/cafes"
                  className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl hover:bg-orange-500/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Coffee className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Manage Cafes</h3>
                    <p className="text-gray-400 text-sm">Update dining options</p>
                  </div>
                </a>

                <a
                  href="/admin/dashboard/blog"
                  className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Manage Blog</h3>
                    <p className="text-gray-400 text-sm">Share news and updates</p>
                  </div>
                </a>

                <a
                  href="/admin/dashboard/shop-categories"
                  className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-all group"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Categories</h3>
                    <p className="text-gray-400 text-sm">Update public shop page</p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
