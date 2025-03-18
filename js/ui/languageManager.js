import { translations } from '../config/translations.js';

export class LanguageManager {
    constructor() {
        this.currentLang = 'zh';
        this.elements = this.getElements();
        this.init();
    }

    init() {
        this.applyLanguage();
        document.getElementById('langToggle')
            .addEventListener('click', () => this.toggleLanguage());
    }

    getElements() {
        return {
            title: document.getElementById('title'),
            subtitle: document.getElementById('subtitle'),
            langText: document.getElementById('langText'),
            inputTitle: document.getElementById('inputTitle'),
            textInput: document.getElementById('textInput'),
            injectionTitle: document.getElementById('injectionTitle'),
            lengthLabel: document.getElementById('lengthLabel'),
            lengthHint: document.getElementById('lengthHint'),
            instructionLabel: document.getElementById('instructionLabel'),
            instruction: document.getElementById('instruction'),
            injectButtonText: document.getElementById('injectButtonText'),
            resultTitle: document.getElementById('resultTitle'),
            resultHint: document.getElementById('resultHint'),
            authorLabel: document.getElementById('authorLabel'),
            authorName: document.getElementById('authorName'),
            copyright: document.getElementById('copyright'),
            loadingText: document.getElementById('loadingText'),
            copyButtonText: document.getElementById('copyButtonText')
        };
    }

    applyLanguage() {
        const lang = translations[this.currentLang];
        Object.entries(this.elements).forEach(([key, element]) => {
            if (element && lang[key]) {
                if (key === 'textInput') {
                    element.placeholder = lang.textPlaceholder;
                } else {
                    element.textContent = lang[key];
                }
            }
        });
        // 更新全局语言变量
        window.currentLang = this.currentLang;
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        this.applyLanguage();
    }
} 