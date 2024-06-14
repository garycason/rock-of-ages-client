import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const RockForm = ({ fetchRocks }) => {
    const initialRockState = {
        name: "",
        weight: 0,
        typeId: 0
    };

    const [types, changeTypes] = useState([{ id: 1, label: "Igneous" }, { id: 2, label: "Volcanic" }]);
    const [rock, updateRockProps] = useState(initialRockState);
    const navigate = useNavigate();

    const fetchTypes = async () => {
        const response = await fetch("http://localhost:8000/types", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        });
        const types = await response.json();
        changeTypes(types);
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const collectRock = async (evt) => {
        evt.preventDefault();

        await fetch("http://localhost:8000/rocks", {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rock)
        });

        await fetchRocks();

        navigate("/rocks");
    };

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={collectRock}>
                    <h1 className="text-3xl">Collect a Rock</h1>
                    <fieldset className="mt-4">
                        <label htmlFor="rock">Name:</label>
                        <input id="rock" type="text"
                            onChange={e => {
                                const copy = { ...rock };
                                copy.name = e.target.value;
                                updateRockProps(copy);
                            }}
                            value={rock.name} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="weight">Weight in kg:</label>
                        <input id="weight" type="number"
                            onChange={e => {
                                const copy = { ...rock };
                                copy.weight = e.target.value;
                                updateRockProps(copy);
                            }}
                            value={rock.weight} className="form-control" />
                    </fieldset>
                    <fieldset className="mt-4">
                        <label htmlFor="type">Type</label>
                        <br />
                        <select id="type" className="form-control"
                            onChange={e => {
                                const copy = { ...rock };
                                copy.typeId = parseInt(e.target.value); // Ensure it's typeId
                                updateRockProps(copy);
                            }}>
                            <option value={0}>- Select a type -</option>
                            {
                                types.map(t => <option
                                    key={`type-${t.id}`}
                                    value={t.id}>{t.label}</option> )
                            }
                        </select>
                    </fieldset>
                    <fieldset>
                        <button type="submit"
                            className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                            Collect Rock
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    );
};
