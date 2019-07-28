# ietf-locale-parser

A parser for IETF language tags

Based on: https://en.wikipedia.org/wiki/IETF_language_tag

## Usage

```js
import { parseIetfLocaleTag, isValidIetfLocaleTag } from 'ietf-locale-parser';

// made up locale tag
const tag = 'ar-ajp-apc-apd-Arab-CV-arevela-g-231243-r-sdarre-x-private-x-private1';

const isValid = isValidIetfLocaleTag(tag);
/*
Yields:
isValid: true
*/

const {
  primaryLang,
  extLangs,
  extLang1,
  extLang2,
  extLang3,
  script,
  region,
  variant,
  extension,
  private,
} = parseIetfLocaleTag(tag);
/*
  Yields:
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
*/
```
