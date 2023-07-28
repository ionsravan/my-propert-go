// PHONE NUMBER UTILS

export function findCountryByPhone(countries: any[], phone: string) {
  return countries.find((country) => country.phone === phone);
}
