import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Favourite = () => {
  const [searchResult, setSearchResult] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  const [page, setPage] = useState(1);
  const perPage = 10;
  const goPre = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const goNext = () => {
    if (page < Math.floor(searchResult.length / perPage)) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    const fetchFav = async () => {
      const response = await fetch(
        `http://localhost:5000/api/fav/all?userId=${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setSearchResult(data);
      console.log(data);
    };
    fetchFav();
  }, []);
  return (
    <div className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>state-province</th>
            <th>web_pages</th>
            {/* <th>favourite</th> */}
          </tr>
        </thead>
        <tbody>
          {searchResult
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((row) => (
              <tr key={row.id}>
                <td>{row?.universityname}</td>
                <td>{row?.state}</td>
                <td>{row?.webpages}</td>
                {/* <td>
                  <input
                    type="checkbox"
                    name="favourite"
                    checked={row.checked}
                    // onChange={(e) => handleCheckboxChange(i, e.target.checked)}
                  />
                </td> */}
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-evenly">
        <span className="link" onClick={goPre}>
          prev
        </span>
        <span>{page}</span>
        <span className="link" onClick={goNext}>
          next
        </span>
      </div>
    </div>
  );
};

export default Favourite;
