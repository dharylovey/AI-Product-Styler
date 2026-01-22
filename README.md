# 🎨 AI Product Color Styler

<div align="center">

**Transform product images with AI-powered color styling using n8n + Google Gemini**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)
[![n8n](https://img.shields.io/badge/n8n-Self--Hosted-EA4B71.svg)](https://n8n.io/)

[Live Demo](#) • [Features](#-features) • [Setup](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

A production-ready web application that allows users to select products, choose color variations, and generate AI-styled product images using Google Gemini through n8n automation workflows. Built with modern web technologies and designed for scalability.

### 🎯 Project Purpose

This project was created to demonstrate:

- Integration between n8n workflows and AI image generation
- Modern React application architecture with TypeScript
- Production-ready features like rate limiting and security
- Scalable frontend-backend communication patterns

---

## ✨ Features

### Core Features

- 🖼️ **6 Pre-loaded Products** with multiple color variations
- 🎨 **Smart Color Picker** with presets + custom HEX selection
- 🤖 **AI-Powered Styling** using Google Gemini via n8n
- 📤 **Custom Upload** - Bring your own product images
- 🔄 **Dynamic Model Selection** - Switch between Gemini models
- 📥 **Download Results** - Save AI-generated images
- 🔍 **Image Lightbox** - View full-size results

### Advanced Features

- 🛡️ **Server-Side Rate Limiting** (IP-based, unbypassable)
- 🏗️ **Self-Hosted n8n** on VPS with Docker + PostgreSQL
- 🔒 **Production Security** - CORS, proxy, environment configs
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Premium UI/UX** - Glassmorphism, animations, micro-interactions

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/apikey))
- **n8n Instance** (self-hosted or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-product-styler.git
   cd ai-product-styler
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file:

   ```env
   # n8n Webhook URL
   VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/ai-style

   # Rate Limiting (Server-Side)
   RATE_LIMIT_MAX=5
   RATE_LIMIT_WINDOW_MINUTES=5
   ```

4. **Import n8n workflow**
   - Open n8n instance
   - Go to Workflows → Import from File
   - Select `n8n_workflow.json`
   - Configure Google Gemini credentials
   - Activate the workflow

5. **Run the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🛠️ Tech Stack

### Frontend

- **React** 18 - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS3** - Custom styling with modern features

### Backend

- **Vercel Serverless Functions** - API proxy with rate limiting
- **n8n** (Self-hosted) - Workflow automation
- **Google Gemini AI** - Image generation

### Infrastructure

- **Docker** + **PostgreSQL** - n8n hosting
- **Vercel** - Frontend deployment
- **VPS** - n8n self-hosting

---

## 📂 Project Structure

```
ai-product-styler/
├── api/
│   └── n8n-proxy.ts              # Vercel serverless function (rate limiting)
├── components/
│   ├── Header.tsx                # Navigation + model selector
│   ├── Hero.tsx                  # Landing section
│   ├── ProductCard.tsx           # Product display + AI styling
│   ├── UploadProductForm.tsx     # Custom product upload
│   ├── ProductUploadModal.tsx    # Upload modal
│   ├── N8nConfigModal.tsx        # Settings modal
│   └── product-card/             # ProductCard sub-components
├── pages/
│   └── Home.tsx                  # Main landing page
├── services/
│   └── geminiService.ts          # n8n API integration
├── utils/
│   └── imageUtils.ts             # Image processing helpers
├── constants.ts                  # Product data
├── n8n_workflow.json             # Complete n8n workflow
└── .env.local                    # Environment configuration
```

---

## 📚 Documentation

### How to Use

1. **Select a Product**
   - Browse the Featured Collection
   - Each product has 5+ preset colors
   - Click any color swatch to select

2. **Customize (Optional)**
   - Click the color picker icon for custom colors
   - Enter any HEX code
   - Or use the visual picker

3. **Generate AI Image**
   - Click "Style it with AI"
   - Wait 5-10 seconds for processing
   - View the AI-generated result

4. **Upload Your Own Product**
   - Scroll to "Bring Your Own Product"
   - Upload an image (max 5MB)
   - Style with AI immediately

5. **Change AI Model**
   - Click the settings (⚙️) icon
   - Select Gemini model (Imagen 2, 3, etc.)
   - Changes apply to next generation

### n8n Workflow

The workflow consists of 3 nodes:

1. **Webhook** - Receives POST requests with:

   ```json
   {
     "image": "data:image/png;base64,...",
     "color": "Blue",
     "productName": "Minimalist Sneaker",
     "model": "imagen-3.0-generate-001"
   }
   ```

2. **Generate an image** (Google Gemini)
   - Processes the image with the selected color
   - Uses dynamic model selection

3. **Respond to Webhook**
   - Returns binary image data
   - Frontend displays the result

### Rate Limiting

**Server-side (Unbypassable)**

- Location: `api/n8n-proxy.ts`
- Method: IP-based tracking
- Default: 5 requests per 5 minutes
- Configure via `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MINUTES`

**Why Server-Side?**

- Cannot be bypassed by users
- Protects API costs
- Production-ready security

### Environment Variables

| Variable                    | Description            | Default | Required |
| --------------------------- | ---------------------- | ------- | -------- |
| `VITE_N8N_WEBHOOK_URL`      | n8n webhook endpoint   | -       | ✅       |
| `RATE_LIMIT_MAX`            | Max requests allowed   | 5       | ❌       |
| `RATE_LIMIT_WINDOW_MINUTES` | Time window in minutes | 5       | ❌       |

---

## 🚢 Deployment

### Deploy to Vercel

1. **Connect your repository**

   ```bash
   vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard:
   - `VITE_N8N_WEBHOOK_URL` = Your n8n webhook URL
   - `RATE_LIMIT_MAX` = 5
   - `RATE_LIMIT_WINDOW_MINUTES` = 5

3. **Deploy**
   - Vercel will auto-deploy on push to main branch

### Self-Host n8n (Optional)

```bash
# Using Docker Compose
git clone https://github.com/n8n-io/n8n-hosting.git
cd n8n-hosting/docker-compose
docker-compose up -d
```

Configure PostgreSQL and environment variables in `.env`

---

## 🎨 Features in Detail

### Dynamic Model Selection

Users can switch between different Gemini models:

- `imagen-3.0-generate-001` (Default)
- `imagen-3.0-fast-generate-001`
- `imagen-2.0-generate-001`

Model selection is stored in `localStorage` and sent with each request.

### Custom Product Upload

- **Validation**: File type, size (max 5MB)
- **Preview**: Real-time image preview
- **Drag & Drop**: Intuitive file selection
- **Instant Styling**: Uploaded products immediately available

### Security Features

- **CORS Configuration**: Restricts allowed origins
- **Rate Limiting**: Prevents abuse
- **Environment Variables**: Sensitive data protection
- **Serverless Proxy**: Secure n8n communication

---

## 🐛 Troubleshooting

### "n8n Webhook URL is not configured"

- Click the settings (⚙️) icon
- Enter your n8n webhook URL
- Or set `VITE_N8N_WEBHOOK_URL` in `.env.local`

### "Rate limit exceeded"

- Wait for the time window to reset (default: 5 minutes)
- Or increase limits in environment variables

### Images not generating

1. Check n8n workflow is active
2. Verify Google Gemini credentials in n8n
3. Check browser console for errors
4. Ensure webhook URL is correct

### CORS errors

- Verify `allowedOrigins` in `n8n_workflow.json`
- Set to `"*"` for development
- Use specific domain for production

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) - Workflow automation platform
- [Google Gemini](https://ai.google.dev/) - AI image generation
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://reactjs.org/) - UI library

---

## 📧 Contact

For questions or support, please contact **flowpilot25@gmail.com**

---

<div align="center">

**Built with ❤️ using React, TypeScript, n8n, and Google Gemini**

⭐ Star this repo if you find it helpful!

</div>
