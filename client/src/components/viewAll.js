import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate,useParams} from 'react-router-dom';

const Dashboard = () =>{
    const [planets, setPlanets] = useState([]);
    const navigate = useNavigate();

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
        axios.delete(`https://localhost:8000/api/planets/${idFromBelow}`)
        .then((res)=> {
            console.log(res.data);
            navigate('/dashboard');
        })
        .catch((err)=> {
            console.log(err);
        });
    };

    return(
        <div className = 'container'>
            <div className = "navbar">
                <h1>Welcome! Check out these Planets!</h1>
            </div>
            <div className = "rox mx-auto mt-3">
                <div className = "col-8">
                    <table className = "table border">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Size</th>
                                <th scope="col">Mins</th>
                                <th scope="col">Creds</th>
                                <th scope="col">Food</th>
                                <th scope="col">Alloys</th>
                                <th scope="col">CGs</th>
                                <th scope="col">Modify</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planets.map((planet,index) =>{
                                return (
                                    <tr>
                                        <td>{planet.name}</td>
                                        <td>{planet.size}</td>
                                        <td>{planet.designation}</td>
                                        <td>{planet.mining_districts}</td>
                                        <td>{planet.generator_districts}</td>
                                        <td>{planet.agriculture_districts}</td>
                                        <td>{planet.industrial_districts}</td>
                                        <td>
                                            <Link to = {`/planets/edit/${planet._id}`}>
                                                <button>Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onCLick = {() => deleteFilter({planet._id})}>Delete</button>
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