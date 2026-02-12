# Hatton Garden Admin Dashboard

A comprehensive backend and admin dashboard for managing the Hatton Garden website content.

## Features

### 🔐 Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Session management

### 📊 Dashboard
- Overview statistics
- Quick actions
- Real-time data
- Beautiful glassmorphism UI

### 💎 Content Management
- **Jewellers Management**
  - View all jewellers
  - Search and filter
  - Add/Edit/Delete jewellers
  - Category filtering
  
- **Cafes & Dining Management**
  - Manage cafe listings
  - Update information
  - Image management

- **Blog Management** (Coming soon)
  - Create blog posts
  - Rich text editor
  - Media uploads

### 🎨 Design
- Premium glassmorphism design
- Gradient backgrounds
- Smooth animations
- Responsive layout
- Dark theme

## Getting Started

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Email Configuration
EMAIL_USER=londonhattongarden@gmail.com
EMAIL_PASS=your_app_password_here

# Admin Dashboard
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database (for future use)
DATABASE_URL=

# Next Auth (for future implementation)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access Admin Dashboard

Navigate to: `http://localhost:3000/admin`

**Default Credentials:**
- Username: `admin`
- Password: `changeme123`

⚠️ **Important:** Change these credentials in production!

## API Routes

### Authentication

#### POST `/api/admin/login`
Login to admin dashboard
```json
{
  "username": "admin",
  "password": "changeme123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "username": "admin"
  }
}
```

#### GET `/api/admin/verify`
Verify authentication token
Headers: `Authorization: Bearer {token}`

### Jewellers

#### GET `/api/admin/jewellers`
Get all jewellers with optional filtering
- Query params: `category`, `search`

#### POST `/api/admin/jewellers`
Create new jeweller (requires auth)

#### GET `/api/admin/jewellers/[slug]`
Get single jeweller

#### PUT `/api/admin/jewellers/[slug]`
Update jeweller (requires auth)

#### DELETE `/api/admin/jewellers/[slug]`
Delete jeweller (requires auth)

### Cafes

#### GET `/api/admin/cafes`
Get all cafes with optional filtering

#### POST `/api/admin/cafes`
Create new cafe (requires auth)

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Login page
│   │   └── dashboard/
│   │       ├── page.tsx          # Main dashboard
│   │       ├── jewellers/
│   │       │   └── page.tsx      # Jewellers management
│   │       └── cafes/
│   │           └── page.tsx      # Cafes management
│   └── api/
│       └── admin/
│           ├── login/
│           │   └── route.ts      # Login endpoint
│           ├── verify/
│           │   └── route.ts      # Verify token
│           ├── jewellers/
│           │   ├── route.ts      # CRUD operations
│           │   └── [slug]/
│           │       └── route.ts  # Single jeweller
│           └── cafes/
│               └── route.ts      # Cafe operations
├── lib/
│   ├── auth.ts                   # JWT utilities
│   └── admin.ts                  # Admin utilities
└── data/
    ├── jewellers.ts              # Jewellers data
    └── cafes.ts                  # Cafes data
```

## Security

### Current Implementation
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- HTTP-only approach

### Production Recommendations
1. **Change default credentials** in `.env`
2. **Use strong JWT secret** (minimum 32 characters)
3. **Enable HTTPS** in production
4. **Implement rate limiting** for login attempts
5. **Add CORS protection**
6. **Use environment-specific configs**
7. **Implement refresh tokens**
8. **Add audit logging**

## Database Integration (Future)

Currently, the system uses file-based data storage. For production, integrate with a database:

### Recommended Options:
1. **PostgreSQL** with Prisma ORM
2. **MongoDB** with Mongoose
3. **Supabase** (PostgreSQL + Auth)
4. **Firebase** Firestore

### Migration Steps:
1. Choose database provider
2. Install ORM/SDK
3. Create database schema
4. Update API routes to use database
5. Implement data migration scripts

## Development Roadmap

### Phase 1 (Current) ✅
- [x] Authentication system
- [x] Admin dashboard UI
- [x] Jewellers management
- [x] Cafes management
- [x] API routes

### Phase 2 (Next)
- [ ] Database integration
- [ ] Blog post management
- [ ] Image upload functionality
- [ ] Rich text editor
- [ ] User roles and permissions

### Phase 3 (Future)
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Booking management
- [ ] SEO tools
- [ ] Multi-language support

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** JWT + bcrypt
- **Icons:** Lucide React
- **Date Handling:** date-fns

## Support

For issues or questions, please contact the development team.

## License

Proprietary - All rights reserved
