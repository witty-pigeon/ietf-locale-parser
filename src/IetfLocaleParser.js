/* eslint-disable unicorn/prevent-abbreviations */
/**
 * Captures:
 * * primaryLang  (the primary language subtag)
 *   - as codes of 2 letters (see ISO 639-1)
 *   - alternatively as codes of 3 letters (see ISO 639-2, 639-3, 639-5)
 *   - alternatively as codes of 5-8 letters (see BCP 47)
 */
// const IETF_PRIMARY_LANGUAGE = '(?<primaryLang>(?:[a-z]{5,8}|[a-z]{2,3}))';
const IETF_PRIMARY_LANGUAGE = '((?:[a-z]{5,8}|[a-z]{2,3}))';

/**
 * Captures codes of thre letters
 */
const IETF_EXT_LANGUAGE_SINGLE = '[a-z]{3}';

/**
 * Captures:
 * * extLangs (all extended languages)
 * * extLang1 (extended language 1)
 * * extLang2 (extended language 2)
 * * extLang3 (extended language 3)
 */
// eslint-disable-next-line max-len
// const IETF_EXT_LANGUAGE = `(?:-)(?<extLangs>(?<extLang1>${IETF_EXT_LANGUAGE_SINGLE})(?:-(?<extLang2>${IETF_EXT_LANGUAGE_SINGLE}))?(?:-(?<extLang3>${IETF_EXT_LANGUAGE_SINGLE}))?)`;
const IETF_EXT_LANGUAGE = `(?:-)((${IETF_EXT_LANGUAGE_SINGLE})(?:-(${IETF_EXT_LANGUAGE_SINGLE}))?(?:-(${IETF_EXT_LANGUAGE_SINGLE}))?)`;

/**
 * Captures:
 * * script (the script subtag)
 *   - as four letters title-cased (ISO 15924)
 */
// const IETF_SCRIPT = '(?:-)(?<script>[A-Z][a-z]{3})';
const IETF_SCRIPT = '(?:-)([A-Z][a-z]{3})';

/**
 * Captures:
 * * region (the region of the locale)
 *   - as 2 Uppercase letters (see ISO 3166-1 alpha-2)
 *   - alternatively a 3 digits (see UN.M49)
 */
// const IETF_REGION = '(?:-)(?<region>[A-Z]{2}|[0-8][0-9]{2}(?<!000))';
const IETF_REGION = '(?:-)([A-Z]{2}|[0-8][0-9]{2}(?<!000))';

/**
 * Captures alternatively
 * - 5-8 characters
 * - 4 characters starting with a digit
 */
const IETF_VARIANT_SINGLE = '(?:[a-z]{5,8}|[0-9][0-9a-z]{3})';

/**
 * Captures:
 * * variant (the variant of the locale)
 */
// const IETF_VARIANT = `(?:-)(?<variant>${IETF_VARIANT_SINGLE}(?:-${IETF_VARIANT_SINGLE})*)`;
const IETF_VARIANT = `(?:-)(${IETF_VARIANT_SINGLE}(?:-${IETF_VARIANT_SINGLE})*)`;

/**
 * Captures one charachter (not x)
 * followed by an arbitrary repetition of: one - (hyphen) followed by 2-8 characters
 */
const IETF_EXTENSION_SINGLE = '[0-9a-z](?<!x)(?:-[0-9a-z]{2,8})+';

/**
 * Captures:
 * * extension (the extension sutbtag)
 */
// const IETF_EXTENSION = `(?:-)(?<extension>${IETF_EXTENSION_SINGLE}(?:-${IETF_EXTENSION_SINGLE})*)`;
const IETF_EXTENSION = `(?:-)(${IETF_EXTENSION_SINGLE}(?:-${IETF_EXTENSION_SINGLE})*)`;

/**
 * Captures the character x
 * followed by an arbitrary repetition of: one - (hyphen) followed 1-8 characters
 */
const IETF_PRIVATE_SINGLE = 'x(?:-[0-9a-z]{1,8})+';

/**
 * Captures:
 * * private (the private subtag)
 */
// const IETF_PRIVATE = `(?:-)(?<private>${IETF_PRIVATE_SINGLE}(?:-${IETF_PRIVATE_SINGLE})*)`;
const IETF_PRIVATE = `(?:-)(${IETF_PRIVATE_SINGLE}(?:-${IETF_PRIVATE_SINGLE})*)`;

/*
  Due to the named capture groups functionality of RegEx not being widely supported
  we need to manually map the capturing groups to the respective names
  This is needed until Named Capture Groups becomes part of the standard:
  https://github.com/tc39/proposal-regexp-named-groups
*/
function matchesToGroups (regexMatches) {
    const [,
        primaryLang,
        extLangs,
        extLang1,
        extLang2,
        extLang3,
        script,
        region,
        variant,
        extension,
        priv,
    ] = regexMatches;

    const groups = {
        extension,
        extLang1,
        extLang2,
        extLang3,
        extLangs,
        primaryLang,
        priv,
        region,
        script,
        variant,
    };

    return groups;
}

/**
 * The a Regular Expression that matches the IETF specification for localetags
 */
// we need to transpile the following RegExp
// but we need to spell it out in its entireity
// for babel to correctly process the regex
// `^${IETF_PRIMARY_LANGUAGE}(?:${IETF_EXT_LANGUAGE})?(?:${IETF_SCRIPT})?(?:${IETF_REGION})?(?:${IETF_VARIANT})?(?:${IETF_EXTENSION})?(?:${IETF_PRIVATE})?$`
// eslint-disable-next-line max-len
export const IETF_REGEXP = new RegExp(`^${IETF_PRIMARY_LANGUAGE}(?:${IETF_EXT_LANGUAGE})?(?:${IETF_SCRIPT})?(?:${IETF_REGION})?(?:${IETF_VARIANT})?(?:${IETF_EXTENSION})?(?:${IETF_PRIVATE})?$`);

/**
 * @typedef LocaleSubtags
 * @type {object}
 * @property {string} [primaryLang] the pimary language subtag
 * @property {string} [extLangs] all of the extension languages
 * @property {string} [extLang1] the first language extension
 * @property {string} [extLang2] the second language extension
 * @property {string} [extLang3] the third language extension
 * @property {string} [script] the script subtag
 * @property {string} [region] the region subtag
 * @property {string} [variant] the variant subtag
 * @property {string} [extension] the extension subtag (all of the extensions are concatenated by hyphen)
 * @property {string} [priv] the private subtag (all of the components are concatenated)
 */
/**
 * Captures subtags from the given locale
 * * primaryLang
 * * extLangs
 * * extLang1
 * * extLang2
 * * extLang3
 * * script
 * * region
 * * variant
 * * extension
 * * priv
 *
 * @param {string} locale the locale to analyze
 * @returns {LocaleSubtags} with possibly
 */
export function parseIetfLocaleTag (locale = '') {
    if (locale === null) {
        return {};
    }

    const matches = locale.match(IETF_REGEXP);

    if (matches) {
        const groups = matchesToGroups(matches);

        return groups;
    }

    return {};
}

/**
 * Validates whether a certain locale string is a valid
 * IETF locale tag
 *
 * @param {string} locale the locale to validate
 * @returns {boolean} true if the given *locale* is a valid IETF locale tag
 */
export function isValidIetfLocaleTag (locale = '') {
    const matches = parseIetfLocaleTag(locale);

    return Object.keys(matches).length > 0;
}
