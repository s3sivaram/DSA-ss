// Javascript implementation of Trie data structure.

class Node {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}
class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let currnode = this.root;
    // inserts a word into the trie.
    for (let i = 0; i < word.length; i++) {
      let charTBI = word[i];
      if (!currnode.children[charTBI]) {
        currnode.children[charTBI] = new Node();
      }
      currnode = currnode.children[charTBI];
    }
    currnode.isWordEnd = true;
  }

  traverse() {
    // traverse through Trie and print all the words.
    let charlist = " ";
    let wordlist = [];
    let currnode = this.root.children;
    traverseword(currnode);
    console.log("Words stored in the Trie are...");
    console.log(wordlist);

    function traverseword(currnode) {
      for (let i = 0; i < Object.keys(currnode).length; i++) {
        let incomingchar = Object.keys(currnode)[i];
        let nextnodechildren = currnode[incomingchar].children;
        let nextnodewordend = currnode[incomingchar].isWordEnd;
        // console.log("wordend", nextnodewordend);
        charlist = charlist + incomingchar;
        traverseword(nextnodechildren);
        if (
          Object.keys(nextnodechildren).length == 0 ||
          nextnodewordend == true
        ) {
          wordlist.push(charlist);
        }
        charlist = charlist.slice(0, charlist.length - 1);
      }
    }
  }

  // -------------------End of class Trie-----------------
}

let trie1 = new Trie();
trie1.insert("hi");
trie1.insert("how");
trie1.insert("howdy");
trie1.insert("hot");
trie1.insert("are");
trie1.insert("new");
trie1.insert("newly");
trie1.insert("catamaran");
trie1.insert("maran");
trie1.insert("cat");

// console.log(trie1);
trie1.traverse();
