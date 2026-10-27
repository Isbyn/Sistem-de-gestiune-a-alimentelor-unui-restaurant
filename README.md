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
| S2-R1 | JS file linked, logs on page load | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/mockup/index.html#L68]| open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/mockup/alimente.js#L3-L7]| read |
| S2-R3 | list, count, search, add, toggle, delete | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/mockup/alimente.js#L17-L84] | console output |
| S2-R4 | add rejects empty name and invalid tag | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/mockup/alimente.js#L41-L50] | last 2 console lines |
| S2-R5 | original array unchanged after add | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/mockup/alimente.js#L97] | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md], [ai-log/etapa-02.md]| read |
| S2-R7 | commit "Stage 2" pushed | [link to the commit] | commit history|

- [x] **S2-R1** JavaScript file is linked to the page and logs output to the console on load.
- [x] **S2-R2** The array contains at least three items, each having an id, name, state, and fixed tag.
- [x] **S2-R3** Functions for listing, counting, searching, adding, toggling, and deleting work correctly.
- [x] **S2-R4** Adding an item rejects an empty name and an invalid tag, displaying an error message in the console.
- [x] **S2-R5** The original array remains unchanged after adding a new item, as proven in the console.
- [x] **S2-R6** README includes the Stage 2 section, and `ai-log/etapa-02.md` is fully completed.
- [x] **S2-R7** The commit `Stage 2: ...` is pushed to GitHub.

## Stage 3 Checklist
| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S3-R1 | npm run dev starts without errors | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/main/frontend/package.json] | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L56-L58] | edit data, save |
| S3-R3 | data from README, not from the example | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L8-L10] | compare with README |
| S3-R4 | stage 1 styles reused | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.css#L2-L16] | look at the page |
| S3-R5 | node_modules ignored, build passes | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/.gitignore#L10] | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md], [etapa-03.md] | read |
| S3-R7 | commit "Stage 3" pushed | [commit_link]cd | commit history |

## Stage 4 Checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S4-R1 | 2+ components in src/components/ | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/tree/main/frontend/src/components] | open folder |
| S4-R2 | card receives data through props | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/components/AlimentCard.jsx#L3-L10] | read |
| S4-R3 | map + key={id}, no console warnings | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/components/AlimentList.jsx#L10-L17] | F12, Console |
| S4-R4 | message for empty list | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/components/AlimentList.jsx#L4-L5] | set array to [] |
| S4-R5 | state changes the card look | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/components/AlimentCard.jsx#L12-L15] | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | [link_README.md], [link_etapa-04.md] | read |
| S4-R7 | commit "Stage 4" pushed | [link_commit] | commit history |

### Lista de verificare a etapei
- [x] **S4-R1** Există cel puțin două componente în `src/components/`, câte una pe fișier.
- [x] **S4-R2** Cardul primește datele prin props și nu citește array-ul direct.
- [x] **S4-R3** Lista este randată cu `map` și `key={id}`, fără avertismente în consolă.
- [x] **S4-R4** Lista goală afișează un mesaj.
- [x] **S4-R5** Starea elementului modifică aspectul cardului.
- [x] **S4-R6** README-ul este actualizat, iar `ai-log/etapa-04.md` este completat.
- [x] **S4-R7** Commit-ul Stage 4 este publicat pe GitHub.

## Stage 5 Checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S5-R1 | list kept in useState, in App | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L19] | read |
| S5-R2 | toggling changes state and card look | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L23-L27 ], [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/components/AlimentCard.jsx#L12-L21] | click a checkbox |
| S5-R3 | delete removes the item | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L30-L32], [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/components/AlimentCard.jsx#L33-L37] | click Delete |
| S5-R4 | header counter derived, not in state | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L42] | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [lhttps://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L23-L27] | read |
| S5-R6 | light / dark toggle: state + data-theme on html | [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.jsx#L35-L39], [https://github.com/Isbyn/Sistem-de-gestiune-a-alimentelor-unui-restaurant/blob/b1f9f440b8e24be449321c77c6fc065d48793a31/frontend/src/App.css#L97-L111] | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [link_README.md], [link_etapa-05.md] | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [link_commit] | commit history |

### Lista de verificare a etapei
- [x] **S5-R1** Lista este păstrată în `useState`, în componenta părinte.
- [x] **S5-R2** Bifarea schimbă starea elementului și aspectul cardului.
- [x] **S5-R3** Ștergerea elimină elementul din listă.
- [x] **S5-R4** Contorul din antet se actualizează automat, fără să fie păstrat în state.
- [x] **S5-R5** Actualizările sunt imutabile: nu există push, splice sau atribuiri pe elementele din state.
- [x] **S5-R6** Butonul din antet comută între tema luminoasă și cea întunecată, în ambele direcții, indiferent de tema sistemului.
- [x] **S5-R7** Consola nu conține avertismente; README-ul și `ai-log/etapa-05.md` sunt actualizate.
- [x] **S5-R8** Commit-ul Stage 5 este publicat pe GitHub.


## AI usage
| Tool          | Used for                                               |
| ------------- | ------------------------------------------------------ |
| Gemini        | generating theme description and data model, stage 1   |
|               | adapting the laboratory requirements to restaurant food management, stage 2|
|               | resolving Vite/React errors, stage 3|
|               | add interactive checkboxes, delete buttons, and a dark mode toggle to the React application|
                                                      
Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: project initiation (Vite & React)
- [x] Stage 4: rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API
