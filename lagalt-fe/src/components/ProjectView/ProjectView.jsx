import { useParams } from "react-router-dom";
import { UserContext } from "../../App.jsx";
import { useContext, useEffect, useState } from 'react'
import PageTitle from "../PageTitle/PageTitle.jsx";
import setUserRole from "./functions/setUserRole.js";
import ProjectStatus from "./ProjectStatus/ProjectStatus.jsx";
import fetchData from "../../functions/fetchData.js";
import BasicInfo from "./ProjectInfo/BasicInfo.jsx";
import MemberView from "./ProjectInfo/MemberView.jsx";
import ApplicantView from "./ProjectInfo/ApplicantView.jsx";
import UnaffiliatedView from "./ProjectInfo/UnaffiliatedView.jsx";
import OwnerView from "./ProjectInfo/OwnerView.jsx";
import MemberOrOwnerView from "./ProjectInfo/MemberOrOwnerView.jsx";

function ProjectView() {
    const { projectId } = useParams();
    const { user } = useContext(UserContext);
    const [project, setProject] = useState(null);
    const [role, setRole] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('In Progress');

    useEffect(() => {
        fetchOneProject();
    }, [projectId]);

    async function fetchOneProject() {
        const response = await fetchData(
            `projects/getOneProject/${projectId}`,
            "GET",
            null,
            "Could not fetch single project."
        );
        if (response.status === "error") {
            console.error(response.message);
        } else {
            setProject(response.data.data);
        }
    }

    useEffect(() => {
        if (project) {
            if (user) {
                //Set user's role in project
                setUserRole(project.associates, user.id, setRole);
            }

            //Set project status
            setSelectedStatus(project.status);
        }
    }, [project, user]);


    return (
        <>
            {project && (
                <>
                    <PageTitle title={project.title} />

                    {user && role && (
                        <>
                            {role === 'Owner' && (
                                <>
                                    <OwnerView project={project} />

                                    <ProjectStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} projectId={projectId} />

                                    <MemberOrOwnerView role={role} project={project} />
                                </>
                            )}

                            {role === 'Member' && (
                                <>
                                    <MemberView />

                                    <MemberOrOwnerView role={role} project={project} />
                                </>
                            )}

                            {role === 'Applicant' && (
                                <ApplicantView />
                            )}

                            {(role === 'Unaffiliated' && selectedStatus === 'In Progess') && (
                                <UnaffiliatedView userId={user.id} projectId={projectId} setRole={setRole} />
                            )}
                        </>
                    )}

                    {/* Users who are not logged in can still see basic information about the project*/}
                    <BasicInfo project={project} selectedStatus={selectedStatus} />
                </>
            )}
        </>
    )
}

export default ProjectView;