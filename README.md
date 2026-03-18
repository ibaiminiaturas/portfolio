# 🎨 Miniature Painter Portfolio Template
> **The "Lazy Painter" Web Solution.** A high-performance, easy-to-customize portfolio designed for the hobby community.

Managed entirely via **JSON configuration**, this template allows you to showcase your miniatures without touching complex HTML or JavaScript.

## 🚀 Hosting & Deployment (The "Pro" Setup for 0€)

> [!IMPORTANT]
> **Super Important:** This website is designed to be hosted on your own **GitHub account** (which is free). Forget about expensive monthly hosting fees!

* **100% Free Hosting:** By using **GitHub Pages**, you get professional-grade hosting for $0/month.
* **Custom Domain:** Your only potential cost is a custom domain (e.g., `www.yourname.com`). This usually costs around **10€ per year** at any registrar. That's it. No other hidden fees.
* **Automatic Deploys:** Every time you upload a new photo to your repository or edit the `config.json`, the website **updates itself automatically** in seconds. 
* **Zero Maintenance:** No databases to manage, no WordPress plugins to update, and no server headaches. It just stays online, fast and secure.

### 📁 Project Structure
- `/assets/config.json` -> ⚙️ Your main info (Email, Formspree).
- `/assets/galeries.json` -> 📸 Your gallery structure.
- `/assets/lang/` -> 🌍 Translations (EN/ES).
- `/galleries/data/` -> 🖼️ Where your .webp images live.


## 🚀 Quick Start (For the "Lazy" Painter)

You don't need to be a developer. Just follow these 3 steps:

### 1. Global Configuration
Open `assets/config.json` and fill in your personal details. This file controls your brand, social media, and contact links globally.
```json
{
  "formspree_url": "[https://formspree.io/f/yourid](https://formspree.io/f/yourid)",
}

### 2. Social Links & Logo

Since we are keeping it simple with direct links, you can find the Social Media icons and the Logo in the Header/Footer files:

    Logo & Links: Open components/header.html or components/footer.html to change your Instagram/Facebook URLs directly in the <a> tags.
Footer:
  <img src="assets/images/YOUR_LOGO_FILE" alt="Logo" class="h-20 w-20 rounded-full">
  <a href="https://www.instagram.com/YOUR_INSTAGRAM_NAME">
  <a href="mailto:YOUR_EMAIL_ADDRESS" class="hover:underline">YOUR_EMAIL_ADDRESS</a>
Header:
  <a href="https://www.instagram.com/YOUR_INSTAGRAM_NAME" target="_blank" class="hover:opacity-70">
  <a href="https://www.instagram.com/YOUR_INSTAGRAM_NAME" target="_blank">

in uitls.js:
        const images = [
            { id: 'header-logo', path: 'assets/images/YOUR_HEADER_LOGO' },
            { id: 'header-logo-mobile', path: 'assets/images/YOUR_HEADER_LOGO_FOR_MOBILE' },
            { id: 'flag-es', path: 'assets/images/YOUR_LANGUAGE_FLAG' },
            { id: 'flag-es-mobile', path: 'assets/images/YOUR_LANGUAGE_FLAG_FOR_MOBILE' },
        ];

### 3. Multi-language Support

Edit the translation files in assets/lang/en.json (or es.json). You can change every single text on the "About Me" page, the "Home" page, the "Contact" page and the names of the galeries from there. No need to hunt for <div> tags!
For the galeries they have to be named exactly like the ones on the gallery system. Check next step.

📸 How the Gallery Works

The galleries info is in the galleries.json, here is a sample json:

[
  {
    "category": "Box Arts",     //Level 1 gallery
    "folder": "Box Arts", //Folder name for the gallery in the assets/galleries/data path
    "items": [     //subgaleries of this main gallery
      {
        "name": "Big Child", //name of the sub folder in the assets/galleries/data/Box Arts path
        "displayName": "Big Child Studios", //not used right no. 
        "subs": [            //subgaleries in the gallery "Big CHild" 
          {
            "name": "marvel-united",  //name of the sub folder in the assets/galleries/data/Box Arts/Big Child path
            "displayName": "Marvel United",
            "images": 6 //number of images in the gallery
          },
          {
            "name": "game-of-thrones",   //name of the sub folder in the assets/galleries/data/Box Arts/Big Child path path
            "displayName": "A Song of Ice and Fire",
            "images": 12,
            "subs": [
              {
                "name": "stark-army", //name of the sub folder in the assets/galleries/data/Box Arts/Big Child/game-of-thrones path
                "displayName": "House Stark",
                "images": 5
              }
            ]
          }
        ]
      },
      {
        "name": "aradia-miniatures",
        "displayName": "Aradia Miniatures",
        "images": 15
        // Esto será un MOSAICO directo dentro de la categoría Box Arts.
      }
    ]
  },
  {
    "category": "Personal Projects",
    "folder": "personal",
    "images": 8,
    "displayName": "Mis Proyectos Propios"
    // Mosaico puro.
  }
]

You can copy and paste this example into https://jsoneditoronline.org/ to see the structure.

The system is "smart". It decides how to display your work based on how you nest your data in galeries.json:
🔹 Mosaic Mode (Detail View)

If a category has images but no sub-items, the website will display a beautiful full-width mosaic. Ideal for showing every detail of a specific project.

    Trigger: Provide an images count but leave subs or items empty.

🔹 Carousel Mode (Category View)

If a category has images AND sub-items (children), it will show a sleek horizontal carousel to save space, knowing there is more content below.

    Trigger: Provide an images count and add a subs or items array.

📁 Image Naming Convention

To keep it simple, your images must follow this pattern inside /galleries/data/[FolderName]/:

    folder-name-1.webp

    folder-name-2.webp

    ...and so on.

We can have galleries inside galleries so the name would change acordingly. Example:

assets/galleries/data/Box Arts/Big Child/game-of-thrones

in this filder there would be

game-of-thrones-1.webp

game-of-thrones-2.webp

...and so on

🛠 Tech Stack

    Styling: Tailwind CSS.

    Logic: Vanilla JS (No heavy frameworks like React/Angular).

    Components: Dynamic Header/Footer injection for easy maintenance.

    Gallery Engine: Custom-built "Mosaico" and "MiniCarrusel" modules using .

    Internationalization: Built-in i18n system.

🤝 Contributing

I built this to help the community. If you are a developer and want to optimize the "Configuration Engine" or the "Gallery Logic", feel free to submit a Pull Request. Be my guest!
⚖️ License

Created by Ibai Miniaturas. Free to use for the hobby community.
Enjoy painting! 🖌️
