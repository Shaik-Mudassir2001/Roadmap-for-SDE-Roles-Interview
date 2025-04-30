// --- Global Variables ---
const storageKey = 'roadmapProgress_v5'; // Keep same key unless structure changes drastically
let allProblemsData = {}; // To store fetched problems.json data
let allCheckboxes = []; // To store the list of all static checkboxes in sequence

// topicData holds explanations and resource links for modal popups
const topicData = {
    // Section 1
    "Basics": { explanation: "Core C++ syntax including variables, data types (int, float, char, bool), operators (arithmetic, relational, logical), and basic control flow (if/else, loops).", links: [ { title: "C++ Basic Exercises (GFG)", url: "https://www.geeksforgeeks.org/cpp-exercises/" }, { title: "Basic Data Types (HackerRank)", url: "https://www.hackerrank.com/challenges/c-tutorial-basic-data-types/problem" } ] },
    "Functions": { explanation: "Reusable blocks of code. Key concepts include function declaration, definition, parameters, return types, function overloading (multiple functions with the same name but different parameters), and default arguments.", links: [ { title: "C++ Functions (GFG)", url: "https://www.geeksforgeeks.org/functions-in-cpp/" }, { title: "Functions (HackerRank)", url: "https://www.hackerrank.com/challenges/c-tutorial-functions/problem" } ] },
    "Pointers & Refs": { explanation: "Pointers store memory addresses, allowing indirect access and manipulation of data. References provide an alias (another name) for an existing variable. Both are crucial for dynamic memory management and efficient function arguments.", links: [ { title: "Pointers & References Overview (GFG)", url: "https://www.geeksforgeeks.org/pointers-and-references-in-c/" }, { title: "Pointers Practice Problem (GFG)", url: "https://www.geeksforgeeks.org/problems/c-pointers-set-1introduction/0" }, { title: "Pointers Quiz (GFG)", url: "https://www.geeksforgeeks.org/quizzes/quiz-cpp-pointers/" }, { title: "Pointer (HackerRank)", url: "https://www.hackerrank.com/challenges/c-tutorial-pointer/problem" } ] },
    "Memory Mgmt": { explanation: "Understanding stack (automatic memory for local variables) vs. heap (dynamic memory allocated using `new` and deallocated using `delete`). Proper heap management prevents memory leaks.", links: [ { title: "Memory Management in C++ (GFG)", url: "https://www.geeksforgeeks.org/memory-management-in-cpp/" } ] },
    "Classes & Objects": { explanation: "Classes are blueprints for creating objects. Objects are instances of classes, encapsulating data (attributes) and behavior (methods).", links: [ { title: "Classes and Objects (HackerRank)", url: "https://www.hackerrank.com/challenges/c-tutorial-class/problem" }, { title: "Classes & Objects Practice (HackerRank)", url: "https://codersdaily.in/courses/hackerrank-cpp-solutions/classes-and-objects-in-cpp-solution" } ] },
    "Constructors/Destructors": { explanation: "Constructors are special methods called when an object is created, often used for initialization. Destructors are called when an object is destroyed, used for cleanup (like deallocating memory).", links: [ { title: "Constructors in C++ (GFG)", url: "https://www.geeksforgeeks.org/constructors-c/" } ] },
    "Inheritance": { explanation: "Allows a class (derived/child) to inherit properties and methods from another class (base/parent), promoting code reuse.", links: [ { title: "Inheritance (HackerRank)", url: "https://www.hackerrank.com/challenges/inheritance-introduction/problem" }, { title: "Inheritance in C++ (GFG)", url: "https://www.geeksforgeeks.org/inheritance-in-c/" } ] },
    "Polymorphism": { explanation: "Allows objects of different classes to respond to the same message (method call) in different ways. Achieved through function overloading (compile-time) and virtual functions (run-time).", links: [ { title: "Polymorphism in C++ (GFG)", url: "https://www.geeksforgeeks.org/polymorphism-in-cpp/" }, { title: "Virtual Functions (HackerRank)", url: "https://www.hackerrank.com/challenges/virtual-functions/problem" } ] },
    "Encapsulation/Abstraction": { explanation: "Encapsulation bundles data and methods within a class, hiding internal details (using access specifiers like private, protected, public). Abstraction exposes essential features while hiding complexity.", links: [ { title: "Encapsulation in C++ (GFG)", url: "https://www.geeksforgeeks.org/encapsulation-in-cpp/" } ] },
    // Section 2
    "Why use STL?": { explanation: "The Standard Template Library provides pre-built, highly optimized, and tested components (containers, algorithms, iterators) saving development time and improving performance." },
    "Components Overview": { explanation: "STL has three main parts: Containers (like vector, map, set) to store data, Algorithms (like sort, find, count) to operate on data, and Iterators to traverse containers." },
    "Containers": { explanation: "Generic data structures provided by STL for storing collections of objects (e.g., vector, list, map, set). They manage memory and provide member functions for operations.", links: [ { title: "Containers Overview (GFG)", url: "https://www.geeksforgeeks.org/containers-cpp-stl/" }, { title: "STL Practice Problems (GFG)", url: "https://www.geeksforgeeks.org/cpp-stl-practice-problems/" }, { title: "STL Domain (HackerRank)", url: "https://www.hackerrank.com/domains/cpp/stl" } ] },
    "Iterators": { explanation: "Objects (like pointers) used to point to and traverse elements within STL containers.", links: [ { title: "Iterators Tutorial (GFG)", url: "https://www.geeksforgeeks.org/iterators-c-stl/" }, { title: "Introduction to Iterators (GFG)", url: "https://www.geeksforgeeks.org/introduction-iterators-c/" } ] },
    "Algorithms": { explanation: "Functions provided by STL (in `<algorithm>` header) to perform common operations like sorting, searching, counting, and manipulating elements within containers.", links: [ { title: "STL Algorithms Practice (GFG)", url: "https://www.geeksforgeeks.org/cpp-stl-practice-problems/" }, { title: "C++ Algorithm Library (Work@Tech)", url: "https://workat.tech/problem-solving/tutorial/cpp-stl-algorithm-library-k47c3x7dw8hs" }, { title: "Sorting Practice (CodeChef)", url: "https://www.codechef.com/practice/sorting" } ] },
    "Sequence Containers": { explanation: "Ordered collections like `vector` (dynamic array), `list` (doubly-linked list), `deque` (double-ended queue).", links: [ { title: "Vector Guide (LeetCode Discuss)", url: "https://leetcode.com/discuss/study-guide/4039616/C%2B%2B-Vector" }, { title: "STL Practice Problems (GFG)", url: "https://www.geeksforgeeks.org/cpp-stl-practice-problems/" } ] },
    "Associative Containers": { explanation: "Sorted containers like `set` (unique elements), `map` (key-value pairs), `multiset`, `multimap` (allow duplicates). Typically implemented using balanced trees.", links: [ { title: "Map Practice Problem (GFG)", url: "https://www.geeksforgeeks.org/problems/c-stl-set-3-map/0" }, { title: "Map Tutorial (Programiz)", url: "https://www.programiz.com/cpp-programming/map" }, { title: "Set Practice Problem (HackerRank)", url: "https://www.hackerrank.com/challenges/cpp-sets/problem" } ] },
    "Unordered Containers": { explanation: "Unsorted associative containers based on hash tables for fast average-case access: `unordered_set`, `unordered_map`, `unordered_multiset`, `unordered_multimap`.", links: [ { title: "Unordered Set (GFG)", url: "https://www.geeksforgeeks.org/unordered_set-in-cpp-stl/" }, { title: "Unordered Map (Programiz)", url: "https://www.programiz.com/cpp-programming/unordered-map" }, { title: "Unordered Set Practice (CodeChef)", url: "https://www.codechef.com/learn/course/cpp-stl/CSTL05/problems/UNORDEREDSET"} ] },
    // --- Section 3: DSA Subtopic Data for Modals ---
    "Arrays & Strings": { explanation: "Arrays store elements of the same type in contiguous memory. Strings are typically sequences of characters. Key concepts include indexing, traversal, manipulation, searching, and sorting within these structures.", links: [ { title: "Array Data Structure (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-arrays-data-structure-and-algorithm-tutorials/" }, { title: "String Data Structure (GFG)", url: "https://www.geeksforgeeks.org/string-data-structure/" } ] },
    "Linked Lists": { explanation: "Linear data structure where elements (nodes) are not stored contiguously but are linked using pointers. Types include singly, doubly, and circular linked lists. Operations involve insertion, deletion, traversal, and searching.", links: [ { title: "Linked List Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-linked-list-data-structure/" } ] },
    "Stack": { explanation: "Linear data structure following Last-In, First-Out (LIFO) principle. Common operations are push (add to top), pop (remove from top), and peek/top (view top element). Used in expression evaluation, backtracking, etc.", links: [ { title: "Stack Data Structure (GFG)", url: "https://www.geeksforgeeks.org/stack-data-structure/" } ] },
    "Queue": { explanation: "Linear data structure following First-In, First-Out (FIFO) principle. Operations include enqueue (add to rear) and dequeue (remove from front). Used in BFS, scheduling, etc.", links: [ { title: "Queue Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-queue-data-structure-and-algorithm-tutorials/" } ] },
    "Deque": { explanation: "Double-Ended Queue, a versatile structure allowing insertion and deletion at both front and rear ends. Combines features of stacks and queues.", links: [ { title: "Deque Overview (GFG)", url: "https://www.geeksforgeeks.org/deque-meaning-in-dsa/" }, { title: "Deque Implementation (GFG)", url: "https://www.geeksforgeeks.org/implementation-deque-using-doubly-linked-list/" } ] },
    "Trees": { explanation: "Hierarchical data structure with a root node and child nodes. Includes Binary Trees, Binary Search Trees (BST), Heaps (Min/Max), Tries, etc. Important concepts: traversals (inorder, preorder, postorder, level order), height, depth, balancing.", links: [ { title: "Tree Data Structure (GFG)", url: "https://www.geeksforgeeks.org/tree-data-structure/" }, { title: "Binary Search Tree (GFG)", url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/" }, { title: "Heap Data Structure (GFG)", url: "https://www.geeksforgeeks.org/heap-data-structure/" }, { title: "Trie Data Structure (GFG)", url: "https://www.geeksforgeeks.org/trie-insert-and-search/" } ] },
    "Graphs": { explanation: "Non-linear data structure consisting of nodes (vertices) and edges connecting them. Can be directed/undirected, weighted/unweighted. Representations: Adjacency List, Adjacency Matrix. Key algorithms: Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's, topological sort.", links: [ { title: "Graph Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-graphs-data-structure-and-algorithm-tutorials/" }, { title: "Graph Algorithms & Problems (GFG)", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" } ] },
    "Sorting": { explanation: "Algorithms used to arrange elements in a specific order (e.g., ascending/descending). Common algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort. Understanding time and space complexity is crucial.", links: [ { title: "Sorting Algorithms Analysis (GFG)", url: "https://www.geeksforgeeks.org/analysis-of-different-sorting-techniques/" } ] },
    "Searching (Binary)": { explanation: "Algorithms used to find specific elements within a data structure. Linear Search checks elements sequentially. Binary Search efficiently finds elements in *sorted* arrays by repeatedly dividing the search interval in half.", links: [ { title: "Searching Algorithms Intro (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-searching-data-structure-and-algorithm-tutorial/" }, { title: "Binary Search (GFG)", url: "https://www.geeksforgeeks.org/binary-search/"} ] },
    "Recursion/Backtracking": { explanation: "Recursion is a technique where a function calls itself to solve smaller instances of the same problem. Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, removing solutions that fail ('backtracking'). Used in permutations, combinations, Sudoku, N-Queens.", links: [ { title: "Recursion Algorithms (GFG)", url: "https://www.geeksforgeeks.org/recursion-algorithms/" }, { title: "Introduction to Backtracking (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-backtracking-2/" } ] },
    "Dynamic Programming": { explanation: "Optimization technique for solving complex problems by breaking them down into simpler, overlapping subproblems and storing the results of subproblems (memoization or tabulation) to avoid redundant computations. Key patterns: Fibonacci, Knapsack, Longest Common Subsequence/Substring, Matrix Chain Multiplication.", links: [ { title: "Dynamic Programming Introduction (GFG)", url: "https://www.geeksforgeeks.org/dynamic-programming-meaning-in-dsa/" }, { title: "How DP Works (GFG)", url: "https://www.geeksforgeeks.org/how-does-dynamic-programming-work/" } ] },
    "Greedy Algorithms": { explanation: "Algorithmic paradigm that makes the locally optimal choice at each step with the hope of finding a global optimum. Doesn't always yield the optimal solution but is efficient for certain problems like activity selection, Huffman coding, Kruskal's/Prim's MST.", links: [ { title: "Greedy Algorithms Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-greedy-algorithm-data-structures-and-algorithm-tutorials/" } ] },
    "Sliding Window": { explanation: "Technique used for problems involving arrays or strings where you need to operate on a contiguous sub-section (window) of a fixed or variable size as it slides through the data. Efficient for finding max/min subarrays, longest substrings with certain properties, etc.", links: [ { title: "Sliding Window Technique (GFG)", url: "https://www.geeksforgeeks.org/window-sliding-technique/" } ] },
    "Two Pointers": { explanation: "Technique often used on sorted arrays or linked lists where two pointers traverse the data structure (often from opposite ends or one fast/one slow) to find pairs, triplets, or specific conditions efficiently.", links: [ { title: "Two Pointers Technique (GFG)", url: "https://www.geeksforgeeks.org/two-pointers-technique/" }, {title: "DSA Tutorial (includes Two Pointers) (GFG)", url:"https://www.geeksforgeeks.org/dsa-tutorial-learn-data-structures-and-algorithms/"} ] },
    // Section 4
    "C++ Practice": { explanation: "General C++ practice involves solving a variety of problems to solidify understanding of syntax, logic, and common patterns.", links: [ { title: "C++ Exercises (GFG)", url: "https://www.geeksforgeeks.org/cpp-exercises/" }, { title: "C++ Coding Interview Questions (GFG)", url: "https://www.geeksforgeeks.org/cpp-coding-interview-questions-and-answers/" }, { title: "C++ Practice Portal (GFG)", url: "https://www.geeksforgeeks.org/explore?category=CPP" } ] },
    "STL Mastery": { explanation: "Gaining proficiency in using the Standard Template Library effectively, understanding different containers, algorithms, and iterators, and when to use them.", links: [ { title: "C++ STL Practice Problems (GFG)", url: "https://www.geeksforgeeks.org/cpp-stl-practice-problems/" }, { title: "C++ Standard Template Library Overview (GFG)", url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/" } ] },
    "DSA Sheet (Striver)": { explanation: "A popular curated list of Data Structures and Algorithms problems designed to prepare for technical interviews, created by Raj 'Striver' Vikramaditya.", links: [ { title: "Striver's SDE Sheet (takeUforward)", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" }, { title: "GFG SDE Sheet (Similar)", url: "https://www.geeksforgeeks.org/sde-sheet-a-complete-guide-for-sde-preparation/" } ] },
    "LeetCode / Contests": { explanation: "Platforms like LeetCode offer a vast collection of coding problems and host regular competitive programming contests to hone problem-solving skills under timed conditions.", links: [ { title: "LeetCode Contests Experience (GFG Article)", url: "https://www.geeksforgeeks.org/leetcode-contests-experience/" }, { title: "LeetCode Contests", url: "https://leetcode.com/contest/" } ] },
    // Section 5 OS
    "Process vs Thread": { explanation: "A process is an independent program execution with its own memory space. A thread is a lightweight component within a process, sharing memory space.", links: [ { title: "Process vs Thread (GFG)", url: "https://www.geeksforgeeks.org/difference-between-process-and-thread/" } ] },
    "Concurrency": { explanation: "Managing simultaneous execution of multiple tasks (processes or threads) to maximize resource utilization.", links: [ { title: "Process Synchronization (GFG)", url: "https://www.geeksforgeeks.org/introduction-of-process-synchronization/" } ] },
    "Synchronization": { explanation: "Mechanisms (like Mutexes, Semaphores) to coordinate access to shared resources among concurrent processes/threads, preventing race conditions.", links: [ { title: "Process Synchronization (GFG)", url: "https://www.geeksforgeeks.org/introduction-of-process-synchronization/" } ] },
    "Deadlock": { explanation: "A situation where two or more processes are blocked indefinitely, each waiting for a resource held by another.", links: [ { title: "Deadlock Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/" } ] },
    "Context Switching": { explanation: "The process of saving the state of one process/thread and loading the state of another for execution by the CPU.", links: [ { title: "Context Switching (GFG)", url: "https://www.geeksforgeeks.org/context-switching-in-operating-system/" } ] },
    "Scheduling Algorithms": { explanation: "Algorithms used by the OS to determine which process/thread gets CPU time (e.g., FCFS, SJF, Round Robin, Priority).", links: [ { title: "CPU Scheduling (GFG)", url: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/" } ] },
    "Memory Management": { explanation: "OS techniques for managing the computer's main memory (RAM), allocating it to processes and managing free space.", links: [ { title: "Memory Management Introduction (GFG)", url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/"} ] },
    "Virtual Memory": { explanation: "A technique allowing execution of processes larger than physical memory by using disk space as an extension of RAM (involves Paging/Segmentation).", links: [ { title: "Virtual Memory (GFG)", url: "https://www.geeksforgeeks.org/virtual-memory-in-operating-system/" } ] },
    "File Systems": { explanation: "The method an OS uses to store, organize, and manage files and directories on storage devices.", links: [ { title: "File Systems (GFG)", url: "https://www.geeksforgeeks.org/file-systems-in-operating-system/" } ] },
    "IPC": { explanation: "Inter-Process Communication: Mechanisms allowing different processes to communicate and share data (e.g., pipes, shared memory, sockets).", links: [ { title: "Interprocess Communication (IPC) (GFG)", url: "https://www.geeksforgeeks.org/inter-process-communication-ipc/" } ] },
    "System Calls": { explanation: "Interface through which user programs request services from the operating system kernel.", links: [ { title: "System Call (GFG)", url: "https://www.geeksforgeeks.org/system-call-in-os/" } ] },
    "Kernel vs User Space": { explanation: "Kernel space is where the OS core runs with full privileges; User space is where user applications run with restricted privileges.", links: [ { title: "User Mode vs Kernel Mode (GFG)", url: "https://www.geeksforgeeks.org/user-mode-and-kernel-mode-switching/" } ] },
     // Section 6 DBMS
    "DBMS vs RDBMS": { explanation: "DBMS is general software for managing databases. RDBMS is a specific type of DBMS based on the relational model (tables).", links: [ { title: "DBMS vs RDBMS (GFG)", url: "https://www.geeksforgeeks.org/difference-between-dbms-and-rdbms/" } ] },
    "Data Models": { explanation: "Conceptual structure defining logical relationships and constraints (e.g., Entity-Relationship Model).", links: [ { title: "DBMS ER Model (GFG)", url: "https://www.geeksforgeeks.org/entity-relationship-er-model/" } ] },
    "Schema": { explanation: "The logical structure or blueprint of a database (e.g., table definitions, relationships). Includes levels like physical, logical, view.", links: [ { title: "Three Schema Architecture (GFG)", url: "https://www.geeksforgeeks.org/three-schema-architecture/" } ] },
    "SQL": { explanation: "Structured Query Language: Standard language for interacting with relational databases (DDL, DML, DCL).", links: [ { title: "SQL Tutorial (GFG)", url: "https://www.geeksforgeeks.org/sql-tutorial/" } ] },
    "Joins": { explanation: "SQL operation to combine rows from two or more tables based on a related column.", links: [ { title: "SQL Joins (GFG)", url: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/" } ] },
    "Views": { explanation: "A virtual table based on the result-set of an SQL statement.", links: [ { title: "SQL Views (GFG)", url: "https://www.geeksforgeeks.org/sql-views/" } ] },
    "Indexes": { explanation: "Data structure improving data retrieval speed on database tables at the cost of slower writes and more storage.", links: [ { title: "Indexing in Databases (GFG)", url: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/" } ] },
    "Keys": { explanation: "Attributes used to uniquely identify records (Primary Key) or establish links between tables (Foreign Key). Includes Super, Candidate keys.", links: [ { title: "Keys in DBMS (GFG)", url: "https://www.geeksforgeeks.org/keys-in-dbms/" } ] },
    "Normalization": { explanation: "Process of organizing data in a database to reduce redundancy and improve data integrity (1NF, 2NF, 3NF, BCNF).", links: [ { title: "Normalization in DBMS (GFG)", url: "https://www.geeksforgeeks.org/normalization-in-dbms/" } ] },
    "Denormalization": { explanation: "Intentionally introducing redundancy to improve read performance.", links: [ { title: "Denormalization (GFG)", url: "https://www.geeksforgeeks.org/denormalization-in-dbms/" } ] },
    "ACID Properties": { explanation: "Properties (Atomicity, Consistency, Isolation, Durability) ensuring reliable database transactions.", links: [ { title: "ACID Properties (GFG)", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/" } ] },
    "Transactions": { explanation: "A sequence of database operations performed as a single logical unit of work.", links: [ { title: "Transaction Management (GFG)", url: "https://www.geeksforgeeks.org/transaction-management-in-dbms/" } ] },
    "Concurrency Control": { explanation: "Managing simultaneous operations by multiple users/transactions without interfering with each other.", links: [ { title: "Concurrency Control (GFG)", url: "https://www.geeksforgeeks.org/concurrency-control-in-dbms/" } ] },
    "Query Optimization": { explanation: "Process by which the DBMS finds the most efficient way to execute a given SQL query.", links: [ { title: "Query Optimization (GFG)", url: "https://www.geeksforgeeks.org/query-optimization-in-dbms/" } ] },
    // Section 7 Networks
    "OSI & TCP/IP Models": { explanation: "Layered frameworks defining how network communication protocols interact. OSI has 7 layers, TCP/IP has 4/5.", links: [ { title: "Network Models (GFG)", url: "https://www.geeksforgeeks.org/computer-network-models/" } ] },
    "Network Types": { explanation: "Classifications based on geographical scope (LAN, WAN, MAN, PAN).", links: [ { title: "Types of Computer Network (GFG)", url: "https://www.geeksforgeeks.org/types-of-computer-network/" } ] },
    "Topologies": { explanation: "The physical or logical arrangement of nodes and connections in a network (Bus, Star, Ring, Mesh).", links: [ { title: "Network Topology (GFG)", url: "https://www.geeksforgeeks.org/types-of-network-topology/" } ] },
    "IP Addressing": { explanation: "Unique numerical labels assigned to devices on a network (IPv4, IPv6).", links: [ { title: "IP Addressing Introduction (GFG)", url: "https://www.geeksforgeeks.org/ip-addressing-introduction/" } ] },
    "Subnetting": { explanation: "Dividing a large network into smaller sub-networks.", links: [ { title: "Subnetting Introduction (GFG)", url: "https://www.geeksforgeeks.org/subnetting-in-computer-network/" } ] },
    "DNS": { explanation: "Domain Name System: Translates human-readable domain names into machine-readable IP addresses.", links: [ { title: "Domain Name System (DNS) (GFG)", url: "https://www.geeksforgeeks.org/domain-name-system-dns-in-application-layer/" } ] },
    "TCP vs UDP": { explanation: "Core transport layer protocols. TCP is connection-oriented and reliable; UDP is connectionless and faster but less reliable.", links: [ { title: "TCP vs UDP (GFG)", url: "https://www.geeksforgeeks.org/tcp-udp-ip/" } ] },
    "HTTP vs HTTPS": { explanation: "Protocols for web communication. HTTPS adds a layer of security (SSL/TLS encryption) over HTTP.", links: [ { title: "HTTP vs HTTPS (GFG)", url: "https://www.geeksforgeeks.org/difference-between-http-and-https/" } ] },
    "Common Protocols": { explanation: "Standard sets of rules governing data exchange (e.g., DHCP for IP assignment, ARP for MAC resolution).", links: [ { title: "Network Protocols (GFG)", url: "https://www.geeksforgeeks.org/computer-network-protocols/" } ] },
    "Routers & Switches": { explanation: "Network devices. Switches connect devices within a LAN; Routers connect different networks.", links: [ { title: "Network Devices (GFG)", url: "https://www.geeksforgeeks.org/computer-network-network-devices/" } ] },
    "MAC Address": { explanation: "Media Access Control address: Unique hardware identifier assigned to network interfaces.", links: [ { title: "MAC Address (GFG)", url: "https://www.geeksforgeeks.org/introduction-of-mac-address-in-computer-network/" } ] },
    "Firewalls & VPNs": { explanation: "Security tools. Firewalls filter network traffic; VPNs create secure, encrypted connections over public networks.", links: [ { title: "Firewall Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-of-firewall-in-computer-network/" }, { title: "VPN Introduction (GFG)", url: "https://www.geeksforgeeks.org/virtual-private-network-vpn/" } ] },
    // Section 8 System Design
    "Scalability": { explanation: "Ability of a system to handle increasing load by adding resources (Vertical: more power to existing machines; Horizontal: more machines).", links: [ { title: "Scalability in System Design (GFG)", url: "https://www.geeksforgeeks.org/system-design-scalability/" } ] },
    "Load Balancing": { explanation: "Distributing incoming network traffic across multiple servers to ensure no single server is overwhelmed.", links: [ { title: "Load Balancing (GFG)", url: "https://www.geeksforgeeks.org/load-balancing-in-system-design/" } ] },
    "Caching": { explanation: "Storing copies of frequently accessed data in a temporary storage location (cache) for faster retrieval. Includes CDN, Cache Eviction/Expiration.", links: [ { title: "Caching System Design Concept (GFG)", url: "https://www.geeksforgeeks.org/caching-system-design-concept/" }, { title: "Cache Eviction vs Expiration (GFG)", url: "https://www.geeksforgeeks.org/cache-eviction-vs-expiration-in-system-design/"} ] },
    "Databases (System Design)": { explanation: "Choosing and using databases (SQL vs NoSQL) effectively in large systems, considering replication, consistency, etc.", links: [ { title: "SQL vs NoSQL (GFG)", url: "https://www.geeksforgeeks.org/difference-between-sql-and-nosql/" } ] },
    "Sharding": { explanation: "Database partitioning technique that breaks large databases into smaller, faster, more manageable parts (shards).", links: [ { title: "Sharding Introduction (GFG)", url: "https://www.geeksforgeeks.org/database-sharding-system-design-basics/" } ] },
    "CAP Theorem": { explanation: "Theorem stating a distributed system can only simultaneously guarantee two of three properties: Consistency, Availability, Partition Tolerance.", links: [ { title: "CAP Theorem (GFG)", url: "https://www.geeksforgeeks.org/cap-theorem-in-system-design/" } ] },
    "Consistency Models": { explanation: "Rules defining how and when updates to data become visible to users/processes in a distributed system (e.g., Strong, Eventual Consistency).", links: [ { title: "Consistency Models (GFG)", url: "https://www.geeksforgeeks.org/consistency-models-in-distributed-system/" } ] },
    "Availability & Reliability": { explanation: "Availability: System uptime/accessibility. Reliability: System performing correctly without failure.", links: [ { title: "System Design Tutorial (GFG)", url: "https://www.geeksforgeeks.org/system-design-tutorial/" } ] },
    "Latency & Throughput": { explanation: "Latency: Delay in data transfer. Throughput: Rate of data transfer.", links: [ { title: "System Design Tutorial (GFG)", url: "https://www.geeksforgeeks.org/system-design-tutorial/" } ] },
    "API Gateway": { explanation: "Server managing API requests, acting as a single entry point for client interactions with backend services.", links: [ { title: "API Gateway (GFG)", url: "https://www.geeksforgeeks.org/what-is-api-gateway-system-design/" } ] },
    "Rate Limiter": { explanation: "Mechanism controlling the rate of requests sent or received by a network interface.", links: [ { title: "Rate Limiting (GFG)", url: "https://www.geeksforgeeks.org/rate-limiting-system-design/" } ] },
    "Pub/Sub Systems": { explanation: "Messaging pattern where publishers send messages without knowing specific subscribers, using topics.", links: [ { title: "Publish-Subscribe Model (GFG)", url: "https://www.geeksforgeeks.org/publish-subscribe-model/" } ] },
    "Leader Election": { explanation: "Process in distributed computing for designating a single process as the organizer/coordinator.", links: [ { title: "Leader Election (GFG)", url: "https://www.geeksforgeeks.org/leader-election-in-distributed-system/" } ] },
    "Microservices": { explanation: "Architectural style structuring an application as a collection of small, independent services.", links: [ { title: "Microservices Introduction (GFG)", url: "https://www.geeksforgeeks.org/introduction-to-microservices-architecture/" } ] },
    "Common Problems": { explanation: "Designing solutions for standard problems like URL shorteners, social media feeds, ride-sharing apps, etc.", links: [ { title: "System Design Examples (GFG)", url: "https://www.geeksforgeeks.org/system-design-examples/" } ] }
};

// --- DOM Element Selections (Initial & Dynamic) ---
let progressBar, progressBarText, progressLabelText, topicModalElement, topicModal, modalTitleElement, modalExplanationElement, modalLinksContainerElement, modalLinksListElement, downloadNotesContainer, modalProblemTableContainer;

// Function to select DOM elements after the DOM is ready
function selectDOMElements() {
    progressBar = document.getElementById('roadmap-progress-bar');
    progressBarText = document.getElementById('progress-bar-text');
    progressLabelText = document.getElementById('progress-label-text');
    topicModalElement = document.getElementById('topicModal');
    modalTitleElement = document.getElementById('topicModalLabel');
    modalExplanationElement = document.getElementById('topicExplanation');
    modalLinksContainerElement = document.getElementById('topicLinksContainer');
    modalLinksListElement = document.getElementById('topicLinksList');
    downloadNotesContainer = document.getElementById('downloadNotesContainer');
    modalProblemTableContainer = document.getElementById('modalProblemTableContainer'); // Container for table inside modal

    // Initialize Bootstrap modal instance
    if (topicModalElement) {
        topicModal = new bootstrap.Modal(topicModalElement);
    } else {
        console.warn("Topic modal element not found.");
    }
}


// --- Helper Functions ---

/**
 * Creates an HTML string for a single problem row (3 columns).
 * @param {object} problem - The problem object from JSON {id, title, url}.
 * @returns {string} HTML string for the table row.
 */
function createProblemRowHTML(problem) {
    const problemTitleText = problem.title.replace(/^\d+\.\s*/, ''); // Remove leading number
    // Use a unique ID for modal checkboxes to prevent conflicts if problems were listed elsewhere
    const checkboxId = `modal-${problem.id}`;
    return `
        <tr class="problem-row">
            <td><input type="checkbox" class="problem-checkbox" id="${checkboxId}"></td>
            <td>${problemTitleText}</td>
            <td><a href="${problem.url}" target="_blank" class="problem-link">Solve</a></td>
        </tr>
    `;
}

/**
 * Creates the HTML string for the problems table (3 columns) to be inserted into the modal.
 */
function createModalProblemTableHTML(problems) {
    if (!problems || problems.length === 0) {
        return ''; // Return empty string if no problems
    }
    const tableRowsHTML = problems.map(problem => createProblemRowHTML(problem)).join('');
    // Generate the 3-column header
    return `
        <hr>
        <h6><i class="bi bi-list-task"></i> Practice Problems:</h6>
        <div class="table-responsive"> <table class="table table-dark table-hover problem-table modal-problem-table mb-0">
                <thead>
                    <tr>
                        <th><i class="bi bi-check-square" title="Status"></i></th>
                        <th>Problem</th>
                        <th>Solve</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRowsHTML}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Finds the correct list of problems from the fetched JSON data based on the topic key.
 */
function findProblemsForTopic(topicKey) {
    if (!allProblemsData || !topicKey) return [];
    for (const majorCategory in allProblemsData) {
        if (allProblemsData[majorCategory][topicKey]) {
            return allProblemsData[majorCategory][topicKey];
        }
        // Also check sub-categories directly (if JSON structure is flatter)
        for (const subCategory in allProblemsData[majorCategory]) {
             if (subCategory === topicKey && Array.isArray(allProblemsData[majorCategory][subCategory])) {
                 return allProblemsData[majorCategory][subCategory];
             }
        }
    }
    return []; // Return empty array if not found
}


// --- Core Logic Functions ---

/**
 * Updates the progress bar based on the current state of checkboxes.
 */
function updateProgressBar() {
    if (!progressBar || !progressBarText || !progressLabelText) return;
    // Only count static checkboxes for progress bar now
    const currentStaticCheckboxes = document.querySelectorAll('.topic-checkbox');
    const completedStaticCheckboxes = document.querySelectorAll('.topic-checkbox:checked');
    const completedCount = completedStaticCheckboxes.length;
    const currentTotalItems = currentStaticCheckboxes.length; // Total is only static items
    const percentage = currentTotalItems > 0 ? Math.round((completedCount / currentTotalItems) * 100) : 0;

    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBarText.textContent = percentage + '%';
    progressLabelText.textContent = `Progress: ${completedCount} / ${currentTotalItems}`;
}

/**
 * Loads progress from localStorage and updates checkbox states and styles.
 * Handles both static checkboxes and checkboxes inside the currently open modal.
 */
function loadProgress() {
    const savedProgress = localStorage.getItem(storageKey);
    const completedItems = savedProgress ? JSON.parse(savedProgress) : {};

    // Update static checkboxes on the main page
    document.querySelectorAll('.topic-checkbox').forEach(checkbox => {
        if (!checkbox.id) return;
        checkbox.checked = completedItems[checkbox.id] || false;
        updateElementStyle(checkbox);
    });

    // Update dynamic checkboxes *if* the modal is currently open and populated
    // We need to check saved state for modal checkboxes as well
    if (topicModalElement && topicModalElement.classList.contains('show')) {
        modalProblemTableContainer.querySelectorAll('.problem-checkbox').forEach(checkbox => {
             if (!checkbox.id) return;
             checkbox.checked = completedItems[checkbox.id] || false; // Use ID like 'modal-prob-two-sum'
             updateElementStyle(checkbox);
        });
    }

    // Re-apply sequencing based on loaded states of *static* checkboxes
    applySequencing();
    updateProgressBar(); // Update bar after loading states
}

/**
 * Saves the current state of ALL checked checkboxes (static + modal if open) to localStorage.
 */
function saveProgress() {
    const completedItems = {};
    // Query all checkboxes currently in the DOM (static + modal)
    document.querySelectorAll('.topic-checkbox, .problem-checkbox').forEach(checkbox => {
        if (checkbox.id && checkbox.checked) {
            completedItems[checkbox.id] = true;
        }
    });
    localStorage.setItem(storageKey, JSON.stringify(completedItems));
}

/**
 * Helper function to update the visual style of a checkbox/label/row based on checked state.
 */
function updateElementStyle(checkbox) {
    if (!checkbox) return;
    if (checkbox.classList.contains('topic-checkbox')) {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) label.classList.toggle('completed', checkbox.checked);
    } else if (checkbox.classList.contains('problem-checkbox')) {
        const row = checkbox.closest('.problem-row');
        if (row) row.classList.toggle('completed', checkbox.checked);
    }
}

/**
 * Applies the enabled/disabled state to STATIC checkboxes based on sequence.
 */
function applySequencing() {
    let lastCheckedIndex = -1;
    // Find the index of the last checked *static* checkbox
    allCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            lastCheckedIndex = index;
        }
    });

    // Disable all *static* checkboxes after the last checked one + 1
    allCheckboxes.forEach((checkbox, index) => {
        checkbox.disabled = index > lastCheckedIndex + 1;
        // Visually grey out the label and item if disabled
         const label = document.querySelector(`label[for="${checkbox.id}"]`);
         const item = checkbox.closest('.topic-item');
         const opacity = checkbox.disabled ? 0.6 : 1;
         const cursor = checkbox.disabled ? 'default' : 'pointer';
         if (label) {
             label.style.opacity = opacity;
             label.style.cursor = cursor;
         }
         if(item) {
             item.style.opacity = opacity;
         }
    });
}


/**
 * Attaches necessary event listeners to checkboxes and labels.
 */
function initializeEventListeners() {
    // Store all static checkboxes in sequence ONCE after initial DOM load
    allCheckboxes = Array.from(document.querySelectorAll('.topic-checkbox'));

    // --- Event Listeners for ALL Checkboxes (static + dynamic via delegation) ---
    document.addEventListener('change', function(event) {
        if (event.target.matches('.topic-checkbox, .problem-checkbox')) {
            handleCheckboxChange(event);
        }
    });


    // --- Event Listeners for Topic Labels (Modal Trigger) ---
    const topicLabels = document.querySelectorAll('.topic-badge');
    topicLabels.forEach(label => {
        const topicKey = label.getAttribute('data-topic');
        const checkboxId = label.getAttribute('for'); // Get the associated checkbox ID

        label.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const checkbox = document.getElementById(checkboxId); // Find the checkbox

            if (checkbox && checkbox.disabled && !checkbox.checked) {
                // Find the previous checkbox in the static sequence
                const currentIndex = allCheckboxes.findIndex(cb => cb.id === checkbox.id);
                let prevTopicName = 'the previous topic';
                if (currentIndex > 0) {
                    const prevCheckbox = allCheckboxes[currentIndex - 1];
                    const prevLabel = document.querySelector(`label[for="${prevCheckbox.id}"]`);
                    prevTopicName = prevLabel ? (prevLabel.getAttribute('data-topic') || prevLabel.textContent.trim()) : prevTopicName;
                }
                showWarningModal(`Please complete '${prevTopicName}' first.`);
            } else if (topicKey) {
                showTopicModal(topicKey); // Show modal if not disabled or already checked
            }
        });
    });

     // --- Event Listeners for Checkbox Click (Warning for Disabled) ---
     // Use delegation again for efficiency and to handle dynamic checkboxes
     document.addEventListener('click', function(event) {
         if (event.target.matches('.topic-checkbox, .problem-checkbox')) {
             const checkbox = event.target;
             if (checkbox.disabled) {
                 event.preventDefault(); // Prevent checking/unchecking
                 event.stopPropagation(); // Stop further processing

                 // Find previous topic name for warning message (only applies to static list)
                 const currentIndex = allCheckboxes.findIndex(cb => cb.id === checkbox.id);
                 let prevTopicName = 'the previous topic';
                 if (currentIndex !== -1 && currentIndex > 0) { // Check if it's in the static list
                     const prevCheckbox = allCheckboxes[currentIndex - 1];
                     const prevLabel = document.querySelector(`label[for="${prevCheckbox.id}"]`);
                     prevTopicName = prevLabel ? (prevLabel.getAttribute('data-topic') || prevLabel.textContent.trim()) : prevTopicName;
                 }
                 // Show warning (applies mostly to static checkboxes)
                 showWarningModal(`Please complete '${prevTopicName}' first.`);
             }
         }
     }, true); // Use capture phase


}

/**
 * Handles the change event for any checkbox.
 */
function handleCheckboxChange(event) {
    const checkbox = event.target;
    updateElementStyle(checkbox); // Update style first

    // Only re-apply sequencing if a static checkbox was changed
    if (checkbox.classList.contains('topic-checkbox')) {
        applySequencing();
    }

    saveProgress(); // Save state of all checkboxes (static + modal)
    updateProgressBar(); // Update progress based on static checkboxes only
}


/**
 * Fetches problem data ONCE.
 */
async function fetchProblemData() {
    if (Object.keys(allProblemsData).length > 0) return; // Already fetched

    try {
        const response = await fetch('problems.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProblemsData = await response.json();
    } catch (error) {
        console.error('Error fetching problems.json:', error);
    }
}

// --- Modal Functions ---
 function showWarningModal(message) {
     if (!topicModal) return;
     if (modalTitleElement) modalTitleElement.textContent = "Action Required";
     if (modalExplanationElement) modalExplanationElement.textContent = message;
     if (modalLinksContainerElement) modalLinksContainerElement.style.display = 'none';
     if (modalProblemTableContainer) modalProblemTableContainer.innerHTML = '';
     if (downloadNotesContainer) downloadNotesContainer.style.display = 'none';
     topicModal.show();
}

function showTopicModal(topicKey) {
     if (!topicModal || !topicKey) return;

     const data = topicData[topicKey]; // Get explanation/links

     if (modalTitleElement) modalTitleElement.textContent = topicKey;
     if (modalExplanationElement) modalExplanationElement.textContent = (data?.explanation) || "No explanation available for this topic.";
     if (modalLinksListElement) modalLinksListElement.innerHTML = '';
     if (modalProblemTableContainer) modalProblemTableContainer.innerHTML = ''; // Clear previous table

     // Show/Hide and populate resource links
     if (data?.links && data.links.length > 0 && modalLinksContainerElement && modalLinksListElement) {
         modalLinksContainerElement.style.display = 'block';
         data.links.forEach(link => {
             const li = document.createElement('li');
             const a = document.createElement('a');
             a.href = link.url;
             a.textContent = link.title;
             a.target = "_blank";
             a.rel = "noopener noreferrer";
             li.appendChild(a);
             modalLinksListElement.appendChild(li);
         });
     } else if (modalLinksContainerElement) {
         modalLinksContainerElement.style.display = 'none';
     }

     // Find and generate problem table for this topic
     const problems = findProblemsForTopic(topicKey);
     if (problems.length > 0 && modalProblemTableContainer) {
         modalProblemTableContainer.innerHTML = createModalProblemTableHTML(problems);
         // Apply saved progress to newly added modal checkboxes
         const savedProgress = localStorage.getItem(storageKey);
         const completedItems = savedProgress ? JSON.parse(savedProgress) : {};
         modalProblemTableContainer.querySelectorAll('.problem-checkbox').forEach(checkbox => {
             if (!checkbox.id) return;
             checkbox.checked = completedItems[checkbox.id] || false;
             updateElementStyle(checkbox);
             // No need to add listener here due to delegation
         });
     } else if (modalProblemTableContainer) {
         modalProblemTableContainer.innerHTML = ''; // Ensure it's empty if no problems
     }

     // Ensure download button container is visible
     if(downloadNotesContainer) downloadNotesContainer.style.display = 'block';

     topicModal.show();
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    selectDOMElements(); // Select static elements
    await fetchProblemData(); // Fetch problems data first
    initializeEventListeners(); // Setup listeners for static elements
    loadProgress(); // Load initial progress and apply sequencing
});
