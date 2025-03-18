const VARIATION_SELECTOR_START = 0xfe00;
const VARIATION_SELECTOR_END = 0xfe0f;
const VARIATION_SELECTOR_SUPPLEMENT_START = 0xe0100;
const VARIATION_SELECTOR_SUPPLEMENT_END = 0xe01ef;

function toVariationSelector(byte) {
    if (byte >= 0 && byte < 16) {
        return String.fromCodePoint(VARIATION_SELECTOR_START + byte);
    } else if (byte >= 16 && byte < 256) {
        return String.fromCodePoint(VARIATION_SELECTOR_SUPPLEMENT_START + byte - 16);
    }
    return null;
}

function fromVariationSelector(codePoint) {
    if (codePoint >= VARIATION_SELECTOR_START && codePoint <= VARIATION_SELECTOR_END) {
        return codePoint - VARIATION_SELECTOR_START;
    } else if (codePoint >= VARIATION_SELECTOR_SUPPLEMENT_START && codePoint <= VARIATION_SELECTOR_SUPPLEMENT_END) {
        return codePoint - VARIATION_SELECTOR_SUPPLEMENT_START + 16;
    }
    return null;
}

function encode(char, text) {
    const bytes = new TextEncoder().encode(text);
    let encoded = char;

    for (const byte of bytes) {
        const vs = toVariationSelector(byte);
        if (vs) {
            encoded += vs;
        }
    }

    // 添加调试信息
    console.log('Encoding details:');
    console.log('Original char:', char);
    console.log('Hidden text length:', text.length);
    console.log('Bytes length:', bytes.length);
    console.log('Encoded result length:', encoded.length);
    console.log('Encoded result:', Array.from(encoded).map(c => c.codePointAt(0).toString(16)).join(' '));

    return encoded;
}

function decode(text) {
    let decoded = [];
    const chars = Array.from(text);

    // 跳过第一个字符（原始字符）
    for (let i = 1; i < chars.length; i++) {
        const byte = fromVariationSelector(chars[i].codePointAt(0));
        if (byte === null) {
            break;
        }
        decoded.push(byte);
    }

    try {
        const decodedArray = new Uint8Array(decoded);
        return new TextDecoder().decode(decodedArray);
    } catch (error) {
        console.error('Decoding error:', error);
        return '';
    }
}

// 导出所有需要的函数
const variationEncoder = {
    encode,
    decode,
    toVariationSelector,
    fromVariationSelector
};

export default variationEncoder; 