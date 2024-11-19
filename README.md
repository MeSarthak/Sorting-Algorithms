# Sorting Visualizer

## Description

This Sorting Visualizer is an interactive web application that allows users to visualize and compare different sorting algorithms in real-time. It provides a side-by-side comparison of two sorting algorithms, making it an excellent educational tool for understanding how various sorting methods work and their relative performance.

## Features

- Visualize six different sorting algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Quick Sort
  - Merge Sort
  - Heap Sort
- Compare two sorting algorithms simultaneously
- Generate random arrays or input custom data
- Real-time visualization of the sorting process
- Performance timing for each algorithm
- Responsive design for various screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Playfair Display and Roboto)

## How to Use

1. Open `index.html` in a web browser.
2. Use the "Generate New Array" button to create a random array of bars.
3. Alternatively, enter custom data in the input field and click "Use Custom Data".
4. Select two sorting algorithms from the dropdown menus.
5. Click "Start Sorting" to begin the visualization.
6. Observe the sorting process and compare the performance of the two selected algorithms.

## File Structure

- `index.html`: The main HTML file containing the structure of the web page.
- `styles.css`: CSS file for styling the application.
- `script.js`: JavaScript file containing the logic for the sorting algorithms and visualization.

## Sorting Algorithms

The application includes the following sorting algorithms:

1. **Bubble Sort**: A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

2. **Selection Sort**: Divides the input list into two parts: a sorted portion and an unsorted portion. It repeatedly selects the smallest element from the unsorted portion and adds it to the sorted portion.

3. **Insertion Sort**: Builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.

4. **Quick Sort**: An efficient, recursive divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays.

5. **Merge Sort**: An efficient, stable sorting algorithm that makes use of the divide and conquer strategy. It recursively divides the array into smaller subarrays, sorts them, and then merges them back together.

6. **Heap Sort**: A comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.

## Customization

You can easily customize the application by modifying the following:

- Change the number of bars in the visualization by adjusting the `arraySize` variable in `script.js`.
- Modify the sorting speed by changing the `sleep` duration in the sorting functions.
- Add new sorting algorithms by implementing them in `script.js` and updating the HTML select options.

## Performance Considerations

The visualization includes intentional delays to make the sorting process visible to the human eye. In real-world applications, these algorithms would run much faster without these artificial delays.

## Contributing

Contributions to improve the Sorting Visualizer are welcome. Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is open source and available under the [MIT License](LICENSE).
