# HEALTHY MODE - AI Nutrition & Healthy Subscriptions Engine

> **Product & Algorithmic Case Study: Two-Stage `Mx-to-Macro` Nutritional Intelligence & Scheduled Meal Automation**
> *Pioneered & Implemented in **Zomato** (an Indian Food Delivery Platform under **Eternal Ltd.**) · An Open Industry Blueprint for Global Food-Delivery Platforms*

[![Launch Live Demo](https://img.shields.io/badge/Launch%20Demo-Live%20Interactive%20Platform-8CE62E?style=for-the-badge&labelColor=15171B)](https://mohd-amir-ali.github.io/Healthy-Mode-AI-Nutrition-Engine/)
[![Launch App](https://img.shields.io/badge/Launch%20App-Zero--Install%20HTML5%20%2B%20Flask%20API-8CE62E?style=for-the-badge&labelColor=15171B)](https://mohd-amir-ali.github.io/Healthy-Mode-AI-Nutrition-Engine/Launch_HealthyMode_App.html)
[![Case Study Report](https://img.shields.io/badge/Case%20Study%20Report-Printable%20Whitepaper-28381D?style=for-the-badge&labelColor=15171B)](https://mohd-amir-ali.github.io/Healthy-Mode-AI-Nutrition-Engine/Product_Case_Study_Report.html)
[![Author](https://img.shields.io/badge/Author-Mohd%20Amir%20Ali-8CE62E?style=for-the-badge&labelColor=15171B)](https://techwithamir.com)
[![Architecture](https://img.shields.io/badge/Algorithm-NutriDecomp--NER%20%2B%20WNDS--5-28381D?style=for-the-badge&labelColor=15171B)](#2-two-stage-ai-nutritional-scoring-pipeline)
[![Portfolio](https://img.shields.io/badge/Portfolio-techwithamir.com-F6F3EC?style=for-the-badge&labelColor=15171B)](https://techwithamir.com)

> **Live Interactive Links:**
> - **[Launch Live Interactive Demo (GitHub Pages) ↗](https://mohd-amir-ali.github.io/Healthy-Mode-AI-Nutrition-Engine/)** — Explore all 4 interactive tabs (`01. Overview & Algorithm`, `02. Live Mx-to-AI Calculator`, `03. Know Your Food Menu`, and `04. Healthy Subscriptions`).
> - **[Launch Standalone HTML5 App (`Launch_HealthyMode_App.html`) ↗](https://mohd-amir-ali.github.io/Healthy-Mode-AI-Nutrition-Engine/Launch_HealthyMode_App.html)** — Zero-install HTML5 build.
> - **[Read Printable Executive Whitepaper (`Product_Case_Study_Report.html`) ↗](https://mohd-amir-ali.github.io/Healthy-Mode-AI-Nutrition-Engine/Product_Case_Study_Report.html)** — Complete mathematical & product report.

---

## 1. Executive Summary & Industry Call to Action

Ordering food online has historically carried an invisible nutritional blind spot: customers knew a dish's price and spice level, yet had zero visibility into its actual **Protein, Fibre, Complex Carbohydrates, Fat quality, or Cooking Method**.

First pioneered and implemented in **Zomato** (an Indian food delivery platform under **Eternal Ltd.**), where **Mohd Amir Ali** collaborated closely with the Product team, **Healthy Mode** solves this problem at marketplace scale without burdening restaurant kitchens with expensive laboratory calorimetry:

1. **Minimal Friction for Restaurant Partners (`Mx`):** Restaurants simply enter approximate preparation weights (`grams`) of core ingredients and select the primary cooking technique (`Steamed / Poached / Raw Toss`, `Grilled / Roasted`, `Pan-Sautéed`, `Rich Gravy Simmer`, or `Deep-Fried`).
2. **Transparent Nutritional Intelligence for Customers:** A two-stage AI + Food Composition Database (**ICMR-NIN / IFCT**) pipeline decomposes those raw weights into verified macronutrients (`kcal`, `Protein`, `Fat`, `Carbs`, `Fibre`) and computes a **5-Parameter Weighted `Healthy Score` (`0–100`)** mapped to an intuitive **3-Tier Nutritional Hearts indicator (`Low`, `Medium`, `High`)**, complete with automated **`WHAT MAKES THIS HEALTHY`** and **`TO CONSIDER`** transparency notes and a **Smart AI Kitchen Swap** reformulator.
3. **Why Competitors & Global Platforms Should Adopt This:** Transparency around nourishment should not be a walled garden. When competing food-delivery platforms adopt standardized `Mx-to-Macro` disclosure and **Healthy Subscriptions**, they transform on-demand food delivery from an occasional indulgence into a **sustainable, guilt-free daily health habit** for millions of urban consumers.

> *"I explore the space between human curiosity and machine intelligence, making everyday nourishment more useful, understandable, and human. Better systems. More human."*
> · **Mohd Amir Ali** ([techwithamir.com](https://techwithamir.com))

---

## 2. Two-Stage AI Nutritional Scoring Pipeline (`NutriDecomp-NER + WNDS-5`)

### Stage 1: `Mx` Recipe Input to ICMR-NIN Macro Vector

Restaurant partners (`Mx`) enter raw/cooked ingredient weights $w_i$ (in grams) and select a cooking method $m$. The AI engine maps each ingredient against the **ICMR-NIN (Indian Council of Medical Research · National Institute of Nutrition)** reference database and applies a **Cooking Oil & Thermal Retention Adjustment ($\alpha_m$)**:

$$\text{Macro}_{\text{dish}} = \sum_{i=1}^{n} \left( \frac{w_i}{100} \times \text{Macro}_{i, 100\text{g}} \right) + \alpha_{\text{method}, k}$$

| Cooking Method ($m$) | Oil Absorption Overhead ($\alpha_{\text{fat}}$) | Method Quality Score ($S_{\text{cook}}$) |
| :--- | :--- | :--- |
| **Steamed / Poached / Raw Toss** | `+0.0g` extra cooking fat | **98 / 100** |
| **Grilled / Roasted (Low-Oil)** | `+2.0g` surface brush oil | **92 / 100** |
| **Pan-Sautéed / Light Tadka** | `+6.5g` pan oil | **74 / 100** |
| **Rich Gravy Simmer (Butter/Cream)** | `+12.0g` emulsified fat | **48 / 100** |
| **Deep-Fried in Oil** | `+19.5g` absorbed frying oil | **18 / 100** |

---

### Stage 2: 5-Parameter Weighted `Healthy Score` (`WNDS-5`) & 3-Tier Nutritional Hearts

To prevent nutrient-dense whole foods (like cottage cheese, olive oil, and nuts) from being unfairly penalized, and to prevent low-calorie sugary items from gaming the system, **Calories (`kcal`) are displayed transparently but treated as a neutral metric (`0%` weight)** in the Healthy Score formula:

$$\text{Healthy Score} = 0.35(S_{\text{prot}}) + 0.20(S_{\text{carb\_GI}}) + 0.15(S_{\text{fibre}}) + 0.15(S_{\text{ing}}) + 0.15(S_{\text{cook}}) - P_{\text{satfat, sugar}}$$

| Parameter | Weight | Mathematical Formulation & Rationale |
| :--- | :--- | :--- |
| **1. Protein Density ($S_{\text{prot}}$)** | **35%** | Normalized on protein-to-calorie ratio ($P_{\text{kcal}} / E_{\text{total}}$) and absolute protein grams per serving. |
| **2. Carb Quality & GI ($S_{\text{carb\_GI}}$)** | **20%** | Evaluates glycemic index quality alongside dietary fibre-to-carbohydrate buffering ratio. |
| **3. Fibre & Micronutrients ($S_{\text{fibre}}$)** | **15%** | Rewards prebiotic dietary fibre density ($\ge 8.5\text{g}$) and leafy/cruciferous micronutrient richness. |
| **4. Ingredient Quality ($S_{\text{ing}}$)** | **15%** | Gram-weighted average of whole-food nutrient quality across all dish components vs. refined flours or additives. |
| **5. Cooking Method ($S_{\text{cook}}$)** | **15%** | Directly reflects thermal preparation quality (`98` for Steamed/Raw Toss, `92` for Grilled, down to `18` for Deep-Fried). |
| **Penalty Gate ($P_{\text{satfat, sugar}}$)** | **$-0$ to $-22$** | Deducted when Saturated Fat exceeds $7.5\text{g}$ or Added Sugar exceeds $6.0\text{g}$. |

#### 3-Tier Nutritional Hearts Mapping

- **`High` (`Score ≥ 72`):** Rich in bioavailable protein, dietary fibre, and micronutrients; qualifies for **Healthy Subscriptions**.
- **`Medium` (`Score 48 – 71.9`):** Balanced everyday meal with moderate macros or richer dressing/preparation.
- **`Low` (`Score < 48`):** Indulgent or energy-dense dish with lower protein-to-calorie density or heavy frying/sugars.

---

## 3. Interactive Platform Highlights

1. **Overview & Hover-Linked 3-Heart Preview Switcher (`01. Overview & Algorithm`):**
   - Hovering over **Low**, **Medium**, or **High** on the floating guide card triggers color-matched neon glow, a cursor-following filter prompt, and live-switches the preview dish card between *Butter Chicken & Butter Naan Combo* (`Low`), *Charcoal Paneer Tikka Wheat Roll* (`Medium`), and *BBQ Cottage Cheese Salad* (`High`).
   - Scroll-triggered word-by-word formula transitions across the 3 algorithmic stages and interactive 5-parameter weight bars.
2. **Live `Mx-to-AI` Calculator & Smart AI Kitchen Swap (`02. Live Mx-to-AI Calculator`):**
   - Drag ingredient gram sliders or switch cooking methods to watch the **Live 5-Parameter Sub-Score Meter** and mathematical derivation table update in `0ms`.
   - Includes the **Smart AI Kitchen Swap** assistant that automatically reformulates `Low` or `Medium` dishes into `High (≥ 72)` subscription-eligible dishes.
3. **Know Your Food Menu & Dish Detail Modal (`03. Know Your Food Menu`):**
   - Filter dishes by `All`, `High`, `Medium`, or `Low` tiers and click any card (or `Full Dish Details`) to inspect its full `Mx` ingredient gram table in a popup modal.
4. **Healthy Subscriptions Planner (`04. Healthy Subscriptions`):**
   - Configure **3-Day**, **5-Day**, or **15-Day** automated Lunch (`1:00 PM · Office`) and Dinner (`8:00 PM · Home`) plans, swap individual meals on any day slot, and lock in the plan with a **5-second auto-closing confirmation modal**.

---

## 4. Quick Start & Cross-Platform Deployment

This repository runs out-of-the-box on **macOS, Windows, Linux, GitHub Pages, and GitHub Codespaces**:

### Option A: Instant Zero-Server Browser Launch (Windows & macOS)
Double-click **`index.html`** or **`Launch_HealthyMode_App.html`** on any computer. All CSS and vector assets are embedded directly inside `index.html`, so it renders with zero external dependencies even if opened directly from a downloaded folder or archive.

### Option B: One-Click Local Python Flask Server (Port `5060`)
- **On macOS / Linux:** Double-click **`Run_HealthyMode.command`** or run `./start.sh`.
- **On Windows:** Double-click **`run.bat`**.
- **Manual CLI:**
  ```bash
  pip install -r requirements.txt
  python WebApp.py
  ```
  Opens the Flask backend (`WebApp.py` + `nutrition_ai_engine.py`) at **`http://127.0.0.1:5060`**.

### Repository Structure
```text
HealthyMode/
├── index.html                        # Primary self-contained 4-tab web platform (GitHub Pages entry)
├── Launch_HealthyMode_App.html       # Standalone desktop quick-launch mirror
├── Product_Case_Study_Report.html    # Printable / Save-as-PDF Executive Whitepaper Report
├── PRODUCT_CASE_STUDY_REPORT.md      # Complete Markdown documentation of the case study
├── nutrition_ai_engine.py            # Pure-Python ICMR-NIN two-stage AI nutrition engine
├── WebApp.py                         # Flask server & REST API (Port 5060)
├── requirements.txt                  # Python dependencies
├── Run_HealthyMode.command           # One-click macOS desktop launcher
├── run.bat                           # One-click Windows desktop launcher
├── start.sh                          # CLI launcher script
├── .devcontainer/devcontainer.json   # 1-Click GitHub Codespaces configuration
└── static/
    └── healthy_mode.css              # Botanical Forest Olive, Lime & Obsidian UI stylesheet
```

---

## 5. Author & Attribution

Architected & Engineered by **Mohd Amir Ali** · Product Specialist & Engineer at Heart · [techwithamir.com](https://techwithamir.com)

*Independent product and algorithmic case study based on public ICMR-NIN nutrition tables. All source code, mathematical weights, and custom SVG illustrations were written from scratch for educational transparency.*
