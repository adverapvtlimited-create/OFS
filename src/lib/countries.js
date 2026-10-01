/**
 * Comprehensive World Countries & International Phone Dial Codes
 * Formatted with flags, dial codes, placeholders, national digit length rules, and E.164 validators.
 */

export const COUNTRIES = [
  // Priority / Frequent Trade Partners First
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', placeholder: '98200 00000', lengths: [10], priority: true },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567', lengths: [9], priority: true },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', placeholder: '(201) 555-0123', lengths: [10], priority: true },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', placeholder: '50 123 4567', lengths: [9], priority: true },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', placeholder: '7911 123456', lengths: [10, 11], priority: true },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', placeholder: '8123 4567', lengths: [8], priority: true },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', placeholder: '3312 3456', lengths: [8], priority: true },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', placeholder: '9123 4567', lengths: [8], priority: true },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', placeholder: '9123 4567', lengths: [8], priority: true },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', placeholder: '3600 1234', lengths: [8], priority: true },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', placeholder: '151 23456789', lengths: [10, 11], priority: true },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', placeholder: '412 345 678', lengths: [9], priority: true },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', placeholder: '(416) 555-0199', lengths: [10], priority: true },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', placeholder: '12-345 6789', lengths: [9, 10], priority: true },

  // Complete Alphabetical World Countries
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫', placeholder: '70 123 4567', lengths: [9] },
  { code: 'AL', name: 'Albania', dialCode: '+355', flag: '🇦🇱', placeholder: '67 123 4567', lengths: [9] },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿', placeholder: '551 23 45 67', lengths: [9] },
  { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩', placeholder: '312 345', lengths: [6] },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴', placeholder: '923 123 456', lengths: [9] },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', placeholder: '11 1234-5678', lengths: [10] },
  { code: 'AM', name: 'Armenia', dialCode: '+374', flag: '🇦🇲', placeholder: '77 123456', lengths: [8] },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', placeholder: '664 1234567', lengths: [10, 11] },
  { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿', placeholder: '50 123 45 67', lengths: [9] },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', placeholder: '1712-345678', lengths: [10] },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', placeholder: '470 12 34 56', lengths: [9] },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', placeholder: '11 91234-5678', lengths: [11] },
  { code: 'BN', name: 'Brunei', dialCode: '+673', flag: '🇧🇳', placeholder: '712 3456', lengths: [7] },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬', placeholder: '87 123 4567', lengths: [9] },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', placeholder: '9 1234 5678', lengths: [9] },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', placeholder: '138 0013 8000', lengths: [11] },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', placeholder: '300 123 4567', lengths: [10] },
  { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾', placeholder: '96 123456', lengths: [8] },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿', placeholder: '601 123 456', lengths: [9] },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', placeholder: '20 12 34 56', lengths: [8] },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', placeholder: '100 123 4567', lengths: [10] },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪', placeholder: '5123 4567', lengths: [7, 8] },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮', placeholder: '40 1234567', lengths: [9, 10] },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78', lengths: [9] },
  { code: 'GE', name: 'Georgia', dialCode: '+995', flag: '🇬🇪', placeholder: '599 12 34 56', lengths: [9] },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', placeholder: '23 123 4567', lengths: [9] },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', placeholder: '691 234 5678', lengths: [10] },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', placeholder: '9123 4567', lengths: [8] },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺', placeholder: '20 123 4567', lengths: [9] },
  { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸', placeholder: '612 3456', lengths: [7] },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', placeholder: '812-3456-7890', lengths: [9, 10, 11, 12] },
  { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶', placeholder: '790 123 4567', lengths: [10] },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', placeholder: '85 123 4567', lengths: [9] },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱', placeholder: '50-123-4567', lengths: [9] },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789', lengths: [10] },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', placeholder: '90-1234-5678', lengths: [10] },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴', placeholder: '7 9012 3456', lengths: [9] },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿', placeholder: '701 123 4567', lengths: [10] },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', placeholder: '712 345678', lengths: [9] },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', placeholder: '10-1234-5678', lengths: [9, 10] },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻', placeholder: '21 234 567', lengths: [8] },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧', placeholder: '70 123 456', lengths: [8] },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹', placeholder: '612 34567', lengths: [8] },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺', placeholder: '621 123 456', lengths: [9] },
  { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻', placeholder: '771-2345', lengths: [7] },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹', placeholder: '9912 3456', lengths: [8] },
  { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺', placeholder: '5251 2345', lengths: [8] },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', placeholder: '55 1234 5678', lengths: [10] },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦', placeholder: '612-345678', lengths: [9] },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', placeholder: '984-1234567', lengths: [10] },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', placeholder: '6 12345678', lengths: [9] },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', placeholder: '21 123 4567', lengths: [8, 9] },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', placeholder: '802 123 4567', lengths: [10] },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', placeholder: '412 34 567', lengths: [8] },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰', placeholder: '301 2345678', lengths: [10] },
  { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦', placeholder: '6123-4567', lengths: [8] },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', placeholder: '912 345 678', lengths: [9] },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', placeholder: '917 123 4567', lengths: [10] },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', placeholder: '512 345 678', lengths: [9] },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', placeholder: '912 345 678', lengths: [9] },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴', placeholder: '712 345 678', lengths: [9] },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', placeholder: '912 345-67-89', lengths: [10] },
  { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸', placeholder: '60 1234567', lengths: [8, 9] },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰', placeholder: '912 123 456', lengths: [9] },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮', placeholder: '31 123 456', lengths: [8] },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', placeholder: '71 123 4567', lengths: [9] },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', placeholder: '612 34 56 78', lengths: [9] },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', placeholder: '71 234 5678', lengths: [9] },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', placeholder: '70 123 45 67', lengths: [9] },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', placeholder: '78 123 45 67', lengths: [9] },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼', placeholder: '912 345 678', lengths: [9] },
  { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿', placeholder: '681 234 567', lengths: [9] },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', placeholder: '81 234 5678', lengths: [9] },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', placeholder: '501 234 56 78', lengths: [10] },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬', placeholder: '712 345678', lengths: [9] },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦', placeholder: '50 123 4567', lengths: [9] },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', placeholder: '94 123 456', lengths: [8] },
  { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿', placeholder: '90 123 45 67', lengths: [9] },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', placeholder: '91 234 56 78', lengths: [9] },
  { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪', placeholder: '71 234 567', lengths: [8, 9] },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲', placeholder: '95 1234567', lengths: [9] },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼', placeholder: '71 234 5678', lengths: [9] },
];

