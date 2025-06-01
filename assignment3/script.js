document.addEventListener("DOMContentLoaded", () => {
  const characters = [
    {
      name: "Aria Shadowblade",
      image: "img/aussiewar.png",
      stats: { strength: 85, speed: 95, magic: 70, defense: 60 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
    },
    {
      name: "Magnus Ironheart",
      image: "img/soldier.webp",
      stats: { strength: 95, speed: 50, magic: 40, defense: 90 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
    },
    {
      name: "Luna Starweaver",
      image: "img/wizard.png",
      stats: { strength: 45, speed: 75, magic: 95, defense: 65 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
    },
    {
      name: "Kai Swiftwind",
      image: "img/monk.png",
      stats: { strength: 70, speed: 90, magic: 80, defense: 70 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
    },
    {
      name: "Tactical Axeman",
      image: "img/warrior.png",
      stats: { strength: 90, speed: 60, magic: 10, defense: 85 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
    },
  ];

  let currentCharacterIndex = 0;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const characterImageEl = document.getElementById("characterImage");
  const loadingTextEl = document.getElementById("loadingText");
  const characterNameEl = document.getElementById("characterName");
  const characterStatsEl = document.getElementById("characterStats");
  const indicatorsContainerEl = document.getElementById("indicators");

  function createIndicators() {
    indicatorsContainerEl.innerHTML = "";
    characters.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "indicator-dot";
      if (index === currentCharacterIndex) dot.classList.add("active");
      dot.addEventListener("click", () => selectCharacter(index));
      indicatorsContainerEl.appendChild(dot);
    });
  }

  function updateCharacterDisplay(isInitialLoad = false) {
    const character = characters[currentCharacterIndex];

    characterImageEl.classList.remove("active"); // Start fade-out of old image

    if (loadingTextEl.style.display !== "none") {
      loadingTextEl.style.display = "none";
    }

    setTimeout(
      () => {
        characterImageEl.src = character.image;
        characterNameEl.textContent = character.name;

        characterStatsEl.innerHTML = "";
        for (const statName in character.stats) {
          const statValue = character.stats[statName];
          const statColor =
            character.statColors[statName.toLowerCase()] || "#777777";

          const statDiv = document.createElement("div");
          statDiv.className = "stat";
          const nameSpan = document.createElement("span");
          nameSpan.className = "stat-name";
          nameSpan.textContent =
            statName.charAt(0).toUpperCase() + statName.slice(1);
          const barDiv = document.createElement("div");
          barDiv.className = "stat-bar";
          const fillDiv = document.createElement("div");
          fillDiv.className = "stat-fill";
          fillDiv.style.backgroundColor = statColor;

          if (isInitialLoad) {
            fillDiv.style.width = statValue + "%";
          } else {
            fillDiv.style.width = "0%";
            setTimeout(() => {
              fillDiv.style.width = statValue + "%";
            }, 50);
          }

          barDiv.appendChild(fillDiv);
          statDiv.appendChild(nameSpan);
          statDiv.appendChild(barDiv);
          characterStatsEl.appendChild(statDiv);
        }

        document.querySelectorAll(".indicator-dot").forEach((dot, index) => {
          dot.classList.toggle("active", index === currentCharacterIndex);
        });

        characterImageEl.classList.add("active"); // Start fade-in of new image
      },
      isInitialLoad ? 0 : 250
    );
  }

  function nextCharacter() {
    currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
    updateCharacterDisplay();
  }

  function prevCharacter() {
    currentCharacterIndex =
      (currentCharacterIndex - 1 + characters.length) % characters.length;
    updateCharacterDisplay();
  }

  function selectCharacter(index) {
    if (index >= 0 && index < characters.length) {
      currentCharacterIndex = index;
      updateCharacterDisplay();
    }
  }

  prevBtn.addEventListener("click", prevCharacter);
  nextBtn.addEventListener("click", nextCharacter);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextCharacter();
    if (e.key === "ArrowLeft") prevCharacter();
    if (e.key >= "1" && e.key <= String(characters.length)) {
      selectCharacter(parseInt(e.key) - 1);
    }
  });

  // Initialization
  createIndicators();
  if (characters.length > 0) {
    updateCharacterDisplay(true);
  } else {
  }
});
