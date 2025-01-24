import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const [users, setUsers] = useState([]);

    const [input, setInput] = useState({
        name: "",
        email: "",
        age: "",
    });

    const [render, setRender] = useState(false);

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/v1/users`);
            setUsers(res.data);
        }
        getAllData();
    }, [render]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the API with the input data
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/users`, input);

            setRender(true);
            setInput({ name: "", email: "", age: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/v1/users/${id}`);

        const newUsers = users.filter((item)=>{
            return item._id !== id;
        });
        
        setUsers(newUsers);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className='col-md-12' style={{ backgroundColor: "#5d5858", marginTop: "50px" }}>
                        <h1 className='text-white text-center m-2'>MERN CRUD APP</h1>
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name='name' value={input.name}
                                    onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name='email' value={input.email}
                                    onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input type="text" name='age' value={input.age}
                                    onChange={(e) => { setInput({ ...input, [e.target.name]: e.target.value }) }} className="form-control" />
                            </div>
                            <div className='d-flex justify-content-center align-item-center'>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.age}</td>
                                            <td>
                                            <Link to={`/edit/${user._id}`}>
                                                <button className="btn btn-primary">Edit</button>
                                            </Link>    
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => { handleDelete(user._id) }}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home