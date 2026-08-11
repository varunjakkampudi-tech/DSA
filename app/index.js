/*
    Problem -1: Design a function that can take any number of arguments and return their total. 
    The function should work for both fixed and variable number of arguments 
    using JavaScript features. Only numerical arguments will be provided.
*/

function Sum(...args) {
    this.args = args;
}

Sum.prototype.solution1 = function() {
    return this.args.reduce((acc, curr) => acc + curr, 0);
}

Sum.prototype.solution2 = function() {
    let totalSum = 0;
    for (let i = 0; i < this.args.length; i++) {
        totalSum += this.args[i];
    }

    return totalSum;
}

let sum = new Sum(2, 3, 4);
console.log(sum.solution1());
console.log(sum.solution2());






/*
    Problem 2: Given an alphanumeric string s, return the second largest numerical digit that appears in s, 
    or -1 if it does not exist.
    
    An alphanumeric string is a string consisting of lowercase English letters and digits.
*/

class SecondLargestDigit {
    constructor(str) {
        this.str = str;
        this.arr = [];
    }

    getNumberArray() {
        for (const char of this.str) {
            if (!isNaN(Number(char))) {
                this.arr.push(Number(char));
            }
        }

        return this.arr;
    }

    sortTheArray() {
        // numeric sort; we can write sort code at the sorting topic
        this.arr = [...new Set(this.arr)];
        return this.arr.sort((a, b) => a - b);
    }

    getSecondLargestDigit() {
        if (this.arr.length < 2) return -1;
        return this.arr[this.arr.length - 2];
    }

    solution2() {
        let largest = -1;
        let secondLargest = -1;
        for (let char of this.str) {
            if (!isNaN(Number(char))) {
                char = Number(char);
                if (largest < char && secondLargest < char) {
                    let temp = largest;
                    largest = char;
                    secondLargest = temp;
                }
                else {
                    if (largest > char && secondLargest < char) {
                        secondLargest = char;
                    }
                }
            }
        }

        if (largest === -1 && secondLargest === -1) return -1;
        return secondLargest;
    }
}

let secondLargestDigit = new SecondLargestDigit("98766789");
secondLargestDigit.getNumberArray();
secondLargestDigit.sortTheArray();
console.log(secondLargestDigit.getSecondLargestDigit());
console.log(secondLargestDigit.solution2());


/*
    Problem 3: Given an integer x, return true if x is a palindrome, and false otherwise.
*/

function Palindrome(value) {
    this.value = value;
}

Palindrome.prototype.isNumber = function() {
    if (!isNaN(Number(this.value))) {
        return true;
    }
    return false;
}

Palindrome.prototype.isPalindrome = function() {
    this.value = String(this.value);
    let n = this.value.length;

    if(this.isNumber()) {
        for (let i = 0; i < Math.floor(n / 2); i++) {
            if (this.value[i] !== this.value[n - 1 - i]) {
                return false;
            }
        }

        return true;
    }
    else {
        return false;
    }
}

let checkPalindrome = new Palindrome("1231");
console.log(checkPalindrome.isPalindrome());


/* 
    Problem 4: Given a signed 32-bit integer x, return x with its digits reversed. 
    If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], 
    then return 0.
*/

function ReverseInteger(value) {
    Palindrome.call(this, value);
}

ReverseInteger.prototype = Object.create(Palindrome.prototype);
ReverseInteger.prototype.constructor = ReverseInteger;

ReverseInteger.prototype.reverse = function () {
    if (!this.isNumber()) {
        return 0;
    }

    const sign = Number(this.value) < 0 ? -1 : 1;
    const digits = String(Math.abs(Number(this.value)));

    let result = "";
    for (let i = digits.length - 1; i >= 0; i--) {
        result += digits[i];
    }

    const reversed = sign * Number(result);

    // 32-bit signed range check: [-2^31, 2^31 - 1]
    if (reversed < -(2 ** 31) || reversed > 2 ** 31 - 1) {
        return 0;
    }

    return reversed;
}

let reverseInteger = new ReverseInteger("123");
console.log(reverseInteger.reverse());




