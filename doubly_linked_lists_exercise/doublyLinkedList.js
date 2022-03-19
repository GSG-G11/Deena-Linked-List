function Node(val){
    this.val = val;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList(array = []){
    this.head = null;
    this.tail = null;
    this.length = 0;

    if(Array.isArray(array)){
        array.forEach(el => {
            this.push(el);
        });
    }
}

DoublyLinkedList.prototype.push = function(val){
    let newNode = new Node(val);
    if(this.head === null) {
        this.head = newNode;
        this.tail= newNode;
    }else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    this.length++;
    return this;
}

DoublyLinkedList.prototype.unshift = function(val){
    let newNode = new Node(val);
    if(this.head === null) {
        this.head = newNode;
        this.tail = newNode
    }else {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;  
    }
    this.length++;
    return this;
}

DoublyLinkedList.prototype.insert = function(index, val){
    if (index < 0 || index >= this.length){
        return undefined;
    }
    let newNode = new Node(val);
    let previousNode = this.getNode(index - 1);
    newNode.next = previousNode.next;
    newNode.prev = previousNode;
    previousNode.next = newNode;
    this.length++;
    return this.length ;       
}

DoublyLinkedList.prototype.getNode = function(index){
    if (index < 0 || index >= this.length){
        return undefined;
    }    
    let currentNode = this.head;
    let counter = 0;
    while (currentNode) {
      if (counter === index) {
        break;
      }
      counter++;
      currentNode = currentNode.next;
    }
  
    return currentNode;
}

DoublyLinkedList.prototype.get = function(index){
    let node = this.getNode(index);

    return node ? node.val : null;
}

DoublyLinkedList.prototype.set = function(index, val){
    let node = this.getNode(index);
    if (node) {
        node.val = val;
        return true;
      }

      return false;
}

DoublyLinkedList.prototype.pop = function(){
    if (!this.tail) {
        return undefined;
    } else {
        const nodeToRemove = this.tail;
        if(this.length === 1 ) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            nodeToRemove.prev = null;
        }
        this.length--;
        return nodeToRemove.val;
    }
}

DoublyLinkedList.prototype.shift = function(){
    if (!this.head) return undefined;

    const nodeToRemove = this.head;
    if(this.length === 1) {
        this.head = null;
        this.tail = null;
    } else {
      this.head = nodeToRemove.next;
      this.head.prev = null
      nodeToRemove.next = null;
    }
      this.length--;    
      return nodeToRemove.val;
}

DoublyLinkedList.prototype.remove = function(index){
    let nodeToRemove = this.getNode(index);
    let prevNode = nodeToRemove.prev;
    let nextNode = nodeToRemove.next;
    nodeToRemove.next = null;
    nodeToRemove.prev = null;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  
    this.length--;
    return nodeToRemove;
}

DoublyLinkedList.prototype.reverse = function(){
    let current = this.head;
    this.head = this.tail;
    this.tail = current;
    for (let i = 0; i< this.length; i++) {
        const { prev, next } = current;
        current.prev = next;
        current.next = prev;
        current = next;
    }

}
