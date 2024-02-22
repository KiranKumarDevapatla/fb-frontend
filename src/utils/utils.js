export function getInitials(fullName) {
    const words = fullName.split(' ');
    let initials = '';
    words.forEach(word => {
        initials += word.charAt(0);
    });
    return initials.toUpperCase();
}

export function getFirstName(fullName) {
    const words = fullName.split(' ');
    return words[0];
}

export function getLastName(fullName) {
    const words = fullName.split(' ');
    return words[words.length - 1];
}