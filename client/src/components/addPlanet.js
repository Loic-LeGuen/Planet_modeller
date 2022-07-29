import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const AddPlanet = (props) => {
    const [name, setName] =useState('');
    const [size,setSize] =useState(0);
    const [designation, setDesignation] = useState(3);
    const [mining_districts, setMining_districts] = useState(0);
    const [generator_districts, setGenerator_districts] = useState(0);
    const [agriculture_districts, setAgriculture_districts] = useState(0);
    const [industrial_districts, setIndustrial_districts] = useState(0);
    const totalDistricts = parseInt(industrial_districts)+parseInt(mining_districts)+parseInt(generator_districts)+parseInt(agriculture_districts)

        //  Generator / Mining / Agriculture/ Forge/ Industrial / Factory
 
    const designationWeights = [[1,1.25,1,1,1],[1.25,1,1,1,1],[1,1,1.25,1,1],[1,1,1,0,1.25],[1,1,1,1.1,1.1],[1,1,1,1.25,0]]
    
    
    // ARRAY KEY FOR DESIGNATION MODIFIERS

    // 2 jobs per district * base job output * modifier - district upkeep

    const weightArray = designationWeights[designation]

    const minerals = mining_districts*2*4*weightArray[0]-(industrial_districts*6*2);
    const energy = (generator_districts*2*6*weightArray[1])-(totalDistricts*2);
    const food = agriculture_districts*2*6*weightArray[2];
    const consumer_goods=industrial_districts*2*6*weightArray[3];
    const alloys = industrial_districts*2*3*weightArray[4];


    // Front-end error messages

    const [miningError, setMiningError] = useState('');
    const [genError, setGenError] = useState('');
    const [agriError, setAgriError] = useState('');
    const [industError, setIndustError] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    // district handleChange

    const handleChangeDesignation = (e) =>{
        setDesignation(parseInt(e.target.value));
    };

    const handleChangeMining = (e) =>{
        const openDistrictCheck = size-totalDistricts+mining_districts;
        const targetValue = parseInt(e.target.value);
        if (targetValue <= openDistrictCheck) {
            setMining_districts(targetValue);
            setMiningError('');
        } else {console.log("too big")
            setMiningError("Mining Districts exceed capacity");
            setMining_districts(0);
        };
    };

    const handleChangeGenerator = (e) =>{
        const openDistrictCheck = size-totalDistricts+generator_districts;
        const targetValue = parseInt(e.target.value);
        if (targetValue <= openDistrictCheck) {
            setGenerator_districts(targetValue);
            setGenError('');
        } else {console.log("too big")
            setGenError("Generator Districts exceed capacity");
            setGenerator_districts(0);
        };
    };

    const handleChangeAgriculture = (e) =>{
        const openDistrictCheck = size-totalDistricts+agriculture_districts;
        const targetValue = parseInt(e.target.value);
        if (targetValue <= openDistrictCheck) {
            setAgriculture_districts(targetValue);
            setAgriError('');
        } else {console.log("too big")
            setAgriError("Agriculture Districts exceed capacity");
            setAgriculture_districts(0);
        };
    };

    const handleChangeIndustrial = (e) =>{
        const openDistrictCheck = size-totalDistricts+industrial_districts;
        const targetValue = parseInt(e.target.value);
        if (targetValue <= openDistrictCheck) {
            setIndustrial_districts(targetValue);
            setIndustError('');
        } else {console.log("too big")
            setIndustError("Industrial Districts exceed capacity");
            setIndustrial_districts(0);
        };
    };

    // Post request

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
            navigate('/');
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
                <Link to='/'>
                    <button className="btn btn-primary">Dashboard</button>
                </Link>
            </div>
            <div className="row align-items-start border border-dark p-3">
                <div className = 'col'>
                    <form onSubmit = {handleSubmit}>
                            <h2>Characteristics</h2>
                            <label htmlFor="name">Template Name:</label>
                            <input className="form-control" type="text"
                            id="name"
                            onChange = {(e) => setName(e.target.value)}/>
                                {errors.name ? <p>{errors.name.message}</p> : null}

                            <label htmlFor="size">Planet Size:</label>
                            <input className="form-control" type="number"
                            id="size"
                            onChange = {(e) => setSize(JSON.parse(e.target.value))}/>
                                {errors.size ? <p>{errors.size.message}</p> : null}
                                
                                {/* //  Generator / Mining / Agriculture/ Forge/ Industrial / Factory */}
                                
                            <label htmlFor="designation">Designation:</label>
                            <select  className="form-control" id="designation" 
                                onChange = {handleChangeDesignation}>
                                    {errors.designation ? <p>{errors.designation.message}</p> : null}
                                <option value= '0' >Generator World</option>
                                <option value='1'>Mining World</option>
                                <option value='2'>Agricultural World</option>
                                <option value='3'>Forge World</option>
                                <option value='4'>Industrial World</option>
                                <option value='5'>Factory World</option>
                            </select>
                            <label htmlFor="mining_dist">Mining Districts:</label>
                            <input 
                                className="form-control" 
                                type="number"
                                id="mining_dist"
                                onChange = {handleChangeMining}/>
                                <p>{miningError}</p>

                            <label htmlFor="generator_dist">Generator Districts:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min = '0' 
                                id="generator_dist"
                                onChange = {handleChangeGenerator}/>
                                <p>{genError}</p>

                            <label htmlFor="agriculture_dist">Agriculture Districts:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min = '0' 
                                id="agriculture_dist"
                                onChange = {handleChangeAgriculture}/>
                                <p>{agriError}</p>

                            <label htmlFor="industrial_dist">Industrial Districts:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min = '0' 
                                id="industrial_dist"
                                onChange = {handleChangeIndustrial}/>
                                <p>{industError}</p>

                            <button className="btn btn-primary" type="submit" disabled={miningError || genError || agriError || industError} >Save Template</button>
                        </form>
                    </div>
                    <div className = 'col mt-5'>
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
        </div>
    );
};

export default AddPlanet;