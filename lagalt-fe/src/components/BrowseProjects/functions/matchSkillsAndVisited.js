
export default function matchSkillsAndVisitedProjects(projects, user) {
    projects.forEach(project => {
        //Check for matching skills
        if (project.neededSkills && user.skills) {
            if (project.neededSkills.some(neededSkill => user.skills.includes(neededSkill))) {
                project.matchingSkill = true;
                console.log("Matching skills: " + project.title);
            }
        }

        //Check if project is visited
        if (user.associations) {
            const association = user.associations.find(assoc => assoc.projectId === project.id && assoc.visitor);
            if (association) {
                project.visited = true;
                console.log("visited: " + association.projectTitle);
            }
        }
    });
};