import { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharactersAll } from "../../redux/reducers";
import { isEqual } from 'lodash';

const Filter = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [species, setSpecies] = useState("");
    const [type, setType] = useState("");
    const [gender, setGender] = useState("");
    const dispatch = useDispatch();
    const {filterParameters, loading} = useSelector(state => state);

    function handleSubmit(e){
        e.preventDefault();
        if(isEqual({name,status,species,type,gender}, filterParameters)) return;
        dispatch(fetchCharactersAll({filterParameters : {name, status, species, type, gender}, newPage: 1}));
    }

    return (
        <>
            <Button onClick={() => setOpen(!open)} aria-expanded={open}>{!open ? "Open" : "Close"} filter</Button>
            {(loading) ? "Идет загрузка..." : "Загрузка завершена"}
            <div className="filter_block">
                <Collapse in={open} className="filter">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2" controlId="filterName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="d-block">Status:</Form.Label>
                            <Form.Check inline type="radio" onChange={(e) => setStatus(e.target.value)} id="statusFilter1" value="alive" name="statusFilter" label="Alive" />
                            <Form.Check inline type="radio" onChange={(e) => setStatus(e.target.value)} id="statusFilter2" value="dead" name="statusFilter" label="Dead" />
                            <Form.Check inline type="radio" onChange={(e) => setStatus(e.target.value)} id="statusFilter3" value="unknown" name="statusFilter" label="unknown" />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="d-block">Species:</Form.Label>
                            <Form.Control onChange={(e) => setSpecies(e.target.value)} type="text" placeholder="Enter type" />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="filterType">
                            <Form.Label>Type:</Form.Label>
                            <Form.Control onChange={(e) => setType(e.target.value)} type="text" placeholder="Enter type" />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label className="d-block">Gender:</Form.Label>
                            <Form.Check inline onChange={(e) => setGender(e.target.value)} type="radio" id="genderFilter1" value="male" name="genderFilter" label="Male" />
                            <Form.Check inline onChange={(e) => setGender(e.target.value)} type="radio" id="genderFilter2" value="female" name="genderFilter" label="Female" />
                            <Form.Check inline onChange={(e) => setGender(e.target.value)} type="radio" id="genderFilter3" value="genderless" name="genderFilter" label="Male" />
                            <Form.Check inline onChange={(e) => setGender(e.target.value)} type="radio" id="genderFilter4" value="unknown" name="genderFilter" label="unknown" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Apply
                        </Button>
                    </Form>
                </Collapse>
            </div>
        </>
    )
}

export default Filter;