# Anti-LLM Token Jammer

A tool that embeds extensive text information into documents using Unicode variation selectors, preventing LLM content scraping and web crawlers from properly processing the original content.

This steganography technique hides text within seemingly normal content by utilizing Unicode variation selectors, effectively creating an invisible watermark that remains intact in the document while being difficult for automated systems to detect or remove.

Thanks to [Karpathy](https://x.com/karpathy/status/1823418177197646104) for providing this creative idea.

## Features

- **Text Injection**: Inject hidden text using Unicode variation selectors
- **Visual Preview**: Real-time preview of injected text with hover tooltips
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Bilingual Support**: Full support for English and Chinese interfaces
- **Copy Function**: Easy copying of processed text with hidden content
- **Responsive Design**: Works seamlessly across different screen sizes


## Getting Started

### Prerequisites

- Modern web browser with Unicode support

### Installation

You can use my [website](https://v1cpje3acp.yourware.so/) 

or

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anti-llm-token-jammer.git
```

2. Navigate to the project directory:
```bash
cd anti-llm-token-jammer
```

3. Open `index.html` using a local server (e.g., Live Server in VS Code)

### Usage

1. Enter or paste your text in the input area
2. Select the portion of text where you want to inject hidden content
3. Adjust the injection text length (100-5000 characters)
4. Click "Inject Text" button
5. Hover over the modified character to view the hidden content
6. Use the copy button to copy the processed text

## Project Structure

```
anti-llm-text-injector/
├── index.html
├── styles/
│ └── main.css
└── js/
├── main.js
├── config/
│ └── translations.js
├── utils/
│ ├── variationEncoder.js
│ └── textUtils.js
├── services/
│ └── karamazovService.js
└── ui/
├── themeManager.js
├── languageManager.js
└── textInjector.js

```
# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
