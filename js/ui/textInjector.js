import variationEncoder from '../utils/variationEncoder.js';
import { escapeHTML, generatePromptPrefix } from '../utils/textUtils.js';
import { getKaramazovText } from '../services/karamazovService.js';
import { translations } from '../config/translations.js';

export class TextInjector {
    constructor() {
        this.elements = {
            textInput: document.getElementById('textInput'),
            injectButton: document.getElementById('injectButton'),
            resultText: document.getElementById('resultText'),
            resultHint: document.getElementById('resultHint'),
            loadingIndicator: document.getElementById('loadingIndicator'),
            copyButton: document.getElementById('copyButton'),
            hiddenCopyArea: document.getElementById('hiddenCopyArea'),
            textLength: document.getElementById('textLength')
        };

        this.init();
    }

    init() {
        this.elements.injectButton.addEventListener('click', () => this.injectText());
        this.elements.copyButton.addEventListener('click', () => this.copyText());
    }

    async injectText() {
        const textarea = this.elements.textInput;
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        
        if (selectionStart === selectionEnd) {
            alert(translations[window.currentLang].selectError);
            return;
        }
        
        const textLength = parseInt(this.elements.textLength.value, 10);
        if (isNaN(textLength) || textLength < 100 || textLength > 5000) {
            alert(translations[window.currentLang].lengthError);
            return;
        }

        this.elements.loadingIndicator.classList.remove('hidden');
        
        try {
            // 获取选中文本及其前后的文本
            const beforeSelection = textarea.value.substring(0, selectionStart);
            const selectedText = textarea.value.substring(selectionStart, selectionEnd);
            const afterSelection = textarea.value.substring(selectionEnd);
            
            const karamazovText = await getKaramazovText(textLength);
            const hiddenText = generatePromptPrefix() + karamazovText;
            
            const firstChar = selectedText.charAt(0);
            const remainingText = selectedText.substring(1);
            
            // 使用变体选择符编码隐藏文本
            const encodedChar = variationEncoder.encode(firstChar, hiddenText);
            
            // 构建最终文本 - 修正顺序
            const finalText = beforeSelection +  // 选中部分前的文本
                             encodedChar +       // 带有隐藏信息的第一个字符
                             remainingText +     // 选中部分的剩余文本
                             afterSelection;     // 选中部分后的文本

            // 保存到隐藏文本区域用于复制
            this.elements.hiddenCopyArea.value = finalText;

            // 更新输入框的文本
            textarea.value = finalText;

            // 更新显示结果
            this.updateResultDisplay(beforeSelection, selectedText, afterSelection, hiddenText, encodedChar);

            console.log('Encoding details:', {
                originalChar: firstChar,
                hiddenTextLength: hiddenText.length,
                encodedCharLength: encodedChar.length,
                decodedText: variationEncoder.decode(encodedChar)
            });
        } catch (error) {
            console.error('Error injecting text:', error);
        } finally {
            this.elements.loadingIndicator.classList.add('hidden');
        }
    }

    updateResultDisplay(beforeSelection, selectedText, afterSelection, hiddenText, encodedChar) {
        // 构建UI显示的HTML
        const resultHTML = 
            escapeHTML(beforeSelection) +  // 选中部分前的文本
            `<span class="has-hidden-text">${escapeHTML(selectedText.charAt(0))}<span class="hidden-text-tooltip"><strong>注入信息：</strong><br>- 原始字符：${escapeHTML(selectedText.charAt(0))}<br>- 变体选择符数量：${encodedChar.length - 1}<br>- 隐藏文本长度：${hiddenText.length} 字符<hr><strong>隐藏内容：</strong><br>${escapeHTML(hiddenText)}</span></span>` +
            escapeHTML(selectedText.substring(1)) +  // 选中部分的剩余文本
            escapeHTML(afterSelection);  // 选中部分后的文本
        
        // 更新结果显示区域
        this.elements.resultHint.style.display = 'none';
        this.elements.resultText.innerHTML = resultHTML;

        // 为结果区域的字符添加事件监听器
        const hiddenTextSpans = this.elements.resultText.querySelectorAll('.has-hidden-text');
        hiddenTextSpans.forEach(span => {
            span.addEventListener('click', () => {
                const tooltip = span.querySelector('.hidden-text-tooltip');
                if (tooltip) {
                    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }

    async copyText() {
        const textToCopy = this.elements.hiddenCopyArea.value;
        if (textToCopy) {
            try {
                await navigator.clipboard.writeText(textToCopy);
                alert(translations[window.currentLang].copySuccess);
            } catch (err) {
                console.error('Copy failed:', err);
                this.elements.hiddenCopyArea.select();
                document.execCommand('copy');
                alert(translations[window.currentLang].copySuccess);
            }
        }
    }

    decodeText(text) {
        return variationEncoder.decode(text);
    }
} 