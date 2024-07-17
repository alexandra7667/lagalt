import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

function NewProject() {
    const [newProject, setNewProject] = useState({});
    const [category, setCategory] = useState('Films');

    const handleChange = (e) => {
        //
    }

    const addTag = () => {
        //
    }

    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column' }}>

                <FormControl sx={{ width: { xs: '300px', sm: '400px' }, mb: '20px' }} >
                    <InputLabel id="label-category">Category*</InputLabel>
                    <Select
                        labelId="label-category"
                        id="select-category"
                        value={category}
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
                    label="Title (max 20 characters)"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    sx={{ mb: '15px' }}
                    multiline
                    rows={10}
                    required
                    id="description"
                    label="Description (max 750 characters)"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    sx={{ mb: '15px' }}
                    id="website"
                    label="Website URL"
                    onChange={handleChange}>
                </TextField>

                <TextField
                    sx={{ mb: '15px' }}
                    id="tag"
                    label="Add a tag (e.g. 'Documentary')"
                    onChange={addTag}>
                </TextField>

                <TextField
                    sx={{ mb: '15px' }}
                    id="neededSkill"
                    label="Add a needed skill (e.g. 'Photography')"
                    onChange={addTag}>
                </TextField>
            </form>
        </>
    )
}

export default NewProject;