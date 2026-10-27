/** Auditelle's public test stays on the app host, never carrying user text. */
export function publicTesterHref(config: { features: { publicDemoWithoutSignup?: boolean }; siteUrl?: string }): string {
  return config.features.publicDemoWithoutSignup && config.siteUrl
    ? `${config.siteUrl}/tester`
    : '/signup'
}
