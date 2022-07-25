import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const addPlanet = (props) => {
    const [name, setName] =useState('');
    const [size,setSize] =useState('');
    const [designation, setDesignation] = useState('');
    const [industrial_districts, setIndustrial_districts] = useState('');
    const [mining_districts, setMining_districts] = useState('');
    const [generator_districts, setGenerator_districts] = useState('');
    const [agriculture_districts, setAgriculture_districts] = useState('');

    

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:8000/api/planets`,
        {
        name,
        size,
        designation,
        industrial_districts,
        mining_districts,
        generator_districts,
        agriculture_districts
        })
        
        .then((res) => {
            console.log(res);
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        });
    };

    return(
        <div className = 'container'>
            <div className = 'navbar'>
                <h1>Create a new planet!</h1>
                <Link to='/dashboard'>Dashboard</Link>
            </div>
            <div className="row">
                <form onSubmit = {handleSubmit}>
                    <div className = 'col'>
                        <h2>Characteristics</h2>
                        <label htmlFor="name">Template Name:</label>
                        <input className="form-control" type="text"
                        id="name"
                        onChange = {(e) => setName(e.target.value)}/>
                            {errors.name ? <p>{errors.name.message}</p> : null}

                        <label htmlFor="size">Planet Size:</label>
                        <input className="form-control" type="number"
                        id="size"
                        onChange = {(e) => setSize(e.target.value)}/>
                            {errors.name ? <p>{errors.size.message}</p> : null}

                        <label htmlFor="designation">Designation:</label>
                        <select value = {value} id="designation" onChange = {(e) => setDesignation(e.target.value)}>
                            <option value='Generator World'>Generator World</option>
                            <option value='Mining World'>Mining World</option>
                            <option value='Forge World'>Forge World</option>
                            <option value='Industrial World'>Industrial World</option>
                            <option value='Factory World'>Factory World</option>
                        </select>
                            {errors.name ? <p>{errors.designation.message}</p> : null}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default addPlanet;