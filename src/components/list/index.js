import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CharactersListItem from "../item";

function CharactersList() {
    const {characters, loading} = useSelector(state => state);
    return (
        <Row>
            {characters.length !== 0 ? 
                characters.map((elem) =>
                    <CharactersListItem key={elem.id} {...elem} />
                )
                : !loading ? <div className="not_found">NOT FOUND</div> : ""
            }
        </Row>
    )
}

export default CharactersList;