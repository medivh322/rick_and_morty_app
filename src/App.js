import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./components/filter";
import CharactersList from "./components/list";
import ModalDetail from "./components/modal";
import PaginationCharacters from "./components/pagination";
import { fetchCharactersAll } from "./redux/reducers";

function App() {
  const dispatch = useDispatch();
  const {filterParameters, countPages} = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchCharactersAll({filterParameters, newPage: 1}));
  }, [])
  
  return (
    <Container>
      <Filter />
      <CharactersList />
      {countPages > 1 ? <PaginationCharacters /> : ""} 
      <ModalDetail />
    </Container>
  );
}

export default App;
