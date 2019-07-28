import { parseIetfLocaleTag, isValidIetfLocaleTag } from '../src/IetfLocaleParser';

describe('IETF Locale Parser', () => {
  it('successfully parses the "en" locale', () => {
    const matches = parseIetfLocaleTag('en');
    expect(matches).toEqual({
      primaryLang: 'en'
    });
  });

  it('successfully parses the "eng" locale', () => {
    const matches = parseIetfLocaleTag('eng');
    expect(matches).toEqual({
      primaryLang: 'eng'
    });
  });


  it('successfully parses the "en-US" locale', () => {
    const matches = parseIetfLocaleTag('en-US');
    expect(matches).toEqual({
      primaryLang: 'en',
      region: 'US'
    })
  });

  it('matches a locale with extension and script', () => {
    const matches = parseIetfLocaleTag('zh-cmn-Hant');
    expect(matches).toEqual({
      primaryLang: 'zh',
      extLangs: 'cmn',
      extLang1: 'cmn',
      script: 'Hant'
    });
  });

  it('matches a locale tag with multiple extensions and script', () => {
    const matches = parseIetfLocaleTag('ar-ajp-apc-apd-Arab');
    expect(matches).toEqual({
      primaryLang: 'ar',
      extLangs: 'ajp-apc-apd',
      extLang1: 'ajp',
      extLang2: 'apc',
      extLang3: 'apd',
      script: 'Arab'
    })
  });

  it('successfully matches a complete locale tag', () => {
    // this code is made to test the parsing, but is probably non existent
    const matches = parseIetfLocaleTag('ar-ajp-apc-apd-Arab-CV-arevela-g-231243-r-sdarre-x-private-x-private1');
    expect(matches).toEqual({
      primaryLang: 'ar',
      extLangs: 'ajp-apc-apd',
      extLang1: 'ajp',
      extLang2: 'apc',
      extLang3: 'apd',
      script: 'Arab',
      region: 'CV',
      variant: 'arevela',
      extension: 'g-231243-r-sdarre',
      private: 'x-private-x-private1'
    });
  });

  it('does not capture partial extension tags "t-"', () => {
    const matches = parseIetfLocaleTag('ar-ajp-apc-apd-Arab-CV-arevela-g-r-sdarre-x-private-x-private1');
    expect(matches).toEqual({});
  });

  it('does not match generic strings', () => {
    const matches = parseIetfLocaleTag('fsfqe31-23124321f');
    expect(matches).toEqual({});
  });

  it('does not match an null string', () => {
    const matches = parseIetfLocaleTag(null);
    expect(matches).toEqual({});
  });

  it('does not match an undefined string', () => {
    const matches = parseIetfLocaleTag(undefined);
    expect(matches).toEqual({});
  });
});

describe('IETF locale validation', () => {
  it('matches a proper IETF locale', () => {
    const isValid = isValidIetfLocaleTag('ar-ajp-apc-apd-Arab-CV-arevela-g-231243-r-sdarre-x-private-x-private1');
    expect(isValid).toBe(true);
  });

  it('does not match an invalid IETF locale', () => {
    const isValid = isValidIetfLocaleTag('ar-ajp-apc-apd-Arab-CV-arevela-g-r-sdarre-x-private-x-private1');
    expect(isValid).toBe(false);
  });

  it('does not match a null locale', () => {
    const isValid = isValidIetfLocaleTag(null);
    expect(isValid).toBe(false);
  });

  it('does not match an undefined locale tag', () => {
    const isValid = isValidIetfLocaleTag(undefined);
    expect(isValid).toBe(false);
  });
});
