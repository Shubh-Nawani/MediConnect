# MediConnect - Advanced Medical Lab Test Management System

A modern, full-stack healthcare platform for seamless lab test booking, report management, and email delivery system.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://client-mediconnect.vercel.app)
[![API Status](https://img.shields.io/badge/API-Active-green?style=for-the-badge)](https://server-mediconnect.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-MERN-blue?style=for-the-badge)](#tech-stack)
[![Email Service](https://img.shields.io/badge/Email-Enabled-orange?style=for-the-badge)](#email-features)

## 🏥 Project Overview

MediConnect is a comprehensive healthcare platform that revolutionizes the way patients interact with medical laboratories. Built with cutting-edge web technologies, it provides an intuitive, secure, and feature-rich experience for booking lab tests, managing appointments, accessing medical reports, and receiving them via email.

## ✨ Key Features

### 🔐 Advanced Authentication System
- **Multi-Provider Support**: Local registration + Google OAuth 2.0 integration
- **JWT-Based Security**: Secure token authentication with 30-day expiration
- **Account Protection**: Brute force protection with intelligent lockout
- **Session Management**: Persistent login with secure cookie handling
- **Profile Management**: Complete user profile with avatar support

### 🧪 Comprehensive Lab Management
- **Test Catalog**: Browse 8+ sample medical lab tests with detailed information
- **Smart Booking**: Intuitive appointment scheduling with future date validation
- **Status Tracking**: Real-time booking status (upcoming, today, completed)
- **Report Access**: Secure download and email delivery of test results
- **Sample Data**: Complete sample test data for demonstration

### 📧 Email Delivery System
- **PDF Email Delivery**: Send lab reports directly to patient email
- **Beautiful Templates**: Professional HTML email templates with medical branding
- **Attachment Support**: Secure PDF attachment delivery
- **Confirmation Emails**: Automated booking confirmation notifications
- **Gmail Integration**: Production-ready email service with app password support
- **Multiple Providers**: Support for SendGrid, AWS SES, and other email services

### 🎨 Modern User Experience
- **Dark Theme**: Professional dark medical interface with slate color scheme
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Medical UI/UX**: Healthcare-themed interface with medical icons
- **Real-time Updates**: Live status updates and loading states
- **Accessibility**: WCAG compliant design for all users
- **Minimal Design**: Clean, container-free forms for better UX

### 🚀 Production-Ready Infrastructure
- **Cloud Deployment**: Serverless architecture on Vercel
- **Database Scaling**: MongoDB Atlas with optimized connections
- **Performance**: Fast loading with code splitting and optimization
- **Error Handling**: Comprehensive error tracking and user feedback
- **Security**: Multiple layers of security protection

## 🌐 Live Application

### Deployments
| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://client-mediconnect.vercel.app | ✅ Active |
| **Backend API** | https://server-mediconnect.vercel.app | ✅ Active |
| **Email Service** | Gmail SMTP Integration | ✅ Enabled |

### Quick Links
- [🚀 Try the App](https://client-mediconnect.vercel.app) - Experience the full platform
- [📡 Backend API](https://server-mediconnect.vercel.app) - API access
- [📧 Email Demo](https://client-mediconnect.vercel.app/my-bookings) - Test email functionality

## 🛠 Technical Architecture

### Frontend Stack
- **React 18** - Modern UI library with hooks and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **React Router** - Client-side routing for SPA navigation
- **Axios** - Promise-based HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework with dark theme
- **Custom Components** - Medical-themed reusable UI components

### Backend Stack
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Minimalist web framework for Node.js
- **MongoDB Atlas** - Cloud-native NoSQL database
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **Passport.js** - Authentication middleware for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **Nodemailer** - Email delivery service with Gmail integration
- **Google OAuth 2.0** - Secure social authentication

### DevOps & Deployment
- **Vercel** - Serverless deployment platform with global CDN
- **GitHub** - Version control and automated deployments
- **Environment Variables** - Secure configuration management
- **CORS** - Cross-origin resource sharing configuration
- **Error Handling** - Comprehensive error tracking and logging

## 📁 Project Structure

```
MediConnect/
├── client/                         # React frontend application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Navigation with aligned greeting
│   │   │   ├── Login.jsx           # User authentication
│   │   │   ├── Register.jsx        # User registration
│   │   │   ├── LabTests.jsx        # Test catalog with sample data
│   │   │   ├── BookTest.jsx        # Enhanced booking interface
│   │   │   └── MyBookings.jsx      # Booking management + email
│   │   ├── services/
│   │   │   └── api.js              # API communication layer
│   │   └── assets/                 # Static resources
│   ├── public/                     # Public assets
│   └── package.json                # Dependencies and scripts
├── server/                         # Express backend API
│   ├── config/
│   │   ├── db.js                   # Database configuration
│   │   └── passport.js             # Authentication strategies
│   ├── controllers/
│   │   ├── patientController.js    # Patient operations
│   │   ├── testController.js       # Test catalog operations
│   │   └── bookingController.js    # Booking + email operations
│   ├── middleware/
│   │   └── authMiddleware.js       # Authentication middleware
│   ├── models/
│   │   ├── Patient.js              # Patient data model
│   │   ├── Test.js                 # Test data model
│   │   └── Booking.js              # Booking data model
│   ├── routes/
│   │   ├── patientRoutes.js        # Patient API routes
│   │   ├── testRoutes.js           # Test API routes
│   │   └── bookingRoutes.js        # Booking + email routes
│   ├── utils/
│   │   ├── generatePDF.js          # Report generation
│   │   └── emailService.js         # Email delivery service
│   ├── public/
│   │   └── reports/                # Sample PDF reports
│   └── package.json                # Dependencies and scripts
└── README.md                       # Project documentation
```

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or yarn package manager
- **MongoDB Atlas** account (or local MongoDB)
- **Google Cloud Console** project for OAuth
- **Gmail Account** with App Password for email functionality

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shubh-Nawani/MediConnect.git
   cd MediConnect
   ```

2. **Setup Backend Server**
   ```bash
   cd server
   npm install
   
   # Create .env file with your configuration
   cp .env.example .env
   # Edit .env with your credentials
   
   npm run dev
   ```

3. **Setup Frontend Client**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Configure Email Service**
   ```bash
   # In server/.env, add:
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📡 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/patients/register` | Register new patient | Public |
| POST | `/api/patients/login` | Login with credentials | Public |
| GET | `/api/auth/google` | Initiate Google OAuth | Public |
| GET | `/api/auth/google/callback` | Google OAuth callback | Public |
| GET | `/api/auth/logout` | Logout user | Public |

### Patient Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/patients/profile` | Get patient profile | Private |
| PUT | `/api/patients/profile` | Update patient profile | Private |

### Lab Tests
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/tests` | Get all available tests | Public |

### Bookings & Reports
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings` | Book a lab test | Private |
| GET | `/api/bookings/:patientId` | Get patient bookings | Private |
| GET | `/api/bookings/report/download` | Download test report | Private |
| GET | `/api/bookings/report/sample` | Download sample report | Public |

### Email Services
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings/email-report` | Email PDF report to patient | Private |
| POST | `/api/bookings/send-confirmation` | Send booking confirmation | Private |

## 📧 Email Features

### Email Types
- **📋 Lab Report Emails** - PDF reports attached with professional medical template
- **✅ Booking Confirmation** - Confirmation emails with appointment details
- **📄 Sample Reports** - Demo reports for testing functionality

### Email Templates
- Beautiful HTML templates with MediConnect branding
- Professional medical styling with gradients and icons
- Responsive design for all email clients
- Patient information personalization
- Security notes for confidential medical data

### Email Configuration
```javascript
// Gmail Setup (Production Ready)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password

// Alternative Services Supported
SENDGRID_API_KEY=your-sendgrid-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

## 🔒 Security Features

### Authentication Security
- **JWT Tokens**: Secure, stateless authentication with 30-day expiration
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **OAuth Integration**: Google OAuth 2.0 for secure third-party authentication
- **Session Security**: HTTP-only cookies with secure flags in production

### Application Security
- **CORS Protection**: Configured for specific domains and methods
- **Input Validation**: Comprehensive request validation and sanitization
- **Rate Limiting**: Brute force protection with account lockout mechanism
- **Environment Variables**: Secure configuration management
- **HTTPS Enforcement**: SSL/TLS encryption for all production traffic

### Email Security
- **App Passwords**: Secure Gmail app password authentication
- **Encrypted Transmission**: TLS encryption for email delivery
- **Attachment Security**: Secure PDF attachment handling
- **Privacy Protection**: Patient data encryption in emails

### Database Security
- **Connection Encryption**: Encrypted connections to MongoDB Atlas
- **Data Validation**: Mongoose schema validation for data integrity
- **Access Control**: Role-based access control for sensitive operations
- **Connection Pooling**: Optimized connection management for serverless

## 🌐 Deployment Architecture

### Frontend Deployment (Vercel)
- **Platform**: Vercel Static Site
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Domain**: client-mediconnect.vercel.app
- **Features**: Automatic deployments, Global CDN, Edge caching

### Backend Deployment (Vercel Serverless)
- **Platform**: Vercel Serverless Functions
- **Runtime**: Node.js 18.x
- **Entry Point**: server.js
- **Domain**: server-mediconnect.vercel.app
- **Features**: Automatic scaling, Global edge distribution

### Database (MongoDB Atlas)
- **Provider**: MongoDB Atlas Cloud
- **Tier**: M0 (Free Tier)
- **Region**: Multi-region replication
- **Features**: Automatic backups, Security monitoring

### Email Service (Gmail)
- **Provider**: Gmail SMTP
- **Authentication**: App Password
- **Security**: TLS encryption
- **Features**: Professional templates, PDF attachments

## 🎯 Sample Data

### Available Lab Tests
1. **Complete Blood Count (CBC)** - ₹45
2. **Basic Metabolic Panel** - ₹65
3. **Lipid Profile** - ₹55
4. **Thyroid Function Test (TSH)** - ₹75
5. **Liver Function Panel** - ₹85
6. **Urinalysis** - ₹35
7. **Vitamin D Test** - ₹95
8. **HbA1c (Diabetes Test)** - ₹125

### Demo Features
- Sample PDF reports available for download
- Email demo functionality with sample reports
- Complete booking flow with sample data
- Dark theme medical interface

## 👨‍💻 Development Team

### Lead Developer
**Shubh Nawani**
- B.Tech Computer Science | Kalvium @ Lovely Professional University
- Full Stack Developer & Healthcare Tech Enthusiast
- [GitHub Profile](https://github.com/Shubh-Nawani)
- Contact: shubhnawanis65@gmail.com

### Technical Contributions
- **Architecture Design**: Full-stack healthcare application architecture
- **Authentication System**: Multi-provider OAuth implementation
- **Email Integration**: Professional email delivery system
- **UI/UX Design**: Medical-themed dark interface with responsive design
- **DevOps Setup**: Complete CI/CD pipeline configuration
- **Database Design**: Optimized MongoDB schema for healthcare data
- **Security Implementation**: Multi-layer security architecture

## 🔄 Recent Updates

### Latest Features (v2.0)
- ✅ Email delivery system for PDF reports
- ✅ Dark theme medical interface
- ✅ Enhanced booking form with better UX
- ✅ Sample test data integration
- ✅ Improved navbar with aligned greeting
- ✅ Container-free minimal design
- ✅ Loading states and error handling
- ✅ Professional email templates

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email shunaw2006@gmail.com or create an issue on GitHub.

---

**Made with ❤️ for the healthcare community**

*Empowering patients with seamless access to medical lab services*
