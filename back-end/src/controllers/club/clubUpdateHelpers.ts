export function clubUpdateBodyHasField(body: Record<string, unknown>): boolean {
  const keys = [
    "heroBackgroundImage",
    "clubLogo",
    "motto",
    "mission",
    "athletesCount",
    "typesCount",
    "coachesCount",
    "tournamentTitle",
    "tournamentDescription",
    "tournamentName",
    "tournamentFrequency",
    "tournamentParticipants",
    "tournamentDetails",
    "tournamentButtonText",
    "introductionTitle",
    "introductionContent",
    "introductionImage",
    "activitiesTitle",
    "activities",
    "typesTitle",
    "types",
    "membershipTitle",
    "membershipDescription",
    "membershipRequirements",
    "registerButtonText",
    "googleFormLink",
    "internationalAwardsTitle",
    "internationalAwards",
    "domesticAwardsTitle",
    "domesticAwards",
  ];
  return keys.some((k) => {
    const v = body[k];
    return v !== undefined && v !== null && v !== "";
  });
}
