import { translations } from "../config/translations.js";

export class LanguageManager {
    constructor() {
        // 获取浏览器首选语言
        this.currentLang = this.detectBrowserLanguage();
        this.elements = this.getElements();
        this.init();
    }

    detectBrowserLanguage() {
        // 获取浏览器语言设置
        const browserLang = navigator.language || navigator.userLanguage;

        // 检查是否支持该语言
        if (browserLang.toLowerCase().startsWith("zh")) {
            return "zh";
        } else if (browserLang.toLowerCase().startsWith("en")) {
            return "en";
        }

        // 默认返回中文
        return "zh";
    }

    init() {
        this.applyLanguage();
        document
            .getElementById("langToggle")
            .addEventListener("click", () => this.toggleLanguage());
    }

    getElements() {
        return {
            title: document.getElementById("title"),
            subtitle: document.getElementById("subtitle"),
            langText: document.getElementById("langText"),
            inputTitle: document.getElementById("inputTitle"),
            textInput: document.getElementById("textInput"),
            injectionTitle: document.getElementById("injectionTitle"),
            lengthLabel: document.getElementById("lengthLabel"),
            lengthHint: document.getElementById("lengthHint"),
            instructionLabel: document.getElementById("instructionLabel"),
            instruction: document.getElementById("instruction"),
            injectButtonText: document.getElementById("injectButtonText"),
            resultTitle: document.getElementById("resultTitle"),
            resultHint: document.getElementById("resultHint"),
            authorLabel: document.getElementById("authorLabel"),
            authorName: document.getElementById("authorName"),
            copyright: document.getElementById("copyright"),
            loadingText: document.getElementById("loadingText"),
            copyButtonText: document.getElementById("copyButtonText"),
        };
    }

    applyLanguage() {
        const lang = translations[this.currentLang];
        Object.entries(this.elements).forEach(([key, element]) => {
            if (element && lang[key]) {
                if (key === "textInput") {
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
        this.currentLang = this.currentLang === "zh" ? "en" : "zh";
        this.applyLanguage();
    }
}
