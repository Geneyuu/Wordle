let currentRow = 0;
let maxTries = 6;

const words = [
	"apple",
	"grape",
	"light",
	"earth",
	"train",
	"crane",
	"flame",
	"alert",
	"about",
	"above",
	"alone",
	"angle",
	"align",
	"adult",
	"after",
	"again",
	"agree",
	"asset",
	"adopt",
	"alive",
	"alarm",
	"alter",
	"allow",
	"actor",
	"arise",
	"award",
	"aware",
	"basic",
	"bench",
	"black",
	"bread",
	"bring",
	"build",
	"brain",
	"brand",
	"chair",
	"cloud",
	"charm",
	"crash",
	"craft",
	"crown",
	"dance",
	"dream",
	"drink",
	"dress",
	"drive",
	"field",
	"final",
	"first",
	"force",
	"fresh",
	"fruit",
	"front",
	"grace",
	"guest",
	"grass",
	"guard",
	"guide",
	"happy",
	"horse",
	"heart",
	"human",
	"house",
	"image",
	"ideal",
	"issue",
	"judge",
	"label",
	"lesson",
	"learn",
	"magic",
	"music",
	"moral",
	"mouse",
	"merry",
	"march",
	"metal",
	"minor",
	"novel",
	"noise",
	"ocean",
	"other",
	"often",
	"order",
	"paint",
	"plane",
	"plant",
	"place",
	"pride",
	"power",
	"price",
	"prime",
	"prize",
	"ratio",
	"range",
	"reach",
	"rapid",
	"river",
	"route",
	"score",
	"scene",
	"share",
	"shape",
	"smile",
	"sound",
	"story",
	"shift",
	"sight",
	"skill",
	"smoke",
	"solve",
	"solid",
	"store",
	"style",
	"teach",
	"theme",
	"think",
	"today",
	"truth",
	"value",
	"visit",
	"voice",
	"video",
	"world",
	"watch",
	"wrong",
	"water",
	"white",
	"write",
	"which",
	"words",
	"woman",
	"young",
	"trust",
	"study",
	"south",
	"sweet",
	"stone",
	"space",
	"table",
	"thank",
	"these",
	"three",
	"times",
	"total",
	"trace",
	"trail",
	"track",
	"trend",
	"truck",
	"under",
	"union",
	"until",
	"upper",
	"usage",
	"vocal",
	"wheel",
	"would",
	"yield",
	"zebra",
	"quest",
	"bonus",
	"peace",
	"proud",
	"tried",
	"taste",
	"touch",
	"guess",
	"carry",
	"court",
	"laugh",
	"plain",
	"match",
	"timer",
	"owner",
	"enjoy",
	"press",
	"frame",
	"focus",
	"clean",
	"coach",
	"cream",
	"floor",
	"forget",
	"grade",
	"grand",
	"heavy",
	"hotel",
	"legal",
	"level",
	"movie",
	"mount",
	"money",
	"offer",
	"prove",
	"quick",
	"quiet",
	"serve",
	"those",
	"zippy",
	"chaos",
	"delay",
	"fever",
	"globe",
	"pupil",
	"rally",
	"tiger",
];

const targetWord = words[Math.floor(Math.random() * words.length)];
// console.log(targetWord);

const board = document.getElementById("board");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");

// Autofocus on input at initial load
guessInput.focus();

// Create board tiles
for (let i = 0; i < maxTries * 5; i++) {
	const tile = document.createElement("div");
	tile.classList.add("tile");
	board.appendChild(tile);
}

// Show reset button
function showResetButton() {
	const resetBtn = document.createElement("button");
	resetBtn.textContent = "Play Again";
	resetBtn.style.marginTop = "20px";
	resetBtn.style.padding = "10px 20px";
	resetBtn.style.fontSize = "16px";
	resetBtn.style.cursor = "pointer";
	resetBtn.addEventListener("click", () => location.reload());
	document.body.appendChild(resetBtn);
}

// Real-time typing display
function handleTyping() {
	const value = guessInput.value.trim().toLowerCase();
	const rowOffset = currentRow * 5;

	for (let i = 0; i < 5; i++) {
		const tile = board.children[rowOffset + i];
		tile.textContent = value[i] || "";
		tile.className = "tile";

		if (value[i]) {
			tile.classList.add("pop");
			tile.offsetWidth;
		}
	}
}
// Main guess handler
function handleGuess() {
	const guess = guessInput.value.trim().toLowerCase();

	if (guess.length !== 5 || /[^a-zA-Z]/.test(guess)) {
		alert("Please enter exactly 5 **letters** only.");
		return;
	}

	const rowOffset = currentRow * 5;

	for (let i = 0; i < 5; i++) {
		const tile = board.children[rowOffset + i];
		tile.textContent = guess[i];

		if (guess[i] === targetWord[i]) {
			tile.classList.add("correct");
		} else if (targetWord.includes(guess[i])) {
			tile.classList.add("close");
		} else {
			tile.classList.add("wrong");
		}
	}

	currentRow++;
	guessInput.value = "";
	guessInput.focus();

	if (guess === targetWord) {
		setTimeout(() => alert("🎉 You guessed it!"), 100);
		submitBtn.disabled = true;
		guessInput.disabled = true;
		showResetButton();
		return;
	}

	if (currentRow === maxTries) {
		submitBtn.disabled = true;
		guessInput.disabled = true;
		setTimeout(() => {
			alert(
				`💀 Out of tries! The word was "${targetWord.toUpperCase()}"`
			);
		}, 100);
		showResetButton();
	}
}

// Event listeners
submitBtn.addEventListener("click", handleGuess);
guessInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		handleGuess();
	}
});
guessInput.addEventListener("input", handleTyping);
