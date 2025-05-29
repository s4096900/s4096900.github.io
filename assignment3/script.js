document.addEventListener("DOMContentLoaded", () => {
  const characters = [
    {
      name: "Aria Shadowblade",
      image: "YOUR_IMAGE_LINK_HERE.png", // TODO: Insert your image link here for Aria Shadowblade
      stats: { strength: 85, speed: 95, magic: 70, defense: 60 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
      description:
        "A master assassin who moves like shadow through the night. Aria combines deadly precision with unmatched agility, making her perfect for players who prefer stealth and speed over brute force.",
    },
    {
      name: "Magnus Ironheart",
      image: "YOUR_IMAGE_LINK_HERE.png", // TODO: Insert your image link here for Magnus Ironheart
      stats: { strength: 95, speed: 50, magic: 40, defense: 90 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
      description:
        "A legendary warrior whose strength is matched only by his unwavering courage. Magnus wields ancient weapons with devastating power, serving as the perfect tank for any adventuring party.",
    },
    {
      name: "Luna Starweaver",
      image: "YOUR_IMAGE_LINK_HERE.png", // TODO: Insert your image link here for Luna Starweaver
      stats: { strength: 45, speed: 75, magic: 95, defense: 65 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
      description:
        "An arcane sorceress who channels the power of celestial bodies. Luna's mastery over magic is unparalleled, capable of reshaping reality with her spells and enchantments.",
    },
    {
      name: "Kai Swiftwind",
      image: "YOUR_IMAGE_LINK_HERE.png", // TODO: Insert your image link here for Kai Swiftwind
      stats: { strength: 70, speed: 90, magic: 80, defense: 70 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
      description:
        "A balanced fighter who harmonizes physical prowess with elemental magic. Kai represents versatility, able to adapt to any situation with equal parts martial skill and mystical power.",
    },
    {
      name: "Tactical Axeman",
      image: "YOUR_IMAGE_LINK_HERE.png", // TODO: Insert your image link here for Tactical Axeman (was input_file_0.png)
      stats: { strength: 90, speed: 60, magic: 10, defense: 85 },
      statColors: {
        strength: "#d2691e",
        speed: "#5cb85c",
        magic: "#5bc0de",
        defense: "#f0ad4e",
      },
      description:
        "A heavily armored operative skilled in close-quarters combat with an axe and shield. Prefers direct engagement and breaching tactics.",
    },
  ];

  let currentCharacterIndex = 0;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const characterImageEl = document.getElementById("characterImage");
  const loadingTextEl = document.getElementById("loadingText"); // Reference to the "Select a Character" div
  const characterNameEl = document.getElementById("characterName");
  const characterStatsEl = document.getElementById("characterStats");
  const characterDescriptionEl = document.getElementById(
    "characterDescription"
  );
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

    // Hide the loading/placeholder text element permanently after the first character load
    if (loadingTextEl.style.display !== "none") {
      loadingTextEl.style.display = "none";
    }

    setTimeout(
      () => {
        characterImageEl.src = character.image;
        characterNameEl.textContent = character.name;
        characterDescriptionEl.textContent = character.description;

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
    updateCharacterDisplay(true); // Pass true for initial load
  } else {
    // If no characters, you might want to show the "Select a Character" or a "No characters" message.
    characterNameEl.textContent = "No Characters Available";
    loadingTextEl.textContent = "No Characters Available"; // Keep this or remove if not desired
    loadingTextEl.style.display = "block"; // Show if no characters
    characterImageEl.style.display = "none";
  }
});
