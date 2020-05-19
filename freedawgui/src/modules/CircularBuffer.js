// Circular buffer storage. Externally-apparent 'length' increases indefinitely
// while any items with indexes below length-n will be forgotten (undefined
// will be returned if you try to get them, trying to set is an exception).
// n represents the initial length of the array, not a maximum
class CircularBuffer {
    constructor(n){
        this._array= new Float32Array(n);
        this.length= 0;
        this.alloc = n;
    }
}
CircularBuffer.prototype.toString= function() {
    return '[object CircularBuffer('+this._array.length+') length '+this.length+']';
};
CircularBuffer.prototype.get= function(i) {
    if (i<0 || i<this.length-this._array.length)
        return undefined;
    else if(i>=this.length)
        throw new Error("Index Out of Bounds");
    return this._array[i%this._array.length];
};
CircularBuffer.prototype.set= function(i, v) {
    if (i<0 || i<this.length-this._array.length)
        throw new Error("Index Out of bounds");
    while (i>this.length) {
        this._array[this.length%this._array.length]= undefined;
        this.length++;
    }
    this._array[i%this._array.length]= v;
    if (i==this.length)
        this.length++;
};

CircularBuffer.prototype.push = function(v) { this._array[this.length%this._array.length] = v; this.length++; }
CircularBuffer.prototype.IndexError= {};

// module.exports = CircularBuffer;
export default CircularBuffer;