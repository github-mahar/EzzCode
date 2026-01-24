# EzzCode - Tech Training & Internship Platform

<div align="center">
<img src="src/logo_white.jpg" alt="EZZCODE Logo" width="200" />

**Empowering Future Developers Through Practical Learning**


[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.57.4-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>



## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Storage Setup](#storage-setup)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

EzzCode is a comprehensive tech training and internship platform designed to transform beginners into job-ready developers. The platform offers industry-leading training programs, verifiable certificates, and real-world project experience with mentorship from experienced professionals.

### Key Highlights

- 🎓 **Comprehensive Training Programs** - Web Development, Python, AI/ML, Full-Stack, Mobile Development, and Data Science
- 🏆 **Verifiable Certificates** - Industry-recognized certificates with unique verification IDs
- 📝 **Contact & Application System** - Streamlined application process with resume upload capability
- 🎨 **Modern UI/UX** - Beautiful, responsive design built with Tailwind CSS
- ⚡ **Fast & Performant** - Built with Vite for lightning-fast development and optimized builds
- 🔒 **Secure** - Row Level Security (RLS) policies for data protection

## ✨ Features

### For Students
- Browse and filter training programs by category
- View detailed program information including skills, duration, and eligibility
- Submit applications with resume/CV upload (PDF, max 2MB)
- Verify certificates using unique certificate IDs
- Contact support team through integrated contact form

### For Administrators
- Manage programs, certificates, and contact submissions
- View uploaded resumes in Supabase Storage
- Access comprehensive database with RLS security

### Technical Features
- **Custom Hash-Based Routing** - Lightweight routing without external dependencies
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript implementation with strict mode
- **Error Handling** - Comprehensive error handling and user feedback
- **File Upload** - Secure resume upload to Supabase Storage
- **Database Integration** - PostgreSQL database with Supabase

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.2** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Storage for file uploads
  - Row Level Security (RLS)
  - Real-time capabilities

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Supabase Account** - [Sign up for free](https://supabase.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EZZCODE1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Run migrations from `supabase/migrations/` in your Supabase SQL Editor
   - See [Database Setup](#database-setup) for detailed instructions

5. **Set up Storage**
   - Create the `contacts` bucket in Supabase Storage
   - Configure storage policies
   - See [Storage Setup](#storage-setup) for detailed instructions

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
EZZCODE1/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Footer component
│   │   └── Router.tsx      # Custom routing logic
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── ProgramsPage.tsx # Programs listing
│   │   ├── CertificatePage.tsx # Certificate verification
│   │   ├── ContactPage.tsx # Contact form with resume upload
│   │   ├── PrivacyPage.tsx # Privacy policy
│   │   └── TermsPage.tsx   # Terms & conditions
│   ├── lib/
│   │   └── supabase.ts     # Supabase client & types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── supabase/
│   └── migrations/         # Database migrations
│       ├── 20260108174947_create_ezzcode_schema.sql
│       ├── 20260109000000_add_resume_url_to_contacts.sql
│       └── 20260109000001_setup_storage_bucket.sql
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

## ⚙️ Setup Instructions

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** Update `src/lib/supabase.ts` to use environment variables instead of hardcoded values for production.

### Database Setup

1. **Run Initial Schema Migration**
   - Open Supabase Dashboard → SQL Editor
   - Run `supabase/migrations/20260108174947_create_ezzcode_schema.sql`
   - This creates the `programs`, `certificates`, and `contacts` tables

2. **Add Resume URL Column**
   - Run `supabase/migrations/20260109000000_add_resume_url_to_contacts.sql`
   - Adds `resume_url` column to the `contacts` table

3. **Verify Tables**
   - Check that all tables are created in Supabase Dashboard → Table Editor
   - Verify RLS policies are enabled

### Storage Setup

1. **Create Storage Bucket**
   - Go to Supabase Dashboard → Storage
   - Click "New bucket"
   - Name: `contacts` (exact, case-sensitive)
   - Enable "Public bucket"
   - Set file size limit to 2MB (optional)
   - Click "Create bucket"

2. **Configure Storage Policies**
   - Go to SQL Editor
   - Run `SETUP_STORAGE_NOW.sql` or `supabase/migrations/20260109000001_setup_storage_bucket.sql`
   - This creates policies for public uploads and reads

3. **Verify Setup**
   - Try uploading a resume through the contact form
   - Check that files appear in Storage → `contacts` → `resumes/`

For detailed storage setup instructions, see [STORAGE_SETUP.md](./STORAGE_SETUP.md)

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run typecheck

# Run ESLint
npm run lint
```

### Development Workflow

1. Make changes to source files in `src/`
2. The dev server will automatically reload
3. Check browser console for any errors
4. Use React DevTools for component debugging

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Configured with React and TypeScript rules
- **Prettier** - Recommended for code formatting (not included)

## 🏗 Building for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Other Platforms

The project can be deployed to any static hosting service:
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Any platform supporting static sites

**Important:** Make sure to:
- Set environment variables in your hosting platform
- Update `src/lib/supabase.ts` to use environment variables
- Configure CORS in Supabase if needed

## 📊 Database Schema

### Tables

#### `programs`
- Stores training and internship programs
- Fields: `id`, `title`, `description`, `duration`, `skills[]`, `eligibility`, `category`, `status`, `created_at`

#### `certificates`
- Stores issued certificates for verification
- Fields: `id`, `certificate_id`, `student_name`, `program_name`, `issue_date`, `status`, `created_at`

#### `contacts`
- Stores contact form submissions
- Fields: `id`, `name`, `email`, `message`, `resume_url`, `created_at`

### Security

- **Row Level Security (RLS)** enabled on all tables
- Public read access for active programs and valid certificates
- Public insert access for contact form submissions
- Authenticated access required for admin operations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is private and proprietary. All rights reserved.

## 👥 Authors

**Mahar Ghulam Muhammad**

- Website: [ezzcode.online](https://www.ezzcode.online)
- Email: info@ezzcode.com

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend platform
- [Vite](https://vitejs.dev) for the excellent build tool
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icons

## 📞 Support

For support, email info@ezzcode.com or visit our [contact page](https://www.ezzcode.online/#contact).

---

<div align="center">

**Built with ❤️ by the EzzCode Team**

[Website](https://www.ezzcode.online) • [Contact](https://www.ezzcode.online/#contact)

</div>
