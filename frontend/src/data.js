// frontend/src/data.js
export const PRODUCTS = [
  // --- APPLE ECOSYSTEM ---
  { id: 111, category: "Computers", name: "MacBook Pro 16\"", price: "$2499", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" },
  { id: 124, category: "Computers", name: "Mac Studio M2 Max", price: "$1999", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80" },
  { id: 113, category: "Tablets", name: "iPad Pro 12.9\"", price: "$1099", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80" },
  { id: 146, category: "Tablets", name: "iPad Air 5th Gen", price: "$599", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80" },
  { id: 102, category: "Wearables", name: "Apple Watch Ultra", price: "$799", img: "https://images.unsplash.com/photo-1713056878930-c5604da9acfd?q=80" },
  { id: 104, category: "Audio", name: "AirPods Pro 2", price: "$249", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80" },
  { id: 168, category: "Accessories", name: "Belkin MagSafe Stand", price: "$59", img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" },

  // --- PC GAMING ECOSYSTEM ---
  { id: 142, category: "Computers", name: "Razer Blade 15", price: "$2299", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" },
  { id: 151, category: "Computers", name: "ASUS ROG Zephyrus G14", price: "$1499", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80" },
  { id: 115, category: "Displays", name: "ASUS ROG Swift 360Hz", price: "$699", img: "https://images.unsplash.com/photo-1552831388-6a0b35077328?w=500&q=80" },
  { id: 107, category: "Displays", name: "Samsung Odyssey G9", price: "$1299", img: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500&q=80" },
  { id: 110, category: "Accessories", name: "Razer DeathAdder V3", price: "$69", img: "https://images.unsplash.com/photo-1615663245857-ac93bb22292f?w=500&q=80" },
  { id: 153, category: "Accessories", name: "Razer BlackWidow V4", price: "$169", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },
  { id: 159, category: "Accessories", name: "HyperX Cloud III", price: "$99", img: "https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?w=500&q=80" },

  // --- CONTENT CREATOR / PRO ECOSYSTEM ---
  { id: 122, category: "Cameras", name: "Sony A7 IV Body", price: "$2498", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
  { id: 154, category: "Cameras", name: "Fujifilm X100VI", price: "$1599", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
  { id: 170, category: "Cameras", name: "DJI Osmo Pocket 3", price: "$519", img: "https://images.unsplash.com/photo-1579824225026-66487e47266b?w=500&q=80" },
  { id: 120, category: "Accessories", name: "Elgato Stream Deck MK.2", price: "$149", img: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500&q=80" },
  { id: 150, category: "Accessories", name: "Logitech Blue Yeti", price: "$129", img: "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=500&q=80" },
  { id: 101, category: "Audio", name: "Sony WH-1000XM5", price: "$398", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80" },
  { id: 145, category: "Accessories", name: "Wacom Cintiq 16", price: "$649", img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&q=80" },

  // --- SMART HOME ECOSYSTEM ---
  { id: 123, category: "Smart Home", name: "Amazon Echo Studio", price: "$199", img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80" },
  { id: 130, category: "Smart Home", name: "Philips Hue Starter Kit", price: "$129", img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80" },
  { id: 138, category: "Smart Home", name: "Google Nest Hub Max", price: "$229", img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80" },
  { id: 147, category: "Smart Home", name: "Arlo Pro 4 Camera", price: "$199", img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80" },
  { id: 155, category: "Smart Home", name: "Eufy RoboVac X8", price: "$499", img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80" },
  { id: 164, category: "Smart Home", name: "Ring Video Doorbell Plus", price: "$149", img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80" },

  // --- GENERAL PRODUCTIVITY / ANDROID ECOSYSTEM ---
  { id: 132, category: "Computers", name: "Lenovo ThinkPad X1", price: "$1699", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80" },
  { id: 112, category: "Computers", name: "Dell XPS 15", price: "$1899", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80" },
  { id: 114, category: "Tablets", name: "Galaxy Tab S9 Ultra", price: "$1199", img: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500&q=80" },
  { id: 134, category: "Wearables", name: "Samsung Galaxy Watch 6", price: "$299", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80" },
  { id: 106, category: "Accessories", name: "Logitech MX Master 3S", price: "$99", img: "https://images.unsplash.com/photo-1739742473235-34a7bd9b8f87?q=80" },
  { id: 126, category: "Accessories", name: "Logitech MX Keys Mini", price: "$99", img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&q=80" },
  { id: 139, category: "Displays", name: "Dell UltraSharp 32\"", price: "$849", img: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=500&q=80" }
];