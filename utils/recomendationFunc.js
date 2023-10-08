export default function calculateSimilarity(job, userPreferences) {
    console.log("userPreference", userPreferences)
    const lowerCaseSkills = userPreferences.skills.map(skill => skill.value.toLowerCase()).join(" ");

    const skillSimilarity = job.skills.filter(skill => lowerCaseSkills.includes(skill?.value?.toLowerCase())).length;
    const locationSimilarity = userPreferences?.location?.replace(/^a-zA-Z0-9 ]/g, '').replace(" ", "").toLowerCase().includes(job?.location?.replace(" ", "").toLowerCase()) ? 1 : 0;
    const experienceSimilarity = job?.experience - userPreferences?.experience >= 0 ? 1 : 0;
    const educationSimilarity = job?.education.toLowerCase() == userPreferences?.education?.toLowerCase() ? 1 : 0;
    const jobTypeSimilarity = userPreferences?.jobType.map(item => item.value).join("").replace(" ", "")?.toLowerCase().includes(job?.jobType?.toLowerCase()) ? 1 : 0;
    const jobPreferencesSimilarity = userPreferences?.jobPreferences.some(role => role.includes(job.jobTitle.toLowerCase())) ? 1 : 0;
    const salarySimilarity = job?.salary >= userPreferences?.salaryMin || job?.salary <= userPreferences?.salaryMax ? 1 : 0;

    const totalSimilarity = skillSimilarity * 0.2 +
        locationSimilarity * 0.1 +
        experienceSimilarity * 0.1 +
        educationSimilarity * 0.1 +
        jobTypeSimilarity * 0.1 +
        jobPreferencesSimilarity * 0.2 +
        salarySimilarity * 0.2;

    // console.log("ddddddddddddddd", skillSimilarity + "\n \n",
    //     locationSimilarity + "\n \n",
    //     experienceSimilarity + "\n \n",
    //     educationSimilarity + "\n \n",
    //     jobTypeSimilarity + "\n \n")
    return totalSimilarity;
}