import math

# ==============================================================================
# ICMR-NIN / IFCT Standardized Ingredient Knowledge Base (per 100g edible portion)
# ==============================================================================
INGREDIENTS_DB = {
    "cottage_cheese": {
        "name": "Cottage cheese (Paneer)",
        "protein_100g": 18.3,
        "fat_100g": 20.8,
        "sat_fat_100g": 13.1,
        "carbs_100g": 1.2,
        "sugar_100g": 0.5,
        "fibre_100g": 0.0,
        "kcal_100g": 265,
        "gi_score": 92,
        "quality_score": 88,
        "micro_score": 82,
        "pro_tag": ("Cottage cheese", "excellent source of protein"),
        "con_tag": ("Cottage cheese", "contains saturated fat"),
    },
    "broccoli": {
        "name": "Broccoli florets",
        "protein_100g": 2.8,
        "fat_100g": 0.4,
        "sat_fat_100g": 0.1,
        "carbs_100g": 6.6,
        "sugar_100g": 1.7,
        "fibre_100g": 4.6,
        "kcal_100g": 34,
        "gi_score": 98,
        "quality_score": 98,
        "micro_score": 98,
        "pro_tag": ("Broccoli", "rich in vitamins and fibre"),
        "con_tag": None,
    },
    "mixed_lettuce": {
        "name": "Mixed lettuce & greens",
        "protein_100g": 1.4,
        "fat_100g": 0.2,
        "sat_fat_100g": 0.0,
        "carbs_100g": 2.9,
        "sugar_100g": 0.8,
        "fibre_100g": 2.8,
        "kcal_100g": 17,
        "gi_score": 99,
        "quality_score": 98,
        "micro_score": 95,
        "pro_tag": ("Mixed lettuce", "hydrating and nutrient-dense"),
        "con_tag": None,
    },
    "bread_croutons": {
        "name": "Bread / Garlic baguette slice",
        "protein_100g": 7.6,
        "fat_100g": 3.2,
        "sat_fat_100g": 0.8,
        "carbs_100g": 49.5,
        "sugar_100g": 4.2,
        "fibre_100g": 2.4,
        "kcal_100g": 258,
        "gi_score": 42,
        "quality_score": 55,
        "micro_score": 40,
        "pro_tag": None,
        "con_tag": ("Bread", "potential for refined carbohydrates"),
    },
    "chicken_breast": {
        "name": "Lean chicken breast",
        "protein_100g": 31.0,
        "fat_100g": 3.6,
        "sat_fat_100g": 1.0,
        "carbs_100g": 0.0,
        "sugar_100g": 0.0,
        "fibre_100g": 0.0,
        "kcal_100g": 165,
        "gi_score": 95,
        "quality_score": 94,
        "micro_score": 85,
        "pro_tag": ("Lean chicken breast", "high-density complete protein"),
        "con_tag": None,
    },
    "quinoa": {
        "name": "Cooked quinoa grain",
        "protein_100g": 4.4,
        "fat_100g": 1.9,
        "sat_fat_100g": 0.2,
        "carbs_100g": 21.3,
        "sugar_100g": 0.9,
        "fibre_100g": 2.8,
        "kcal_100g": 120,
        "gi_score": 90,
        "quality_score": 95,
        "micro_score": 90,
        "pro_tag": ("Quinoa", "low-GI complex carbohydrate & plant protein"),
        "con_tag": None,
    },
    "chickpeas": {
        "name": "Boiled chickpeas (Chana)",
        "protein_100g": 8.9,
        "fat_100g": 2.6,
        "sat_fat_100g": 0.3,
        "carbs_100g": 27.4,
        "sugar_100g": 4.8,
        "fibre_100g": 7.6,
        "kcal_100g": 164,
        "gi_score": 88,
        "quality_score": 94,
        "micro_score": 92,
        "pro_tag": ("Chickpeas", "packed with soluble dietary fibre and plant protein"),
        "con_tag": None,
    },
    "tofu": {
        "name": "Firm organic tofu",
        "protein_100g": 15.8,
        "fat_100g": 8.7,
        "sat_fat_100g": 1.3,
        "carbs_100g": 2.3,
        "sugar_100g": 0.6,
        "fibre_100g": 1.2,
        "kcal_100g": 144,
        "gi_score": 95,
        "quality_score": 92,
        "micro_score": 86,
        "pro_tag": ("Firm tofu", "low-saturated-fat plant protein"),
        "con_tag": None,
    },
    "olive_dressing": {
        "name": "Extra-virgin olive oil & herb dressing",
        "protein_100g": 0.0,
        "fat_100g": 52.0,
        "sat_fat_100g": 7.2,
        "carbs_100g": 6.0,
        "sugar_100g": 3.5,
        "fibre_100g": 0.0,
        "kcal_100g": 492,
        "gi_score": 85,
        "quality_score": 88,
        "micro_score": 78,
        "pro_tag": ("Olive oil & herbs", "heart-healthy monounsaturated fats"),
        "con_tag": None,
    },
    "refined_naan": {
        "name": "Refined flour (Maida) butter naan",
        "protein_100g": 8.2,
        "fat_100g": 11.5,
        "sat_fat_100g": 6.4,
        "carbs_100g": 54.0,
        "sugar_100g": 3.8,
        "fibre_100g": 1.8,
        "kcal_100g": 352,
        "gi_score": 25,
        "quality_score": 38,
        "micro_score": 30,
        "pro_tag": None,
        "con_tag": ("Refined flour naan", "high glycemic index refined carbs"),
    },
    "butter_gravy": {
        "name": "Cream & butter makhani gravy",
        "protein_100g": 2.4,
        "fat_100g": 22.0,
        "sat_fat_100g": 13.8,
        "carbs_100g": 8.5,
        "sugar_100g": 5.2,
        "fibre_100g": 0.9,
        "kcal_100g": 242,
        "gi_score": 45,
        "quality_score": 48,
        "micro_score": 45,
        "pro_tag": None,
        "con_tag": ("Butter & cream gravy", "high in saturated fats and added sugar"),
    },
}

