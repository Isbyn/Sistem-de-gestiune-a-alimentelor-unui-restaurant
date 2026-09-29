# Restaurant Food Inventory
The application manages the inventory of food ingredients and stock levels. It helps chefs and restaurant managers easily track product availability and organize restocking.
## Data model
| Field         | Type         | Notes                                      |
| ------------- | ------------ | ------------------------------------------ |
| ingredient    | text         | required, max 100 chars                    |
| needs restock | boolean      | toggled from the list, default false       |
| storage       | fixed values | Pantry, Fridge, Freezer                    |
| category      | relation     | Vegetables, Meat, Dairy, Dry Goods         |
| user          | relation     | the owner of the item (from week 11)       |

Sample data used across all stages:
1. Tomatoes, available, Fridge
2. Beef Tenderloin, needs restock, Freezer
3. Wheat Flour, available, Pantry

## How to run
Open `index.html` in a browser. No build step, no server.

## AI usage
| Tool          | Used for                                               |
| ------------- | ------------------------------------------------------ |
| Gemini        | generating theme description and data model, stage 1   |
Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript
