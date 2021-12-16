var MyNode = /** @class */ (function () {
    function MyNode(key, leftChild, rightChild) {
        this._key = key;
        this._leftChild = leftChild;
        this._rightChild = rightChild;
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
    return MyNode;
}());
//# sourceMappingURL=Node.js.map