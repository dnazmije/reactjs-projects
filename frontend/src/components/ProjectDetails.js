import { useState, useEffect } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddTime from './AddTime';
import Button from '@material-ui/core/Button';

export default function ProjectDetails( { match }) {

    const URL = `http://localhost:5000`

    const { id } = match.params;
    const [project, setProject] = useState({});
    const [projectTimes, setProjectTimes] = useState([]);

    const fetchProject = async (id) => {
        const res = await fetch(`${URL}/projects/${id}`);
        const data = await res.json();
        // console.log(data);
        return data;
    }

    const fetchProjectTimes = async (projectId) => {
        const res = await fetch(`${URL}/times?projectId=${projectId}`);
        const data = await res.json();
        // console.log(data);
        return data;
    }

    useEffect(() => {
        const getProject = async () => {
            const projectObject = await fetchProject(id);
            setProject(projectObject);
        }
        getProject();
        // console.log(`project`, project);

        const getProjectTime = async () => {
            const projectTimesArray = await fetchProjectTimes(id);
            setProjectTimes(projectTimesArray);
        }
        getProjectTime();
        // console.log(`project time`, projectTimes);
    }, [id])

    const onDeleteClick = async id => {
        // console.log(id);
        await fetch(`${URL}/times/${id}`, {
            method: 'DELETE',
        });
      
        setProjectTimes(projectTimes.filter((projectTime) => projectTime.id !== id))
    };

        const onAddTime = async (times) => {
            times['projectId'] = id;
            const res = await fetch(`${URL}/times`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(times),
            })
            const data = await res.json();
            setProjectTimes([...projectTimes, data]);
            console.log(`data`, data)
        }

    
  return (

    <div>
        <h4>{project.name}</h4>
        <h5>{project.description}</h5>

        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectTimes.map(row => (
                        <TableRow key={row.id}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.description}
                            </TableCell>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>
                                <Button variant="contained" size="small"
                                 onClick={() => onDeleteClick(row.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        { projectTimes.length <= 0 && <h4>No data, add times</h4> }

        <AddTime addTime={onAddTime} id={id} />
    </div>
  );
}