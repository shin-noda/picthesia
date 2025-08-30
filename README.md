# Picthesia 🌐🎈

**Interactive Word Fusion Sandbox**  

Picthesia turns words into bouncing balls. When two balls collide, they **fuse into a new concept** using AI (Gemini API), creating a dynamic, fun, and visual playground for word exploration!  

---

## 🎬 Demo

*Insert GIF or screenshot here showing balls bouncing and fusing*  

---

## ⚡ Features

- **Bouncing Words:** Words move dynamically like balls with random directions and velocities.  
- **AI-Powered Fusion:** Colliding balls generate a new word or concept via Gemini API.  
- **Text & Image Toggle:** Switch between text-only or picture+text view.  
- **Grace Time:** Prevents instant collision chains for smoother interaction.  
- **Smart State Handling:** Avoids duplicates, key errors, and animation glitches.  
- **Rate Limit Resilient:** Handles Gemini API 500 errors gracefully.  

---

## 🏗️ Architecture

- **`ToggleableBouncingContainer`** – main wrapper, toggles ball display modes.  
- **`Ball`** – single word/image ball with position, velocity, and unique ID.  
- **`PicWordToggle`** – switches display modes.  
- **Hooks:**  
  - `useBalls` – initializes balls, sets random positions & speeds, handles wall bounces.  
  - `useBallCollisions` – detects collisions, spawns fused balls, prevents duplicates.  
  - `useFusionQueue` – queues AI fusion requests and updates balls with responses.  

---

## ✅ Challenges Solved

- Prevented multiple spawns on one collision.  
- Randomized movement for new balls immediately after spawn.  
- Avoided duplicate API calls and UUID collisions.  
- Dynamic image integration from parent balls or Wikimedia API.  
- Smooth wall bounces and collision logic.  

---

## 💡 Future Enhancements

- Retry/backoff logic for API rate limits.  
- Visual feedback for balls awaiting fusion.  
- Smoother animations using `requestAnimationFrame`.  
- Fusion chain history visualization.  
- Speed/size scaling based on word importance or length. 

## 🛠️ Tech Stack
Frontend: React + TypeScript
Styling: CSS Modules
State Management: Custom React hooks (useBalls, useBallCollisions, useFusionQueue)
APIs: Gemini API for AI fusion, Wikimedia API for images

---

## 🤝 Contributing
Contributions are welcome!
Open issues for bugs or feature requests.
Submit pull requests for new features or improvements.

---

## 📜 License
MIT License © 2025