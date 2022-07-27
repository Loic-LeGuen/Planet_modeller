import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const AddPlanet = (props) => {
    const [name, setName] =useState('');
    const [size,setSize] =useState('');
    const [designation, setDesignation] = useState('[1,1.25,1,1,1]');
    const [industrial_districts, setIndustrial_districts] = useState('');
    const [mining_districts, setMining_districts] = useState('');
    const [generator_districts, setGenerator_districts] = useState('');
    const [agriculture_districts, setAgriculture_districts] = useState('');

    // const min_modifier = Number(designation[0]);
    // const gen_modifier = designation[1];
    // const food_modifier = designation[2];
    // const cg_modifier = designation[3];
    // const alloy_modifier = designation[4];

    const desigArray = JSON.parse(designation)


    const minerals = mining_districts*2*desigArray[0];
    // const energy = generator_districts*2;
    // const food = agriculture_districts*2;
    // const consumer_goods=industrial_districts*2;
    // const alloys = industrial_districts*2;


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
                        <select  className="form-control" id="designation" onChange = {(e) => setDesignation(e.target.value)}>
                            <option value= "[1,1.25,1,1,1]" >Generator World</option>
                            <option value='[1.25,1,1,1,1]'>Mining World</option>
                            <option value='[1,1,1,0,2.25]'>Forge World</option>
                            <option value='[1,1.25,1,1.1,1.1]'>Industrial World</option>
                            <option value='[1,1,1,2.25,0]'>Factory World</option>
                        </select>
                        <label htmlFor="mining_dist">Mining Districts:</label>
                        <input className="form-control" type="number"
                        id="mining_dist"
                        onChange = {(e) => setMining_districts(e.target.value)}/>
                            {errors.name ? <p>{errors.size.mining_districts}</p> : null}

                        <label htmlFor="generator_dist">Generator Districts:</label>
                        <input className="form-control" type="number"
                        id="generator_dist"
                        onChange = {(e) => setGenerator_districts(e.target.value)}/>
                            {errors.name ? <p>{errors.size.generator_districts}</p> : null}


                        <label htmlFor="agriculture_dist">Agriculture Districts:</label>
                        <input className="form-control" type="number"
                        id="agriculture_dist"
                        onChange = {(e) => setAgriculture_districts(e.target.value)}/>
                            {errors.name ? <p>{errors.size.agriculture_districts}</p> : null}

                        <label htmlFor="industrial_dist">Industrial Districts:</label>
                        <input className="form-control" type="number"
                        id="industrial_dist"
                        onChange = {(e) => setIndustrial_districts(e.target.value)}/>
                            {errors.name ? <p>{errors.size.industrial_districts}</p> : null}

                        <button type="submit">Save Template</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Minerals</p>
                <p>{minerals}</p>
            </div>
        </div>
    );
};

export default AddPlanet;