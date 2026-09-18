export interface ToonCharacter {
  id: string;
  name: string;
  category: "Men" | "Children";
  role: string;
  src: string;
  bg: string;
  panel: string;
  badge: string;
  story: string;
  garmentSpec: string;
}

export interface OriginalFigmaItem {
  src: string;
  bg: string;
  panel: string;
}

export const ORIGINAL_FIGMA_IMAGES: OriginalFigmaItem[] = [
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", bg: "#F4845F", panel: "#F79B7F" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", bg: "#6BBF7A", panel: "#85CC92" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", bg: "#E882B4", panel: "#ED9DC4" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", bg: "#6EB5FF", panel: "#8DC4FF" },
];

export const INDIAN_TOON_CHARACTERS: ToonCharacter[] = [
  {
    id: "kabir",
    name: "KABIR",
    category: "Men",
    role: "Menswear Designer Toon",
    src: "/assets/toons/kabir.png",
    bg: "#F4845F",
    panel: "#F79B7F",
    badge: "STYLE UNION MEN • RETRO RE-DO",
    story: "Streetwear nomad rocking an oversized 290 GSM coral French terry sweatshirt with HD typography, utilitarian cargos, and chunky kicks.",
    garmentSpec: "290 GSM 100% Cotton Looper • Apricot Crush 15-1247 TPX • Drop Shoulder Oversized Fit",
  },
  {
    id: "aarav",
    name: "AARAV",
    category: "Men",
    role: "Menswear Knitwear Toon",
    src: "/assets/toons/aarav.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
    badge: "STYLE UNION MEN • NERD FLAT KNITS",
    story: "Relaxed holiday stylist wearing a retro cabana flat knit shirt with vertical sage stripes and resort shorts.",
    garmentSpec: "100% Mercerised Cotton Flat Knit • Malachite 19-5421 TPX • Camp Collar with DTM Buttons",
  },
  {
    id: "dev",
    name: "DEV",
    category: "Men",
    role: "Menswear Active Street Toon",
    src: "/assets/toons/dev.png",
    bg: "#4A90E2",
    panel: "#6EB5FF",
    badge: "STYLE UNION MEN • DIMENSION COLLECTION",
    story: "Urban trendsetter sporting high-contrast cerulean blue colorblock pullover with geometric 3D typography, beanie, and raw denim.",
    garmentSpec: "240 GSM 78% Cotton 19% Poly 3% Spandex • Adriatic Sea 17-4440 TCX • Plastisol HD Print",
  },
  {
    id: "vihaan",
    name: "VIHAAN",
    category: "Children",
    role: "Kidswear Boys Toon (DMart)",
    src: "/assets/toons/vihaan.png",
    bg: "#F5A623",
    panel: "#F7BA55",
    badge: "DMART KIDSWEAR • BOYS TOPWEAR",
    story: "Cheerful 7-year-old in sunny golden-yellow and navy colorblocked pique polo sweater with rolled denim shorts and mini court shoes.",
    garmentSpec: "210 GSM Combed Cotton Pique • Golden Cob 15-0947 TPX • Ribbed Collar & Cuffs with Soft Bio-wash",
  },
  {
    id: "meera",
    name: "MEERA",
    category: "Children",
    role: "Kidswear Girls Toon (DMart)",
    src: "/assets/toons/meera.png",
    bg: "#FF7B90",
    panel: "#FF99AA",
    badge: "DMART KIDSWEAR • GIRLS CASUALS",
    story: "Sweet 6-year-old wearing coral overalls dungaree with handcrafted elephant embroidery badge layered over a soft ribbed knit tee.",
    garmentSpec: "240 GSM Soft Peach Twill & Baby Rib • Sweet Mandarin 16-1356 TPX • Multi-color Thread Embroidery",
  },
  {
    id: "arjun",
    name: "ARJUN",
    category: "Children",
    role: "Kidswear Boys Toon (DMart)",
    src: "/assets/toons/arjun.png",
    bg: "#20B2AA",
    panel: "#48D1CC",
    badge: "DMART KIDSWEAR • BOYS GRAPHIC FLEECE",
    story: "Adventurous 9-year-old wearing an electric tidal teal space-explorer hoodie, cargo joggers, and backwards snapback cap.",
    garmentSpec: "260 GSM Brushed Back Cotton Fleece • Tidal Teal 19-4324 TPX • Glow-in-the-Dark Cosmic Chest Print",
  },
  {
    id: "riya",
    name: "RIYA",
    category: "Children",
    role: "Kidswear Girls Toon (DMart)",
    src: "/assets/toons/riya.png",
    bg: "#B388FF",
    panel: "#C7A4FF",
    badge: "DMART KIDSWEAR • GIRLS KNIT DRESSING",
    story: "Charming 5-year-old wearing a chunky lilac knit cardigan with hand-crocheted daisy flower accents over a pastel tulle party dress.",
    garmentSpec: "100% Acrylic Soft Chunky Knit • Orchid Petal 14-3710 TPX • Dimensional Hand Crochet Applique",
  },
];

