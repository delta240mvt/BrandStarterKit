import { PRIVACY_POLICY } from '@/data/legal';

export type PrivacyPolicyLocale = 'pl';
export type PrivacyPolicySection = (typeof PRIVACY_POLICY.sections)[number];
export type PrivacyPolicyDocument = typeof PRIVACY_POLICY;

export function getPrivacyPolicyDocument(_locale: PrivacyPolicyLocale = 'pl'): PrivacyPolicyDocument {
  return PRIVACY_POLICY;
}
