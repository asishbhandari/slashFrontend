import { useEffect, useState } from "react";
import { Button, FormControl, Table } from "react-bootstrap";

const Home = () => {
  const [searchText, SetSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const result = await fetch(
          `http://universities.hipolabs.com/search?country=India`
        );
        const data = await result.json();
        const newData = data.map((a) => ({ ...a, checked: false }));
        setSearchResult(newData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?name=${searchText}&country=India`
      );
      const data = await response.json();
      const newData = data.map((a) => ({ ...a, checked: false }));
      setSearchResult(newData);
      SetSearchText("");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className="mt-4">
      <div className="d-flex gap-2">
        <FormControl
          placeholder="search for university in India "
          value={searchText}
          onChange={(e) => SetSearchText(e.target.value)}
        />
        <Button onClick={fetchSearchResults}>Search</Button>
      </div>
      <div className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>state-province</th>
              <th>web_pages</th>
              <th>favourite</th>
            </tr>
          </thead>
          <tbody>
            {searchResult
              .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
              .map((row, i) => (
                <tr key={i}>
                  <td>{row?.name}</td>
                  <td>{row?.["state-province"]}</td>
                  <td>@{row?.["web_pages"][0]}</td>
                  <td>
                    <input
                      type="checkbox"
                      name="favourite"
                      checked={row.checked}
                      onChange={(e) =>
                        handleCheckboxChange(i, e.target.checked)
                      }
                    />
                  </td>
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
    </div>
  );
};

export default Home;
