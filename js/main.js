import { ThemeManager } from './ui/themeManager.js';
import { LanguageManager } from './ui/languageManager.js';
import { TextInjector } from './ui/textInjector.js';

// 全局变量，用于语言切换
window.currentLang = 'zh';

document.addEventListener('DOMContentLoaded', () => {
    // 初始化各个管理器
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager();
    const textInjector = new TextInjector();

    // 初始化页面动画
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}); 