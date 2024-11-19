const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const generateArrayBtn = document.getElementById('generateArray');
const startSortBtn = document.getElementById('startSort');
const algorithmSelect1 = document.getElementById('algorithm1');
const algorithmSelect2 = document.getElementById('algorithm2');
const algorithmInfo = document.getElementById('algorithmInfo');
const customDataInput = document.getElementById('customDataInput');
const useCustomDataBtn = document.getElementById('useCustomData');
const performance1 = document.getElementById('performance1');
const performance2 = document.getElementById('performance2');

let array1 = [];
let array2 = [];
const arraySize = 25;
let sorting = false;

const algorithmDescriptions = {
    bubble: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    selection: "Selection Sort divides the input list into two parts: a sorted portion and an unsorted portion. It repeatedly selects the smallest element from the unsorted portion and adds it to the sorted portion.",
    insertion: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    quick: "Quick Sort is an efficient, recursive divide-and-conquer approach to sorting an array. It works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays.",
    merge: "Merge Sort is an efficient, stable sorting algorithm that makes use of the divide and conquer strategy. It works by dividing the unsorted list into n sublists, then repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining.",
    heap: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region."
};

function generateArray() {
    array1 = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100) + 1);
    array2 = [...array1];
    displayArray(container1, array1);
    displayArray(container2, array2);
    updateAlgorithmInfo();
}

function displayArray(container, array) {
    container.innerHTML = '';
    const maxValue = Math.max(...array);
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${(value / maxValue) * 100}%`;
        bar.classList.add('bar');
        container.appendChild(bar);
    });
}

function updateAlgorithmInfo() {
    const selectedAlgorithm1 = algorithmSelect1.value;
    const selectedAlgorithm2 = algorithmSelect2.value;
    algorithmInfo.textContent = `${algorithmDescriptions[selectedAlgorithm1]} | ${algorithmDescriptions[selectedAlgorithm2]}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array, container) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1, container);
            }
        }
        markSorted(container, n - i - 1);
    }
}

async function selectionSort(array, container) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            highlightBars(container, minIdx, j);
            await sleep(50);
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            await swap(array, i, minIdx, container);
        }
        markSorted(container, i);
    }
}

async function insertionSort(array, container) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            highlightBars(container, j, j + 1);
            await sleep(50);
            array[j + 1] = array[j];
            updateBar(container, j + 1, array[j + 1]);
            j = j - 1;
        }
        array[j + 1] = key;
        updateBar(container, j + 1, key);
        markSorted(container, i);
    }
}

async function quickSort(array, container, low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = await partition(array, container, low, high);
        await quickSort(array, container, low, pi - 1);
        await quickSort(array, container, pi + 1, high);
    }
    if (low === 0 && high === array.length - 1) {
        markAllSorted(container);
    }
}

async function partition(array, container, low, high) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        highlightBars(container, j, high);
        await sleep(50);
        if (array[j] < pivot) {
            i++;
            await swap(array, i, j, container);
        }
    }
    await swap(array, i + 1, high, container);
    return i + 1;
}

async function mergeSort(array, container, left = 0, right = array.length - 1) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(array, container, left, mid);
        await mergeSort(array, container, mid + 1, right);
        await merge(array, container, left, mid, right);
    }
    if (left === 0 && right === array.length - 1) {
        markAllSorted(container);
    }
}

async function merge(array, container, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        highlightBars(container, left + i, mid + 1 + j);
        await sleep(50);
        if (L[i] <= R[j]) {
            array[k] = L[i];
            updateBar(container, k, L[i]);
            i++;
        } else {
            array[k] = R[j];
            updateBar(container, k, R[j]);
            j++;
        }
        k++;
    }

    while (i < n1) {
        array[k] = L[i];
        updateBar(container, k, L[i]);
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = R[j];
        updateBar(container, k, R[j]);
        j++;
        k++;
    }
}

async function heapSort(array, container) {
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, container, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        await swap(array, 0, i, container);
        markSorted(container, i);
        await heapify(array, container, i, 0);
    }
    markSorted(container, 0);
}

async function heapify(array, container, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await swap(array, i, largest, container);
        await heapify(array, container, n, largest);
    }
}

async function swap(array, i, j, container) {
    highlightBars(container, i, j);
    await sleep(50);
    [array[i], array[j]] = [array[j], array[i]];
    updateBar(container, i, array[i]);
    updateBar(container, j, array[j]);
}

function highlightBars(container, i, j) {
    const bars = container.querySelectorAll('.bar');
    bars[i].classList.add('comparing');
    bars[j].classList.add('comparing');
    setTimeout(() => {
        bars[i].classList.remove('comparing');
        bars[j].classList.remove('comparing');
    }, 50);
}

function updateBar(container, index, value) {
    const bars = container.querySelectorAll('.bar');
    const maxValue = Math.max(...array1, ...array2);
    bars[index].style.height = `${(value / maxValue) * 100}%`;
}

function markSorted(container, index) {
    const bars = container.querySelectorAll('.bar');
    bars[index].classList.add('sorted');
}

function markAllSorted(container) {
    const bars = container.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.add('sorted'));
}

async function startSorting() {
    if (sorting) return;
    sorting = true;
    startSortBtn.disabled = true;
    generateArrayBtn.disabled = true;
    algorithmSelect1.disabled = true;
    algorithmSelect2.disabled = true;

    const selectedAlgorithm1 = algorithmSelect1.value;
    const selectedAlgorithm2 = algorithmSelect2.value;

    const startTime1 = performance.now();
    await sortArray(array1, container1, selectedAlgorithm1);
    const endTime1 = performance.now();

    const startTime2 = performance.now();
    await sortArray(array2, container2, selectedAlgorithm2);
    const endTime2 = performance.now();

    performance1.textContent = `Time: ${(endTime1 - startTime1).toFixed(2)} ms`;
    performance2.textContent = `Time: ${(endTime2 - startTime2).toFixed(2)} ms`;

    sorting = false;
    startSortBtn.disabled = false;
    generateArrayBtn.disabled = false;
    algorithmSelect1.disabled = false;
    algorithmSelect2.disabled = false;
}

async function sortArray(array, container, algorithm) {
    switch (algorithm) {
        case 'bubble':
            await bubbleSort(array, container);
            break;
        case 'selection':
            await selectionSort(array, container);
            break;
        case 'insertion':
            await insertionSort(array, container);
            break;
        case 'quick':
            await quickSort(array, container);
            break;
        case 'merge':
            await mergeSort(array, container);
            break;
        case 'heap':
            await heapSort(array, container);
            break;
    }
}

function useCustomData() {
    const input = customDataInput.value;
    const customArray = input.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    if (customArray.length > 0) {
        array1 = customArray;
        array2 = [...array1];
        displayArray(container1, array1);
        displayArray(container2, array2);
        updateAlgorithmInfo();
    } else {
        alert('Please enter valid comma-separated numbers.');
    }
}

generateArrayBtn.addEventListener('click', generateArray);
startSortBtn.addEventListener('click', startSorting);
algorithmSelect1.addEventListener('change', updateAlgorithmInfo);
algorithmSelect2.addEventListener('change', updateAlgorithmInfo);
useCustomDataBtn.addEventListener('click', useCustomData);

// Initialize
generateArray();