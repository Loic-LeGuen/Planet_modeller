import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

const EditPlanet = (props) => {
    const {id} = useParams();
    const [name, setName] =useState('');
    const [size,setSize] =useState(0);
    const [designation, setDesignation] = useState(0);
    const [mining_districts, setMining_districts] = useState(0);
    const [generator_districts, setGenerator_districts] = useState(0);
    const [agriculture_districts, setAgriculture_districts] = useState(0);
    const [industrial_districts, setIndustrial_districts] = useState(0);
    const totalDistricts = parseInt(industrial_districts)+parseInt(mining_districts)+parseInt(generator_districts)+parseInt(agriculture_districts)

         //  Generator / Mining / Agriculture/ Forge/ Industrial / Factory
        // [MINERALS,ENERGY,FOOD,CONSUMER GOODS,ALLOYS]
        const designationWeights = [[1,1.25,1,1,1],[1.25,1,1,1,1],[1,1,1.25,1,1],[1,1,1,0,1.25],[1,1,1,1.1,1.1],[1,1,1,1.25,0]]

    // Get by id request
    
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/planets/${id}`)
        .then((res)=>{
            setName(res.data.name);
            setSize(res.data.size);
            setDesignation(res.data.designation);
            setMining_districts(res.data.mining_districts);
            setGenerator_districts(res.data.generator_districts);
            setAgriculture_districts(res.data.agriculture_districts);
            setIndustrial_districts(res.data.industrial_districts)
        })
        .catch((err)=>{
            console.log(err.res)
        })
    },[]);



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

    // back-end error messages
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
            setIndustError("Agriculture Districts exceed capacity");
            setIndustrial_districts(0);
        };
    };

    // Post request

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/planets/${id}`,
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
                <h1>Edit Planet {name}</h1>
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
                            value = {name}
                            onChange = {(e) => setName(e.target.value)}/>
                                {errors.name ? <p>{errors.name.message}</p> : null}

                            <label htmlFor="size">Planet Size:</label>
                            <input className="form-control" type="number"
                            id="size"
                            value = {size}
                            onChange = {(e) => setSize(JSON.parse(e.target.value))}/>
                                

                            <label htmlFor="designation">Designation:</label>
                            <select default = {designation} className="form-control" id="designation" onChange = {handleChangeDesignation}>
                                <option value= "0" selected={designation==0} >Generator World</option>
                                <option value='1'selected={designation==1}>Mining World</option>
                                <option value='2'selected={designation==2}>Agricultural World</option>
                                <option value='3'selected={designation==3}>Forge World</option>
                                <option value='4'selected={designation==4}>Industrial World</option>
                                <option value='4'selected={designation==4}>Factory World</option>
                            </select>
                            <label htmlFor="mining_dist">Mining Districts:</label>
                            <input 
                                className="form-control" 
                                type="number"
                                id="mining_dist"
                                value = {mining_districts}
                                onChange = {handleChangeMining}/>
                                <p>{miningError}</p>

                            <label htmlFor="generator_dist">Generator Districts:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min = '0' 
                                id="generator_dist"
                                value = {generator_districts}
                                onChange = {handleChangeGenerator}/>
                                <p>{genError}</p>

                            <label htmlFor="agriculture_dist">Agriculture Districts:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min = '0' 
                                id="agriculture_dist"
                                value = {agriculture_districts}
                                onChange = {handleChangeAgriculture}/>
                                <p>{agriError}</p>

                            <label htmlFor="industrial_dist">Industrial Districts:</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                min = '0' 
                                id="industrial_dist"
                                value = {industrial_districts}
                                onChange = {handleChangeIndustrial}/>
                                <p>{industError}</p>

                            <button className="btn btn-primary" type="submit" disabled={miningError || genError || agriError || industError} >Save Changes</button>
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

export default EditPlanet;