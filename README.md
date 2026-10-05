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

### Stage 2 Verification Table

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | [index.html#L..]| open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [alimente.js#L9-L14]| read |
| S2-R3 | list, count, search, add, toggle, delete | [alimente.js#L17-L86] | console output |
| S2-R4 | add rejects empty name and invalid tag | [alimente.js#L42-L52] | last 2 console lines |
| S2-R5 | original array unchanged after add | [alimente.js#L97] | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md], [ai-log/etapa-02.md]| read |
| S2-R7 | commit "Stage 2" pushed | [link to the commit] | commit history|

- [x] **S2-R1** JavaScript file is linked to the page and logs output to the console on load.
- [x] **S2-R2** The array contains at least three items, each having an id, name, state, and fixed tag.
- [x] **S2-R3** Functions for listing, counting, searching, adding, toggling, and deleting work correctly.
- [x] **S2-R4** Adding an item rejects an empty name and an invalid tag, displaying an error message in the console.
- [x] **S2-R5** The original array remains unchanged after adding a new item, as proven in the console.
- [x] **S2-R6** README includes the Stage 2 section, and `ai-log/etapa-02.md` is fully completed.
- [x] **S2-R7** The commit `Stage 2: ...` is pushed to GitHub.

## AI usage
| Tool          | Used for                                               |
| ------------- | ------------------------------------------------------ |
| Gemini        | generating theme description and data model, stage 1   |
|               | adapting the laboratory requirements to restaurant food management, stage 2|
                                                      
Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: 