/*
    Problem 5: Character Frequency
*/


function characterFrequency(value) {
    let result = {};
    for (let i of value) {
        if (!(i in result)) {
            result[i] = 1
        } else {
            result[i] += 1;
        }
    }

    return result;
}

console.log(characterFrequency("1122233"));



/*
    Problem 6: Search - Linear and Binary
*/



function Search(arr, value) {
    this.arr = arr;
    this.value = value;
}

Search.prototype.linearSearch = function() {
    for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i] == this.value) {
            return `Element is found at position ${i} `;
        }
    }

    return `${this.value} is not found in the given array`;
}

let search = new Search( [10, 20, 30, 40, 50], 30);
console.log(search.linearSearch());

Search.prototype.isSorted = function() {
    for (let i = 0; i < this.arr.length - 1; i++) {
        if (!(this.arr[i] < this.arr[i+1])) {
            return false;
        }
    }

    return true;
}

Search.prototype.recursiveBinarySearch = function(start = 0, end = this.arr.length - 1) {
    if (!this.isSorted()) {
        return `Please provide the valid sorted array`;
    }

    if (start > end) {
        return `${this.value} is not found in the given array`;
    }

    let mid = Math.floor((start + end) / 2);
    
    if (this.arr[mid] === this.value) {
        return `Element is found at position ${mid} `;
    }
    else if (this.arr[mid] > this.value) {
        return this.recursiveBinarySearch(start, mid - 1);
    }
    else {
        return this.recursiveBinarySearch(mid + 1, end);
    }
}

Search.prototype.iterativeBinarySearch = function() {
    if(!this.isSorted()) {
        return `Please provide the valid sorted array`;
    }
    
    let start = 0;
    let end = this.arr.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (this.arr[mid] === this.value) {
            return `Element is found at position ${mid} `;
        }
        else if (this.arr[mid] > this.value) {
            end = mid - 1;
        }
        else {
            start =  mid + 1;
        }
    }

    return `${this.value} is not found in the given array`;
}

console.log(search.recursiveBinarySearch());
console.log(search.iterativeBinarySearch());



/*
    Problem 7: Stack
*/


class Stack {
    constructor () {
        this.items = [];
        this.top = -1;
    }

    push(value) {
        this.top += 1;
        this.items[this.top] = value;
        return this.items;
    }

    pop() {
        if(this.isEmpty()) {
            return "Stack is Empty"
        }

        let removedElement = this.items[this.top];
        this.items.length = this.top;
        this.top -= 1;
        return removedElement;
    }

    peek() {
        if(this.isEmpty()) {
            return "Stack is Empty"
        }

        return this.items[this.top];
    }

    isEmpty() {
        if (this.top === -1 && this.items.length <= 0) {
            return true;
        }
        return false
    }

    getSize() {
        return this.top + 1;
    }

    print() {
        for (let i = this.top; i >= 0; i++) {
            console.log(this.items[i]);
        }
    }
}



/*
    Problem 8: Queue
*/


class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = -1;
    }

    enqueue(value) {
        this.rear += 1;
        this.items[this.rear] = value;
    }

    dequeue() {
        if(this.isEmpty()) {
            return "Queue is Empty"
        }

        let removedElement = this.items[this.front];
        this.front += 1;
        return removedElement;
    }

    getSize() {
        return this.rear - this.front + 1;
    }

    isEmpty() {
        if (this.front > this.rear) {
            return true;
        }

        return false;
    }

    print() {
        for (let i = this.front; i <= this.rear; i++) {
            console.log(this.items[i]);
        }
    }
}


/*
    First Non-Repeating item in an Array
*/

function findFirstNonRepeatingItemSolution1(items) {
    for (let i = 0; i< items.length; i++) {
        let isRepeating = false;
        for (let j = 0; j< items.length; j++) {
            if (i !=j && items[i] === items[j]) {
                isRepeating = true;
                break;
            }
        }

        if (!isRepeating) {
            return items[i];
        }
    }

    return -1;
}

