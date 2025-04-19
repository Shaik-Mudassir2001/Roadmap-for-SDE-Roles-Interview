# Interactive SDE Interview Roadmap

## Description

An interactive HTML roadmap designed to help aspiring Software Development Engineers (SDEs) track their preparation for technical interviews at top product-based companies. This single-page application provides a structured learning path covering essential topics from C++ and STL to core Computer Science subjects and System Design.


## Features

* **Comprehensive Topics:** Covers C++ Fundamentals, Standard Template Library (STL), Data Structures & Algorithms (DSA), Operating Systems, DBMS, Computer Networks, and System Design.
* **Interactive Popups:** Click on most topic badges to view a brief explanation and find links to relevant learning resources (primarily from GeeksforGeeks).
* **Sequential Progress Tracking:** Checkboxes allow you to mark topics as completed. Progress is enforced linearly – the next topic is unlocked only after the current one is checked. Unchecking a topic resets the progress for subsequent topics.
* **Dynamic Progress Bar:** A sticky progress bar at the top visually tracks your overall completion percentage (X / Y topics completed).
* **Persistence:** Your checkbox progress is saved locally in your browser using `localStorage`, so you can pick up where you left off.
* **Dark Mode UI:** Uses Bootstrap 5 dark theme for a clean and modern look.
* **Download Notes Placeholder:** Each popup includes a placeholder button for future integration of downloadable notes.

## Technologies Used

* HTML5
* CSS3 (with Bootstrap 5.3)
* Vanilla Javascript (ES6+)

## Setup & Usage

1.  **Download Files:** Download `index.html`, `styles.css`, and `script.js`.
2.  **Place in Folder:** Make sure all three files are located in the same folder on your local machine.
3.  **Open HTML:** Open the `index.html` file in your preferred web browser (Chrome, Firefox, Edge, Safari recommended).

That's it! You can start tracking your progress. Your checked items will be saved in the browser's local storage.


## Future Enhancements (Ideas)

* Implement the "Download Notes" functionality.
* Add more granular resource links for specific sub-topics.
* Integrate a backend (like Firebase) for user accounts and cloud-based progress saving (requires significant development).
* Add more visual customization options.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
