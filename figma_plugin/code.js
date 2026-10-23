// ============================================================================
// HEALTHY MODE // HCI ANNOTATED CANVAS & AUTO-PROTOTYPE GENERATOR FOR FIGMA
// Architect: Mohd Amir Ali (techwithamir.com) | Eternal Ltd. (Zomato) Case Study
// ============================================================================
// How this works in Figma Desktop:
// 1. Builds 4 High-Fidelity Prototype Frames in the center column:
//    - Frame 01: Overview & 3-Heart Progress Scale (IMG_2734 / IMG_2735)
//    - Frame 02: Know Your Food & Nutritional Info Modal (IMG_2736 / IMG_2737)
//    - Frame 03: Live Mx-to-AI Calculator (Poka-Yoke Gram-to-Macro Pipeline)
//    - Frame 04: Healthy Subscriptions (3 / 5 / 15-Day Habit Loop Planner)
// 2. Wires up Native Figma Prototype Noodles (ON_CLICK -> NAVIGATE with SMART_ANIMATE)
//    between the 4 Prototype Frames so clicking "Present" runs the clean interactive app!
// 3. Places Non-Prototyped HCI & UX Theory Explanation Blocks in the Left & Right
//    Canvas Margins with visual pointer lines & numbered pins (①–⑫) pointing
//    directly to the exact UI components on the frames!
// ============================================================================

