# VN Layout

This is a simple tool to help you format translations using CSS + JS.  

It gives you a clean layout with character names, dialogue, backgrounds, sprites, and card CGs.

Just plug in your lines, no coding experience needed.

---

## 📦 How to Use

1. **Download or clone this repo**
2. **Only edit the dialogue and character names** don't touch anything else! (super important!)
3. Add your images to the right folders (see below)
4. Start writing your translations using the format shown below

---

## 📁 Folder Setup

Put your files in the right place so they show up properly:

- `card/` → card CGs  
- `chara/` → character sprites  
- `images/` → background images  

---

## ✏️ How to Write Each Line

### 🔹 Normal Scene

Use this when you want to show a background and a character sprite! REMEMBER `,` AFTER EVERY LINE!
```
{
  bg: "bg.png",           // from /images
  png: "chara.png",       // from /chara
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

→ To change "Home" and "Directory" in the menu bar, go to `index.html` and below script change the urls!
```



🔔 Reminder
❗ Don’t change anything other than name and dialogue

🧼 Keep your files organized in the right folders

✨ That’s it — enjoy translating!
