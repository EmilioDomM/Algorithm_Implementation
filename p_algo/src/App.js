import React, { useState } from "react";
import { KMPSearch, longestCommonSubstring, manacherAlgorithm } from "./Algorithms";
import Trie from "./Trie";
import "./App.css";

const App = () => {
  const [textValue1, setTextValue1] = useState("");
  const [textValue2, setTextValue2] = useState("");
  const [highlightedText1, setHighlightedText1] = useState("");
  const [highlightedText2, setHighlightedText2] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [matches, setMatches] = useState([]);  // Store matches
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);  // Track current match
  const [myTrie] = useState(new Trie());

  const handleFileUpload = (event, setTextValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setTextValue(fileContent); 
        
        const words = fileContent
          .replace(/[^a-zA-Z0-9ñÑ\s]/g, '') 
          .toLowerCase() 
          .split(/\s+/); 

        words.forEach(word => {
          if (word) { 
            myTrie.insert(word);
          }
        });
      };
      reader.readAsText(file);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setPrefix(value);
    const words = value.split(" ");
    const trie_prefix = words[words.length - 1].toLowerCase();
    const found_words = myTrie.find(trie_prefix).sort((a, b) => a.length - b.length);

    if (found_words.length > 0 && value !== "") {
      setSuggestions(found_words);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39 && suggestions.length > 0) {
      setPrefix(suggestions[0]);
    }
  };

  // Function to highlight the matching pattern in the text using the search bar input (for KMP)
  const highlightSearch = () => {
    try {
      if (prefix.trim() === "") {  
        throw new Error("Search term is empty");
      }
  
      const foundMatches = KMPSearch(textValue1, prefix);
      setMatches(foundMatches);
      setCurrentMatchIndex(0);  // Reset to first match
      if (foundMatches.length > 0) {
        highlightMatch(foundMatches[0]);  // Highlight the first match
      } else {
        setHighlightedText1(textValue1);  // No matches, show original text
      }
    } catch (error) {
      console.error("Error during search:", error.message);
      alert("Please enter a valid search term.");  
    }
  };

  const highlightMatch = (matchIndex) => {
    const matchStart = matches[matchIndex];
    const matchEnd = matchStart + prefix.length;

    const highlightedText = 
      textValue1.slice(0, matchStart) +
      `<mark>${prefix}</mark>` +
      textValue1.slice(matchEnd);

    setHighlightedText1(highlightedText);
  };

  const highlightLCS = () => {
    const lcs = longestCommonSubstring(textValue1, textValue2);
    if (lcs) {
      const highlight = (text, lcs) => {
        const start = text.indexOf(lcs);
        if (start !== -1) {
          return (
            text.slice(0, start) +
            `<mark style="background-color: blue">${lcs}</mark>` +
            text.slice(start + lcs.length)
          );
        }
        return text;
      };
      setHighlightedText1(highlight(textValue1, lcs));
      setHighlightedText2(highlight(textValue2, lcs));
    }
  };

  const highlightPalindrome = () => {
    const palindrome = manacherAlgorithm(textValue1);
    if (palindrome) {
      const highlightedText = textValue1.replace(
        new RegExp(palindrome, "g"),
        `<mark style="background-color: green">${palindrome}</mark>`
      );
      setHighlightedText1(highlightedText);
    }
  };

  const handleNext = () => {
    if (matches.length > 0) {
      const nextIndex = (currentMatchIndex + 1) % matches.length;  
      setCurrentMatchIndex(nextIndex);
      highlightMatch(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (matches.length > 0) {
      const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length; 
      setCurrentMatchIndex(prevIndex);
      highlightMatch(prevIndex);
    }
  };

  return (
    <div className="main-container">
      <div className="top-container">
        <div className="file-container">
          <input
            type="file"
            accept=".txt"
            className="input"
            onChange={(e) => handleFileUpload(e, setTextValue1)}
          />
          <div className="textbox-container">
            <textarea
              className="textbox"
              placeholder="Texto 1"
              value={textValue1}
              onChange={(e) => setTextValue1(e.target.value)}
            />
          </div>
        </div>

        <div className="file-container">
          <input
            type="file"
            accept=".txt"
            className="input"
            onChange={(e) => handleFileUpload(e, setTextValue2)}
          />
          <div className="textbox-container">
            <textarea
              className="textbox"
              placeholder="Texto 2"
              value={textValue2}
              onChange={(e) => setTextValue2(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="middle-container">
        <div className="searchbar-container">
          <button onClick={handlePrevious}>{"<"}</button>
          <input
            type="text"
            className="searchbar"
            placeholder="Buscar..."
            value={prefix}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleNext}>{">"}</button>
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setPrefix(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          <button className="button" onClick={highlightSearch}>Buscar (KMP)</button>
          <button className="button" onClick={highlightLCS}>Similitud (LCS)</button>
          <button className="button" onClick={highlightPalindrome}>Palindromo</button>
        </div>
      </div>
      

      <div className="result-container">
        <div dangerouslySetInnerHTML={{ __html: highlightedText1 }} className="highlighted-text" />
        <div dangerouslySetInnerHTML={{ __html: highlightedText2 }} className="highlighted-text" />
      </div>
    </div>
  );
};

export default App;
