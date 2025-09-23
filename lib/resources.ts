export function formatDate(dateStr: string): string | null {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    // date = new Date(); // invalid date
    return null; // invalid date
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getCountdown(targetDate: string): string | null {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  // If the countdown is over
  if (diff <= 0) {
    return null;
  }

  // Calculate hours, minutes, seconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Format with leading zeros
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${hours}hrs : ${pad(minutes)}mins : ${pad(seconds)}secs`;
}

export function getAvatarInitials(name?: string | null): string {
  if (!name) return ""; // handles null, undefined, empty string

  // Trim spaces and split by whitespace
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0) return "";

  // If name has more than one word, take first letter of first 2 words
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // Otherwise take first 2 letters of the single word
  return parts[0].slice(0, 2).toUpperCase();
}

export function formatedNumber(number: number, locales = 'en-US', options = {}) {
  return new Intl.NumberFormat(locales, options).format(number);
}

export function displayPointCount(messageCount: number, decimals = 1) {
  const format = (value: number, suffix: string) => {
    const factor = Math.pow(10, decimals);
    const truncated = Math.floor(value * factor) / factor;
    const str = truncated.toString();
    return (str.endsWith('.0') ? str.slice(0, -2) : str) + suffix;
  };

  if (messageCount < 1_000) {
    return formatedNumber(messageCount).toString() + ' '; // No suffix needed for less than 1000
  } else if (messageCount < 1_000_000) {
    return format(messageCount / 1000, "K ");  // Suffix K for thousands
  } else if (messageCount < 1_000_000_000) {
    return format(messageCount / 1_000_000, "M ");  // Suffix M for millions
  } else {
    return format(messageCount / 1_000_000_000, "B ");  // Suffix B for billions
  }
}

export function abbreviateNumber(value: number, decimals: number = 2): string {
  if (!Number.isFinite(value)) return '';
  if (decimals < 0) decimals = 0;

  const fixed = value.toFixed(decimals);
  return Number(fixed).toString();
}