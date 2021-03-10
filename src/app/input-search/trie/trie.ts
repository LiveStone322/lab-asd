import { TrieNode } from "./node/trie-node";

export class Trie {
  root = new TrieNode();

  public AddNode(key: string) {
    let currentNode = this.root;
    let splittedKey = key.split("");
    for (let i = 0; i < splittedKey.length; i++) {
      if (!currentNode.children.map((c) => c.key).includes(splittedKey[i])) {
        currentNode.children.push(new TrieNode(splittedKey[i]));
      }
      currentNode =
        currentNode.children[
          currentNode.children.map((c) => c.key).indexOf(splittedKey[i])
        ];
      currentNode.isTerminal = i === key.length - 1;
    }
  }

  public RemoveNode(key: string) {
    let node = this.SearchNode(key);
    if (node) {
      node.isTerminal = false;
    }
  }

  public SearchNode(key: string, searchForTerminal = true) {
    if (key === "") return this.root;
    let currentNode = this.root;
    let splittedKey = key.split("");
    for (let i = 0; i < splittedKey.length; i++) {
      let nextNodeIdx = currentNode.children
        .map((c) => c.key)
        .indexOf(splittedKey[i]);

      if (nextNodeIdx < 0) {
        return null;
      }

      if (i === key.length - 1) {
        if (
          !searchForTerminal ||
          currentNode.children[nextNodeIdx].isTerminal
        ) {
          return currentNode.children[nextNodeIdx];
        } else {
          return null;
        }
      }

      currentNode = currentNode.children[nextNodeIdx];
    }
  }

  public getNodesChildren(initValue: string, node: TrieNode): string[] {
    if (!node) return;
    let nodes: string[] = [];
    node.children.forEach((c) => {
      nodes.push(...this.getNodesChildren(initValue + c.key, c));
    });
    if (node.isTerminal) return [initValue, ...nodes];
    return nodes;
  }
}