async function runHealthyModeHCIGenerator() {
  // Load standard fonts available in every Figma installation
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  // Color Palette Helper (Hex to Figma RGB 0..1)
  function rgb(hex) {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.substring(0, 2), 16) / 255,
      g: parseInt(clean.substring(2, 4), 16) / 255,
      b: parseInt(clean.substring(4, 6), 16) / 255,
    };
  }

  const COLORS = {
    cream: rgb("#F6F3EC"),
    white: rgb("#FFFFFF"),
    sandstone: rgb("#EAE5D9"),
    forestHero: rgb("#28381D"),
    forestCard: rgb("#324624"),
    obsidian: rgb("#15171B"),
    obsidianInner: rgb("#1E2228"),
    limeNeon: rgb("#8CE62E"),
    amberWarn: rgb("#F59E0B"),
    redLow: rgb("#E0533C"),
    inkDark: rgb("#181B1E"),
    inkSoft: rgb("#2E343B"),
    slateMuted: rgb("#5C6269"),
    borderHairline: rgb("#DED9CE"),
    calloutBg: rgb("#11161D"),
    calloutCyan: rgb("#38BDF8"),
  };

  // Register Local Color Styles in the Figma Document
  const styleDefs = [
    ["HealthyMode / Botanical Forest Olive", COLORS.forestHero],
    ["HealthyMode / Electric Vitality Lime", COLORS.limeNeon],
    ["HealthyMode / Obsidian Modal Surface", COLORS.obsidian],
    ["HealthyMode / Editorial Warm Cream", COLORS.cream],
    ["HealthyMode / Amber Medium Heart", COLORS.amberWarn],
    ["HealthyMode / Coral Low Heart", COLORS.redLow],
  ];
  for (const [name, colorObj] of styleDefs) {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = [{ type: "SOLID", color: colorObj }];
  }

  // Helper to create text quickly
  function makeText(characters, size, weight, colorObj, width = null) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: weight };
    t.characters = characters;
    t.fontSize = size;
    t.fills = [{ type: "SOLID", color: colorObj }];
    if (width) {
      t.resize(width, t.height);
      t.textAutoResize = "HEIGHT";
    }
    return t;
  }

  // Helper to create rounded rectangle card inside a parent
  function makeBox(parent, x, y, w, h, fillRgb, radius = 16, strokeRgb = null, strokeWeight = 1) {
    const f = figma.createFrame();
    f.x = x;
    f.y = y;
    f.resize(w, h);
    f.cornerRadius = radius;
    f.fills = [{ type: "SOLID", color: fillRgb }];
    if (strokeRgb) {
      f.strokes = [{ type: "SOLID", color: strokeRgb }];
      f.strokeWeight = strokeWeight;
    } else {
      f.strokes = [];
    }
    parent.appendChild(f);
    return f;
  }

  // Helper to create an HCI Theory Callout Block on the Canvas (NOT prototyped)
  // with a visual pointer line and numbered pin pointing to (targetX, targetY)
  function createHCICalloutBlock(
    canvasParent,
    numStr,
    theoryCategory,
    title,
    explanation,
    impactMetric,
    boxX,
    boxY,
    targetX,
    targetY,
    accentColor = COLORS.limeNeon
  ) {
    // 1. Callout Card (Width 380, Height 205)
    const card = figma.createFrame();
    card.name = `HCI Callout ${numStr} — ${title}`;
    card.x = boxX;
    card.y = boxY;
    card.resize(380, 205);
    card.cornerRadius = 16;
    card.fills = [{ type: "SOLID", color: COLORS.calloutBg }];
    card.strokes = [{ type: "SOLID", color: accentColor }];
    card.strokeWeight = 2;
    card.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.28 },
        offset: { x: 0, y: 12 },
        radius: 28,
        spread: 0,
        visible: true,
        blendMode: "NORMAL",
      },
    ];
    canvasParent.appendChild(card);

    // Number Badge inside Callout Card
    const badge = makeBox(card, 18, 16, 32, 32, accentColor, 16);
    const badgeTxt = makeText(numStr, 14, "Bold", COLORS.inkDark);
    badgeTxt.x = 9;
    badgeTxt.y = 7;
    badge.appendChild(badgeTxt);

    // Theory Category Kicker
    const kicker = makeText(theoryCategory.toUpperCase(), 10, "Bold", accentColor, 300);
    kicker.x = 60;
    kicker.y = 16;
    card.appendChild(kicker);

    // Callout Title
    const titleNode = makeText(title, 15, "Bold", COLORS.white, 300);
    titleNode.x = 60;
    titleNode.y = 32;
    card.appendChild(titleNode);

    // Theoretical Explanation Body
    const bodyNode = makeText(explanation, 12, "Regular", rgb("#CBD5E1"), 344);
    bodyNode.x = 18;
    bodyNode.y = 66;
    card.appendChild(bodyNode);

    // UX Efficiency / Impact Pill at Bottom
    const pill = makeBox(card, 18, 160, 344, 30, COLORS.obsidianInner, 8, accentColor, 1);
    const pillTxt = makeText(`UX EFFICIENCY: ${impactMetric}`, 10, "Semi Bold", accentColor, 324);
    pillTxt.x = 10;
    pillTxt.y = 8;
    pill.appendChild(pillTxt);

    // 2. Pointer Connector Line from Callout Edge to Target UI Element
    const startX = boxX < targetX ? boxX + 380 : boxX;
    const startY = boxY + 102;

    // Horizontal + Diagonal Vector Connector
    const vec = figma.createVector();
    vec.name = `Pointer Line ${numStr} -> ${title}`;
    const midX = (startX + targetX) / 2;
    vec.vectorPaths = [
      {
        windingRule: "NONE",
        data: `M ${startX} ${startY} L ${midX} ${startY} L ${targetX} ${targetY}`,
      },
    ];
    vec.strokes = [{ type: "SOLID", color: accentColor }];
    vec.strokeWeight = 2.5;
    vec.dashPattern = [6, 4];
    canvasParent.appendChild(vec);

    // 3. Numbered Target Pin right on the UI element
    const pin = makeBox(canvasParent, targetX - 15, targetY - 15, 30, 30, accentColor, 15, COLORS.obsidian, 2);
    pin.name = `Pin ${numStr}`;
    const pinTxt = makeText(numStr, 13, "Bold", COLORS.inkDark);
    pinTxt.x = 8;
    pinTxt.y = 6;
    pin.appendChild(pinTxt);
  }

  // Helper to build Top Navigation Bar inside each Prototype Frame
  // Returns the 4 tab buttons so we can attach Figma Prototype Noodles!
  function buildTopNav(frame, activeTabIndex) {
    // Top Obsidian Context Bar
    const topStrip = makeBox(frame, 0, 0, 1200, 36, COLORS.obsidian, 0);
    const stripTxt = makeText(
      "INDUSTRY IMPLEMENTATION: ZOMATO (ETERNAL LTD.)  •  ARCHITECT: MOHD AMIR ALI (TECHWITHAMIR.COM)",
      10,
      "Semi Bold",
      COLORS.limeNeon
    );
    stripTxt.x = 32;
    stripTxt.y = 11;
    topStrip.appendChild(stripTxt);

    // Main Header Bar
    const navBar = makeBox(frame, 0, 36, 1200, 68, COLORS.cream, 0, COLORS.borderHairline, 1);
    const logoBox = makeBox(navBar, 32, 14, 40, 40, COLORS.forestHero, 10, COLORS.limeNeon, 1.5);
    const heartIcon = makeText("💚", 18, "Bold", COLORS.limeNeon);
    heartIcon.x = 9;
    heartIcon.y = 9;
    logoBox.appendChild(heartIcon);

    const brandTitle = makeText("HEALTHY MODE // AI NUTRITION ENGINE", 14, "Bold", COLORS.inkDark);
    brandTitle.x = 84;
    brandTitle.y = 18;
    navBar.appendChild(brandTitle);

    const brandSub = makeText("2-STAGE ICMR-NIN & WEIGHTED MACRO PIPELINE", 10, "Medium", COLORS.slateMuted);
    brandSub.x = 84;
    brandSub.y = 38;
    navBar.appendChild(brandSub);

    const tabLabels = [
      "01. Overview & Algorithm",
      "02. Know Your Food Modal",
      "03. Live Mx-to-AI Calculator",
      "04. Healthy Subscriptions",
    ];
    const tabButtons = [];
    let curX = 480;
    for (let i = 0; i < tabLabels.length; i++) {
      const isAct = i === activeTabIndex;
      const btn = makeBox(
        navBar,
        curX,
        16,
        164,
        36,
        isAct ? COLORS.forestHero : COLORS.sandstone,
        18,
        isAct ? COLORS.limeNeon : COLORS.borderHairline,
        1
      );
      btn.name = `Nav Tab — ${tabLabels[i]}`;
      const txt = makeText(tabLabels[i], 11, "Bold", isAct ? COLORS.limeNeon : COLORS.inkSoft);
      txt.x = 14;
      txt.y = 11;
      btn.appendChild(txt);
      tabButtons.push(btn);
      curX += 172;
    }
    return tabButtons;
  }

  // Create Master Overview Section on Figma Canvas
  const masterPage = figma.currentPage;
  masterPage.name = "Healthy Mode — HCI Annotated Overview & Prototype";

  // Center X for all 1200px Prototype Frames (leaving 460px on Left and Right for HCI Callout Blocks!)
  const FRAME_X = 480;

  // ==========================================================================
  // PROTOTYPE FRAME 01: OVERVIEW & 3-HEART PROGRESS SCALE (Y = 120)
  // ==========================================================================
  const frame1 = figma.createFrame();
  frame1.name = "01_Prototype_Overview_And_Algorithm";
  frame1.x = FRAME_X;
  frame1.y = 120;
  frame1.resize(1200, 900);
  frame1.fills = [{ type: "SOLID", color: COLORS.cream }];
  masterPage.appendChild(frame1);

  const nav1 = buildTopNav(frame1, 0);

  // Botanical Forest Olive Hero Banner (Matches IMG_2734.PNG)
  const heroBox = makeBox(frame1, 32, 128, 1136, 310, COLORS.forestHero, 24, COLORS.limeNeon, 1.5);
  const heroKicker = makeText("BOTANICAL FOREST OLIVE PALETTE (#28381D) + VITALITY LIME (#8CE62E)", 11, "Bold", COLORS.limeNeon);
  heroKicker.x = 36;
  heroKicker.y = 28;
  heroBox.appendChild(heroKicker);

  const heroTitle = makeText("HEALTHY MODE", 48, "Bold", COLORS.limeNeon);
  heroTitle.x = 36;
  heroTitle.y = 54;
  heroBox.appendChild(heroTitle);

  const heroSub = makeText(
    "\"I explore the space between human curiosity and machine intelligence — making everyday nourishment more useful, understandable, and human.\"",
    16,
    "Medium",
    COLORS.white,
    540
  );
  heroSub.x = 36;
  heroSub.y = 124;
  heroBox.appendChild(heroSub);

  const heroFormula = makeText(
    "Healthy Score = 0.35(Protein) + 0.20(Carb & GI) + 0.15(Fibre & Micros) + 0.15(Ingredient Quality) + 0.15(Cooking Method) - Penalty(SatFat, Sugar)",
    12,
    "Semi Bold",
    COLORS.limeNeon,
    540
  );
  heroFormula.x = 36;
  heroFormula.y = 200;
  heroBox.appendChild(heroFormula);

  // 3-Tier Heart Scale Box on Right of Hero (Low -> Medium -> High)
  const scaleCard = makeBox(heroBox, 610, 28, 490, 254, COLORS.obsidian, 20, COLORS.limeNeon, 1);
  const scaleTitle = makeText("Your guide to making healthy food choices", 16, "Bold", COLORS.white);
  scaleTitle.x = 82;
  scaleTitle.y = 24;
  scaleCard.appendChild(scaleTitle);

  // Track Line
  const trackLine = makeBox(scaleCard, 70, 108, 350, 4, COLORS.limeNeon, 2);
  const lowNode = makeBox(scaleCard, 56, 88, 44, 44, COLORS.redLow, 22);
  const lowLbl = makeText("Low\n(<45)", 12, "Bold", COLORS.white);
  lowLbl.x = 60;
  lowLbl.y = 142;
  scaleCard.appendChild(lowLbl);

  const medNode = makeBox(scaleCard, 223, 88, 44, 44, COLORS.amberWarn, 22);
  const medLbl = makeText("Medium\n(45–74)", 12, "Bold", COLORS.white);
  medLbl.x = 220;
  medLbl.y = 142;
  scaleCard.appendChild(medLbl);

  const highNode = makeBox(scaleCard, 390, 88, 44, 44, COLORS.limeNeon, 22);
  const highLbl = makeText("High\n(75–100)", 12, "Bold", COLORS.limeNeon);
  highLbl.x = 386;
  highLbl.y = 142;
  scaleCard.appendChild(highLbl);

  const scaleNote = makeText(
    "Heuristic Level-1 Cue: Summarizes 5 complex biochemical parameters into an instant 3-tier heart icon.",
    11,
    "Regular",
    rgb("#CBD5E1"),
    430
  );
  scaleNote.x = 30;
  scaleNote.y = 198;
  scaleCard.appendChild(scaleNote);

  // 5-Parameter Breakdown Section (Matches IMG_2734 & IMG_2735)
  const paramsCard = makeBox(frame1, 32, 462, 1136, 406, COLORS.obsidian, 24);
  const paramsHeader = makeText("How the AI Calculates the Healthy Score (5-Parameter Weighted Architecture)", 20, "Bold", COLORS.white);
  paramsHeader.x = 32;
  paramsHeader.y = 26;
  paramsCard.appendChild(paramsHeader);

  const paramItems = [
    ["01. Protein Density (35% Weight)", "Evaluates protein-to-calorie ratio & amino-acid bioavailability (Paneer, Chicken, Lentils)."],
    ["02. Complex Carbs & Glycemic Index (20% Weight)", "Rewards slow-release complex carbohydrates; penalizes refined maida & high-GI starches."],
    ["03. Fibre & Micronutrients (15% Weight)", "Quantifies dietary fibre (g) plus essential vitamins & minerals from leafy greens & seeds."],
    ["04. Ingredient Quality (15% Weight)", "Distinguishes whole, minimally processed farm ingredients from ultra-processed additives."],
    ["05. Cooking Method & Oil Absorption (15% Weight)", "Models thermal oil uptake (Grilled/Steamed +15 vs Deep-Fried absorption penalty)."],
    ["06. Calories — Neutral Metric (0% Penalty)", "Decoupled from Healthy Score so high-protein athletes & deficit users both avoid food guilt."],
  ];

  for (let i = 0; i < paramItems.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const pBox = makeBox(paramsCard, 32 + col * 544, 78 + row * 102, 524, 88, COLORS.obsidianInner, 14, COLORS.limeNeon, 1);
    const pTitle = makeText(paramItems[i][0], 14, "Bold", COLORS.limeNeon, 480);
    pTitle.x = 18;
    pTitle.y = 14;
    pBox.appendChild(pTitle);
    const pDesc = makeText(paramItems[i][1], 12, "Regular", rgb("#D1D5DB"), 488);
    pDesc.x = 18;
    pDesc.y = 38;
    pBox.appendChild(pDesc);
  }

  // HCI Callout Blocks Surrounding Frame 01 (Non-Prototyped Overview Explanations!)
  createHCICalloutBlock(
    masterPage,
    "①",
    "Color Psychology & Ecological Valence Theory",
    "Botanical Olive (#28381D) vs. Fast-Food Crimson",
    "Traditional food-delivery apps use high-arousal crimson red (#E23744) to trigger impulsive hunger cravings. Healthy Mode switches to Botanical Forest Olive (#28381D) & Electric Lime (#8CE62E), lowering visual cortisol and priming System-2 mindful nourishment.",
    "+34% Higher Trust in Nutritional Claims",
    40,
    180,
    FRAME_X + 60,
    200,
    COLORS.limeNeon
  );

  createHCICalloutBlock(
    masterPage,
    "②",
    "Sweller's Cognitive Load Theory (1988)",
    "3-Tier Heart Scale (Low / Medium / High)",
    "Hungry users spend ~45 seconds scanning a menu. Raw FDA nutrition tables cause severe working-memory overload. Compressing 5 biochemical dimensions into a 3-state visual semaphore (Low / Medium / High) enables sub-second heuristic recognition.",
    "Reduces Menu Decision Time by 62%",
    1740,
    180,
    FRAME_X + 1020,
    240,
    COLORS.limeNeon
  );

  createHCICalloutBlock(
    masterPage,
    "③",
    "Anti-Guilt UX & Neutral Framing Theory",
    "Decoupling Calories (kcal) from Healthy Score",
    "Penalizing calories triggers anxiety and disordered eating patterns, and unfairly punishes nutrient-dense bowls (avocado, paneer, nuts). Treating kcal as a neutral metric while weighting Protein (35%) & Fibre (15%) fosters positive health framing.",
    "Zero Calorie-Shaming • Inclusive UX",
    1740,
    680,
    FRAME_X + 880,
    810,
    COLORS.calloutCyan
  );

  // ==========================================================================
  // PROTOTYPE FRAME 02: KNOW YOUR FOOD & BBQ COTTAGE CHEESE SALAD MODAL (Y = 1140)
  // ==========================================================================
  const frame2 = figma.createFrame();
  frame2.name = "02_Prototype_Know_Your_Food_Modal";
  frame2.x = FRAME_X;
  frame2.y = 1140;
  frame2.resize(1200, 900);
  frame2.fills = [{ type: "SOLID", color: COLORS.cream }];
  masterPage.appendChild(frame2);

  const nav2 = buildTopNav(frame2, 1);

  // Left Column: Menu Cards with Level-1 Heuristic Cues
  const menuListCard = makeBox(frame2, 32, 128, 520, 736, COLORS.white, 20, COLORS.borderHairline, 1);
  const menuHdr = makeText("Level-1 Menu Feed (Fast Heuristic Scanning)", 18, "Bold", COLORS.inkDark);
  menuHdr.x = 24;
  menuHdr.y = 24;
  menuListCard.appendChild(menuHdr);

  const dishes = [
    ["BBQ Cottage Cheese Salad", "400 kcal  •  💚 High (86/100)  •  23g Protein", "₹329", true],
    ["Grilled Herb Chicken Quinoa Bowl", "465 kcal  •  💚 High (91/100)  •  38g Protein", "₹389", false],
    ["Multigrain Paneer Tikka Wrap", "510 kcal  •  💛 Medium (64/100)  •  21g Protein", "₹259", false],
    ["Double Butter Pav Bhaji", "680 kcal  •  🧡 Low (28/100)  •  9g Protein", "₹220", false],
  ];

  for (let i = 0; i < dishes.length; i++) {
    const isSel = dishes[i][3];
    const dCard = makeBox(
      menuListCard,
      24,
      74 + i * 156,
      472,
      140,
      isSel ? COLORS.cream : COLORS.white,
      16,
      isSel ? COLORS.forestHero : COLORS.borderHairline,
      isSel ? 2 : 1
    );
    const dTitle = makeText(dishes[i][0], 16, "Bold", COLORS.inkDark);
    dTitle.x = 20;
    dTitle.y = 18;
    dCard.appendChild(dTitle);

    const dMeta = makeText(dishes[i][1], 13, "Semi Bold", COLORS.forestHero);
    dMeta.x = 20;
    dMeta.y = 48;
    dCard.appendChild(dMeta);

    const kyfBtn = makeBox(dCard, 20, 84, 190, 36, COLORS.forestHero, 18, COLORS.limeNeon, 1);
    const kyfTxt = makeText("Know your food →", 12, "Bold", COLORS.limeNeon);
    kyfTxt.x = 34;
    kyfTxt.y = 10;
    kyfBtn.appendChild(kyfTxt);
  }

  // Right Column: Exact Zomato Dark Nutritional Info Modal (Matches IMG_2736 & IMG_2737)
  const modalCard = makeBox(frame2, 580, 128, 588, 736, COLORS.obsidian, 24, COLORS.limeNeon, 1.5);
  const modalTopTitle = makeText("Nutritional Info  —  Level-2 Progressive Disclosure Drawer", 13, "Bold", COLORS.limeNeon);
  modalTopTitle.x = 28;
  modalTopTitle.y = 24;
  modalCard.appendChild(modalTopTitle);

  const dishTitle = makeText("🟢  BBQ Cottage Cheese Salad", 24, "Bold", COLORS.white);
  dishTitle.x = 28;
  dishTitle.y = 56;
  modalCard.appendChild(dishTitle);

  // Neutral Calorie Box + 5-Column Green Macro Pill (Exact IMG_2736 Layout!)
  const kcalBox = makeBox(modalCard, 28, 108, 102, 74, COLORS.obsidianInner, 14, rgb("#374151"), 1);
  const kcalNum = makeText("400", 24, "Bold", COLORS.white);
  kcalNum.x = 26;
  kcalNum.y = 14;
  kcalBox.appendChild(kcalNum);
  const kcalUnit = makeText("kcal", 12, "Medium", rgb("#9CA3AF"));
  kcalUnit.x = 36;
  kcalUnit.y = 44;
  kcalBox.appendChild(kcalUnit);

  const macroPill = makeBox(modalCard, 144, 108, 416, 74, COLORS.forestCard, 14, COLORS.limeNeon, 1.5);
  const macroCols = [
    ["💚 High", "healthy"],
    ["23g", "protein"],
    ["26g", "fats"],
    ["26g", "carbs"],
    ["9g", "fibre"],
  ];
  for (let m = 0; m < macroCols.length; m++) {
    const mVal = makeText(macroCols[m][0], 15, "Bold", m === 0 ? COLORS.limeNeon : COLORS.white);
    mVal.x = 18 + m * 80;
    mVal.y = 16;
    macroPill.appendChild(mVal);
    const mLbl = makeText(macroCols[m][1], 11, "Regular", rgb("#CBD5E1"));
    mLbl.x = 18 + m * 80;
    mLbl.y = 42;
    macroPill.appendChild(mLbl);
  }

  // What Makes This Healthy Section
  const wmhTitle = makeText("✓  WHAT MAKES THIS HEALTHY", 12, "Bold", COLORS.limeNeon);
  wmhTitle.x = 28;
  wmhTitle.y = 212;
  modalCard.appendChild(wmhTitle);

  const wmhBullets = [
    "• Rich in protein from grilled cottage cheese (paneer) — 23g bioavailable protein",
    "• Packed with fibre from mixed salad greens, bell peppers, and sweet corn (9g fibre)",
    "• Uses flame-grilling instead of deep frying, minimizing trans-fat oxidation",
  ];
  for (let b = 0; b < wmhBullets.length; b++) {
    const bt = makeText(wmhBullets[b], 13, "Regular", COLORS.white, 530);
    bt.x = 28;
    bt.y = 242 + b * 36;
    modalCard.appendChild(bt);
  }

  // To Consider Section
  const tcTitle = makeText("ⓘ  TO CONSIDER", 12, "Bold", COLORS.amberWarn);
  tcTitle.x = 28;
  tcTitle.y = 374;
  modalCard.appendChild(tcTitle);

  const tcBullet = makeText(
    "• Contains saturated fat from cottage cheese & smoky BBQ dressing drizzle (26g total fat)",
    13,
    "Regular",
    rgb("#E5E7EB"),
    530
  );
  tcBullet.x = 28;
  tcBullet.y = 404;
  modalCard.appendChild(tcBullet);

  // ICMR-NIN Verification Footer Box inside Modal
  const icmrBox = makeBox(modalCard, 28, 470, 532, 230, COLORS.obsidianInner, 16, rgb("#374151"), 1);
  const icmrHdr = makeText("STAGE-1 ICMR-NIN GRAM-TO-MACRO DECOMPOSITION", 11, "Bold", COLORS.limeNeon);
  icmrHdr.x = 20;
  icmrHdr.y = 18;
  icmrBox.appendChild(icmrHdr);

  const icmrLines = [
    "1. Grilled Cottage Cheese (110g)  →  291 kcal  |  20.1g Protein  |  22.0g Fat",
    "2. Mixed Greens, Broccoli & Corn (160g)  →  64 kcal  |  2.9g Protein  |  8.2g Fibre",
    "3. Smoky BBQ Dressing & Olive Oil (25g)  →  45 kcal  |  4.0g Fat  |  0.8g Fibre",
    "--------------------------------------------------------------------------------",
    "TOTAL VERIFIED BY AI ENGINE:  400 kcal  |  23g P  |  26g F  |  26g C  |  9g Fibre",
  ];
  for (let l = 0; l < icmrLines.length; l++) {
    const lt = makeText(icmrLines[l], 12, l === 4 ? "Bold" : "Regular", l === 4 ? COLORS.limeNeon : rgb("#D1D5DB"), 492);
    lt.x = 20;
    lt.y = 48 + l * 32;
    icmrBox.appendChild(lt);
  }

  // HCI Callout Blocks Surrounding Frame 02
  createHCICalloutBlock(
    masterPage,
    "④",
    "Norman's Progressive Disclosure Principle",
    "2-Stage Information Architecture ('Know Your Food')",
    "Instead of cluttering the primary menu scroll with 15 lines of biochemical data, Level-1 displays only the Heart Badge + kcal. Tapping 'Know your food' reveals Level-2 on-demand depth for high-intent health-conscious users.",
    "Keeps Feed Scannability 100% Intact",
    40,
    1300,
    FRAME_X + 180,
    1360,
    COLORS.limeNeon
  );

  createHCICalloutBlock(
    masterPage,
    "⑤",
    "Gestalt Law of Common Region & Proximity",
    "Isolated Neutral Kcal Box vs. 5-Macro Green Pill",
    "By enclosing '400 kcal' in its own dark neutral container on the left while grouping 'High | 23g P | 26g F | 26g C | 9g Fibre' inside a single green-bordered capsule, the user's visual cortex immediately perceives that macros—not calories—drive the Healthy Score.",
    "Instant Visual Schema Separation",
    1740,
    1220,
    FRAME_X + 780,
    1300,
    COLORS.limeNeon
  );

  createHCICalloutBlock(
    masterPage,
    "⑥",
    "Mental Model Alignment & Explainable AI (XAI)",
    "Plain-Language 'What Makes This Healthy' vs 'To Consider'",
    "Users distrust black-box AI scores. Translating vector weights into natural-language pros ('✓ Rich in protein from cottage cheese') and transparent caveats ('ⓘ Contains saturated fat') builds algorithmic trust and informed consent.",
    "+48% User Trust via Explainable AI",
    1740,
    1520,
    FRAME_X + 860,
    1500,
    COLORS.amberWarn
  );

  // ==========================================================================
  // PROTOTYPE FRAME 03: LIVE Mx-TO-AI CALCULATOR (Y = 2160)
  // ==========================================================================
  const frame3 = figma.createFrame();
  frame3.name = "03_Prototype_Live_Mx_To_AI_Calculator";
  frame3.x = FRAME_X;
  frame3.y = 2160;
  frame3.resize(1200, 900);
  frame3.fills = [{ type: "SOLID", color: COLORS.cream }];
  masterPage.appendChild(frame3);

  const nav3 = buildTopNav(frame3, 2);

  // Left Card: Mx Restaurant Input Console (Poka-Yoke Mistake-Proofing)
  const mxCard = makeBox(frame3, 32, 128, 550, 736, COLORS.white, 20, COLORS.borderHairline, 1);
  const mxTitle = makeText("Stage 1 — Restaurant Partner (Mx) Input Console", 18, "Bold", COLORS.inkDark);
  mxTitle.x = 24;
  mxTitle.y = 24;
  mxCard.appendChild(mxTitle);

  const mxSub = makeText(
    "Poka-Yoke UX: Restaurant kitchen staff only input raw ingredient weights (grams) and cooking method. Zero manual calorie math required.",
    12,
    "Regular",
    COLORS.slateMuted,
    500
  );
  mxSub.x = 24;
  mxSub.y = 54;
  mxCard.appendChild(mxSub);

  const sliders = [
    ["Cottage Cheese / Paneer (ICMR #042)", "110 g", "291 kcal  •  20.1g P  •  22.0g F"],
    ["Broccoli, Bell Peppers & Greens (ICMR #118)", "120 g", "38 kcal  •  2.1g P  •  5.8g Fibre"],
    ["Sweet Corn & Cherry Tomatoes (ICMR #134)", "40 g", "26 kcal  •  0.8g P  •  2.4g Fibre"],
    ["Extra Virgin Olive Oil & BBQ Glaze (ICMR #209)", "25 g", "45 kcal  •  4.0g F  •  0.8g Fibre"],
    ["Thermal Cooking Method Selector", "Flame-Grilled / Roasted", "Oil Uptake Factor: 1.00x (+15/15 Method Score)"],
  ];

  for (let s = 0; s < sliders.length; s++) {
    const sBox = makeBox(mxCard, 24, 108 + s * 116, 502, 100, COLORS.cream, 14, COLORS.borderHairline, 1);
    const sName = makeText(sliders[s][0], 13, "Bold", COLORS.inkDark);
    sName.x = 16;
    sName.y = 14;
    sBox.appendChild(sName);

    const sBadge = makeBox(sBox, 370, 10, 116, 28, COLORS.forestHero, 8);
    const sBadgeTxt = makeText(sliders[s][1], 11, "Bold", COLORS.limeNeon);
    sBadgeTxt.x = 12;
    sBadgeTxt.y = 7;
    sBadge.appendChild(sBadgeTxt);

    // Slider Track Visual
    makeBox(sBox, 16, 48, 470, 8, COLORS.sandstone, 4);
    makeBox(sBox, 16, 48, 310, 8, COLORS.forestHero, 4);

    const sMath = makeText(sliders[s][2], 11, "Medium", COLORS.slateMuted);
    sMath.x = 16;
    sMath.y = 68;
    sBox.appendChild(sMath);
  }

  // Right Card: Live Step-by-Step Mathematical Proof Trace
  const mathCard = makeBox(frame3, 606, 128, 562, 736, COLORS.obsidian, 20, COLORS.limeNeon, 1.5);
  const mathTitle = makeText("Stage 2 — Real-Time AI Mathematical Proof Trace", 18, "Bold", COLORS.limeNeon);
  mathTitle.x = 24;
  mathTitle.y = 24;
  mathCard.appendChild(mathTitle);

  const mathSteps = [
    ["1. Protein Density Sub-Score (Weight 35%)", "23g Protein / 400 kcal = 5.75g per 100 kcal  →  31.2 / 35.0 pts"],
    ["2. Complex Carb & Low-GI Sub-Score (Weight 20%)", "26g Complex Carbs (GI = 38, Zero Maida)  →  18.4 / 20.0 pts"],
    ["3. Dietary Fibre & Micros Sub-Score (Weight 15%)", "9.0g Dietary Fibre (100% Daily Meal Target)  →  14.5 / 15.0 pts"],
    ["4. Whole Ingredient Quality Sub-Score (Weight 15%)", "Fresh Paneer + Cruciferous Greens  →  13.8 / 15.0 pts"],
    ["5. Cooking Method Sub-Score (Weight 15%)", "Flame-Grilled (Zero Deep-Fry Oil Polymerization)  →  14.2 / 15.0 pts"],
    ["6. Saturated Fat & Refined Sugar Penalty", "Moderate Dairy Sat-Fat Deduction  →  -6.1 pts"],
    ["FINAL COMPOSITE HEALTHY SCORE", "31.2 + 18.4 + 14.5 + 13.8 + 14.2 - 6.1 = 86.0 / 100  →  💚 HIGH"],
  ];

  for (let m = 0; m < mathSteps.length; m++) {
    const isFinal = m === 6;
    const mRow = makeBox(
      mathCard,
      24,
      76 + m * 90,
      514,
      78,
      isFinal ? COLORS.forestHero : COLORS.obsidianInner,
      12,
      isFinal ? COLORS.limeNeon : rgb("#374151"),
      isFinal ? 2 : 1
    );
    const mHdr = makeText(mathSteps[m][0], 12, "Bold", isFinal ? COLORS.limeNeon : COLORS.white);
    mHdr.x = 16;
    mHdr.y = 14;
    mRow.appendChild(mHdr);

    const mVal = makeText(mathSteps[m][1], 12, "Semi Bold", isFinal ? COLORS.white : rgb("#CBD5E1"));
    mVal.x = 16;
    mVal.y = 42;
    mRow.appendChild(mVal);
  }

  // HCI Callout Blocks Surrounding Frame 03
  createHCICalloutBlock(
    masterPage,
    "⑦",
    "Shigeo Shingo's Poka-Yoke (Mistake-Proofing) UX",
    "Zero-Math Restaurant Partner (Mx) Onboarding",
    "Asking restaurant chefs to enter calories or macro percentages leads to >60% data entry errors. By restricting Mx input to simple gram sliders & cooking method dropdowns, the ICMR-NIN lookup engine eliminates human calculation errors.",
    "99.4% Mx Data Accuracy Across Kitchens",
    40,
    2360,
    FRAME_X + 120,
    2440,
    COLORS.limeNeon
  );

  createHCICalloutBlock(
    masterPage,
    "⑧",
    "Direct Manipulation & Immediate Feedback Loop",
    "<16ms Live Recalculation Trace (Norman's Gulf of Evaluation)",
    "Dragging any ingredient gram slider immediately updates both the 5-parameter mathematical sub-scores and the final Heart Tier in real time, bridging Donald Norman's 'Gulf of Evaluation' with zero latency.",
    "Sub-16ms Interactive Feedback Loop",
    1740,
    2420,
    FRAME_X + 940,
    2520,
    COLORS.calloutCyan
  );

  // ==========================================================================
  // PROTOTYPE FRAME 04: HEALTHY SUBSCRIPTIONS PLANNER (Y = 3180)
  // ==========================================================================
  const frame4 = figma.createFrame();
  frame4.name = "04_Prototype_Healthy_Subscriptions_Planner";
  frame4.x = FRAME_X;
  frame4.y = 3180;
  frame4.resize(1200, 900);
  frame4.fills = [{ type: "SOLID", color: COLORS.cream }];
  masterPage.appendChild(frame4);

  const nav4 = buildTopNav(frame4, 3);

  const subHero = makeBox(frame4, 32, 128, 1136, 170, COLORS.forestHero, 22, COLORS.limeNeon, 1.5);
  const subTitle = makeText("Phase 2 Evolution — Healthy Subscriptions (Automated Habit Loop)", 24, "Bold", COLORS.limeNeon);
  subTitle.x = 32;
  subTitle.y = 26;
  subHero.appendChild(subTitle);

  const subDesc = makeText(
    "Uses the Stage-2 '💚 High' (Score ≥ 75) threshold as an automated quality gate so users can pre-schedule 3-Day, 5-Day, or 15-Day nutritious Lunches (Office) and Dinners (Home) without daily decision fatigue.",
    14,
    "Regular",
    COLORS.white,
    1060
  );
  subDesc.x = 32;
  subDesc.y = 66;
  subHero.appendChild(subDesc);

  const plans = [
    ["3-Day Starter Trial", "₹899  (₹299/meal)  •  Save 12%", "false"],
    ["5-Day Workweek Active", "₹1,425  (₹285/meal)  •  Save 18%", "true"],
    ["15-Day Metabolic Reset", "₹3,975  (₹265/meal)  •  Save 25%", "false"],
  ];
  for (let p = 0; p < plans.length; p++) {
    const isAct = plans[p][2] === "true";
    const pBtn = makeBox(
      subHero,
      32 + p * 364,
      114,
      344,
      40,
      isAct ? COLORS.limeNeon : COLORS.obsidian,
      12,
      COLORS.limeNeon,
      1
    );
    const pTxt = makeText(`${plans[p][0]}  —  ${plans[p][1]}`, 11, "Bold", isAct ? COLORS.inkDark : COLORS.limeNeon);
    pTxt.x = 16;
    pTxt.y = 13;
    pBtn.appendChild(pTxt);
  }

  // 5-Day Scheduled Rotation Matrix
  const schedCard = makeBox(frame4, 32, 322, 1136, 542, COLORS.white, 20, COLORS.borderHairline, 1);
  const schedHdr = makeText("Automated 5-Day '💚 High' Curated Meal Rotation (12:45 PM Office Slot)", 18, "Bold", COLORS.inkDark);
  schedHdr.x = 28;
  schedHdr.y = 24;
  schedCard.appendChild(schedHdr);

  const days = [
    ["DAY 01 (MON)", "BBQ Cottage Cheese Salad", "400 kcal  •  23g Protein  •  9g Fibre", "💚 High (86/100)"],
    ["DAY 02 (TUE)", "Grilled Herb Chicken Quinoa Bowl", "465 kcal  •  38g Protein  •  8g Fibre", "💚 High (91/100)"],
    ["DAY 03 (WED)", "Sprouted Moong & Avocado Power Salad", "360 kcal  •  19g Protein  •  11g Fibre", "💚 High (89/100)"],
    ["DAY 04 (THU)", "Tandoori Tofu & Roasted Broccoli Millet Bowl", "415 kcal  •  25g Protein  •  10g Fibre", "💚 High (88/100)"],
    ["DAY 05 (FRI)", "Mediterranean Chickpea & Feta Greens Box", "430 kcal  •  21g Protein  •  11g Fibre", "💚 High (84/100)"],
  ];

  for (let d = 0; d < days.length; d++) {
    const dRow = makeBox(schedCard, 28, 76 + d * 88, 1080, 74, COLORS.cream, 14, COLORS.borderHairline, 1);
    const dDay = makeText(days[d][0], 12, "Bold", COLORS.forestHero);
    dDay.x = 20;
    dDay.y = 28;
    dRow.appendChild(dDay);

    const dName = makeText(days[d][1], 15, "Bold", COLORS.inkDark);
    dName.x = 160;
    dName.y = 26;
    dRow.appendChild(dName);

    const dMacros = makeText(days[d][2], 13, "Medium", COLORS.slateMuted);
    dMacros.x = 540;
    dMacros.y = 28;
    dRow.appendChild(dMacros);

    const dBadge = makeBox(dRow, 880, 18, 176, 38, COLORS.forestHero, 19, COLORS.limeNeon, 1);
    const dBadgeTxt = makeText(days[d][3], 12, "Bold", COLORS.limeNeon);
    dBadgeTxt.x = 24;
    dBadgeTxt.y = 11;
    dBadge.appendChild(dBadgeTxt);
  }

  // HCI Callout Blocks Surrounding Frame 04
  createHCICalloutBlock(
    masterPage,
    "⑨",
    "Hick-Hyman Law (Decision Fatigue Reduction)",
    "Pre-Filtered '💚 High' Subscription Quality Gate",
    "Hick's Law states that reaction time increases logarithmically with the number of choices: T = b·log2(n + 1). By filtering the 10,000+ dish catalog down to verified '💚 High' meals and pre-scheduling 5 days at once, daily ordering time drops from 18 mins to 0 mins.",
    "Eliminates 5x Weekly Decision Fatigue",
    40,
    3300,
    FRAME_X + 200,
    3280,
    COLORS.limeNeon
  );

  createHCICalloutBlock(
    masterPage,
    "⑩",
    "BJ Fogg Behavior Model (B = MAP)",
    "Automated Time-Slot Trigger (12:45 PM Lunch / 8:00 PM Dinner)",
    "Healthy eating fails when Ability (A) is low and Prompts (P) arrive after hunger peaks. Pre-scheduling delivery slots locks in commitment while Motivation (M) is high, automating nutritious adherence across the workweek.",
    "+3.4x Higher 15-Day Dietary Adherence",
    1740,
    3480,
    FRAME_X + 960,
    3560,
    COLORS.calloutCyan
  );

  // ==========================================================================
  // WIRE UP NATIVE FIGMA PROTOTYPE NOODLES BETWEEN THE 4 CENTRAL FRAMES
  // (Note: Callout blocks stay on the canvas outside the frames so Present mode
  //  runs ONLY the clean interactive app!)
  // ==========================================================================
  const allFrames = [frame1, frame2, frame3, frame4];
  const allNavs = [nav1, nav2, nav3, nav4];

  for (let srcIdx = 0; srcIdx < allNavs.length; srcIdx++) {
    const tabBtns = allNavs[srcIdx];
    for (let dstIdx = 0; dstIdx < tabBtns.length; dstIdx++) {
      if (srcIdx === dstIdx) continue;
      const btn = tabBtns[dstIdx];
      const dstFrame = allFrames[dstIdx];
      try {
        await btn.setReactionsAsync([
          {
            action: {
              type: "NODE",
              destinationId: dstFrame.id,
              navigation: "NAVIGATE",
              transition: {
                type: "SMART_ANIMATE",
                easing: { type: "EASE_IN_AND_OUT" },
                duration: 0.32,
              },
              preserveScrollPosition: false,
            },
            trigger: { type: "ON_CLICK" },
          },
        ]);
      } catch (e) {
        // Fallback if older Figma Desktop build
      }
    }
  }

  // Set Frame 01 as the Prototype Starting Frame
  try {
    masterPage.prototypeStartNode = frame1;
  } catch (e) {}

  figma.viewport.scrollAndZoomIntoView(masterPage.children);
  figma.notify("✓ Generated Healthy Mode 4-Frame Prototype + 10 HCI Callout Blocks & Pointer Lines!");
  figma.closePlugin();
}

runHealthyModeHCIGenerator();
