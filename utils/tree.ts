import { readdirSync, statSync } from "fs";

interface NodeOptions<T extends object | undefined> {
  transformers?: (path: string) => T;
  filter?: (path: string, child: Node<T>, children: Node<T>[]) => boolean;
}

export class Node<T extends object | undefined> {
  public data: T;

  constructor(
    public path: string,
    public children: Node<T>[],
    options: NodeOptions<T>
  ) {
    if (statSync(this.path).isDirectory()) {
      const childrenFiles = readdirSync(this.path);
  
      for (let child of childrenFiles) {
        const childPath = `${this.path}/${child}`;
  
        const childNode = new Node(childPath, [], options);
        this.children.push(childNode);
        
      }
    }

    this.children = this.children.filter((child) => {
      return options.filter ? options.filter(path, child, this.children) : true
    });
    this.data = options.transformers ? options.transformers(path) : {} as T;
  }
}

interface TreeOptions<T extends object | undefined> extends NodeOptions<T> {}

export class Tree<T extends object | undefined> {
  public root: Node<T>;

  constructor(path: string, options: TreeOptions<T>) {
    this.root = new Node(path, [], options);
  }
}