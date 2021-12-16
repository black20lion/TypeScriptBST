"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var Employee = /** @class */ (function () {
    function Employee(age, name) {
        this._age = age;
        this._name = name;
    }
    Object.defineProperty(Employee.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (value) {
            this._age = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.equals = function (another) {
        return (this._age == another._age && this._name == another._name);
    };
    Employee.prototype.compareTo = function (another) {
        return this._age - another._age;
    };
    Employee.prototype.toString = function () {
        return this._name + " " + this._age;
    };
    return Employee;
}());
var MyTree = /** @class */ (function () {
    function MyTree() {
        this.rootNode = null;
    }
    MyTree.prototype.add = function (key) {
        var newNode = new MyNode();
        newNode.key = key;
        if (this.rootNode === null) {
            this.rootNode = newNode;
        }
        else {
            var currentNode = this.rootNode;
            var parentNode = void 0;
            while (true) {
                parentNode = currentNode;
                if (key == currentNode.key) {
                    return;
                }
                else if (key.compareTo(currentNode.key) < 0) {
                    currentNode = currentNode.leftChild;
                    if (currentNode == null) {
                        parentNode.leftChild = newNode;
                        return;
                    }
                }
                else {
                    currentNode = currentNode.rightChild;
                    if (currentNode == null) {
                        parentNode.rightChild = newNode;
                        return;
                    }
                }
            }
        }
    };
    MyTree.prototype.get = function (key) {
        if (this.rootNode == null) {
            return null;
        }
        var currentNode = this.rootNode;
        while (!currentNode.key.equals(key)) {
            if (key.compareTo(currentNode.key) < 0) {
                currentNode = currentNode.leftChild;
            }
            else {
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null) {
                return null;
            }
        }
        return currentNode;
    };
    //support method that returns element with the smallest key of the bigger ones
    MyTree.prototype.receiveHeir = function (node) {
        var parentNode = node;
        var heirNode = node;
        var currentNode = node.rightChild;
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
    };
    MyTree.prototype.delete = function (key) {
        if (this.rootNode == null) {
            return false;
        }
        var currentNode = this.rootNode;
        var parentNode = this.rootNode;
        var isLeftChild = true;
        while (!currentNode.key.equals(key)) {
            parentNode = currentNode;
            if (key.compareTo(currentNode.key) < 0) {
                isLeftChild = true;
                currentNode = currentNode.leftChild;
            }
            else {
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
        }
        else if (currentNode.rightChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = currentNode.leftChild;
            else if (isLeftChild)
                parentNode.leftChild = currentNode.leftChild;
            else
                parentNode.rightChild = currentNode.leftChild;
        }
        else if (currentNode.leftChild == null) {
            if (currentNode == this.rootNode)
                this.rootNode = currentNode.rightChild;
            else if (isLeftChild)
                parentNode.leftChild = currentNode.rightChild;
            else
                parentNode.rightChild = currentNode.rightChild;
        }
        else {
            var heir = this.receiveHeir(currentNode);
            if (currentNode == this.rootNode)
                this.rootNode = heir;
            else if (isLeftChild)
                parentNode.leftChild = heir;
            else
                parentNode.rightChild = heir;
        }
        return true;
    };
    MyTree.prototype.printTree = function () {
        var globalStack = [];
        globalStack.push(this.rootNode);
        var gaps = 32;
        var isRowEmpty = false;
        var separator = "=============================================================";
        console.log(separator);
        while (isRowEmpty == false) {
            var localStack = [];
            isRowEmpty = true;
            for (var i = 0; i < gaps; i++)
                process.stdout.write(' ');
            while (Object.keys(globalStack).length > 0) {
                var temp = globalStack.pop();
                if (temp != undefined) {
                    process.stdout.write(temp.key.toString());
                    localStack.push(temp.leftChild);
                    localStack.push(temp.rightChild);
                    if (temp.leftChild != null || temp.rightChild != null)
                        isRowEmpty = false;
                }
                else {
                    process.stdout.write("_");
                    localStack.push(null);
                    localStack.push(null);
                }
                for (var i = 0; i < gaps * 2 - 2; i++)
                    process.stdout.write(' ');
            }
            console.log("");
            gaps /= 2;
            while (Object.keys(localStack).length > 0)
                globalStack.push(localStack.pop());
        }
        console.log(separator);
    };
    return MyTree;
}());
var MyNode = /** @class */ (function () {
    function MyNode() {
        this._key = null;
        this._leftChild = null;
        this._rightChild = null;
    }
    Object.defineProperty(MyNode.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyNode.prototype, "leftChild", {
        get: function () {
            return this._leftChild;
        },
        set: function (value) {
            this._leftChild = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyNode.prototype, "rightChild", {
        get: function () {
            return this._rightChild;
        },
        set: function (value) {
            this._rightChild = value;
        },
        enumerable: false,
        configurable: true
    });
    MyNode.prototype.toString = function () {
        return "\n" + "Key: " + this._key + "\n" +
            "Left child: " + this._leftChild + "\n" +
            "Right Child: " + this._rightChild;
    };
    return MyNode;
}());
var tree = new MyTree();
var commands;
(function (commands) {
    commands[commands["add"] = 0] = "add";
    commands[commands["get"] = 1] = "get";
    commands[commands["delete"] = 2] = "delete";
    commands[commands["show"] = 3] = "show";
    commands[commands["quit"] = 4] = "quit";
})(commands || (commands = {}));
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
        var age = readlineSync.question('Enter the age of an employee\n');
        while (isNaN(age)) {
            console.log(age + ' is not a number, please enetr correct data');
            age = readlineSync.question('Enter the age of an employee\n');
        }
        var currentEmployee = new Employee(age, name);
        tree.add(currentEmployee);
        console.log("Employee is successfully added");
    }
    else if (command == commands[1]) {
        var name = readlineSync.question('Enter the name of an employee\n');
        var age = readlineSync.question('Enter the age of an employee\n');
        var node = tree.get(new Employee(age, name));
        console.log("your employee is " + node);
    }
    else if (command == commands[2]) {
        var name = readlineSync.question('Enter the name of an employee\n');
        var age = readlineSync.question('Enter the age of an employee\n');
        var employee = new Employee(age, name);
        console.log("your employee is deleted " + tree.delete(employee) + '\n');
    }
    else if (command == commands[3]) {
        tree.printTree();
    }
    else {
        if (command != commands[4])
            console.log("there is no such a command\n");
    }
}
//# sourceMappingURL=Main.js.map