function findFirstNonRepeatingItemSolution2(items) {
    let itemsFrequency = {};
    for (let i = 0; i < items.length; i++) {
        if (items[i] in itemsFrequency) {
            itemsFrequency[items[i]] = itemsFrequency[items[i]] + 1;
        }
        else {
            itemsFrequency[items[i]] = 1;
        }
    }

    for (let i = 0; i < items.length; i++) {
        if (itemsFrequency[items[i]] === 1) {
            return items[i];
        }
    }

    return -1;
}

console.log(findFirstNonRepeatingItemSolution1([-1, 2, -1, 3, 2]));
console.log(findFirstNonRepeatingItemSolution2([-1, 2, -1, 3, 2]));


/*
    Rotate an Array by d - Left / Right
*/

function rotateArray(arr, rotation, steps) {
    function rotateLeft () {
        for (let i = 0; i < n; i++) {
            if (i - steps >= 0) {
                rotatedArr[i - steps] = arr[i];
            }
            else {
                rotatedArr[i - steps + n] = arr[i];
            }
        }
    }

    function rotateRight () {
        for (let i = 0; i < n; i++) {
            if (i + steps < n) { 
                rotatedArr[i + steps] = arr[i];  
            }
            else {
                rotatedArr[i + steps - n] = arr[i];
            }
        }
    }

    let rotatedArr = [];
    let n = arr.length;
    rotation === "left" ? rotateLeft() : rotateRight(); 
    return rotatedArr;
}

console.log(rotateArray([1, 2, 3], "right", 2));
console.log(rotateArray([1, 2, 3], "left", 2));


/*
    Given an array of integers nums and an integer target, return the indices of the two numbers 
    such that they add up to target.
*/


const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        let temp = target - nums[i];
        let j = nums.indexOf(temp, i + 1);
        if (j !== -1) {
            return [i, j];
        }
    }

    return "no two numbers sum is equal to target"
}

console.log(twoSum([2, 7, 11, 15], 9));



/*
    Valid Parentheses

*/

const validParentheses = (s) => {
    let parenthesesPair = {
        "(": ")",
        "{": "}",
        "[": "]"
    };

    let result = [];
    for (let i of s) {
        if (i in parenthesesPair) {
            result.push(i);
        }
        else {
            let lastOpen = result.pop();
            if (parenthesesPair[lastOpen] !== i) {
                return "invalid";
            }
        }
    }

    if (result.length === 0) {
        return true
    }
    else {
        return "invalid";
    }
}

console.log(validParentheses("{[]}"));




/*
    Best Time to Buy and Sell Stock
*/

const maxProfit = (prices) => {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        let todaysProfit = prices[i] - minPrice;
        if (todaysProfit > maxProfit) {
            maxProfit = todaysProfit;
        }
        
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        }
    }

    return maxProfit;
}

let prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices));



/*
    Given an integer array nums, return true if any value appears at least twice, 
    and false if every element is distinct.
*/

const duplicates = (nums) => {
    let numsFrequency = {};
    for (let i of nums) {
        if (i in numsFrequency) {
            numsFrequency[i] += 1;
        }
        else {
            numsFrequency[i] = 1;
        }

        console.log(numsFrequency);

        if ((numsFrequency[i] >= 2)) {
            return true;
        }
    }

    return false;
}

console.log(duplicates([2, 7, 11, 15]));


/*
    Given an integer array nums, return true if any value appears at least twice, 
    and false if every element is distinct.
*/

const anagram = (s, t) => {
    let sFrequency = {};
    let tFrequency = {};
    
    if (s.length === t.length) {
        for (let i = 0; i < s.length; i++) {

            if (s[i] in sFrequency) {
                sFrequency[s[i]] += 1;
            }
            else {
                sFrequency[s[i]] = 1;
            }

            if (t[i] in tFrequency) {
                tFrequency[t[i]] += 1;
            }
            else {
                tFrequency[t[i]] = 1;
            }
        }

        for (let i in sFrequency) {
            if (sFrequency[i] !== tFrequency[i]) {
                return "Not an anagram";
            }
        }

        return "anagram";
    }
    else {
        return "Not an anagram";
    }
}

console.log(anagram("tea", "eee"));
