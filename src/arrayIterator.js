/** Class representing an object that can iterate over objects that are not neccessarily arrays, as if they were arrays. i.e. strings, lists */
class ArrayIterator {
  /**
   * Create a new ArrayIterator.
   * @param{list, string, array} arr - the item you wish to iterate over.
   */
  constructor(arr) {
    this.arr_ = arr;
    this.index_ = 0;
  }
  /**
   * Stores current index, determines whether the array is at the end. Returns a JSON object of the value at the current index and whether or not the array is at its end.
   */
  next() {
    let ind = this.index_++;
    let done = (ind === this.arr_.length)
    let value = (done) ? undefined : this.arr_[ind];
    return {value: value, done: done};
  }
  /**
   * Mimics the forEach method of Array.prototype.
   */
  forEach(f) {
    this.arr_.forEach(x => f(x));
  }
}
