import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsDel = () => {
    const { dartsId } = useParams();
    const navigate = useNavigate();
    const [darts, setDarts] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
                setDarts(res.data);
            } catch (error) {
                console.error("Hiba: ", error);
            }
        })();
    }, [dartsId]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`https://darts.sulla.hu/darts/${dartsId}`);
            navigate("/");
        } catch (error) {
            console.error("Törlés sikertelen: ", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row row-cols-2 justify-content-center align-items-center">
                <div className="col">
                    <div className="card h-250">
                        <h3 className="text-center">Törlendő dartsozó neve: {darts.name}</h3>
                        <h4 className="text-center">Születési éve: {darts.birth_date}</h4>
                        <h4 className="text-center">Megnyert világbajnokságai: {darts.world_ch_won}</h4>
                        <div className="card-body d-flex flex-column align-items-center">
                            <Link to={darts.profile_url} className="fs-5 btn btn-success" target="_blank">Profil link</Link><br />
                            <img
                                src={darts.image_url || "https://via.placeholder.com/400x800"}
                                alt={darts.name}
                                className="img-fluid"
                                style={{ width: "200px" }}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleDelete}>
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <Link to="/" className="btn btn-warning fs-6">
                                <i className="bi bi-backspace-fill"></i> Vissza
                            </Link>&nbsp;&nbsp;
                            <button className="bi bi-trash3 fs-6 btn btn-danger" type="submit">Törlés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
