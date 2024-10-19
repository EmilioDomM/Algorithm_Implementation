function TrieNode(letter) {
    this.letter = letter;
    this.prevChar = null;
    this.nextChars = {}; 
    this.isComplete = false; 
  
    this.getWord = getWord;
  
    function getWord() {
      var node = this;
      var wordLetters = [];
      while (node.prevChar) {
        wordLetters.unshift(node.letter);
        node = node.prevChar; 
      }
      return wordLetters.join("");
    };
  }
  
  function Trie() {
    this.root = new TrieNode(null);
  
    this.insert = insert; 
    this.contains = contains;
    this.find = find; 
  
    function insert(word) {
      var node = this.root; 
      for (let i = 0; i < word.length; i++) {
        const current_letter = word[i];
        if (!node.nextChars[current_letter]) { 
          node.nextChars[current_letter] = new TrieNode(current_letter); 
          node.nextChars[current_letter].prevChar = node; 
        }
        node = node.nextChars[current_letter]; 
  
        if (i === word.length - 1) {
          node.isComplete = true;
        }
      }
    };
  
    function contains(word) {
      var node = this.root;
      for (let i = 0; i < word.length; i++) {
        const current_letter = word[i];
        let next_node = node.nextChars[current_letter];
        if (next_node) {
          node = next_node; 
        } else {
          return false;
        }
      }
      return node.isComplete; 
    };
  
    function find(clue_letters) {
      var node = this.root; 
      var output = [];
      for (let i = 0; i < clue_letters.length; i++) {
        const clue_letter = clue_letters[i];
        let next_node = node.nextChars[clue_letter];
        if (next_node) { 
          node = next_node;
        } else {
          return output;
        }
      }
  
      findAllWords(node, output);
      return output;
    };
  
    function findAllWords(node, arr) {
      if (node.isComplete) { 
        arr.unshift(node.getWord()); 
      }
  
      for (var next_letter in node.nextChars) {
        findAllWords(node.nextChars[next_letter], arr);
      }
    }
  }
  
  export default Trie;
  