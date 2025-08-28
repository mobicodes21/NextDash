# ✨ NextDash Admin Dashboard

Full-Stack Dashboard for Users & Products Management

**NextDash** is a modern and fully functional admin dashboard built with **Next.js 14** and **Supabase** ⚡️  
It’s all about fast UI, smooth UX, clean code, and showcasing top-tier full-stack skills.

🌐 **Live Demo on Vercel** → [View Live](https://next-dash-2exdk5ikd-mobicodes21s-projects.vercel.app)

---

## 🛠 Tech Stack

- ⚛️ **Next.js 14 + React** – Modern, performant frontend framework  
- 🗄 **Supabase (PostgreSQL + Storage + Auth)** – Database, authentication, and file storage  
- 🎨 **CSS Modules** – Scoped, maintainable styling  
- 📦 **React Hooks (useState, useEffect)** – Efficient state management  
- 🔗 **Supabase Client** – Simple and powerful API communication  
- 🚀 **Vercel** – Seamless deployment experience  

---

## ⚡️ Features

- 🖼 **File Uploads** – Upload user and product images (Supabase Storage)  
- 🛒 **CRUD Operations** – Add, update, delete, and view users & products  
- 📱 **Responsive Design** – Fully responsive across all devices  
- 🔍 **Search & Pagination** – Dynamic filtering and paginated data tables  
- 📝 **Server Actions** – Secure server-side data handling with Next.js 14  
- 🔐 **Authentication & Protected Routes** – Powered by Supabase Auth  

---

## 🏗 Project Structure

NextDash/
├─ app/ # Next.js app directory
│ ├─ dashboard/ # Users & Products CRUD pages
│ ├─ coming-soon/ # Placeholder/coming soon page
│ ├─ login/ # Login page
│ ├─ signup/ # Signup page
│ ├─ ui/ # Reusable components + styles (buttons, forms, etc.)
├─ utils/ # Supabase client & helper functions
├─ lib/ # (Optional) Custom logic, helpers, validations, etc.
├─ public/ # Static assets, default images
└─ styles/ # Global styles



---

## 🔄 Data Flow

1. **User** interacts with forms/buttons → triggers **Next.js Server Actions**  
2. **Supabase** handles all database/storage actions (CRUD, Auth, Uploads)  
3. **React State** updates the UI immediately → smooth user experience  
4. **Images** are served via public Supabase Storage URLs  

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/mobicodes21/NextDash NextDash
cd NextDash
npm install
npm run dev


### 2️⃣ Set Environment Variables

Create a .env.local file and add the following:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (for server-side functions)

## 💡 Notes

Built as a full-stack Next.js 14 project with Supabase backend 💻

Supabase Storage enables secure image uploads for both users and products

Clean, modular, and scalable code structure using app directory

Fully resume-ready project: covers CRUD, auth, file handling, protected routes, and responsive UI


Developed with ❤️ using Next.js & Supabase