# 🥗 HEALTHY MODE // AI Nutrition & Healthy Subscriptions Engine

> **Product & Algorithmic Case Study: Two-Stage `Mx-to-Macro` Nutritional Intelligence & Scheduled Meal Automation**
> *Pioneered & Implemented in **Zomato** (an Indian Food Delivery App under **Eternal Ltd.**) — An Open Industry Blueprint for Global Food-Delivery Platforms*

[![Author](https://img.shields.io/badge/Author-Mohd%20Amir%20Ali-8CE62E?style=flat-square&labelColor=15171B)](https://techwithamir.com)
[![Architecture](https://img.shields.io/badge/Pipeline-2--Stage%20AI%20Nutrition%20Engine-28381D?style=flat-square&labelColor=15171B)](#2-two-stage-ai-nutritional-scoring-pipeline)
[![Deployment](https://img.shields.io/badge/Live%20Demo-Zero--Install%20HTML5%20%2B%20Flask%20API-8CE62E?style=flat-square&labelColor=15171B)](#5-quick-start--deployment)
[![License](https://img.shields.io/badge/Usage-Educational%20%26%20Portfolio%20Case%20Study-F6F3EC?style=flat-square&labelColor=15171B)](#6-legal--ip-compliance-notice)

---

## 1. Executive Summary & Industry Call to Action

Ordering food online has historically carried an invisible "health guilt"—customers knew a dish's price and spice level, yet had zero visibility into its actual **Protein, Fibre, Complex Carbohydrates, Fat quality, or Cooking Method**.

First pioneered and implemented in **Zomato** (an Indian food delivery app under **Eternal Ltd.**)—where **Mohd Amir Ali** worked closely with the Product team—**Healthy Mode** solves this problem at marketplace scale without burdening restaurant kitchens with expensive laboratory calorimetry:

1. **Minimal Friction for Restaurant Partners (`Mx`):** Restaurants simply enter approximate preparation weights (`grams`) of core ingredients and select the primary cooking technique (`Raw / Tossed`, `Steamed / Poached`, `Grilled / Tandoor / Air-Fried`, `Pan-Seared`, or `Deep-Fried`).
2. **Transparent Nutritional Intelligence for Customers:** A two-stage AI + Food Composition Database (**ICMR-NIN / IFCT**) pipeline decomposes those raw weights into verified macronutrients (`kcal`, `Protein`, `Fat`, `Carbs`, `Fibre`) and computes a **5-Parameter Weighted `Healthy Score` (`0–100`)** mapped to an intuitive **3-Tier Nutritional Hearts indicator (`Low`, `Medium`, `High`)**, complete with automated **`✓ WHAT MAKES THIS HEALTHY`** and **`ⓘ TO CONSIDER`** transparency notes.
3. **Why Competitors & Global Platforms Should Adopt This:** Transparency around nourishment should not be a walled garden. When competing food-delivery platforms adopt standardized `Mx-to-Macro` disclosure and **Healthy Subscriptions**, they transform on-demand food delivery from an occasional indulgence into a **sustainable, guilt-free daily health habit** for millions of urban consumers.

> *"I explore the space between human curiosity and machine intelligence—making everyday nourishment more useful, understandable, and human. Better systems. More human."*
> — **Mohd Amir Ali** ([techwithamir.com](https://techwithamir.com))

---

## 2. Two-Stage AI Nutritional Scoring Pipeline

### Stage 1: `Mx` Recipe Input → AI Gram-to-Macro Decomposition

Restaurant partners (`Mx`) enter raw/cooked ingredient weights $w_i$ (in grams) and select a cooking method $m$. The AI engine maps each ingredient against the **ICMR-NIN (Indian Council of Medical Research – National Institute of Nutrition)** and **USDA** reference database and applies a **Cooking Oil & Thermal Retention Adjustment ($\alpha_m$)**:

$$\text{Macro}_{\text{dish}} = \sum_{i=1}^{n} \left( \frac{w_i}{100} \times \text{Macro}_{i, 100\text{g}} \right) + \text{OilAbsorption}(m, W_{\text{total}})$$

| Cooking Method ($m$) | Oil Absorption Overhead | Method Quality Multiplier ($S_{\text{method}}$) |
| :--- | :--- | :--- |
| **Raw / Fresh Tossed / Cold-Pressed** | `+0.0g` extra cooking fat | **100 / 100** |
| **Steamed / Poached / Boiled** | `+0.0g` extra cooking fat | **95 / 100** |
| **Grilled / Tandoor / Baked / Air-Fried** | `+1.5g` surface brush oil per 300g | **88 / 100** |
| **Pan-Seared / Light Sautéed / Stir-Fried** | `+3.5g` pan oil per 300g | **72 / 100** |
| **Rich Gravy / Butter-Finished / Creamy** | `+8.0g` emulsified fat per 300g | **45 / 100** |
| **Deep-Fried / Battered & Fried** | `+14.0g` absorbed frying oil per 300g | **15 / 100** |

---

### Stage 2: 5-Parameter Weighted `Healthy Score` & 3-Tier Nutritional Hearts

To prevent high-calorie whole foods (like paneer, avocado, olive oil, and nuts) from being unfairly penalized—and to prevent "low-calorie" sugary/ultra-processed items from gaming the system—**Calories (`kcal`) are displayed transparently but treated as a neutral metric (`0%` weight)** in the Healthy Score formula:

$$\text{Healthy Score} = 0.35(S_{\text{protein}}) + 0.20(S_{\text{carb}}) + 0.15(S_{\text{fibre}}) + 0.15(S_{\text{ingredient}}) + 0.15(S_{\text{method}}) - P_{\text{penalty}}$$

| Parameter | Weight | Mathematical Formulation & Rationale |
| :--- | :--- | :--- |
| **1. Protein Density ($S_{\text{protein}}$)** | **35%** | Normalized on protein-to-calorie ratio ($P_{\text{kcal}} / E_{\text{total}}$) and absolute protein grams ($100\text{ pts}$ at $\ge 22\text{g}$ protein or $\ge 23\%$ kcal from protein). |
| **2. Carb Quality & GI ($S_{\text{carb}}$)** | **20%** | Evaluates carbohydrate-to-calorie ratio alongside whole-grain vs. refined glycemic load ($100\text{ pts}$ when net non-fibre carbs $\le 30\%$ of kcal). |
| **3. Fibre & Micronutrients ($S_{\text{fibre}}$)** | **15%** | Rewards prebiotic dietary fibre density and leafy/cruciferous micronutrient richness ($100\text{ pts}$ at $\ge 8.0\text{g}$ dietary fibre per serving). |
| **4. Ingredient Quality ($S_{\text{ingredient}}$)** | **15%** | Weighted average of whole-food nutrient density across all dish components vs. refined flours, trans fats, or ultra-processed additives. |
| **5. Cooking Method ($S_{\text{method}}$)** | **15%** | Directly reflects thermal preparation quality (`100` for Raw/Tossed, `88` for Grilled/Tandoor, down to `15` for Deep-Fried). |
| **Penalty ($P_{\text{penalty}}$)** | **$-0$ to $-25$** | Deducted only when Saturated Fat exceeds $8\text{g}$ or Added Refined Sugar exceeds $10\text{g}$. |

#### 3-Tier Nutritional Hearts Mapping

- **💚💚💚 `High` (`Score ≥ 75`):** Rich in bioavailable protein, dietary fibre, and micronutrients; eligible for **Healthy Subscriptions**.
- **💛💛🖤 `Medium` (`Score 50 – 74`):** Balanced everyday meal with moderate macros or richer dressing/preparation; great with portion awareness.
- **🧡🖤🖤 `Low` (`Score < 50`):** Indulgent or energy-dense dish with lower protein-to-calorie density or heavy frying/sugars.

---

## 3. Verified Production Benchmark: `BBQ Cottage Cheese Salad`

Below is the exact production verification for the **`BBQ Cottage Cheese Salad`** (`₹309`), demonstrating how minimal `Mx` inputs reproduce the exact customer-facing nutritional card:

- **`Mx` Ingredient Inputs (`315g` total):**
  - Fresh Paneer / Cottage Cheese (`105g`)
  - Grilled Bell Peppers, Broccoli, Sweet Corn & Zucchini (`110g`)
  - Romaine & Iceberg Lettuce Base (`60g`)
  - Cherry Tomatoes & Red Onion (`22g`)
  - Smoky BBQ Glaze & Herb Vinaigrette (`18g`)
  - **Cooking Method:** `Grilled / Tandoor + Fresh Tossed`
- **Calculated Nutritional Output:**
  - **Calories:** `400 kcal` *(Neutral metric)*
  - **Protein:** `23g` (`23.0%` of kcal → $S_{\text{protein}} = 96.5$)
  - **Fat:** `26g` *(Primarily dairy & olive oil fats)*
  - **Carbs:** `26g` ($S_{\text{carb}} = 84.0$)
  - **Fibre:** `9g` ($S_{\text{fibre}} = 100.0$)
  - **Healthy Score:** **`88.4 / 100` → 💚 `High` Nutritional Hearts**
- **Automated Customer Insights:**
  - **✓ WHAT MAKES THIS HEALTHY:** *Protein from cottage cheese supports muscle repair; fibre and micronutrients from vegetables aid digestion.*
  - **ⓘ TO CONSIDER:** *Higher fat content from cheese and dressing; best paired with lighter meals through the day.*

---

## 4. Phase 2 Evolution: `Healthy Subscriptions`

Once dishes are algorithmically verified via **Healthy Mode**, Phase 2 unlocks **Healthy Subscriptions**—a recurring meal-planning engine that removes daily decision fatigue:

1. **Quality Gate (`💚 High` Only):** Only dishes achieving a **High (`≥ 75`)** Healthy Score and verified macro floor ($\ge 20\text{g}$ protein) qualify for subscription catalogs.
2. **Genre & Goal Curation:** Users select a culinary genre (`Salads & Bowls`, `High-Protein Indian Thalis`, `Keto & Low-Carb Grill`, or `Balanced Millet Bowls`).
3. **Automated Multi-Day Cadence:** Users lock in **3-Day Starter**, **5-Day Workweek**, or **15-Day Transformation** schedules across **Lunch (`12:30 PM – 01:30 PM` at Office)** and/or **Dinner (`07:30 PM – 08:30 PM` at Home)** with zero per-order delivery fees and automatic dish rotation.

---

## 5. Quick Start & Deployment

This repository is engineered for **both zero-install static hosting (GitHub Pages)** and **local Python/Flask execution**:

### Option A: Instant Browser Launch (Zero Installation)
Double-click **`index.html`** or **`Launch_HealthyMode_App.html`** in Finder to open the full 4-tab interactive platform directly in Google Chrome or Safari.
- **GitHub Pages Ready:** Because `index.html` is at the repository root alongside `.nojekyll`, enabling **GitHub Pages (`Settings → Pages → Deploy from main branch`)** immediately publishes the interactive showcase online.

### Option B: Local Python Flask API Server (Port `5060`)
Double-click **`Run_HealthyMode.command`** on macOS, or run from your terminal:
```bash
chmod +x start.sh
./start.sh
```
This launches the Flask backend (`WebApp.py` + `nutrition_ai_engine.py`) at **`http://127.0.0.1:5060`** with REST API endpoints (`/api/dishes`, `/api/calculate`, `/api/subscription-quote`).

### Repository Structure
```text
Zomato-HealthyMode/
├── index.html                        # Primary interactive 4-tab web platform (GitHub Pages entry)
├── Launch_HealthyMode_App.html       # Standalone desktop quick-launch mirror
├── Product_Case_Study_Report.html    # Printable / Save-as-PDF Executive Whitepaper Report
├── PRODUCT_CASE_STUDY_REPORT.md      # Complete Markdown documentation of the case study
├── nutrition_ai_engine.py            # Pure-Python ICMR-NIN two-stage AI nutrition engine
├── WebApp.py                         # Flask server & REST API (Port 5060)
├── Run_HealthyMode.command           # One-click macOS desktop launcher
├── start.sh                          # CLI launcher script
└── static/
    └── healthy_mode.css              # Botanical Forest Olive, Lime & Obsidian UI stylesheet
```

---

## 6. Legal & IP Compliance Notice

This repository is an **independent educational and product architecture case study** authored by **Mohd Amir Ali** ([techwithamir.com](https://techwithamir.com)) to illustrate how two-stage `Mx-to-Macro` AI nutritional estimation and automated healthy meal subscriptions work in modern food-delivery marketplaces (a concept pioneered and implemented in **Zomato**, an Indian food delivery app under **Eternal Ltd.**).

- **No Proprietary Code or Assets:** All source code, mathematical weights, ICMR-NIN ingredient lookup tables, UI layouts, and custom SVG illustrations in this repository were written from scratch for educational transparency.
- **Fair-Use Descriptive Reference:** Any mention of *Zomato* or *Eternal Ltd.* is strictly nominative and descriptive to credit the real-world consumer implementation and encourage broader industry adoption for public health.

---

**Built by [Mohd Amir Ali](https://techwithamir.com)** · *Better systems. More human.*
