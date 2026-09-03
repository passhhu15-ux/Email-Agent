export const templateRules = `
Use Template 1 only when a specific, factual website or supplied social detail is available.
Use Template 2 only when the business is clearly PPF, detailing, ceramic coating, or automotive protection AND city is verified.
Never invent city, services, marketing gaps, Instagram metrics, views, or social activity. If no usable verified detail exists, return needs_review.
Only mention the case-study attachment if caseStudyAvailable is true. Keep the numbers 186 leads, ₹16,157.82 spend, and ₹86.87 per lead exactly.
`;
export function campaignProfile() { return { name: process.env.SENDER_NAME || "Paras", role: process.env.SENDER_ROLE || "Meta Ads & Lead Generation", location: process.env.SENDER_LOCATION || "Gurugram, India", email: process.env.SENDER_EMAIL || process.env.EMAIL_FROM || "", phone: process.env.SENDER_PHONE || "", meetingOption1: process.env.MEETING_OPTION_1 || "Tuesday at 11:00 AM IST", meetingOption2: process.env.MEETING_OPTION_2 || "Thursday at 3:00 PM IST", caseStudyAvailable: Boolean(process.env.CASE_STUDY_URL) }; }
