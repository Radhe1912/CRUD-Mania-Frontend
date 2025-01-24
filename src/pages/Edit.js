import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: "",
        age: "",
    });

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/single/${id}`);
            setInput(res.data);
        }
        getAllData();
    }, [id]);

    const handleEditData = async (e) => {
        e.preventDefault();
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${id}`, input);
        navigate("/");
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className='col-md-12' style={{ backgroundColor: "#5d5858", marginTop: "50px" }}>
                        <h1 className='text-white text-center m-2'>Update user</h1>
                    </div>
                    <div className="col-md-12">
                        <form onSubmit={handleEditData}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name='name' value={input.name}
                                    onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name='email' value={input.email}
                                    onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input type="text" className="form-control" name='age' value={input.age}
                                    onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }} />
                            </div>
                            <div className='d-flex justify-content-center align-item-center'>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-item-center mt-4">
                    <button onClick={()=>{navigate("/")}} className='btn btn-info'>Go to Home</button>
                </div>
            </div>
        </div>
    )
}

export default Edit