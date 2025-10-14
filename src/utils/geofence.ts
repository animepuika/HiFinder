export function isRegionAllowed(countryCode: string | null, allowlistCsv: string | undefined) {
  if (!countryCode) return false;
  if (!allowlistCsv) return false;
  const allow = allowlistCsv.split(',').map(s => s.trim().toUpperCase());
  return allow.includes(countryCode.toUpperCase());
}
export function isAdult(ageYears: number | null) {
  return !!ageYears && ageYears >= 18;
}
export function shouldShow420(opts: { optedIn: boolean; ageYears: number | null; countryCode: string | null; allowlistCsv?: string }) {
  if (!opts.optedIn) return false;
  if (!isAdult(opts.ageYears)) return false;
  if (!isRegionAllowed(opts.countryCode, opts.allowlistCsv)) return false;
  return true;
}
