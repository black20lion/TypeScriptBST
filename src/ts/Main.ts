import * as process from "process";
import * as readline from "readline";

interface Comparable<T> {
    compareTo(another: T): number;
    equals(another: T): boolean;
}

class Employee implements Comparable<Employee> {
    private _age: number;
    private _name: String;

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    constructor(age: number, name: String) {
        this._age = age;
        this._name = name;
    }

    equals(another: Employee): boolean {
        return (this._age == another._age && this._name == another._name);
    }

    compareTo(another: Employee): number {
        return this._age - another._age;
    }

    toString(): any {
        return  this._name + " " + this._age;
    }
}

class MyTree<T extends Comparable<T>> {
    private rootNode: MyNode<T>;

    constructor() {
        this.rootNode = null;
    }

    public add(key: T): any {
        let newNode: MyNode<T> = new MyNode<T>();
        newNode.key = key;
        if (this.rootNode === null) {
            this.rootNode = newNode;
        } else {
            let currentNode: MyNode<T> = this.rootNode;
            let parentNode: MyNode<T>;
            while (true) {
                parentNode = currentNode;
                if (key == currentNode.key) {
                    return;
                } else if (key.compareTo(currentNode.key) < 0) {
                    currentNode = currentNode.leftChild;
                    if (currentNode == null) {
                        parentNode.leftChild = newNode;
                        return;
                    }
                } else {
                    currentNode = currentNode.rightChild;
                    if (currentNode == null) {
                        parentNode.rightChild = newNode;
                        return;
                    }
                }
            }
        }
    }

    public get(key: T): MyNode<T> {
        if (this.rootNode == null) {
            return null;
        }
        let currentNode: MyNode<T> = this.rootNode;
        while (!currentNode.key.equals(key)) {
            if (key.compareTo(currentNode.key) < 0) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null) {
                return null;
            }
        }
        return currentNode;
    }

    //support method that returns element with the smallest key of the bigger ones
    private receiveHeir(node: MyNode<T>): MyNode<T> {
        let parentNode: MyNode<T> = node;
        let heirNode: MyNode<T> = node;
        let currentNode: MyNode<T> = node.rightChild;
        while (currentNode != null) {
            parentNode = heirNode;
            heirNode = currentNode;
            currentNode = currentNode.leftChild;
        }
        if (heirNode != node.rightChild) {
            parentNode.leftChild = heirNode.rightChild;
            heirNode.rightChild = node.rightChild;
        }
        return heirNode;
    }

    public delete(key: T): boolean {
        if (this.rootNode == null) {
            return false;
        }
        let currentNode: MyNode<T> = this.rootNode;
        let parentNode: MyNode<T> = this.rootNode;
        let isLeftChild: boolean = true;
        while (!currentNode.key.equals(key)) {
            parentNode = currentNode;
            if (key.compareTo(currentNode.key) < 0) {
                isLeftChild = true;
                currentNode = currentNode.leftChild;
            } else {
                isLeftChild = false;
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null)
                return false;
        }
        if (currentNode.leftChild == null && currentNode.rightChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = null;
            else if (isLeftChild)
                parentNode.leftChild = null;
            else
                parentNode.rightChild = null;
        } else if (currentNode.rightChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = currentNode.leftChild;
            else if (isLeftChild)
                parentNode.leftChild = currentNode.leftChild;
            else
                parentNode.rightChild = currentNode.leftChild;
        } else if (currentNode.leftChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = currentNode.rightChild;
            else if (isLeftChild)
                parentNode.leftChild = currentNode.rightChild;
            else
                parentNode.rightChild = currentNode.rightChild;
        } else {
            let heir: MyNode<T> = this.receiveHeir(currentNode);
            if (currentNode == this.rootNode)
                this.rootNode = heir;
            else if (isLeftChild)
                parentNode.leftChild = heir;
            else
                parentNode.rightChild = heir;
        }
        return true;
    }

    public printTree(): any {
        let globalStack = [];
        globalStack.push(this.rootNode);
        let gaps: number = 32;
        let isRowEmpty: boolean = false;
        let separator: string = "=============================================================";
        console.log(separator);
        while (isRowEmpty == false) {
            let localStack = [];
            isRowEmpty = true;
            for (let i = 0; i < gaps; i++)
                process.stdout.write(' ');
            while (Object.keys(globalStack).length > 0) {
                let temp: MyNode<T> = <MyNode<T>>globalStack.pop();
                if (temp != undefined) {
                    process.stdout.write(temp.key.toString());
                    localStack.push(temp.leftChild);
                    localStack.push(temp.rightChild);
                    if (temp.leftChild != null || temp.rightChild != null)
                        isRowEmpty = false;
                } else {
                    process.stdout.write("_");
                    localStack.push(null);
                    localStack.push(null);
                }
                for (let i = 0; i < gaps * 2 - 2; i++)
                    process.stdout.write(' ');
            }
            console.log("");
            gaps /= 2;
            while (Object.keys(localStack).length > 0)
                globalStack.push(localStack.pop());
        }
        console.log(separator);
    }
}

