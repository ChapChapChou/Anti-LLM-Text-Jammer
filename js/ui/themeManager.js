export class ThemeManager {
    constructor() {
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    applyTheme() {
        document.body.className = this.isDarkMode ? 'dark' : 'light';
        this.themeToggle.innerHTML = this.isDarkMode ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
    }
} 