import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharactersAll } from "../../redux/reducers";

const PaginationCharacters = () => {
    const { curPage, countPages, filterParameters, loading } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleChangePage = (e) => {
        dispatch(fetchCharactersAll({
            filterParameters,
            newPage: e.target.dataset.value
        }));
    }

    let endPages;
    if (countPages < 8 || countPages === curPage) {
        endPages = countPages;
    } else {
        if (curPage + 2 > countPages) {
            endPages = countPages;
        } else {
            endPages = curPage + 2;
        }
    }

    let startPages;
    if (curPage >= 4 && countPages > 8) {
        startPages = (countPages < 8) ? 1 : curPage - (2);
    } else {
        startPages = 1
    }

    let pagAr = [];
    for (let i = startPages; i <= endPages; i++) {
        pagAr.push(
            <Pagination.Item key={i} data-value={i} active={curPage === i} onClick={curPage !== i ? handleChangePage : undefined} >
                {i}
            </Pagination.Item>
        )
    }

    return (
        <>
            <Pagination>
                {(curPage > 3) ? <Pagination.Item data-value="1" onClick={handleChangePage}>1</Pagination.Item> : ""}
                {pagAr}
                {(endPages < countPages)
                    ?
                    <>
                        {(curPage + 3 !== countPages) ? <Pagination.Ellipsis /> : ""}
                        <Pagination.Item data-value={countPages} onClick={handleChangePage}>{countPages}</Pagination.Item>
                    </>
                    : ""
                }
            </Pagination>
            {(loading) ? "Идет загрузка..." : "Загрузка завершена"}
        </>
    )
}

export default PaginationCharacters;