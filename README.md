<<<<<<< HEAD
# VN Layout

This is a simple tool to help you format translations using CSS + JS.  

It gives you a clean layout with character names, dialogue, backgrounds, sprites, and card CGs.

Just plug in your lines, no coding experience needed.
=======
# 📘 VN Layout

This is a simple layout tool to help format visual novel-style translations using basic CSS + JS.

It gives you a clean layout with character names, dialogue boxes, background images, character sprites, and card CGs.

No coding experience needed — just drop your files in and start translating!
>>>>>>> ba10421 (Create README.md)

---

## 📦 How to Use

<<<<<<< HEAD
1. **Download or clone this repo**
2. **Only edit the dialogue and character names** don't touch anything else! (super important!)
3. Add your images to the right folders (see below)
4. Start writing your translations using the format shown below
=======
1. **Download or clone this repository**
2. **Only edit the dialogue and character names**  
   ❗ **Do not change anything else** — very important!
3. Place your images in the correct folders (see below)
4. Start writing your translations using the format examples below
>>>>>>> ba10421 (Create README.md)

---

## 📁 Folder Setup

<<<<<<< HEAD
Put your files in the right place so they show up properly:

- `card/` → card CGs  
- `chara/` → character sprites  
- `images/` → background images  
=======
Make sure your assets are in the correct folders:

- `card/` → Card CGs  
- `chara/` → Character sprites  
- `images/` → Backgrounds  

> 🔄 Keep your folder names and file paths as they are — no renaming.
>>>>>>> ba10421 (Create README.md)

---

## ✏️ How to Write Each Line

### 🔹 Normal Scene

<<<<<<< HEAD
Use this when you want to show a background and a character sprite! REMEMBER `,` AFTER EVERY LINE!
```
{
  bg: "bg.png",           // from /images
  png: "chara.png",       // from /chara
=======
Use this when you want to show a background and a character sprite.
⚠️ Don’t forget the comma at the end!

```
{
  bg: "bg.png",           // background from /images
  png: "chara.png",       // character sprite from /chara
>>>>>>> ba10421 (Create README.md)
  name: "Character Name", // who’s speaking
  dialogue: "Their line." // what they say
},
```
<<<<<<< HEAD

### 🔹 Card Scene

Use this for card CGs — you still need a chara PNG even with a card image!
```
{
  card: "card.png",       // from /card
  png: "chara.png",       // still needed from /chara
  name: "Character Name", 
  dialogue: "Their line."
},

→ To change "Home" and "Directory" in the menu bar, go to `index.html` and below script change the urls!
```



🔔 Reminder
❗ Don’t change anything other than name and dialogue

🧼 Keep your files organized in the right folders

✨ That’s it — enjoy translating!
=======
🔹 Card Scene
Use this for card CGs.
You still need to include a chara.png even when using a card.png!

```
{
  card: "card.png",       // card CG from /card
  png: "chara.png",       // character sprite from /chara (still needed)
  name: "Character Name", 
  dialogue: "Their line."
},
```
>>>>>>> ba10421 (Create README.md)
