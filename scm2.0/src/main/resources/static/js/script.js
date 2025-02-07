document.addEventListener("DOMContentLoaded", () => {
    // Get the current theme from localStorage or default to light
    let currentTheme = getTheme();
    
    // Apply the current theme when the page loads
    applyTheme(currentTheme);
  
    // Set up the event listener for the theme change button
    const changeThemeButton = document.querySelector("#theme_change_button");
    changeThemeButton.addEventListener("click", () => {
      // Toggle the theme
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      
      // Apply the new theme
      applyTheme(currentTheme);
  
      // Save the new theme to localStorage
      setTheme(currentTheme);
    });
  });
  
  // Get the current theme from localStorage (default to "light" if not set)
  function getTheme() {
    return localStorage.getItem("theme") || "light";
  }
  
  // Save the theme to localStorage
  function setTheme(theme) {
    localStorage.setItem("theme", theme);
  }
  
  // Apply the selected theme to the page
  function applyTheme(theme) {
    // Set the theme class on the <html> element
    document.documentElement.className = theme;
    
    // Update the button text based on the current theme
    const themeButtonText = theme === "light" ? "Dark" : "Light";
    document.querySelector("#theme_change_button span").textContent = themeButtonText;
  }
  