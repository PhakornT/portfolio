# Professional Portfolio - Phakorn Tantirapan

A premium, modern minimalist personal portfolio and resume website designed for a Commercial Excellence & Data Analytics Leader. Built with vanilla HTML, CSS, and JavaScript, featuring dual-language toggle support (English & Thai), an interactive projects carousel, and a fully functional contact form.

## Tech Stack & Features

- **Typography**: Inter (EN body), Playfair Display (EN headers), Noto Sans Thai (TH body), Chonburi (TH headers) for a highly polished editorial aesthetic.
- **Design System**: Responsive CSS custom properties, grid/flex layouts, glassmorphism headers, and scroll reveal animations.
- **Features**:
  - Dual Language Switcher (English / Thai) with persistent state via local storage.
  - Responsive Projects Carousel (CSS Scroll Snap + JavaScript prev/next controls).
  - Fully integrated Contact Form via Web3Forms API (no backend required).
  - High-performance, fast loading times, and SEO optimized structure.

## Local Development

Simply open the `index.html` file in any modern web browser, or use a local development server (such as Live Server in VS Code).

```bash
# To run via local browser
Start-Process index.html
```

## GitHub Pages Deployment

This site is fully static and ready to be hosted directly on **GitHub Pages** for free.

### Step 1: Initialize Git and Push to GitHub
1. Create a new public repository on GitHub named `your-username.github.io` (replace `your-username` with your actual GitHub username).
2. Run the following commands in your local project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/your-username/your-username.github.io.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment**, ensure **Source** is set to "Deploy from a branch".
4. Select the `main` branch and `/ (root)` folder, then click **Save**.
5. Your site will be live at `https://your-username.github.io` within a few minutes!

---

## Custom Domain Configuration

If you decide to use a custom domain (e.g., `phakorn.me`):

1. **GitHub Configuration**:
   - In your repository under **Settings** > **Pages**, enter your domain name in the **Custom domain** field and click **Save**. This will automatically create a `CNAME` file in your repository.
2. **DNS Configuration**:
   - Point your domain to GitHub Pages by configuring your Domain Registrar's DNS settings:
     - **CNAME Record**: Name: `www`, Target: `your-username.github.io`
     - **A Records** (pointing to GitHub Pages IP addresses):
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