/**
 * Returns country definition by ISO country code ('IN', 'US', etc.)
 */
export function getCountryByCode(code) {
  if (!code) return COUNTRIES[0];
  const upper = code.toUpperCase();
  return COUNTRIES.find((c) => c.code === upper) || COUNTRIES[0];
}

/**
 * Returns country definition by dial code ('+91', '+1', etc.)
 */
export function getCountryByDialCode(dialCode) {
  if (!dialCode) return COUNTRIES[0];
  const clean = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return COUNTRIES.find((c) => c.dialCode === clean) || COUNTRIES[0];
}

/**
 * Validates international phone number against E.164 and country rules.
 * 
 * @param {string} rawPhone - The phone string (e.g. "+91 98200 00000" or national number)
 * @param {string|null} countryCode - Optional ISO country code ('IN', 'AE', 'US', etc.)
 * @returns {{ isValid: boolean, error: string|null, e164: string, dialCode: string, nationalNumber: string, country: object }}
 */
export function validatePhoneNumber(rawPhone, countryCode = null) {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return {
      isValid: false,
      error: 'Phone number is required.',
      e164: '',
      dialCode: '',
      nationalNumber: '',
      country: COUNTRIES[0],
    };
  }

  const trimmed = rawPhone.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Phone number cannot be empty.',
      e164: '',
      dialCode: '',
      nationalNumber: '',
      country: COUNTRIES[0],
    };
  }

  // 1. Detect if dial code is embedded in rawPhone (starts with '+')
  let detectedCountry = countryCode ? getCountryByCode(countryCode) : null;
  let nationalDigits = '';
  let dialCode = detectedCountry?.dialCode || '+91';

  if (trimmed.startsWith('+')) {
    // Sort dial codes descending by length (+971 before +97, etc.)
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
    const match = sortedCountries.find((c) => trimmed.startsWith(c.dialCode));
    if (match) {
      detectedCountry = match;
      dialCode = match.dialCode;
      nationalDigits = trimmed.slice(match.dialCode.length).replace(/\D/g, '');
    } else {
      // Generic plus number
      const digitsOnly = trimmed.replace(/\D/g, '');
      nationalDigits = digitsOnly;
    }
  } else {
    // Strip everything except digits
    nationalDigits = trimmed.replace(/\D/g, '');
    if (detectedCountry) {
      // If user typed dial code without plus (e.g. "919820000000")
      const rawDialDigits = detectedCountry.dialCode.replace(/\D/g, '');
      if (nationalDigits.startsWith(rawDialDigits) && nationalDigits.length > rawDialDigits.length + 5) {
        nationalDigits = nationalDigits.slice(rawDialDigits.length);
      }
    }
  }

  if (!detectedCountry) {
    detectedCountry = COUNTRIES[0];
  }

  // 2. Validate digit counts
  // Total digits in national portion
  const len = nationalDigits.length;

  if (len === 0) {
    return {
      isValid: false,
      error: 'Please enter phone digits.',
      e164: '',
      dialCode,
      nationalNumber: '',
      country: detectedCountry,
    };
  }

  // Country-specific length validation if rules exist
  if (detectedCountry?.lengths && detectedCountry.lengths.length > 0) {
    const minExpected = Math.min(...detectedCountry.lengths);
    const maxExpected = Math.max(...detectedCountry.lengths);

    if (len < minExpected) {
      return {
        isValid: false,
        error: `Phone number for ${detectedCountry.name} must have at least ${minExpected} digits (entered ${len}).`,
        e164: `${dialCode} ${nationalDigits}`,
        dialCode,
        nationalNumber: nationalDigits,
        country: detectedCountry,
      };
    }

    if (len > maxExpected + 1) { // allow 1 digit leniency for special extensions/zeros
      return {
        isValid: false,
        error: `Phone number for ${detectedCountry.name} should not exceed ${maxExpected} digits.`,
        e164: `${dialCode} ${nationalDigits}`,
        dialCode,
        nationalNumber: nationalDigits,
        country: detectedCountry,
      };
    }
  } else {
    // Worldwide generic standard: 6 to 15 digits
    if (len < 6 || len > 15) {
      return {
        isValid: false,
        error: 'Phone number must contain between 6 and 15 digits.',
        e164: `${dialCode} ${nationalDigits}`,
        dialCode,
        nationalNumber: nationalDigits,
        country: detectedCountry,
      };
    }
  }

  return {
    isValid: true,
    error: null,
    e164: `${dialCode} ${nationalDigits}`,
    dialCode,
    nationalNumber: nationalDigits,
    country: detectedCountry,
  };
}
