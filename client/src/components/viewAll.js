import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate,useParams} from 'react-router-dom';

const Dashboard = () =>{
    const [planets, setPlanets] = useState([]);
    const navigate = useNavigate();
    const designationName = ['Generator World',"Mining World","Agricultural World","Forge World","Industrial World","Factory World"]
    //  Generator / Mining / Agriculture/ Forge/ Industrial / Factory

    useEffect(()=> {
        axios.get('http://localhost:8000/api/planets')
        .then((res) => {
            console.group(res.data);
            setPlanets(res.data);
        })
        .catch((err)=> {
            console.log(err.res);
        });
    },[]);

    const deleteFilter = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/planets/${idFromBelow}`)
        .then((res)=> {
            console.log(res.data);
            const updatedPlanets = planets.filter((planet)=> {
                return planet._id !== idFromBelow});
                setPlanets(updatedPlanets);
        })
        .catch((err)=> {
            console.log(err);
        });
    };

    return(
        <div className = 'container'>
            <div className = "navbar">
                <h1>Welcome! Check out these Planets!</h1>
                <Link to="/planets/add">
                    <button className="btn btn-primary">Add a new planet!</button>
                </Link>
            </div>
            <div className = "rox mx-auto mt-3">
                <div className = "col-8">
                    <table className = "table border">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Size</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Mineral Districts</th>
                                <th scope="col">Generator Districts</th>
                                <th scope="col">Agriculture Districts</th>
                                <th scope="col">Industrial Districts</th>
                                <th scope="col">Modify</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planets.map((planet,index) =>{
                                return (
                                    <tr key={planet._id}>
                                        <td>{planet.name}</td>
                                        <td>{planet.size}</td>
                                        <td>{designationName[planet.designation]}</td>
                                        <td>{planet.mining_districts}</td>
                                        <td>{planet.generator_districts}</td>
                                        <td>{planet.agriculture_districts}</td>
                                        <td>{planet.industrial_districts}</td>
                                        <td>
                                            <Link to = {`/planets/edit/${planet._id}`}>
                                                <button className="btn btn-primary">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick = {() => deleteFilter(planet._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;