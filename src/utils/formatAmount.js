export default function formatAmount(num = 0) {
  const str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

export function formatRub(amount) {
  if (typeof amount === 'undefined') {
    return '';
  }
  return `${formatAmount(amount, true)} `;
}

export function capitalizeFirstLetter(string) {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
