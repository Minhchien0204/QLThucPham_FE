import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

interface MenuNode {
  name: string;
  url: string;
  children?: MenuNode[];
  active: boolean;
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'Quản lí',
    children: [
      {
        name: 'Nhân viên',
        url: '/nhanvien',
        active: true
      }
    ],
    url: '#',
    active: false
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
