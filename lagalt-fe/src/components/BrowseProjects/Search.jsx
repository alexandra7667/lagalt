import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from 'react';
import PropTypes from 'prop-types';


export default function Search({projects, setFilteredProjects, keywords}) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedKeyword, setSelectedKeyword] = useState("");

    const filterByCategory = (e) => {
        setSelectedCategory(e.target.value);

        if (e.target.value === "All") setFilteredProjects(projects);
        else setFilteredProjects(projects.filter(project => project.category === e.target.value));
    };

    const filterByKeyword = (e, value) => {
        setSelectedKeyword(value);

        if (value === null) {
            setFilteredProjects(projects);
            return;
        }

        let match = false;
        let projectSet = new Set();

        projects.forEach(project => {
            if (project.tags.length > 0) {
                project.tags.forEach(tag => {
                    if (tag.toLowerCase() === value.toLowerCase()) { //Ignore casing
                        projectSet.add(project);
                        match = true;
                        return; //Exit tags loop
                    }
                })
            }

            if (match) {
                match = false;
                return; //Exit project loop (Continue to next project)
            }

            if (project.neededSkills.length > 0) {
                project.neededSkills.forEach(skill => {
                    if (skill.toLowerCase() === value.toLowerCase()) {
                        projectSet.add(project);
                        match = true;
                        return; //Exit neededSkills loop
                    }
                })
            }

            match = false;
        });

        setFilteredProjects(Array.from(projectSet));
    }
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '20px' }}>
                {keywords && (
                    <Autocomplete
                        freeSolo
                        disablePortal
                        id="keyword-autocomplete"
                        options={keywords}
                        value={selectedKeyword}
                        onChange={filterByKeyword}
                        sx={{ width: { xs: '300px', sm: '400px' }, marginBottom: '20px' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search by tag or skill"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />)}

                <FormControl sx={{ width: { xs: '300px', sm: '400px' } }} >
                    <InputLabel id="label-category">Category</InputLabel>
                    <Select
                        labelId="label-category"
                        id="select-category"
                        value={selectedCategory}
                        label="Category"
                        onChange={filterByCategory}
                    >
                        <MenuItem value={"All"}>All projects</MenuItem>
                        <MenuItem value={"Films"}>Films</MenuItem>
                        <MenuItem value={"Music"}>Music</MenuItem>
                        <MenuItem value={"Web Development"}>Web Development</MenuItem>
                        <MenuItem value={"Game Development"}>Game Development</MenuItem>
                    </Select>
                </FormControl>
            </Box>
    )
}

Search.propTypes = {
    projects: PropTypes.array
};