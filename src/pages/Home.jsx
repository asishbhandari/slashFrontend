import { useEffect, useState } from "react";
import { Button, FormControl, Table, FormCheck } from "react-bootstrap";

const Home = () => {
  const [searchText, SetSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const result = await fetch(
          `http://universities.hipolabs.com/search?country=India`
        );
        const data = await result.json();
        const response = await fetch(
          `http://localhost:5000/api/fav/all?userId=${userId}`,
          {
            method: "GET",
          }
        );
        const fav = await response.json();
        console.log(fav);
        const newData = data.map((a) =>
          fav.find((n) => n.universityname === a.name)
            ? { ...a, checked: true }
            : { ...a, checked: false }
        );
        setSearchResult(newData);
        // console.log(searchResult);
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

  const handleCheckboxChange = async (row, check) => {
    if (check) {
      const webpage = row?.["web_pages"][0].toString();
      const response = await fetch(`http://localhost:5000/api/fav/add`, {
        method: "POST",
        body: JSON.stringify({
          userId: parseInt(localStorage.getItem("userId")),
          universityname: row.name,
          state: row?.["state-province"],
          webpage: webpage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // University already added to favourites
      const data = await response.json();
      if (data?.message == "University already added to favourites")
        alert(data.message);
      else {
        setSearchResult((pre) =>
          pre.map((data) =>
            data.name === row.name ? { ...data, checked: true } : { ...data }
          )
        );
      }
    } else {
      const response = await fetch(`http://localhost:5000/api/fav/remove`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: parseInt(localStorage.getItem("userId")),
          universityname: row.name,
          state: row?.["state-province"],
          webpage: row?.["web_pages"][0],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("else wala response: ", response);
      setSearchResult((pre) =>
        pre.map((data) =>
          data.name === row.name ? { ...data, checked: false } : { ...data }
        )
      );
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
                  <td>{row?.["web_pages"][0]}</td>
                  <td>
                    <FormCheck
                      type="checkbox"
                      name="favourite"
                      checked={row?.checked}
                      onChange={(e) =>
                        handleCheckboxChange(row, e.target.checked)
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
