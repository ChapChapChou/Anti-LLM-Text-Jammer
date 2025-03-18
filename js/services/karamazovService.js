const karamazovFullText = `第一编 杂史 第一卷 费多尔·巴甫洛维奇·卡拉马佐夫的历史...`; // 完整文本

export async function getKaramazovText(length) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const actualLength = Math.min(length, karamazovFullText.length);
            resolve(karamazovFullText.substring(0, actualLength));
        }, 500);
    });
} 