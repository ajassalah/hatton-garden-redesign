# 🚀 Quick Start Guide - Admin Dashboard

## Step 1: Environment Setup

1. Make sure you have the `.env` file in the root directory with these values:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_USER=londonhattongarden@gmail.com
EMAIL_PASS=your_app_password_here
```

## Step 2: Start the Development Server

The server should already be running. If not, run:

```bash
npm run dev
```

## Step 3: Access the Admin Dashboard

1. Open your browser and go to: **http://localhost:3000/admin**

2. Login with default credentials:
   - **Username:** `admin`
   - **Password:** `changeme123`

## Step 4: Explore the Dashboard

After logging in, you'll see:

### 📊 Dashboard Overview
- Statistics about jewellers, cafes, views, and ratings
- Quick action buttons
- Navigation sidebar

### 💎 Manage Jewellers
- Click "Manage Jewellers" or navigate to `/admin/dashboard/jewellers`
- View all jeweller listings
- Search and filter by category
- Edit or delete jewellers (UI ready, backend connected)

### ☕ Manage Cafes
- Click "Manage Cafes" or navigate to `/admin/dashboard/cafes`
- View all cafe and restaurant listings
- Search and filter by type
- Edit or delete venues (UI ready, backend connected)

## 📁 What's Been Created

### Backend API Routes
- ✅ `/api/admin/login` - Authentication
- ✅ `/api/admin/verify` - Token verification
- ✅ `/api/admin/jewellers` - CRUD for jewellers
- ✅ `/api/admin/jewellers/[slug]` - Single jeweller operations
- ✅ `/api/admin/cafes` - CRUD for cafes

### Admin Pages
- ✅ `/admin` - Login page
- ✅ `/admin/dashboard` - Main dashboard
- ✅ `/admin/dashboard/jewellers` - Jewellers management
- ✅ `/admin/dashboard/cafes` - Cafes management

### Security Features
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes
- ✅ Token-based sessions

## 🎨 Design Features

The dashboard includes:
- **Glassmorphism UI** - Modern frosted glass effects
- **Gradient backgrounds** - Beautiful purple/pink gradients
- **Smooth animations** - Hover effects and transitions
- **Responsive design** - Works on all screen sizes
- **Dark theme** - Easy on the eyes

## 🔒 Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. **Change default password** in `.env`:
   ```env
   ADMIN_PASSWORD=your_secure_password_here
   ```

2. **Use a strong JWT secret** (at least 32 characters):
   ```env
   JWT_SECRET=your-very-long-and-random-secret-key-here
   ```

3. **Never commit `.env`** to version control (already in .gitignore)

## 🔄 Next Steps for Development

### Current Status: ✅ Phase 1 Complete
- Authentication system working
- Dashboard UI complete
- Jewellers & Cafes listing working
- API routes functional

### To Implement Next:
1. **Add/Edit Forms** - Create forms to add/edit jewellers and cafes
2. **Image Upload** - Implement image upload functionality
3. **Database Integration** - Connect to a real database (PostgreSQL, MongoDB, etc.)
4. **Blog Management** - Create blog post editor
5. **User Roles** - Add different permission levels

## 📝 API Testing

You can test the API using tools like Postman or curl:

### Login Example:
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"changeme123"}'
```

### Get Jewellers (with token):
```bash
curl http://localhost:3000/api/admin/jewellers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🐛 Troubleshooting

### Can't login?
- Check `.env` file exists and has correct credentials
- Make sure server is running (`npm run dev`)
- Clear browser cache and try again

### API not working?
- Check browser console for errors
- Verify token is being sent in requests
- Check server terminal for error messages

### Styling issues?
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

## 📚 Documentation

For detailed documentation, see:
- **BACKEND_README.md** - Complete backend documentation
- **README.md** - General project information

## 🎯 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ Complete | JWT-based login system |
| Dashboard | ✅ Complete | Overview with stats |
| Jewellers List | ✅ Complete | View and filter jewellers |
| Cafes List | ✅ Complete | View and filter cafes |
| Add/Edit Forms | 🚧 Next | Create/update entries |
| Image Upload | 🚧 Next | Upload images |
| Database | 🚧 Next | Persistent storage |
| Blog Posts | 📋 Planned | Content management |
| Analytics | 📋 Planned | Traffic insights |

## 💡 Tips

1. **Keep the dev server running** - It auto-reloads on changes
2. **Use the search** - Filter jewellers/cafes quickly
3. **Check the API** - All endpoints are documented in BACKEND_README.md
4. **Customize colors** - Edit Tailwind classes to match your brand

---

**Ready to develop?** Start by exploring the dashboard at http://localhost:3000/admin

Need help? Check the documentation or contact the development team.