class MyNode<T> {
    private _key: T = null;
    private _leftChild: MyNode<T> = null;
    private _rightChild: MyNode<T> = null;

    get key(): T {
        return this._key;
    }


    get leftChild(): MyNode<T> {
        return this._leftChild;
    }


    get rightChild(): MyNode<T> {
        return this._rightChild;
    }


    set key(value: T) {
        this._key = value;
    }

    set leftChild(value: MyNode<T>) {
        this._leftChild = value;
    }


    set rightChild(value: MyNode<T>) {
        this._rightChild = value;
    }

    toString(): any {
        return  "\n" + "Key: " + this._key +  "\n" +
            "Left child: " + this._leftChild + "\n"+
            "Right Child: " + this._rightChild;
    }

}


let tree: MyTree<Employee> = new MyTree<Employee>();
enum commands {'add', 'get', 'delete', 'show', 'quit'}
var command;
var readlineSync = require('readline-sync');
console.log('Hello. This application emulates work of Binary Search Tree.\n' +
    'This version uses type "Employee" to demonstrate functionality.\n' +
    'Employees have two attributes: "name" and "age".\n' +
    'Tree understands the older employee as the bigger one.\n' +
    'There are command pool:\n' +
    'add - to add an Employee to the tree\n' +
    'get - to find an Employee by attributes\n' +
    'delete - to delete an Employee by attributes\n' +
    'show - to display the binary tree\n' +
    'quit - to quit from programm\n');

while (command != commands[4]) {
    command = readlineSync.question('Please, write the command and type "enter"\n');
    if (command == commands[0]) {
        var name = readlineSync.question('Enter the name of an employee\n');
        var age: number = readlineSync.question('Enter the age of an employee\n');
        while (isNaN(age)) {
            console.log(age + ' is not a number, please enetr correct data');
            age = readlineSync.question('Enter the age of an employee\n');
        }
        var currentEmployee = new Employee(age, name);
        tree.add(currentEmployee);
        console.log("Employee is successfully added");
    } else if (command == commands[1]) {
        var name = readlineSync.question('Enter the name of an employee\n');
        var age: number = readlineSync.question('Enter the age of an employee\n');
        let node: MyNode<Employee> = <MyNode<Employee>>tree.get(new Employee(age, name));
        console.log("your employee is " + node);
    } else if (command == commands[2]) {
        var name = readlineSync.question('Enter the name of an employee\n');
        var age: number = readlineSync.question('Enter the age of an employee\n');
        let employee: Employee = new Employee(age, name);
        console.log("your employee is deleted " + tree.delete(employee) + '\n');
    } else if (command == commands[3]) {
        tree.printTree();
    } else {
        if (command != commands[4])
        console.log("there is no such a command\n")
    }
}

