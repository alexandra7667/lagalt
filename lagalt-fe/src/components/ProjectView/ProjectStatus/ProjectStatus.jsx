import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import fetchData from "../../../functions/fetchData";

function ProjectStatus({ selectedStatus, setSelectedStatus, projectId }) {

    const changeStatus = (e) => {
        setSelectedStatus(e.target.value);
        //Change project status in db
        setProjectStatus(projectId, e.target.value);
    }

    async function setProjectStatus() {
        const response = await fetchData(
            `projects`,
            "PUT",
            { status: selectedStatus, projectId: projectId },
            "Could not update project status."
        );
        if (response.status === "error") {
            console.error(response.message);
        } else {
            setProjectStatus(response.data.data);
        }
    }

    return (
        <FormControl sx={{ width: { xs: '300px', sm: '400px' }, marginBottom: '20px' }} >
            <InputLabel id="label-project-status">Project status</InputLabel>
            <Select
                labelId="label-project-status"
                id="select-project-status"
                value={selectedStatus}
                label="ProjectStatus"
                onChange={changeStatus}
            >
                <MenuItem value={"In Progess"}>In Progess</MenuItem>
                <MenuItem value={"Paused"}>Paused</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ProjectStatus