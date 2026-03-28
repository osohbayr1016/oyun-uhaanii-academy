/** Set by `next build` while prerendering / collecting static pages. */
export function isNextBuildPhase(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}