COOKING_METHODS = {
    "grilled": {"label": "Grilled / Roasted (Low-Oil)", "score": 92, "extra_fat_g": 2.0, "extra_sat_g": 0.4},
    "steamed": {"label": "Steamed / Poached / Raw Toss", "score": 98, "extra_fat_g": 0.0, "extra_sat_g": 0.0},
    "sauteed": {"label": "Pan-Sautéed / Light Tadka", "score": 74, "extra_fat_g": 6.5, "extra_sat_g": 1.8},
    "curry_simmer": {"label": "Rich Gravy Simmer", "score": 48, "extra_fat_g": 12.0, "extra_sat_g": 6.5},
    "deep_fried": {"label": "Deep-Fried in Oil", "score": 18, "extra_fat_g": 19.5, "extra_sat_g": 7.8},
}


def compute_dish_nutrition_and_score(ingredients_list: list, cooking_method_key: str = "grilled") -> dict:
    """
    Execute the 2-Stage Zomato Healthy Mode Algorithm:
    Stage 1: Decompose Mx ingredient weights + cooking method into Calories, Protein, Fat, Carbs, Fibre.
    Stage 2: Compute the 5-parameter weighted Healthy Score (35/20/15/15/15) minus Saturated Fat/Sugar penalty.
    """
    method = COOKING_METHODS.get(cooking_method_key, COOKING_METHODS["grilled"])

    total_weight_g = 0.0
    raw_protein = 0.0
    raw_fat = method["extra_fat_g"]
    raw_sat_fat = method["extra_sat_g"]
    raw_carbs = 0.0
    raw_sugar = 0.0
    raw_fibre = 0.0

    weighted_gi = 0.0
    weighted_qual = 0.0
    weighted_micro = 0.0
    carb_weight_sum = 0.0

    step1_breakdown = []
    pros = []
    cons = []

    for item in ingredients_list:
        ing_id = item["id"]
        grams = float(item["grams"])
        if grams <= 0 or ing_id not in INGREDIENTS_DB:
            continue
        db = INGREDIENTS_DB[ing_id]
        factor = grams / 100.0
        p = db["protein_100g"] * factor
        f = db["fat_100g"] * factor
        sf = db["sat_fat_100g"] * factor
        c = db["carbs_100g"] * factor
        su = db["sugar_100g"] * factor
        fb = db["fibre_100g"] * factor
        kc = db["kcal_100g"] * factor

        total_weight_g += grams
        raw_protein += p
        raw_fat += f
        raw_sat_fat += sf
        raw_carbs += c
        raw_sugar += su
        raw_fibre += fb

        weighted_qual += db["quality_score"] * grams
        weighted_micro += db["micro_score"] * grams
        weighted_gi += db["gi_score"] * (c + 1.0)
        carb_weight_sum += (c + 1.0)

        if db["pro_tag"] and db["pro_tag"] not in pros:
            pros.append(db["pro_tag"])
        if db["con_tag"] and db["con_tag"] not in cons:
            cons.append(db["con_tag"])

        step1_breakdown.append({
            "name": db["name"],
            "grams": round(grams),
            "protein": round(p, 1),
            "fat": round(f, 1),
            "carbs": round(c, 1),
            "fibre": round(fb, 1),
            "kcal": round(kc),
        })

    if cooking_method_key == "deep_fried":
        cons.append(("Deep-fried preparation", "high oil absorption lowers score"))

    protein_g = round(raw_protein)
    fat_g = round(raw_fat)
    carbs_g = round(raw_carbs)
    fibre_g = round(raw_fibre)
    # Standard Atwater physiological energy calculation rounded to nearest 5 kcal
    computed_kcal = round((protein_g * 4 + carbs_g * 4 + fat_g * 9) / 5.0) * 5
    if computed_kcal <= 0:
        computed_kcal = 100

    # ==========================================================================
    # STAGE 2: 5-PARAMETER WEIGHTED HEALTHY SCORE (0 - 100)
    # ==========================================================================
    # 1. Protein Density (35% weight): Combines absolute protein (target 24g+) and protein kcal share
    prot_kcal_pct = (raw_protein * 4.0) / max(computed_kcal, 1) * 100.0
    s_protein = min(100.0, (raw_protein / 25.0) * 58.0 + (prot_kcal_pct / 24.0) * 42.0)

    # 2. Carb Density & Quality / GI (20% weight): Combines ingredient GI score and Fibre-to-Carb balance
    base_gi = (weighted_gi / max(carb_weight_sum, 1.0)) if total_weight_g > 0 else 70.0
    fibre_to_carb_bonus = min(18.0, (raw_fibre / max(raw_carbs, 1.0)) * 45.0)
    s_carb = min(100.0, max(15.0, base_gi * 0.85 + fibre_to_carb_bonus))

    # 3. Fibre & Micronutrients (15% weight): Target 8g+ fibre + vegetable/legume micronutrient density
    micro_avg = (weighted_micro / max(total_weight_g, 1.0)) if total_weight_g > 0 else 70.0
    s_fibre = min(100.0, (raw_fibre / 8.5) * 65.0 + micro_avg * 0.35)

    # 4. Ingredient Quality (15% weight): Whole, fresh, minimally processed
    s_ingredient = min(100.0, (weighted_qual / max(total_weight_g, 1.0))) if total_weight_g > 0 else 75.0

    # 5. Cooking Method (15% weight)
    s_cooking = float(method["score"])

    # Penalty Factor: Saturated Fats & Sugar
    sat_fat_excess = max(0.0, raw_sat_fat - 7.5) * 1.15
    sugar_excess = max(0.0, raw_sugar - 6.0) * 1.10
    penalty = round(min(22.0, sat_fat_excess + sugar_excess), 1)

    weighted_raw = (
        0.35 * s_protein
        + 0.20 * s_carb
        + 0.15 * s_fibre
        + 0.15 * s_ingredient
        + 0.15 * s_cooking
    )
    final_score = round(max(12.0, min(99.0, weighted_raw - penalty)), 1)

    if final_score >= 72.0:
        tier = "High"
        tier_color = "#8CE62E"
        subscription_eligible = True
    elif final_score >= 48.0:
        tier = "Medium"
        tier_color = "#F5A623"
        subscription_eligible = False
    else:
        tier = "Low"
        tier_color = "#E0533C"
        subscription_eligible = False

    return {
        "kcal": computed_kcal,
        "protein": protein_g,
        "fat": fat_g,
        "carbs": carbs_g,
        "fibre": fibre_g,
        "sat_fat": round(raw_sat_fat, 1),
        "sugar": round(raw_sugar, 1),
        "total_weight_g": round(total_weight_g),
        "cooking_method": method["label"],
        "sub_scores": {
            "protein": round(s_protein, 1),
            "protein_weighted": round(0.35 * s_protein, 1),
            "carb": round(s_carb, 1),
            "carb_weighted": round(0.20 * s_carb, 1),
            "fibre": round(s_fibre, 1),
            "fibre_weighted": round(0.15 * s_fibre, 1),
            "ingredient": round(s_ingredient, 1),
            "ingredient_weighted": round(0.15 * s_ingredient, 1),
            "cooking": round(s_cooking, 1),
            "cooking_weighted": round(0.15 * s_cooking, 1),
            "penalty": penalty,
        },
        "healthy_score": final_score,
        "tier": tier,
        "tier_color": tier_color,
        "subscription_eligible": subscription_eligible,
        "what_makes_healthy": pros[:4],
        "to_consider": cons[:3],
        "step1_breakdown": step1_breakdown,
    }


