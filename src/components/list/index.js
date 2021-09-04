import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CharactersListItem from "../item";

function CharactersList() {
    const characters = useSelector(state => state.characters);
    return (
        <Row>
            {Array.isArray(characters) ? 
                characters.map((elem) =>
                    <CharactersListItem key={elem.id} {...elem} />
                )
                : "Персонажи не найдены"
            }
        </Row>
    )
}

export default CharactersList;