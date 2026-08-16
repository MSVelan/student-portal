import db from "./config/database";

const groups = [
  { name: "CSE 2025 Study Group", branch: "CSE", year: 2025 },
  { name: "PDM 2026 Study Group", branch: "PDM", year: 2026 },
];

const insert = db.prepare(
  "INSERT INTO groups_table (name, branch, year) VALUES (?, ?, ?)",
);

for (const g of groups) {
  insert.run(g.name, g.branch, g.year);
}

console.log("Seeded groups table");