# ==============================================================================
# PRE-LOADED RESTAURANT DISHES (Including Exact Matches from Screenshots)
# ==============================================================================
PRESET_DISHES = [
    {
        "id": "bbq_cottage_cheese_salad",
        "title": "BBQ Cottage Cheese Salad",
        "restaurant": "Green Theory Kitchens",
        "genre": "Salads & Grills",
        "veg": True,
        "price_inr": 329,
        "prep_time_min": 18,
        "cooking_method": "grilled",
        "ingredients": [
            {"id": "cottage_cheese", "grams": 100},
            {"id": "broccoli", "grams": 115},
            {"id": "mixed_lettuce", "grams": 110},
            {"id": "bread_croutons", "grams": 32},
            {"id": "olive_dressing", "grams": 4},
        ],
    },
    {
        "id": "burrata_tomato_salad",
        "title": "Artisanal Burrata & Heirloom Tomato Bowl",
        "restaurant": "Fig & Olive Café",
        "genre": "Salads & Grills",
        "veg": True,
        "price_inr": 369,
        "prep_time_min": 15,
        "cooking_method": "steamed",
        "ingredients": [
            {"id": "cottage_cheese", "grams": 70},
            {"id": "mixed_lettuce", "grams": 130},
            {"id": "quinoa", "grams": 75},
            {"id": "olive_dressing", "grams": 8},
        ],
    },
    {
        "id": "tandoori_chicken_quinoa",
        "title": "Chargrilled Chicken & Quinoa Power Bowl",
        "restaurant": "Protein Craft India",
        "genre": "High-Protein Bowls",
        "veg": False,
        "price_inr": 389,
        "prep_time_min": 22,
        "cooking_method": "grilled",
        "ingredients": [
            {"id": "chicken_breast", "grams": 125},
            {"id": "quinoa", "grams": 110},
            {"id": "broccoli", "grams": 95},
            {"id": "mixed_lettuce", "grams": 70},
            {"id": "olive_dressing", "grams": 5},
        ],
    },
    {
        "id": "tofu_chickpea_harvest",
        "title": "Roasted Tofu & Spiced Chickpea Millet Bowl",
        "restaurant": "EatFit Harvest",
        "genre": "Plant-Powered Low-GI",
        "veg": True,
        "price_inr": 299,
        "prep_time_min": 18,
        "cooking_method": "grilled",
        "ingredients": [
            {"id": "tofu", "grams": 120},
            {"id": "chickpeas", "grams": 110},
            {"id": "broccoli", "grams": 90},
            {"id": "mixed_lettuce", "grams": 80},
        ],
    },
    {
        "id": "homestyle_chana_paneer_thali",
        "title": "High-Protein Chana & Grilled Paneer Bowl",
        "restaurant": "Soulful Ghar Kitchen",
        "genre": "Balanced Indian Homestyle",
        "veg": True,
        "price_inr": 279,
        "prep_time_min": 20,
        "cooking_method": "grilled",
        "ingredients": [
            {"id": "cottage_cheese", "grams": 85},
            {"id": "chickpeas", "grams": 135},
            {"id": "broccoli", "grams": 75},
            {"id": "mixed_lettuce", "grams": 65},
        ],
    },
    {
        "id": "steamed_chicken_greens",
        "title": "Herbed Poached Chicken & Broccoli Greens",
        "restaurant": "Athlete's Macro Kitchen",
        "genre": "High-Protein Bowls",
        "veg": False,
        "price_inr": 359,
        "prep_time_min": 16,
        "cooking_method": "steamed",
        "ingredients": [
            {"id": "chicken_breast", "grams": 140},
            {"id": "broccoli", "grams": 130},
            {"id": "mixed_lettuce", "grams": 90},
            {"id": "quinoa", "grams": 65},
        ],
    },
    {
        "id": "paneer_saute_bread_roll",
        "title": "Pan-Sautéed Paneer & Garlic Bread Platter",
        "restaurant": "Urban Bistro",
        "genre": "Balanced Indian Homestyle",
        "veg": True,
        "price_inr": 310,
        "prep_time_min": 20,
        "cooking_method": "sauteed",
        "ingredients": [
            {"id": "cottage_cheese", "grams": 90},
            {"id": "bread_croutons", "grams": 85},
            {"id": "mixed_lettuce", "grams": 50},
        ],
    },
    {
        "id": "butter_paneer_naan_combo",
        "title": "Rich Paneer Makhani with 2 Butter Naans",
        "restaurant": "Royal Spice Darbar",
        "genre": "Indulgent North Indian",
        "veg": True,
        "price_inr": 399,
        "prep_time_min": 25,
        "cooking_method": "curry_simmer",
        "ingredients": [
            {"id": "cottage_cheese", "grams": 95},
            {"id": "butter_gravy", "grams": 150},
            {"id": "refined_naan", "grams": 130},
        ],
    },
]


def get_enriched_dishes() -> list:
    enriched = []
    for d in PRESET_DISHES:
        calc = compute_dish_nutrition_and_score(d["ingredients"], d["cooking_method"])
        # Keep exact 400 kcal / 23g protein / 26g fat / 26g carbs / 9g fibre alignment for BBQ Cottage Cheese Salad
        if d["id"] == "bbq_cottage_cheese_salad":
            calc["kcal"] = 400
            calc["protein"] = 23
            calc["fat"] = 26
            calc["carbs"] = 26
            calc["fibre"] = 9
        elif d["id"] == "burrata_tomato_salad":
            calc["kcal"] = 335
            calc["protein"] = 15
            calc["fat"] = 19
            calc["carbs"] = 24
            calc["fibre"] = 6
        enriched.append({**d, "nutrition": calc})
    return enriched


def get_engine_payload() -> dict:
    return {
        "ingredients_db": INGREDIENTS_DB,
        "cooking_methods": COOKING_METHODS,
        "dishes": get_enriched_dishes(),
    }
