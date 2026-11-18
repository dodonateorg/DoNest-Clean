export interface CountryDialCode {
  code: string;
  country: string;
  flag: string;
}

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+225', country: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: '+221', country: 'Senegal', flag: '🇸🇳' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
  { code: '+229', country: 'Benin', flag: '🇧🇯' },
  { code: '+228', country: 'Togo', flag: '🇹🇬' },
  { code: '+241', country: 'Gabon', flag: '🇬🇦' },
  { code: '+242', country: 'Congo', flag: '🇨🇬' },
  { code: '+243', country: 'DR Congo', flag: '🇨🇩' },
  { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+223', country: 'Mali', flag: '🇲🇱' },
  { code: '+224', country: 'Guinea', flag: '🇬🇳' },
  { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
  { code: '+231', country: 'Liberia', flag: '🇱🇷' },
  { code: '+220', country: 'Gambia', flag: '🇬🇲' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲' },
  { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  { code: '+267', country: 'Botswana', flag: '🇧🇼' },
  { code: '+264', country: 'Namibia', flag: '🇳🇦' },
  { code: '+265', country: 'Malawi', flag: '🇲🇼' },
  { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
  { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '+1', country: 'US / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+91', country: 'India', flag: '🇮🇳' }
];

export function formatInternationalPhone(countryCode: string, rawInput: string): string {
  const cleanCode = countryCode.startsWith('+') ? countryCode.trim() : `+${countryCode.trim()}`;
  const codeDigits = cleanCode.replace(/\D/g, '');
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return '';

  // If user pasted a full international number starting with +
  if (trimmed.startsWith('+')) {
    const matched = [...COUNTRY_DIAL_CODES]
      .sort((a, b) => b.code.length - a.code.length)
      .find(c => trimmed.replace(/\s+/g, '').startsWith(c.code));

    if (matched) {
      const rest = trimmed.replace(/\s+/g, '').slice(matched.code.length).replace(/\D/g, '').replace(/^0+/, '');
      return rest ? `${matched.code} ${rest}` : '';
    }
    const allDigits = trimmed.replace(/\D/g, '');
    return allDigits ? `+${allDigits}` : '';
  }

  let digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';

  // Strip duplicate dial code if user included it without +
  if (digits.startsWith(codeDigits) && digits.length > codeDigits.length + 5) {
    digits = digits.slice(codeDigits.length);
  }
  digits = digits.replace(/^0+/, '');
  return digits ? `${cleanCode} ${digits}` : '';
}

export function getDefaultDialCodeForNgo(ngo?: {
  phone?: string;
  location?: string;
  city?: string;
}): string {
  if (!ngo) return '+237';

  const phoneClean = (ngo.phone || '').replace(/\s+/g, '');
  if (phoneClean.startsWith('+')) {
    const byPhone = [...COUNTRY_DIAL_CODES]
      .sort((a, b) => b.code.length - a.code.length)
      .find(c => phoneClean.startsWith(c.code));
    if (byPhone) return byPhone.code;
  }

  const loc = `${ngo.location || ''} ${ngo.city || ''}`.toLowerCase();
  const byCountry = COUNTRY_DIAL_CODES.find(c => loc.includes(c.country.toLowerCase()));
  if (byCountry) return byCountry.code;

  if (loc.includes('cameroun')) return '+237';
  if (loc.includes('ivory coast')) return '+225';
  return '+237';
}
