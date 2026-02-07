const fs = require("fs");
const path = require("path");

const giftModalPath = path.join(__dirname, "..", "components", "GiftModal.tsx");
const gentleDaysPath = path.join(__dirname, "..", "app", "gentle-days", "page.tsx");
let content = fs.readFileSync(giftModalPath, "utf8");

// Replace mojibake with correct UTF-8 (common UTF-8 read as Latin-1)
const fixes = [
  ["ðŸ'•", "💕"],
  ["ðŸ¼", "🐼"],
  ["ðŸ'", "💐"],
  ["â€”", "—"],
  ["ðŸ'—", "💗"],
  ["ðŸŽ‚", "🎂"],
  ["ðŸ«", "🍫"],
  ["ðŸ§¸", "🧸"],
  ["â€¦", "..."],
  ["ðŸ˜…", "😅"],
  ["ðŸ¤—", "🤗"],
  ["âœˆï¸", "🤔"],
  ["âœˆï¸", "🤔"],
  ["ðŸ˜Œ", "😌"],
  ["ðŸ'€", "✈️"],
  ["ðŸŒŠ", "🌊"],
  ["ðŸ¤", "🤝"],
  ["ðŸ™‚", "🙂"],
  ["ðŸŽ­", "🎭"],
  ["ðŸ'§", "💧"],
  ["ðŸ'¬", "💬"],
  ["ðŸ˜„", "😄"],
  ["ðŸ˜¤", "😤"],
  ["ðŸ‹ï¸â€â™€ï¸", "🏋️‍♀️"],
  ["ðŸ‹ï¸â€â™€ï¸", "🏋️‍♀️"],
  ["ðŸ'ª", "💪"],
  ["âœ¨", "✨"],
  ["â¤ï¸", "❤️"],
];

for (const [from, to] of fixes) {
  while (content.includes(from)) {
    content = content.split(from).join(to);
  }
}
// Fix "7[garbled]14" date range
content = content.replace(/7[^\d]+14/g, "7-14");
// Regex fallbacks for mojibake that may use different quote chars
content = content.replace(/ðŸ['\u2019]•/g, "\uD83D\uDC95"); // 💕
content = content.replace(/ðŸ['\u2019]\u0090/g, "\uD83C\uDF90"); // 💐
content = content.replace(/ðŸ['\u2019]—/g, "\uD83D\uDC97"); // 💗
content = content.replace(/ðŸ['\u2019]€/g, "\u2708\uFE0F"); // ✈️
content = content.replace(/ðŸ['\u2019]¬/g, "\uD83D\uDCAC"); // 💬
content = content.replace(/ðŸ['\u2019]§/g, "\uD83D\uDCA7"); // 💧
content = content.replace(/ðŸ['\u2019]ª/g, "\uD83D\uDCAA"); // 💪
content = content.replace(/ðŸŽ§/g, "\uD83C\uDFA7"); // 🎧
content = content.replace(/Okay explorer [^\s]+ That's main-character energy\./g, "Okay explorer \u2708\uFE0F That's main-character energy.");
content = content.replace(/ðŸ\u0087\u008Bï¸â€\u008Dâ™€ï¸\u008F/g, "\uD83C\uDFCB\uFE0F\u200D\u2640\uFE0F"); // 🏋️‍♀️

fs.writeFileSync(giftModalPath, content, "utf8");
console.log("GiftModal.tsx encoding fixed.");

// Fix gentle-days page
let gentleContent = fs.readFileSync(gentleDaysPath, "utf8");
for (const [from, to] of fixes) {
  while (gentleContent.includes(from)) {
    gentleContent = gentleContent.split(from).join(to);
  }
}
gentleContent = gentleContent.replace(/7[^\d]+14/g, "7-14");
gentleContent = gentleContent.replace(/ðŸ['\u2019]•/g, "\uD83D\uDC95");
gentleContent = gentleContent.replace(/ðŸ['\u2019]\u0090/g, "\uD83D\uDC90");
gentleContent = gentleContent.replace(/ðŸ['\u2019]—/g, "\uD83D\uDC97");
gentleContent = gentleContent.replace(/â†/g, "\u2190"); // ←
gentleContent = gentleContent.replace(/âœ"ï¸\u008F/g, "\u2713"); // ✓
gentleContent = gentleContent.replace(/âœ"ï¸/g, "\u2713");
gentleContent = gentleContent.replace(/Water [^\s<]+/g, "Water \u2713");
gentleContent = gentleContent.replace(/Protein [^\s<]+/g, "Protein \u2713");
fs.writeFileSync(gentleDaysPath, gentleContent, "utf8");
console.log("gentle-days/page.tsx encoding fixed.");
