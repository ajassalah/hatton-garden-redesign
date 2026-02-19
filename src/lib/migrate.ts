import pool from './mysql';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');

function readJSON(filename: string): any[] {
  try {
    const filePath = path.join(DATA_DIR, `${filename}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function tableCount(conn: any, table: string): Promise<number> {
  const [rows] = await conn.execute(`SELECT COUNT(*) as count FROM \`${table}\``);
  return parseInt((rows as any[])[0].count ?? '0', 10);
}

export async function migrate() {
  const conn = await pool.getConnection();
  try {
    // ── 1. CREATE TABLES (MariaDB 10.4 compatible) ─────────────────
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS jewellers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT '',
        description TEXT,
        long_description TEXT,
        phone VARCHAR(50) DEFAULT '',
        email VARCHAR(255) DEFAULT '',
        website VARCHAR(500) DEFAULT '',
        address TEXT,
        rating DECIMAL(3,1) DEFAULT 4.5,
        reviews_count INT DEFAULT 0,
        image VARCHAR(500) DEFAULT '',
        gallery LONGTEXT,
        opening_times TEXT,
        socials LONGTEXT,
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS cafes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT '',
        description TEXT,
        long_description TEXT,
        phone VARCHAR(50) DEFAULT '',
        email VARCHAR(255) DEFAULT '',
        website VARCHAR(500) DEFAULT '',
        address TEXT,
        rating DECIMAL(3,1) DEFAULT 4.5,
        reviews_count INT DEFAULT 0,
        image VARCHAR(500) DEFAULT '',
        opening_times TEXT,
        socials LONGTEXT,
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        image VARCHAR(500) DEFAULT '',
        author VARCHAR(100) DEFAULT 'Admin',
        category VARCHAR(100) DEFAULT 'General',
        status ENUM('published','draft') DEFAULT 'draft',
        views INT DEFAULT 0,
        has_full_article TINYINT(1) DEFAULT 0,
        date VARCHAR(50) DEFAULT '',
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) DEFAULT 'jeweller',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS shop_categories (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500) DEFAULT '',
        count VARCHAR(100) DEFAULT '0',
        icon VARCHAR(100) DEFAULT '',
        type VARCHAR(50) DEFAULT 'shop',
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id VARCHAR(20) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) DEFAULT '',
        role VARCHAR(50) DEFAULT 'Editor',
        status VARCHAR(20) DEFAULT 'Active',
        last_login VARCHAR(50) DEFAULT '',
        created_at VARCHAR(50) DEFAULT ''
      )
    `);

    // ── 2. SEED FROM JSON IF TABLES ARE EMPTY ──────────────────────

    // Jewellers
    if ((await tableCount(conn, 'jewellers')) === 0) {
      const jewellers = readJSON('jewellers');
      for (const j of jewellers) {
        try {
          await conn.execute(
            `INSERT IGNORE INTO jewellers (slug, name, category, description, long_description, phone, email, website, address, rating, reviews_count, image, gallery, opening_times, socials)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              j.slug || '', j.name || '', j.category || '',
              j.description || '', j.longDescription || j.description || '',
              j.phone || '', j.email || '', j.website || '', j.address || '',
              j.rating || 4.5, j.reviewsCount || 0, j.image || '',
              JSON.stringify(j.gallery || []),
              typeof j.openingTimes === 'string' ? j.openingTimes : JSON.stringify(j.openingTimes || ''),
              JSON.stringify(j.socials || {}),
            ]
          );
        } catch { /* skip duplicates */ }
      }
      console.log(`✅ Seeded ${jewellers.length} jewellers`);
    }

    // Cafes
    if ((await tableCount(conn, 'cafes')) === 0) {
      const cafes = readJSON('cafes');
      for (const c of cafes) {
        try {
          await conn.execute(
            `INSERT IGNORE INTO cafes (slug, name, category, description, long_description, phone, email, website, address, rating, reviews_count, image, opening_times, socials)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              c.slug || '', c.name || '', c.category || '',
              c.description || '', c.longDescription || c.description || '',
              c.phone || '', c.email || '', c.website || '', c.address || '',
              c.rating || 4.5, c.reviewsCount || 0, c.image || '',
              typeof c.openingTimes === 'string' ? c.openingTimes : JSON.stringify(c.openingTimes || ''),
              JSON.stringify(c.socials || {}),
            ]
          );
        } catch { /* skip duplicates */ }
      }
      console.log(`✅ Seeded ${cafes.length} cafes`);
    }

    // Blog Posts
    if ((await tableCount(conn, 'blog_posts')) === 0) {
      const posts = readJSON('blog');
      for (const p of posts) {
        try {
          await conn.execute(
            `INSERT IGNORE INTO blog_posts (slug, title, excerpt, content, image, author, category, status, views, has_full_article, date)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              p.slug || '', p.title || '', p.excerpt || '',
              p.content || '', p.image || '',
              p.author || 'Admin', p.category || 'General',
              p.status || 'draft', p.views || 0,
              p.hasFullArticle ? 1 : 0, p.date || '',
            ]
          );
        } catch { /* skip duplicates */ }
      }
      console.log(`✅ Seeded ${posts.length} blog posts`);
    }

    // Categories
    if ((await tableCount(conn, 'categories')) === 0) {
      const categories = readJSON('categories');
      for (const cat of categories) {
        try {
          await conn.execute(
            'INSERT IGNORE INTO categories (id, name, type) VALUES (?, ?, ?)',
            [cat.id, cat.name, cat.type || 'jeweller']
          );
        } catch { /* skip */ }
      }
      console.log(`✅ Seeded ${categories.length} categories`);
    }

    // Shop Categories
    if ((await tableCount(conn, 'shop_categories')) === 0) {
      const shopCats = readJSON('shop_categories');
      for (const sc of shopCats) {
        try {
          await conn.execute(
            'INSERT IGNORE INTO shop_categories (id, name, description, image, count, icon, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [sc.id, sc.name, sc.description || '', sc.image || '', sc.count || '0', sc.icon || '', sc.type || 'shop']
          );
        } catch { /* skip */ }
      }
      console.log(`✅ Seeded ${shopCats.length} shop categories`);
    }

    // Admin Users
    if ((await tableCount(conn, 'admin_users')) === 0) {
      const users = readJSON('users');
      for (const u of users) {
        try {
          await conn.execute(
            'INSERT IGNORE INTO admin_users (id, username, email, role, status, last_login, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [u.id, u.username, u.email || '', u.role || 'Editor', u.status || 'Active', u.lastLogin || '', u.createdAt || '']
          );
        } catch { /* skip */ }
      }
      console.log(`✅ Seeded ${users.length} admin users`);
    }

    console.log('✅ Database migration and seed complete');
  } catch (err) {
    console.error('❌ Migration/seed error:', err);
    throw err;
  } finally {
    conn.release();
  }
}
