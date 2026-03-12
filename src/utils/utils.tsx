export function formatTime(timestamp: string) {
    const date = new Date(timestamp);

    return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}