## 1. Edit the Appropriate `.html` File
- Locate the `.html` file that corresponds to the page you want to update.
- Open it in a code editor (e.g., VS Code, Sublime Text).

## 2. Add a New Image Entry
Inside the `<div class="grid">`, insert a new `<img>` tag with the appropriate format:

### **With External Link:**
```html
<img src="the path to image goes here–we recommend using a CDN for large files"
        alt="Name of Asset"
        data-info="Name of Asset|Artist|Department|Medium|Year|<u><a target = '_blank' href='link to external link' target='_blank'>🖇️</a></u>"
        onclick="openLightbox(this)"
      />
```

### **Without External Link:**
```html
<img src="the path to image goes here–we recommend using a CDN for large files"
        alt="Name of Asset"
        data-info="Name of Asset|Artist|Department|Medium|Year|"
        onclick="openLightbox(this)"
      />
```

- The **JavaScript** will handle interactions and display automatically.

## 3. Save the File
- Ensure all edits are saved before proceeding to the next step.

---

# Pushing Changes to GitHub

## 1. Open Terminal or Git Bash
Navigate to the project folder using the terminal:
```bash
cd path/to/your/archive-website
```

## 2. Check the Current Status
Run:
```bash
git status
```
This will show any modified or new files.

## 3. Stage the Changes
```bash
git add .
```
Or, if you want to add specific files:
```bash
git add filename.html
```

## 4. Commit the Changes
```bash
git commit -m "Added new image entry to the archive"
```

## 5. Push to GitHub
```bash
git push origin main
```
*(If using a different branch, replace `main` with the correct branch name.)*

## 6. Verify the Update
- Go to the GitHub repository and check if the changes are reflected.
- If the site is hosted via GitHub Pages, wait a few minutes for updates to deploy.

---

**Done!** The new entry should now appear on the website. 
