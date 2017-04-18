import HeroBuilderStore from '../stores/HeroBuilderStore';

/**
 * Localization helper to automatically get the language string from
 * a given object using the current language.
 */
export default function l10n(obj) {
  var lang = HeroBuilderStore.getCurrentLanguage();
  if (typeof obj === 'undefined') { return 'obj is defined'; }
  return obj[lang.toLowerCase()] || lang + ' is not specified in object';
}
