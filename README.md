=======
# 📘 VN Layout

This is a simple layout tool to help format visual novel-style translations using basic CSS + JS.

It gives you a clean layout with character names, dialogue boxes, background images, character sprites, and card CGs.

---

## 📦 How to Use

1. **Download or clone this repo**
2. **Only edit the dialogue and character names** don't touch anything else! (super important!)
3. Add your images to the right folders (see below)
4. Start writing your translations using the format shown below
=======
1. **Download or clone this repository**
2. **Only edit the `dialogue.js` file and `index.html` for links.**  
   ❗ **Do not change anything else** — very important!
3. Place your images in the correct folders (see below)
4. Start writing your translations using the format examples below

---

## 📁 Folder Setup

Make sure your assets are in the correct folders:

- `card/` → Card CGs  
- `chara/` → Character sprites  
- `images/` → Backgrounds
- 
---

## ✏️ How to Write Each Line

### 🔹 Normal Scene

Use this when you want to show a background and a character sprite.
⚠️ Don’t forget the comma at the end!

```
{
  bg: "bg.png",           // background from /images
  png: "chara.png",       // character sprite from /chara
  name: "Character Name", // who’s speaking
  dialogue: "Their line." // what they say
},
```

### 🔹 Card Scene

Use this for card CGs — you still need a chara PNG even with a card image!
```
{
  card: "card.png",       // from /card
  png: "chara.png",       // still needed from /chara
  name: "Character Name", 
  dialogue: "Their line."
},
```

→ To change "Home" and "Directory" in the menu bar, go to `index.html` and below script change the urls!



🔔 Reminder
❗ Don’t change anything other than name and dialogue

🧼 Keep your files organized in the right folders

✨ That’s it — enjoy translating!
=======
