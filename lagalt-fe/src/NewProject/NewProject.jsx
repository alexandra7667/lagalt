import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { urlBackendBasePath } from "../assets/urls";

const initialState = {
    userId: 1,
    title: '',
    category: 'Films',
    description: '',
    websiteUrl: '',
    tags: [],
    neededSkills: []
}

function NewProject() {
    const [newProject, setNewProject] = useState(initialState);
    const [category, setCategory] = useState('Films');
    const [tag, setTag] = useState('');
    const [neededSkill, setNeededSkill] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const submitNewProject = async (e) => {
        e.preventDefault();

        console.log(newProject);

        //const token = localStorage.getItem('token');

        const headers = {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}`
        };

        const fetchProjectsResponse = await fetch(`${urlBackendBasePath}/projects`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newProject),
        });

        // if (!fetchProjectsResponse.status !== 201) {
        //     throw new Error("Failed to post project to the database");
        // }

        console.log(fetchProjectsResponse);

        //setSubmitDisabled(true);
    }

    const handleChange = (e) => {
        if (e.target.name === 'category') setCategory(e.target.value);

        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        })
    }

    const addTag = (e) => {
        setTag(e.target.value);
    }

    const addToTags = () => {
        setNewProject((prevProject) => ({
            ...prevProject,
            tags: [...prevProject.tags, tag]
        }))

        setTag('');
    }

    const removeFromTags = (tagToRemove) => {
        setNewProject(prevProject => ({
            ...prevProject,
            tags: prevProject.tags.filter(tag => tag !== tagToRemove)
        }));
    }

    const addNeededSkill = (e) => {
        setNeededSkill(e.target.value);
    }

    const addToNeededSkills = () => {
        setNewProject((prevProject) => ({
            ...prevProject,
            neededSkills: [...prevProject.neededSkills, neededSkill]
        }));

        setNeededSkill('');
    }

    const removeFromNeededSkills = (neededSkillToRemove) => {
        setNewProject(prevProject => ({
            ...prevProject,
            neededSkills: prevProject.neededSkills.filter(neededSkill => neededSkill !== neededSkillToRemove)
        }));
    }

    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl sx={{ width: { xs: '300px', sm: '400px' }, mb: '20px' }} >
                    <InputLabel id="label-category">Category*</InputLabel>
                    <Select
                        labelId="label-category"
                        id="category"
                        value={category}
                        name="category"
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Films"}>Films</MenuItem>
                        <MenuItem value={"Music"}>Music</MenuItem>
                        <MenuItem value={"Web Development"}>Web Development</MenuItem>
                        <MenuItem value={"Game Development"}>Game Development</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    sx={{ mb: '15px' }}
                    required
                    id="title"
                    name="title"
                    label="Title (max 20 characters)"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    sx={{ mb: '15px' }}
                    multiline
                    rows={10}
                    required
                    id="description"
                    name="description"
                    label="Description (max 750 characters)"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    sx={{ mb: '15px' }}
                    id="websiteUrl"
                    name="websiteUrl"
                    label="Website URL"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    sx={{ mt: '15px', mb: '5px' }}
                    id="tag"
                    value={tag}
                    label="Enter a tag (e.g. 'Documentary')"
                    onChange={addTag}>
                </TextField>
                <Button variant="outlined" onClick={addToTags} startIcon={<AddIcon />} size="small">
                    Add tag
                </Button>
                <ul>
                    {newProject.tags.map((tag, index) => (
                        <li key={index}>{tag}
                            <IconButton aria-label="delete" size="small" onClick={() => removeFromTags(tag)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </li>
                    ))}
                </ul>

                <TextField
                    sx={{ mb: '5px' }}
                    id="neededSkill"
                    value={neededSkill}
                    label="Enter a needed skill (e.g. 'Photography')"
                    onChange={addNeededSkill}>
                </TextField>
                <Button variant="outlined" onClick={addToNeededSkills} startIcon={<AddIcon />} size="small">
                    Add skill
                </Button>
                <ul>
                    {newProject.neededSkills.map((neededSkill, index) => (
                        <li key={index}>{neededSkill}
                            <IconButton aria-label="delete" size="small" onClick={() => removeFromNeededSkills(neededSkill)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </li>
                    ))}
                </ul>

                <Button variant="contained" onClick={submitNewProject}>Create New Project</Button>
            </form>
        </>
    )
}

export default NewProject;