export const DESIGNER_INFO = {
  name: "Shubhangi Priya",
  title: "Assistant Manager | Senior Knitwear & Menswear Designer",
  company: "DMart & Style Union Alumna",
  location: "Mumbai, Maharashtra, India",
  phone: "+91-8521303269",
  email: "shubhangi.priya@outlook.com",
  linkedin: "https://linkedin.com/in/shubhangi-priya",
  education: {
    degree: "B.Des in Knitwear Design",
    institution: "National Institute of Fashion Technology (NIFT), Mumbai",
    year: "2019 – 2023",
  },
  summary:
    "Knitwear design specialist with 2+ years of research-driven product development experience across Indian retail giants. Specialized in Menswear and Childrenswear (Boys & Girls), translating global trend forecasts into commercially viable collections, tech packs, and production-ready garment specs.",
  participations: [
    { title: "Craft Cluster Crochet Project, Goa", year: "2022", desc: "Explored artisanal crochet methods, community craft documentation, and contemporary knitwear translation." },
    { title: "Best T-shirt Design Award", year: "2020", desc: "Awarded 1st place in NIFT Spectrum design competition for innovative print graphics." },
    { title: "Adobe Creative Jam", year: "2020", desc: "Selected participant for high-paced digital visual design and storytelling challenge." },
  ],
  skills: [
    { name: "Trend Research & Forecasting", level: 95, desc: "Global trend synthesis, WGSN analysis, seasonal forecasting" },
    { name: "Moodboarding & Storytelling", level: 96, desc: "Visual conceptualization and evocative narrative building" },
    { name: "Color Theory & Palette Planning", level: 94, desc: "Pantone TPX/TCX matching, seasonal harmonizing, laboratory dip approvals" },
    { name: "Fabric Sensibility & Knit Structures", level: 98, desc: "Looper French terry, flat knits, jacquards, waffles, pique, mercerised cotton" },
    { name: "Range Planning & Assortment", level: 90, desc: "Volume drivers, core vs. fashion mix, margin optimization" },
    { name: "Print & Graphic Design", level: 92, desc: "Plastisol, puff print, high-density, flock, screen, and allover repeats" },
    { name: "3D Garment Visualization", level: 95, desc: "CLO 3D simulation, digital prototyping, drape and tension analysis" },
    { name: "Garment Construction & Tech Packs", level: 96, desc: "Factory-ready CAD flats, grade rules, BOMs, sewing specifications" },
    { name: "Cross-Functional Collaboration", level: 93, desc: "Liaison between buying, sampling, vendors, merchandising, and QC" },
  ],
  tools: [
    { name: "CLO 3D", category: "3D & Simulation", icon: "Box", note: "Digital knitwear modeling, virtual fittings, 3D turntable" },
    { name: "Adobe Illustrator", category: "Vector & Tech Packs", icon: "PenTool", note: "CAD technical drawings, repeat patterns, graphic badges" },
    { name: "Adobe Photoshop", category: "Graphics & Renders", icon: "Image", note: "Moodboards, fabric textures, photo-realistic mockups" },
    { name: "Adobe InDesign", category: "Editorial & Catalogs", icon: "Layout", note: "Buyer presentations, range books, line sheets" },
    { name: "Adobe After Effects", category: "Motion", icon: "Film", note: "Dynamic digital presentations, showcase reels" },
    { name: "Procreate", category: "Hand Illustration", icon: "Brush", note: "Expressive print concept sketching and trims" },
    { name: "PLM System", category: "Lifecycle Management", icon: "Database", note: "Full tech pack lifecycle, BOMs, vendor revision tracking" },
    { name: "Excel & Google Sheets", category: "Data & Costing", icon: "Table", note: "Costing breakdowns, order quant planning, trim matrices" },
  ],
  experience: [
    {
      role: "Assistant Manager / Kidswear (Boys & Girls)",
      company: "DMart (Avenue Supermarts Ltd.)",
      period: "September 2025 – Present",
      location: "Mumbai, India",
      achievements: [
        "Analyze trends and consumer purchasing patterns to curate high-volume seasonal assortments for boys' and girls' categories.",
        "Formulate creative design directions, mood boards, and balanced color palettes tailored to young demographic aesthetics.",
        "Design production-ready artworks, specialty trims, and factory tech packs ensuring premium finish at competitive retail margins.",
        "Liaise closely with sourcing, sampling, and vendor networks for zero-defect quality and on-schedule shipment delivery.",
      ],
    },
    {
      role: "Senior Executive / Menswear Designer",
      company: "Style Union",
      period: "July 2023 – September 2025",
      location: "Bangalore / Mumbai, India",
      achievements: [
        "Led creative direction and commercial product development for young menswear, driving the 'Never Blend In' brand ethos.",
        "Authored 9 comprehensive seasonal trend concepts: Retro Re-do, Nautical Island Boy, Serene Futurism, Tropadelic, etc.",
        "Architected core product ranges including Unisets (290 GSM cotton loopers), Hand Knit flat jerseys, and Smart Cuban mood shirts.",
        "Delivered 40+ factory tech packs with precise measurements, fabric structures, print techniques (HD, Puff, Suede), and PLM data.",
      ],
    },
    {
      role: "Graduation Project / Menswear",
      company: "Yousta | Reliance Retail Ltd.",
      period: "January 2023 – April 2023",
      location: "Mumbai, India",
      achievements: [
        "Supported pre-launch menswear development for Reliance Retail's youth fast-fashion brand Yousta.",
        "Designed youth-centric graphic artworks, streetwear silhouettes, and visual storyboards reflecting Gen Z consumer insights.",
        "Prepared detailed tech packs and coordinated with vendor factories for rapid sampling and collection launch.",
      ],
    },
    {
      role: "Summer Design Internship / Menswear",
      company: "KORU Design Tribe",
      period: "June 2022 – July 2022",
      location: "Mumbai, India",
      achievements: [
        "Assisted in seasonal collection development for marquee Indian menswear brands: Being Human, Black Buck, and Blue Buddha.",
        "Spearheaded street trend forecasting, moodboards, and tech pack drafting with mill-ready tolerances.",
      ],
    },
  ],
};

