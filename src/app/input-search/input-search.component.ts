import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Trie } from "./trie/trie";

@Component({
  selector: "app-input-search",
  templateUrl: "./input-search.component.html",
  styleUrls: ["./input-search.component.scss"],
})
export class InputSearchComponent implements OnInit {
  items = new BehaviorSubject<string[]>([]);
  trie = new Trie();
  numberOfDataToAdd = ["1 ключ", "10 ключей", "100 ключей"];
  control = new FormControl("");
  addDataControl = new FormControl(this.numberOfDataToAdd[0]);

  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe(this.valueChangeHandler.bind(this));
  }

  public addClick() {
    let value = this.control.value;
    this.trie.AddNode(value);
    this.items.next(
      this.trie.getNodesChildren(value, this.trie.SearchNode(value))
    );
  }

  public removeClick() {
    let value = this.control.value;
    this.trie.RemoveNode(value);
    this.items.next(
      this.trie.getNodesChildren(value, this.trie.SearchNode(value))
    );
  }

  public addRandomData() {
    switch (this.addDataControl.value) {
      case this.numberOfDataToAdd[0]:
        this.AddRandomDataTimes(1);
        break;
      case this.numberOfDataToAdd[1]:
        this.AddRandomDataTimes(10);
        break;
      case this.numberOfDataToAdd[2]:
        this.AddRandomDataTimes(100);
        break;
      default:
        break;
    }
  }

  private AddRandomDataTimes(times: number) {
    let maxLength = Math.floor(Math.sqrt(times)) - 1;

    for (let i = 0; i < times; i++) {
      let r = Math.random()
        .toString(36)
        .substring(11 - maxLength);
      this.trie.AddNode(r);
      this.control.setValue("");
    }
  }

  private valueChangeHandler(change: string) {
    this.items.next(
      this.trie.getNodesChildren(change, this.trie.SearchNode(change, false))
    );
  }
}
