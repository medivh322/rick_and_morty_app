import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CharactersListItem from "../item";

function CharactersList() {
    const characters = useSelector(state => state.characters);
    return (
        <Row>
            {characters.length !== 0 ? 
                characters.map((elem) =>
                    <CharactersListItem key={elem.id} {...elem} />
                )
                : <div className="not_found">NOT FOUND</div>
            }
        </Row>
    )
}

export default CharactersList;