export const STYLE_UNION_TRENDS = [
  {
    id: "retro-redo",
    title: "Retro Re-do",
    sub: "Modern Smart | University",
    tagline: "Remake, recycle, repurpose — nostalgia of '70s & '90s varsity classics.",
    description:
      "A playful story that encapsulates the nostalgia of '70s and '90s classics. Authentic varsity looks get a collaged feel by pasting, slicing, and layering traditional fabrics and patterns. Eclectic pairing of sporty vintage finds with graphic reworked pieces gives heritage silhouettes an amped-up appeal.",
    fabrics: ["Retro Jacquard Knits", "Clean Crisp Wovens", "Allover Vintage Logos", "Nostalgic Stripes"],
    palette: [
      { name: "Cannoli Cream", code: "11-4302 TPX", hex: "#F4F0E8" },
      { name: "Apricot Crush", code: "15-1247 TPX", hex: "#F4845F" },
      { name: "Grey Melange", code: "Heather", hex: "#BDC3C7" },
      { name: "Malachite", code: "19-5421 TPX", hex: "#1B5E4A" },
      { name: "Crimson", code: "18-1657 TPX", hex: "#9E2A2B" },
      { name: "Black", code: "Pitch", hex: "#111111" },
    ],
  },
  {
    id: "nautical-island-boy",
    title: "Nautical Island Boy",
    sub: "Modern Smart | Holiday",
    tagline: "Hand-embroidered botanicals, geo terries, and seaside resort vibes.",
    description:
      "Fresh vacation storytelling celebrating sunlit coastlines. Features hand-painted island botanicals, breezy lightweight terry loopers, silhouette nautical sketches, and vibrant pop color stripe inserts on washed cotton denim.",
    fabrics: ["Geo Terries", "Hawaiian Print Rayon", "Clean Bright Cottons", "Hand Embroidered Cottons"],
    palette: [
      { name: "Golden Cob", code: "15-0947 TPX", hex: "#F5A623" },
      { name: "Cannoli Cream", code: "11-4302 TPX", hex: "#F4F0E8" },
      { name: "Sweet Mandarin", code: "16-1356 TPX", hex: "#E86F2D" },
      { name: "Adriatic Sea", code: "17-4440 TCX", hex: "#3A99D8" },
      { name: "Green Flare", code: "16-6340 TCX", hex: "#2E8B57" },
      { name: "Dress Blues", code: "17-4024 TPX", hex: "#1F2C46" },
    ],
  },
  {
    id: "serene-futurism",
    title: "Serene Futurism",
    sub: "Modern Active | Run",
    tagline: "Digital daydream, metaverse wellness, innovative quilting, and cosmic camo.",
    description:
      "An evolution of the Digital Daydream trend taking winter sports into summer adventures. A fantastical element remains, taking inspiration from the collision between digital and natural worlds in new metaverse wellness spaces like Alo Yoga's Roblox retreat.",
    fabrics: ["Innovative Quilting", "Reflective Windproofs", "Cosmic Camo Outerwear", "UV Block Thermals"],
    palette: [
      { name: "Cyber Lime", code: "13-0651 TPX", hex: "#D4FF00" },
      { name: "Orchid Petal", code: "14-3710 TPX", hex: "#D8BFD8" },
      { name: "Purple Swirl", code: "18-3533 TPX", hex: "#7E3F98" },
      { name: "Elemental Blue", code: "18-3922 TPX", hex: "#466995" },
      { name: "Black", code: "Solid", hex: "#111111" },
    ],
  },
  {
    id: "engineered-nature",
    title: "Engineered Nature",
    sub: "Modern Active | Train",
    tagline: "Eco-synthetics, outdoor protection, nylon tricot mesh, and technical utility.",
    description:
      "Products that help protect and strengthen our connection to the environment. Action-backed messages and modular pieces facilitate physical exploration through ripstop fabrics, water-resistant laminations, and technical honeycomb structures.",
    fabrics: ["Nylon Tricot Mesh", "Outdoor Fabric", "Water Resistant Finish", "Ripstop Weave"],
    palette: [
      { name: "Whitecap Grey", code: "12-0304 TPX", hex: "#E2E4E1" },
      { name: "Irish Cream", code: "14-1208 TPX", hex: "#D9C9B4" },
      { name: "Sweet Mandarin", code: "16-1356 TPX", hex: "#E86F2D" },
      { name: "Tidal Teal", code: "19-4324 TPX", hex: "#165868" },
      { name: "Black", code: "Solid", hex: "#111111" },
    ],
  },
  {
    id: "desert-nomad",
    title: "Desert Nomad",
    sub: "Modern Explorer | Free Spirit",
    tagline: "Crinkled linens, sun-baked terracotta, patchworked denim, and sun motifs.",
    description:
      "Earthy wanderlust inspired by arid canyons and terracotta sunsets. Features patchworked vintage denim, desert sun motif jerseys, blurry stripe cottons, and crinkled breathable linens for desert roadtrips.",
    fabrics: ["Tile Print Pyjamas", "Crinkled Linens", "Illustrated Sun Foliage", "Patchworked Denim"],
    palette: [
      { name: "Pineapple", code: "12-0736 TPX", hex: "#F3DA70" },
      { name: "Astro Dust", code: "17-1537 TPX", hex: "#9E4748" },
      { name: "Crimson", code: "18-1657 TPX", hex: "#8A2328" },
      { name: "Grit", code: "17-1036 TPX", hex: "#A68662" },
      { name: "Ground Coffee", code: "19-1109 TPX", hex: "#4B372B" },
    ],
  },
  {
    id: "preppy-outdoors",
    title: "Preppy Outdoors",
    sub: "Modern Explorer | Outdoorist",
    tagline: "Technical utility greens, loose knits, cargo shorts, and weather jackets.",
    description:
      "Synthesis of nature and technology through natural processes with scientific innovations. Functional utility styling with sprouting greens, earthy browns, and tech yellow tones that display a strong connection with the future of nature.",
    fabrics: ["Smart Closures", "Loose Knits", "Weather Jackets", "Textured Flat Knits"],
    palette: [
      { name: "Irish Cream", code: "14-1208 TPX", hex: "#D9C9B4" },
      { name: "Nutshell", code: "18-1140 TPX", hex: "#7E5835" },
      { name: "Olive Branch", code: "18-0527 TPX", hex: "#5E5F40" },
      { name: "Tidal Teal", code: "19-4324 TPX", hex: "#165868" },
      { name: "Black", code: "Solid", hex: "#111111" },
    ],
  },
  {
    id: "modern-mystic",
    title: "Modern Mystic",
    sub: "Modern Explorer | Machinist",
    tagline: "Fluid water movements, tactile waffle jacquards, and felted wools.",
    description:
      "Inspired by the structures of distant landscapes, fluid movements of water, and the raw transition of natural processes. Organic dyes, crinkled surfaces, and clubbed textures provide a flowing, layered silhouette with easy neutrals.",
    fabrics: ["BCI Ctn Lightweights", "Chic Waffles & Jacquards", "Lightweight Felted Wools", "Pyjama Silks"],
    palette: [
      { name: "Whitecap Grey", code: "12-0304 TPX", hex: "#E2E4E1" },
      { name: "Cornflower", code: "16-4030 TPX", hex: "#7DA7D9" },
      { name: "Nutshell", code: "18-1140 TPX", hex: "#7E5835" },
      { name: "Cappuccino", code: "19-1220 TPX", hex: "#634735" },
      { name: "Olive Branch", code: "18-0527 TPX", hex: "#5E5F40" },
    ],
  },
  {
    id: "tropadelic",
    title: "Tropadelic",
    sub: "Modern Street | Urban",
    tagline: "Amped-up tropics, digital gradient flora, mini geo jacquards, and dramatic dye denims.",
    description:
      "An evolution of s/s 23 Amped-Up Tropics trend inspired by a digital take on tropical flora and responsible tourism to exotic destinations driven by Gen Z youth culture.",
    fabrics: ["Mini Geo Jacquard", "Gradient Tropical Rayon", "Mesh Jersey & Knit", "Dramatic Dye Denims"],
    palette: [
      { name: "Adriatic Sea", code: "17-4440 TCX", hex: "#3A99D8" },
      { name: "Ultimate Gray", code: "17-5104 TPX", hex: "#939597" },
      { name: "Surf The Web", code: "19-3952 TPX", hex: "#233973" },
      { name: "Purple Swirl", code: "18-3533 TPX", hex: "#7E3F98" },
      { name: "Naval Academy", code: "19-3932 TPX", hex: "#1B283E" },
    ],
  },
  {
    id: "bohemian-alchemist",
    title: "Bohemian Alchemist",
    sub: "Modern Explorer | Free Spirit",
    tagline: "Nostalgic climbing 80s/90s, ombre ikats, embroidered poplins, and crinkled hemp.",
    description:
      "Taps into cosmic and spiritual references. Nostalgic climbing stars, bold heritage prints, crinkled hemp wovens, and ombre ikats popularized by 80s and 90s exploration culture.",
    fabrics: ["Embroidered Poplins", "Soulful Linen Shirtings", "Crinkled Hemp Wovens", "Ombre Ikats"],
    palette: [
      { name: "Sweet Mandarin", code: "16-1356 TPX", hex: "#E86F2D" },
      { name: "Pineapple", code: "12-0736 TPX", hex: "#F3DA70" },
      { name: "Cork", code: "16-1422 TPX", hex: "#BA8C63" },
      { name: "Green Fig", code: "15-6317 TPX", hex: "#98B585" },
      { name: "Dusted Grape", code: "19-3424 TPX", hex: "#5C3E57" },
    ],
  },
];

