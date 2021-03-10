export class TrieNode<T = string> {
  public isTerminal = false;
  public key: T;
  public children: TrieNode<T>[];
  public data: any;

  constructor(key = undefined as T, isTerminal = false, data = null) {
    this.key = key;
    this.isTerminal = isTerminal;
    this.children = [];
    this.data = data;
  }
}
