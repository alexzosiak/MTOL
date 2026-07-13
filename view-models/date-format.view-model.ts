const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
});

export function formatDateTime(value: Date | string) {
    return dateTimeFormatter.format(new Date(value));
}