export const TECH_PACKS = [
  {
    id: "mht03-uniset-tee",
    code: "STYLE NO: MHT03",
    name: "Men's Dress to Impress Uniset Tee",
    division: "MENS, SEC: SMART, DEP: SMART TEES",
    fabric: "290 GSM (100% Cotton Looper Structure)",
    fit: "Relaxed Boxy / Drop Shoulder",
    prints: [
      "ESCAPE ROUTE 19°10'18\"N 72°51'21\"E (HD Print, 1.5\" from hem, 1\" from side seam)",
      "NOT JUST ANOTHER DAY (HD Print on sleeve hem)",
      "DON'T LIVE TOO FAST (Chest Graphic Box)",
      "MAKE GOOD MEMORIES WHEREVER YOU GO (Back chevron graphic)",
    ],
    details: "Contrast asymmetric color blocking, side split vents, high-density plastisol prints.",
    colors: ["Blue Nights (19-4023 TPX)", "Marshmallow (11-4300 TPX)", "Foxglove (16-1710 TPX)", "Tap Shoe (19-4004 TPX)"],
    tag: "Core Uniset",
  },
  {
    id: "mhs003-uniset-shorts",
    code: "STYLE NO: MHS003",
    name: "Men's Dress to Impress Uniset Shorts",
    division: "MENS, SEC: SMART, DEP: BOTTOMWEAR",
    fabric: "290 GSM (100% Cotton Looper)",
    fit: "Above Knee Comfort Fit",
    prints: [
      "ENJOY LIFE Ticket Badge (HD Print 1.5\" from hem)",
      "FILM REEL FRAME 1 (HD Print 1.5\" from hem)",
      "DON'T RUSH SLOW DOWN THINK LESS LIVE MORE (Checkered label badge)",
    ],
    details: "2.5\" contrast side diagonal panel, round braided drawcord with silicone dipped ends, welt pockets.",
    colors: ["Tap Shoe Black", "Coronet Blue (18-3932 TPX)", "Mistletoe (16-0220 TPX)", "Mulch (19-0910 TPX)"],
    tag: "Core Uniset",
  },
  {
    id: "nefk00001-hand-knit",
    code: "STYLE NO: NEFK00001",
    name: "Hand Knit Jersey Referee Shirt",
    division: "MENS, SEC: NERD, DEP: NERD FLAT KNITS",
    fabric: "100% Mercerised Cotton Flat Knit",
    fit: "Vintage Boxy Fit",
    prints: ["Embroidered Felt Badge 'FIND JOY IN THE MOMENT'", "Translucent Silicone Badge 'SWAY'"],
    details: "SR#9329 DTM 18L Vacay shirt buttons, open camp collar, vertical bold engineered stripes.",
    colors: ["Chocolate Torte (19-1109 TPG)", "Cloud Dancer (11-4201 TPG)", "Olivine (18-0316 TPG)"],
    tag: "Flat Knits",
  },
  {
    id: "nefk00004-zip-polo",
    code: "STYLE NO: NEFK00004",
    name: "Engineered Multi-Stripe Zip Placket Knit",
    division: "MENS, SEC: NERD, DEP: NERD FLAT KNITS",
    fabric: "100% Mercerised Cotton Engineered Stripe",
    fit: "Modern Regular Fit",
    prints: ["Woven Label Hand Knit Jersey M Edition"],
    details: "DTM exposed nylon zipper placket, rib collar, multi-color retro engineered vertical repeat.",
    colors: ["Warm Taupe & Cloud Dancer", "Moonless Night & Cloud Dancer"],
    tag: "Flat Knits",
  },
  {
    id: "smcs00039-cuban-mood",
    code: "STYLE NO: SMCS00039",
    name: "Smart Cuban Mood Shirt with Suede Label",
    division: "MENS, SEC: SMART, DEP: SMART SHIRTS",
    fabric: "Crochet / Emb Schiffly / Jacquard Placement",
    fit: "Cuban Resort Relaxed",
    prints: ["Suede Printed Label (4 Side Stitch): 'Isn't that crazy?'", "Woven Tab Label 'INSPIRED'"],
    details: "Engineered textured open-weave crochet body fabric, DTM horn buttons, breathable summer drape.",
    colors: ["Warm Taupe (16-1318 TPG)", "Cloud Dancer (11-4201 TPG)"],
    tag: "Cuban Mood",
  },
  {
    id: "gst-m-013-socially-awkward",
    code: "STYLE NO: GST-M-013",
    name: "Essentials Graphic Sweat: SOCIALLY AWKWARD",
    division: "MENS, SEC: ESSENTIALS, DEP: TOPWEAR",
    fabric: "240 GSM Looper (78% Cotton, 19% Poly, 3% Spandex)",
    fit: "Regular Streetwear Fit",
    prints: ["Plastisol Print (Skydiver 19-4151 TCX)", "Puff Print 3D (Blazing Yellow 12-0643 TCX)"],
    details: "Dual-technique 4-inch chest typography with tactile 3D puff texture.",
    colors: ["Smoke Gray (14-1209 TPG)"],
    tag: "Graphic Sweats",
  },
  {
    id: "gst-m-01-never-blend-in",
    code: "STYLE NO: GST-M-01",
    name: "Brand Manifesto Sweat: NEVER BLEND IN",
    division: "MENS, SEC: ESSENTIALS, DEP: TOPWEAR",
    fabric: "240 GSM Looper (78% Cotton, 19% Poly, 3% Spandex)",
    fit: "Regular Fit Crewneck",
    prints: ["Black Gel Print", "White HD Print", "Neon Green Plastisol Print Labyrinth"],
    details: "9-inch engineered chest back-to-front matrix graphic with Style Union hexagonal monogram.",
    colors: ["Moonless Night (19-4203 TPG)"],
    tag: "Graphic Sweats",
  },
  {
    id: "gst-m-05-dimension",
    code: "STYLE NO: GST-M-05",
    name: "Futurism Graphic Sweat: DIMENSION",
    division: "MENS, SEC: ESSENTIALS, DEP: TOPWEAR",
    fabric: "240 GSM Looper (78% Cotton, 19% Poly, 3% Spandex)",
    fit: "Regular Fit",
    prints: ["Triple Intersecting Wireframe Globe Spheres in Lucent White, Acid Lime, Orangeade, Raspberry"],
    details: "High-density multi-screen color print with subtle cyber grid coordinate markings.",
    colors: ["Mountain Spring (17-4019 TPG)"],
    tag: "Graphic Sweats",
  },
];
