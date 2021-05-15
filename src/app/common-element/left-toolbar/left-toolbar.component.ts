import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

interface MenuNode {
  name: string;
  children?: MenuNode[];
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'menu1',
    children: [
      {
        name: 'child menu1'
      },
      {
        name: 'child menu2'
      },
      {
        name: 'child menu3'
      },
    ]
  },
  {
    name: 'menu2',
    children: [
      {
        name: 'child menu1'
      },
      {
        name: 'child menu2'
      },
      {
        name: 'child menu3'
      },
    ]
  }
  ,
  {
    name: 'menu3',
    children: [
      {
        name: 'child menu1'
      },
      {
        name: 'child menu2'
      },
      {
        name: 'child menu3'
      },
    ]
  }
  
]


@Component({
  selector: 'app-left-toolbar',
  templateUrl: './left-toolbar.component.html',
  styleUrls: ['./left-toolbar.component.css']
})
export class LeftToolbarComponent implements OnInit {
  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  constructor() { 
    this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

}
