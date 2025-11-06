# How to Edit Portfolio Items

To edit the websites shown in your portfolio section:

1. Open `portfolio-config.js`
2. Edit the array with your portfolio items:
   - `url`: The live website link
   - `title`: The project name
   - `description`: Brief description of the project

## Example:

```javascript
window.PORTFOLIO_CONFIG = [
  {
    url: "https://yoursite.com/",
    title: "Your Project Name",
    description: "What you built and why it's awesome"
  },
  {
    url: "https://anothersite.com/",
    title: "Another Project",
    description: "Another cool description"
  }
];
```

Add as many items as you want. No rebuilding needed - just edit the file and refresh your browser.
