import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BiCheckSquare, BiBookOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function GenreScreen() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Western",
  ];

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = () => {
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre.");
    } else {
      navigate("/home");
      alert(
        "Welcome to Personovel! Please enjoy your stay and refresh the site to see its functions."
      );
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: 'url("/images/genre-bg.gif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 1)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Protest Guerrilla",
          textTransform: "uppercase",
          fontWeight: "700",
          color: "#6F1D1B",
          marginBottom: "20px",
          fontWeight: "1",
        }}
      >
        <BiBookOpen style={{ marginRight: "10px" }} />
        Select Your Preferred Genres
      </h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {genres.map((genre) => (
          <Button
            key={genre}
            onClick={() => toggleGenre(genre)}
            variant={selectedGenres.includes(genre) ? "primary" : "secondary"}
            style={{
              margin: "5px",
              backgroundColor: selectedGenres.includes(genre)
                ? "#BC1823"
                : "#002960",
              borderColor: selectedGenres.includes(genre)
                ? "#BC1823"
                : "#002960",
              opacity: selectedGenres.includes(genre) ? 0.5 : 1,
              borderRadius: "20px",
              minWidth: "100px",
            }}
          >
            {selectedGenres.includes(genre) && (
              <BiCheckSquare style={{ marginRight: "5px" }} />
            )}
            {genre}
          </Button>
        ))}
      </div>
      <div style={{ marginTop: "40px" }}>
        <h2
          style={{
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            fontWeight: "700",
            color: "#002960",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BiCheckSquare style={{ marginRight: "5px" }} />
          Selected Genres:
        </h2>
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {selectedGenres.map((genre) => (
            <Button
              key={genre}
              style={{
                pointerEvents: "none",
                fontFamily: "Blinker",
                color: "#002960",
                fontSize: "18px",
                margin: "5px",
                opacity: 0.5,
                borderRadius: "20px",
                minWidth: "100px",
                backgroundColor: "#FCD5CE",
                padding: "8px 12px",
                textAlign: "center",
              }}
            >
              {genre}
            </Button>
          ))}
        </ul>
      </div>
      <Button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#6F1D1B",
          border: "black solid 1px",
          fontSize: "18px",
          borderRadius: "50px",
          transition: "transform 0.3s, background-color 0.3s",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "10px 20px",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.backgroundColor = "#BC1823";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.backgroundColor = "#6F1D1B";
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export default GenreScreen;
