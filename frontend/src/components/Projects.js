import { useState, useEffect } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddEditProject from "./AddEditProject";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function Projects() {

    const URL = `http://localhost:5000`

    const [projects, setProjects] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormVisibleForUpdate, setIsFormVisibleForUpdate] = useState(false);
    const [editId, setEditId] = useState('');

    useEffect(() => {
        const getProjects = async () => {
            const projectsArray = await fetchProjects();
            setProjects(projectsArray);
        }
        getProjects();
    }, [])

    const fetchProjects = async () => {
        const res = await fetch(`${URL}/projects`);
        const data = await res.json();
        // console.log(data);
        return data;
    }

    const fetchProject = async (id) => {
        const res = await fetch(`${URL}/projects/${id}`);
        const data = await res.json();
        // console.log(data);
        return data
    }

    const onAddProject = async (project) => {
        const res = await fetch(`${URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        const data = await res.json();
        setProjects([...projects, data]);
    }

    const onEditProject = async (body) => {
        const res = await fetch(`${URL}/projects/${editId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await res.json();
        // setProjects([...projects, data]);
    }


    const onDeleteClick = async id => {
        // console.log(id);
        await fetch(`${URL}/projects/${id}`, {
            method: 'DELETE',
        })

        setProjects(projects.filter((project) => project.id !== id))
    };

    const onEditClick = id => {
        setIsFormVisibleForUpdate(!isFormVisibleForUpdate)
        setEditId(id);
        const getProject = async () => {
            const project = await fetchProject(id);
            // console.log(project)
        }
        getProject();
    };

    const onViewClick = (row) => {
        // console.log(`row id is`, row.id)
    }

    return (
        <div>
            <h3>Projects</h3>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <Button size="small" variant="contained"
                                        onClick={() => onDeleteClick(row.id)}>Delete</Button>
                                    <Button size="small" variant="contained"
                                        onClick={() => onEditClick(row.id)}>Edit</Button>
                                    <Button size="small" variant="contained"
                                        onClick={() => onViewClick(row)}><Link to={`/edit/${row.id}`}>View</Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ 'padding': '16px 0' }}>
                <Button style={{ 'margin': '16px 0' }} size="small" variant="contained" color="primary"
                    onClick={() => setIsFormVisible(!isFormVisible)}>Add project</Button>
                {isFormVisible && <AddEditProject addProject={onAddProject} />}
            </div>

            { isFormVisibleForUpdate && <AddEditProject editProject={onEditProject} editId={editId} isEdit={true} />}

        </div>
    );
}
