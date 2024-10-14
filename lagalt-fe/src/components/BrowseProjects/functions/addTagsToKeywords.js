
export default function addTagsToKeywords (projects, setKeywords) {
    //Add all tags and needed skills from all projects to keywords
    const keywordSet = new Set();

    projects.forEach(project => {

        if (project.tags) {
            project.tags.forEach(tag => {
                keywordSet.add(tag);
            });
        }

        if (project.neededSkills) {
            project.neededSkills.forEach(skill => {
                keywordSet.add(skill);
            })
        }
    });

    setKeywords(Array.from(keywordSet));
}