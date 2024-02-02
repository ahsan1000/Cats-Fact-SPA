import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { TaggedContentCard } from "react-ui-cards";

const App = () => {
  const [catFacts, setCatFacts] = useState([]);
  const catNames = [
    "Whiskers",
    "Mittens",
    "Shadow",
    "Luna",
    "Simba",
    "Oliver",
    "Tiger",
    "Bella",
    "Charlie",
    "Max",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cat-fact.herokuapp.com/facts");
        const data = await response.json();
        setCatFacts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch cat facts. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div>
      <header>
        <h1>Cat Facts App</h1>
      </header>

      <main>
        <div className="cat-fact-grid">
          {/* Check if catFacts is defined before mapping */}
          {catFacts.map((fact, index) => (
            <div key={fact._id} className="cat-fact-card">
              <TaggedContentCard
                thumbnail="https://bit.ly/fcc-relaxing-cat"
                title={`Cat Fact - ${catNames[index % catNames.length]}`}
                description={truncateText(fact.text, 80)}
                tags={["cat", "sleeping", "meat"]}
              />
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Cat Facts App</p>
      </footer>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
