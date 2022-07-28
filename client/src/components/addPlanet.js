import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const AddPlanet = (props) => {
    const [name, setName] =useState('');
    const [size,setSize] =useState(0);
    const [designation, setDesignation] = useState([1,1.25,1,1,1]);
    const [mining_districts, setMining_districts] = useState(0);
    const [generator_districts, setGenerator_districts] = useState(0);
    const [agriculture_districts, setAgriculture_districts] = useState(0);
    const [industrial_districts, setIndustrial_districts] = useState(0);
    const [total_districts, setTotal_districts] = useState(0);
    const totalDistricts = parseInt(industrial_districts)+parseInt(mining_districts)+parseInt(generator_districts)+parseInt(agriculture_districts)
    const openDistricts = parseInt(size)-parseInt(totalDistricts)
    
    
    // ARRAY KEY FOR DESIGNATION MODIFIERS
    // [MINERALS,ENERGY,FOOD,CONSUMER GOODS,CREDITS]
    // 2 jobs per district * base job output * modifier - district upkeep

    const minerals = mining_districts*2*4*designation[0]-(industrial_districts*6*2);
    const energy = (generator_districts*2*6*designation[1])-(totalDistricts*2);
    const food = agriculture_districts*2*6*designation[2];
    const consumer_goods=industrial_districts*2*6*designation[3];
    const alloys = industrial_districts*2*3*designation[4];
    
    console.log('total districts',totalDistricts);
    console.log('open districts',openDistricts);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setMining_districts(0);
        setTotal_districts(totalDistricts);
        console.log(totalDistricts);
        console.log("mining district reset",mining_districts)
        console.log("target value",e.target.value)
        console.log("open distrcits",openDistricts)
        const targetValue = e.target.value;
        if (targetValue < total_districts) {
            setMining_districts(parseInt(e.target.value));
        } else {console.log("too big")}
            setMining_districts(0);
    };

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
                        onChange = {(e) => setName(JSON.parse(e.target.value))}/>
                            {errors.name ? <p>{errors.name.message}</p> : null}

                        <label htmlFor="size">Planet Size:</label>
                        <input className="form-control" type="number"
                        id="size"
                        onChange = {(e) => setSize(JSON.parse(e.target.value))}/>
                            {errors.name ? <p>{errors.size.message}</p> : null}

                        <label htmlFor="designation">Designation:</label>
                        <select  className="form-control" id="designation" onChange = {(e) => setDesignation(JSON.parse(e.target.value))}>
                            <option value= "[1,1.25,1,1,1]" >Generator World</option>
                            <option value='[1.25,1,1,1,1]'>Mining World</option>
                            <option value='[1,1,1,0,2.25]'>Forge World</option>
                            <option value='[1,1.25,1,1.1,1.1]'>Industrial World</option>
                            <option value='[1,1,1,2.25,0]'>Factory World</option>
                        </select>
                        <label htmlFor="mining_dist">Mining Districts:</label>
                        <input className="form-control" type="number"
                        id="mining_dist"
                        onChange = {handleChange}/>
                            {errors.name ? <p>{errors.size.mining_districts}</p> : null}

                        <label htmlFor="generator_dist">Generator Districts:</label>
                        <input className="form-control" type="number" min = '0' max = {openDistricts}
                        id="generator_dist"
                        onChange = {(e) => setGenerator_districts(parseInt(e.target.value))}/>
                            {errors.name ? <p>{errors.size.generator_districts}</p> : null}


                        <label htmlFor="agriculture_dist">Agriculture Districts:</label>
                        <input className="form-control" type="number" min = '0' max = {openDistricts}
                        id="agriculture_dist"
                        onChange = {(e) => setAgriculture_districts(parseInt(e.target.value))}/>
                            {errors.name ? <p>{errors.size.agriculture_districts}</p> : null}

                        <label htmlFor="industrial_dist">Industrial Districts:</label>
                        <input className="form-control" type="number" min = '0' max = {openDistricts}
                        id="industrial_dist"
                        onChange = {(e) => setIndustrial_districts(parseInt(e.target.value))}/>
                            {errors.name ? <p>{errors.size.industrial_districts}</p> : null}

                        <button type="submit">Save Template</button>
                    </div>
                </form>
            </div>
            <div>
                <div>
                    <h3>Minerals</h3>
                    <p>{minerals}</p>
                </div>
                <div>
                    <h3>Energy</h3>
                    <p>{energy}</p>
                </div>
                <div>
                    <h3>Food</h3>
                    <p>{food}</p>
                </div>
                <div>
                    <h3>Consumer Goods</h3>
                    <p>{consumer_goods}</p>
                </div>
                <div>
                    <h3>Alloys</h3>
                    <p>{alloys}</p>
                </div>
            </div>
        </div>
    );
};

export default AddPlanet;