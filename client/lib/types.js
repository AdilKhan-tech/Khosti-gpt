export function createId(prefix = 'id') {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
export function titleFromMessage(content, hasImages = false) {
    const cleaned = content.replace(/\s+/g, ' ').trim();
    if (!cleaned)
        return hasImages ? 'Photo' : 'New chat';
    return cleaned.length > 42 ? `${cleaned.slice(0, 42)}…` : cleaned;
}
