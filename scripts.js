// --- Global Variables ---
let allProblemsData = {}; // To store fetched problems.json data
let allCheckboxes = []; // To store the list of all static checkboxes in sequence (populated on login)
let currentUser = null; // To store the logged-in user object (Firebase Auth User)
let currentProgress = {}; // Store the loaded progress for the current user (from Firestore)

// topicData holds explanations and resource links (Ensure your actual data is complete here)
const topicData = {
    // Section 1
    "Basics": { explanation: "Core C++ syntax...", links: [ { title: "C++ Basic Exercises (GFG)", url: "..." } ] },
    "Functions": { explanation: "Reusable blocks of code...", links: [ { title: "C++ Functions (GFG)", url: "..." } ] },
    "Pointers & Refs": { explanation: "Pointers store memory addresses...", links: [ { title: "Pointers & References Overview (GFG)", url: "..." } ] },
    "Memory Mgmt": { explanation: "Understanding stack vs. heap...", links: [ { title: "Memory Management in C++ (GFG)", url: "..." } ] },
    "Classes & Objects": { explanation: "Classes are blueprints...", links: [ { title: "Classes and Objects (HackerRank)", url: "..." } ] },
    "Constructors/Destructors": { explanation: "Constructors are special methods...", links: [ { title: "Constructors in C++ (GFG)", url: "..." } ] },
    "Inheritance": { explanation: "Allows a class to inherit...", links: [ { title: "Inheritance (HackerRank)", url: "..." } ] },
    "Polymorphism": { explanation: "Allows objects of different classes...", links: [ { title: "Polymorphism in C++ (GFG)", url: "..." } ] },
    "Encapsulation/Abstraction": { explanation: "Encapsulation bundles data...", links: [ { title: "Encapsulation in C++ (GFG)", url: "..." } ] },
    // Section 2
    "Why use STL?": { explanation: "The Standard Template Library provides..." },
    "Components Overview": { explanation: "STL has three main parts..." },
    "Containers": { explanation: "Generic data structures...", links: [ { title: "Containers Overview (GFG)", url: "..." } ] },
    "Iterators": { explanation: "Objects (like pointers) used to point...", links: [ { title: "Iterators Tutorial (GFG)", url: "..." } ] },
    "Algorithms": { explanation: "Functions provided by STL...", links: [ { title: "STL Algorithms Practice (GFG)", url: "..." } ] },
    "Sequence Containers": { explanation: "Ordered collections like `vector`...", links: [ { title: "Vector Guide (LeetCode Discuss)", url: "..." } ] },
    "Associative Containers": { explanation: "Sorted containers like `set`...", links: [ { title: "Map Practice Problem (GFG)", url: "..." } ] },
    "Unordered Containers": { explanation: "Unsorted associative containers based on hash tables...", links: [ { title: "Unordered Set (GFG)", url: "..." } ] },
    // Section 3: DSA
    "Arrays & Strings": { explanation: "Arrays store elements...", links: [ { title: "Array Data Structure (GFG)", url: "..." } ] },
    "Linked Lists": { explanation: "Linear data structure where elements...", links: [ { title: "Linked List Introduction (GFG)", url: "..." } ] },
    "Stack": { explanation: "Linear data structure following LIFO...", links: [ { title: "Stack Data Structure (GFG)", url: "..." } ] },
    "Queue": { explanation: "Linear data structure following FIFO...", links: [ { title: "Queue Introduction (GFG)", url: "..." } ] },
    "Deque": { explanation: "Double-Ended Queue, a versatile structure...", links: [ { title: "Deque Overview (GFG)", url: "..." } ] },
    "Trees": { explanation: "Hierarchical data structure...", links: [ { title: "Tree Data Structure (GFG)", url: "..." } ] },
    "Graphs": { explanation: "Non-linear data structure...", links: [ { title: "Graph Introduction (GFG)", url: "..." } ] },
    "Sorting": { explanation: "Algorithms used to arrange elements...", links: [ { title: "Sorting Algorithms Analysis (GFG)", url: "..." } ] },
    "Searching (Binary)": { explanation: "Algorithms used to find specific elements...", links: [ { title: "Searching Algorithms Intro (GFG)", url: "..." } ] },
    "Recursion/Backtracking": { explanation: "Recursion is a technique...", links: [ { title: "Recursion Algorithms (GFG)", url: "..." } ] },
    "Dynamic Programming": { explanation: "Optimization technique...", links: [ { title: "Dynamic Programming Introduction (GFG)", url: "..." } ] },
    "Greedy Algorithms": { explanation: "Algorithmic paradigm that makes...", links: [ { title: "Greedy Algorithms Introduction (GFG)", url: "..." } ] },
    "Sliding Window": { explanation: "Technique used for problems involving arrays...", links: [ { title: "Sliding Window Technique (GFG)", url: "..." } ] },
    "Two Pointers": { explanation: "Technique often used on sorted arrays...", links: [ { title: "Two Pointers Technique (GFG)", url: "..." } ] },
    // Section 4
    "C++ Practice": { explanation: "General C++ practice involves...", links: [ { title: "C++ Exercises (GFG)", url: "..." } ] },
    "STL Mastery": { explanation: "Gaining proficiency in using the STL...", links: [ { title: "C++ STL Practice Problems (GFG)", url: "..." } ] },
    "DSA Sheet (Striver)": { explanation: "A popular curated list of DSA problems...", links: [ { title: "Striver's SDE Sheet (takeUforward)", url: "..." } ] },
    "LeetCode / Contests": { explanation: "Platforms like LeetCode offer...", links: [ { title: "LeetCode Contests", url: "..." } ] },
    // Section 5 OS
    "Process vs Thread": { explanation: "A process is an independent program...", links: [ { title: "Process vs Thread (GFG)", url: "..." } ] },
    "Concurrency": { explanation: "Managing simultaneous execution...", links: [ { title: "Process Synchronization (GFG)", url: "..." } ] },
    "Synchronization": { explanation: "Mechanisms (like Mutexes, Semaphores)...", links: [ { title: "Process Synchronization (GFG)", url: "..." } ] },
    "Deadlock": { explanation: "A situation where two or more processes...", links: [ { title: "Deadlock Introduction (GFG)", url: "..." } ] },
    "Context Switching": { explanation: "The process of saving the state...", links: [ { title: "Context Switching (GFG)", url: "..." } ] },
    "Scheduling Algorithms": { explanation: "Algorithms used by the OS...", links: [ { title: "CPU Scheduling (GFG)", url: "..." } ] },
    "Memory Management": { explanation: "OS techniques for managing RAM...", links: [ { title: "Memory Management Introduction (GFG)", url: "..."} ] },
    "Virtual Memory": { explanation: "A technique allowing execution...", links: [ { title: "Virtual Memory (GFG)", url: "..." } ] },
    "File Systems": { explanation: "The method an OS uses to store...", links: [ { title: "File Systems (GFG)", url: "..." } ] },
    "IPC": { explanation: "Inter-Process Communication...", links: [ { title: "Interprocess Communication (IPC) (GFG)", url: "..." } ] },
    "System Calls": { explanation: "Interface through which user programs...", links: [ { title: "System Call (GFG)", url: "..." } ] },
    "Kernel vs User Space": { explanation: "Kernel space is where the OS core runs...", links: [ { title: "User Mode vs Kernel Mode (GFG)", url: "..." } ] },
     // Section 6 DBMS
    "DBMS vs RDBMS": { explanation: "DBMS is general software...", links: [ { title: "DBMS vs RDBMS (GFG)", url: "..." } ] },
    "Data Models": { explanation: "Conceptual structure defining...", links: [ { title: "DBMS ER Model (GFG)", url: "..." } ] },
    "Schema": { explanation: "The logical structure or blueprint...", links: [ { title: "Three Schema Architecture (GFG)", url: "..." } ] },
    "SQL": { explanation: "Structured Query Language...", links: [ { title: "SQL Tutorial (GFG)", url: "..." } ] },
    "Joins": { explanation: "SQL operation to combine rows...", links: [ { title: "SQL Joins (GFG)", url: "..." } ] },
    "Views": { explanation: "A virtual table based on...", links: [ { title: "SQL Views (GFG)", url: "..." } ] },
    "Indexes": { explanation: "Data structure improving data retrieval...", links: [ { title: "Indexing in Databases (GFG)", url: "..." } ] },
    "Keys": { explanation: "Attributes used to uniquely identify...", links: [ { title: "Keys in DBMS (GFG)", url: "..." } ] },
    "Normalization": { explanation: "Process of organizing data...", links: [ { title: "Normalization in DBMS (GFG)", url: "..." } ] },
    "Denormalization": { explanation: "Intentionally introducing redundancy...", links: [ { title: "Denormalization (GFG)", url: "..." } ] },
    "ACID Properties": { explanation: "Properties (Atomicity, Consistency...)", links: [ { title: "ACID Properties (GFG)", url: "..." } ] },
    "Transactions": { explanation: "A sequence of database operations...", links: [ { title: "Transaction Management (GFG)", url: "..." } ] },
    "Concurrency Control": { explanation: "Managing simultaneous operations...", links: [ { title: "Concurrency Control (GFG)", url: "..." } ] },
    "Query Optimization": { explanation: "Process by which the DBMS finds...", links: [ { title: "Query Optimization (GFG)", url: "..." } ] },
    // Section 7 Networks
    "OSI & TCP/IP Models": { explanation: "Layered frameworks defining...", links: [ { title: "Network Models (GFG)", url: "..." } ] },
    "Network Types": { explanation: "Classifications based on geographical scope...", links: [ { title: "Types of Computer Network (GFG)", url: "..." } ] },
    "Topologies": { explanation: "The physical or logical arrangement...", links: [ { title: "Network Topology (GFG)", url: "..." } ] },
    "IP Addressing": { explanation: "Unique numerical labels assigned...", links: [ { title: "IP Addressing Introduction (GFG)", url: "..." } ] },
    "Subnetting": { explanation: "Dividing a large network...", links: [ { title: "Subnetting Introduction (GFG)", url: "..." } ] },
    "DNS": { explanation: "Domain Name System...", links: [ { title: "Domain Name System (DNS) (GFG)", url: "..." } ] },
    "TCP vs UDP": { explanation: "Core transport layer protocols...", links: [ { title: "TCP vs UDP (GFG)", url: "..." } ] },
    "HTTP vs HTTPS": { explanation: "Protocols for web communication...", links: [ { title: "HTTP vs HTTPS (GFG)", url: "..." } ] },
    "Common Protocols": { explanation: "Standard sets of rules governing...", links: [ { title: "Network Protocols (GFG)", url: "..." } ] },
    "Routers & Switches": { explanation: "Network devices. Switches connect...", links: [ { title: "Network Devices (GFG)", url: "..." } ] },
    "MAC Address": { explanation: "Media Access Control address...", links: [ { title: "MAC Address (GFG)", url: "..." } ] },
    "Firewalls & VPNs": { explanation: "Security tools. Firewalls filter...", links: [ { title: "Firewall Introduction (GFG)", url: "..." }, { title: "VPN Introduction (GFG)", url: "..." } ] },
    // Section 8 System Design
    "Scalability": { explanation: "Ability of a system to handle...", links: [ { title: "Scalability in System Design (GFG)", url: "..." } ] },
    "Load Balancing": { explanation: "Distributing incoming network traffic...", links: [ { title: "Load Balancing (GFG)", url: "..." } ] },
    "Caching": { explanation: "Storing copies of frequently accessed data...", links: [ { title: "Caching System Design Concept (GFG)", url: "..." } ] },
    "Databases (System Design)": { explanation: "Choosing and using databases...", links: [ { title: "SQL vs NoSQL (GFG)", url: "..." } ] },
    "Sharding": { explanation: "Database partitioning technique...", links: [ { title: "Sharding Introduction (GFG)", url: "..." } ] },
    "CAP Theorem": { explanation: "Theorem stating a distributed system...", links: [ { title: "CAP Theorem (GFG)", url: "..." } ] },
    "Consistency Models": { explanation: "Rules defining how and when updates...", links: [ { title: "Consistency Models (GFG)", url: "..." } ] },
    "Availability & Reliability": { explanation: "Availability: System uptime...", links: [ { title: "System Design Tutorial (GFG)", url: "..." } ] },
    "Latency & Throughput": { explanation: "Latency: Delay in data transfer...", links: [ { title: "System Design Tutorial (GFG)", url: "..." } ] },
    "API Gateway": { explanation: "Server managing API requests...", links: [ { title: "API Gateway (GFG)", url: "..." } ] },
    "Rate Limiter": { explanation: "Mechanism controlling the rate...", links: [ { title: "Rate Limiting (GFG)", url: "..." } ] },
    "Pub/Sub Systems": { explanation: "Messaging pattern where publishers...", links: [ { title: "Publish-Subscribe Model (GFG)", url: "..." } ] },
    "Leader Election": { explanation: "Process in distributed computing...", links: [ { title: "Leader Election (GFG)", url: "..." } ] },
    "Microservices": { explanation: "Architectural style structuring...", links: [ { title: "Microservices Introduction (GFG)", url: "..." } ] },
    "Common Problems": { explanation: "Designing solutions for standard problems...", links: [ { title: "System Design Examples (GFG)", url: "..." } ] }
};

// --- DOM Element Selection Variables ---
let authContainer, appContainer, userStatusElement, userEmailElement, logoutBtn;
let loginForm, signupForm, loginEmailInput, loginPasswordInput, signupEmailInput, signupPasswordInput, signupPasswordConfirmInput;
let showLoginBtn, showSignupBtn, googleSigninBtn;
let loginErrorP, signupErrorP, googleErrorP, loginSuccessDiv, signupSuccessDiv, googleSuccessDiv; // Added success divs
let progressBar, progressBarText, progressLabelText, topicModalElement, topicModal, modalTitleElement, modalExplanationElement, modalLinksContainerElement, modalLinksListElement, downloadNotesContainer, modalProblemTableContainer;

// --- Function to Select DOM Elements ---
function selectDOMElements() {
    // Auth Elements
    authContainer = document.getElementById('auth-container');
    appContainer = document.getElementById('app-container');
    userStatusElement = document.getElementById('user-status');
    userEmailElement = document.getElementById('user-email');
    logoutBtn = document.getElementById('logout-btn');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');
    loginEmailInput = document.getElementById('login-email');
    loginPasswordInput = document.getElementById('login-password');
    signupEmailInput = document.getElementById('signup-email');
    signupPasswordInput = document.getElementById('signup-password');
    signupPasswordConfirmInput = document.getElementById('signup-password-confirm');
    showLoginBtn = document.getElementById('show-login-btn');
    showSignupBtn = document.getElementById('show-signup-btn');
    googleSigninBtn = document.getElementById('google-signin-btn');
    loginErrorP = document.getElementById('login-error');
    signupErrorP = document.getElementById('signup-error');
    googleErrorP = document.getElementById('google-error');
    loginSuccessDiv = document.getElementById('login-success'); // Select success divs
    signupSuccessDiv = document.getElementById('signup-success');
    googleSuccessDiv = document.getElementById('google-success');

    // App (Roadmap) Elements
    progressBar = document.getElementById('roadmap-progress-bar');
    progressBarText = document.getElementById('progress-bar-text');
    progressLabelText = document.getElementById('progress-label-text');
    topicModalElement = document.getElementById('topicModal');
    modalTitleElement = document.getElementById('topicModalLabel');
    modalExplanationElement = document.getElementById('topicExplanation');
    modalLinksContainerElement = document.getElementById('topicLinksContainer');
    modalLinksListElement = document.getElementById('topicLinksList');
    downloadNotesContainer = document.getElementById('downloadNotesContainer');
    modalProblemTableContainer = document.getElementById('modalProblemTableContainer');

    // Initialize Bootstrap modal instance
    if (topicModalElement) {
        try {
            topicModal = new bootstrap.Modal(topicModalElement);
        } catch (e) {
            console.error("Error initializing Bootstrap modal:", e);
            topicModal = null; // Ensure modal isn't used if init fails
        }
    } else {
        console.warn("Topic modal element not found.");
    }

    // --- Debugging Logs (Uncomment if buttons don't work) ---
    // console.log("--- Checking Element Selection ---");
    // console.log("Auth Container:", !!authContainer); // Use !! to check if element exists
    // console.log("App Container:", !!appContainer);
    // console.log("Login Form:", !!loginForm);
    // console.log("Signup Form:", !!signupForm);
    // console.log("Google Button:", !!googleSigninBtn);
    // console.log("Show Login Button:", !!showLoginBtn);
    // console.log("Show Signup Button:", !!showSignupBtn);
    // console.log("Logout Button:", !!logoutBtn);
    // console.log("--- End Element Selection Check ---");
}

// --- Helper Functions ---

// Shows animated success/error feedback message
function showAuthFeedback(type, message) {
    let messageElement;
    let formElement; // Optional: element to apply shake animation

    clearAuthErrors(); // Clear previous messages first

    if (type === 'login-error') {
        messageElement = loginErrorP;
        formElement = loginForm;
    } else if (type === 'login-success') {
        messageElement = loginSuccessDiv;
    } else if (type === 'signup-error') {
        messageElement = signupErrorP;
        formElement = signupForm;
    } else if (type === 'signup-success') {
        messageElement = signupSuccessDiv;
    } else if (type === 'google-error') {
        messageElement = googleErrorP;
        formElement = googleSigninBtn; // Shake the button on error
    } else if (type === 'google-success') {
        messageElement = googleSuccessDiv;
    } else {
        console.warn("Unknown feedback type:", type);
        return;
    }

    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.display = 'block'; // Make it visible before adding class
        // Use setTimeout to ensure display:block is applied before transition starts
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10); // Small delay

        // If it's an error, add shake animation
        if (type.includes('error') && formElement) {
            formElement.classList.add('shake-error');
        }

        // Hide the message and remove shake after a delay
        setTimeout(() => {
            messageElement.classList.remove('show');
            if (formElement) {
                formElement.classList.remove('shake-error');
            }
            // Optionally hide completely after animation
             setTimeout(() => { if(!messageElement.classList.contains('show')) messageElement.style.display = 'none'; }, 350); // Wait for transition
        }, 4000); // Hide after 4 seconds
    } else {
        console.warn(`Feedback element for type "${type}" not found.`);
    }
}

// Clears all auth feedback messages and animations
function clearAuthErrors() {
    const messages = document.querySelectorAll('.auth-message');
    messages.forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
        msg.style.display = 'none'; // Hide immediately
    });
    // Remove shake from forms/buttons if present
    loginForm?.classList.remove('shake-error');
    signupForm?.classList.remove('shake-error');
    googleSigninBtn?.classList.remove('shake-error');
}

// Toggles visibility between Login and Signup forms
function showAuthForm(formToShow) {
    clearAuthErrors(); // Clear errors when switching
    if (formToShow === 'login') {
        if (loginForm) loginForm.classList.add('active');
        if (signupForm) signupForm.classList.remove('active');
        if (showLoginBtn) showLoginBtn.classList.add('active'); // Highlight active button
        if (showSignupBtn) showSignupBtn.classList.remove('active');
    } else if (formToShow === 'signup') {
        if (loginForm) loginForm.classList.remove('active');
        if (signupForm) signupForm.classList.add('active');
         if (showLoginBtn) showLoginBtn.classList.remove('active');
        if (showSignupBtn) showSignupBtn.classList.add('active');
    }
}

// --- Authentication Functions ---

async function handleSignUp(event) {
    event.preventDefault();
    clearAuthErrors();
    const email = signupEmailInput?.value;
    const password = signupPasswordInput?.value;
    const confirmPassword = signupPasswordConfirmInput?.value;

    // Basic validation
    if (!email || !password || !confirmPassword) {
       showAuthFeedback('signup-error', "Please fill in all fields."); return;
    }
    if (password !== confirmPassword) {
        showAuthFeedback('signup-error', "Passwords do not match."); return;
    }
    if (password.length < 6) {
        showAuthFeedback('signup-error', "Password must be at least 6 characters long."); return;
    }

    // Disable button temporarily
    const signupButton = signupForm?.querySelector('button[type="submit"]');
    if(signupButton) signupButton.disabled = true;

    try {
        // Use functions from global scope (window)
        await window.createUserWithEmailAndPassword(window.auth, email, password);
        // Success: onAuthStateChanged handles UI switch. Show brief feedback.
        showAuthFeedback('signup-success', 'Signup successful! Logging you in...');
        signupForm?.reset();
        // No need to manually show app, onAuthStateChanged does this
    } catch (error) {
        console.error("Sign up error:", error.code, error.message);
        showAuthFeedback('signup-error', `Sign up failed: ${error.message}`);
    } finally {
         if(signupButton) signupButton.disabled = false; // Re-enable button
    }
}

async function handleLogin(event) {
    event.preventDefault();
    clearAuthErrors();
    const email = loginEmailInput?.value;
    const password = loginPasswordInput?.value;

     if (!email || !password) {
       showAuthFeedback('login-error', "Please fill in all fields."); return;
    }

    // Disable button temporarily
    const loginButton = loginForm?.querySelector('button[type="submit"]');
    if(loginButton) loginButton.disabled = true;

    try {
        await window.signInWithEmailAndPassword(window.auth, email, password);
        // Success: onAuthStateChanged handles UI switch. Show brief feedback.
        showAuthFeedback('login-success', 'Login successful! Loading roadmap...');
        loginForm?.reset();
        // No need to manually show app
    } catch (error) {
        console.error("Login error:", error.code, error.message);
        showAuthFeedback('login-error', `Login failed: ${error.message}`);
    } finally {
         if(loginButton) loginButton.disabled = false; // Re-enable button
    }
}

async function handleGoogleSignIn() {
    clearAuthErrors();
    const provider = new window.GoogleAuthProvider();
    // Disable button temporarily
    if(googleSigninBtn) googleSigninBtn.disabled = true;

    try {
        await window.signInWithPopup(window.auth, provider);
        // Success: onAuthStateChanged handles UI switch. Show brief feedback.
        showAuthFeedback('google-success', 'Google Sign-In successful! Loading...');
        // No need to manually show app
    } catch (error) {
        console.error("Google Sign-In error:", error.code, error.message);
        let message = `Google Sign-In failed: ${error.message}`;
        if (error.code === 'auth/popup-closed-by-user') { message = `Google Sign-In cancelled or popup closed.`; }
        else if (error.code === 'auth/popup-blocked') { message = `Popup blocked by browser. Please allow popups.`; }
        else if (error.code === 'auth/cancelled-popup-request') { message = `Cancelled multiple login attempts.`}
        showAuthFeedback('google-error', message);
    } finally {
         if(googleSigninBtn) googleSigninBtn.disabled = false; // Re-enable button
    }
}

async function handleLogout() {
    // Disable button temporarily
    if(logoutBtn) logoutBtn.disabled = true;
    try {
        await window.signOut(window.auth);
        // onAuthStateChanged listener handles UI updates and clearing state
        console.log("Logout successful via button click");
    } catch (error) {
        console.error("Logout error:", error);
        alert(`Logout failed: ${error.message}`); // Simple alert for logout failure
    } finally {
         // We don't re-enable the logout button as the user is logged out and it will be hidden.
    }
}


// --- Firestore Functions ---

/**
 * Loads progress from Firestore for the given user ID.
 * Updates the global `currentProgress` object.
 * Applies progress to DOM checkboxes.
 */
async function loadProgress(userId) {
    if (!userId) {
        console.warn("No user ID provided for loading progress.");
        currentProgress = {};
        return;
    }
    console.log(`Loading progress for user: ${userId}`);
    const docRef = window.doc(window.db, "userProgress", userId);
    try {
        const docSnap = await window.getDoc(docRef);
        if (docSnap.exists() && docSnap.data().completedItems) {
            currentProgress = docSnap.data().completedItems;
            console.log("Progress loaded:", Object.keys(currentProgress).length, "items");
        } else {
            console.log("No progress document found for user, starting fresh.");
            currentProgress = {};
        }

        // Apply loaded progress to STATIC checkboxes
        document.querySelectorAll('#app-container .topic-checkbox').forEach(checkbox => {
            if (checkbox.id) {
                checkbox.checked = currentProgress[checkbox.id] || false;
                updateElementStyle(checkbox); // Apply style after setting checked state
            }
        });

        // Apply loaded progress to checkboxes within an OPEN MODAL (if any)
        if (topicModalElement && topicModalElement.classList.contains('show')) {
            modalProblemTableContainer.querySelectorAll('.problem-checkbox').forEach(checkbox => {
                 if (checkbox.id) {
                     checkbox.checked = currentProgress[checkbox.id] || false;
                     updateElementStyle(checkbox);
                 }
            });
        }

    } catch (error) {
        console.error("Error loading progress from Firestore:", error);
        alert(`Failed to load progress: ${error.message}`);
        currentProgress = {}; // Default to empty on error
    }

    // Always apply sequencing and update progress bar after attempting load
    applySequencing();
    updateProgressBar();
}

/**
 * Saves the current state of checked checkboxes to Firestore.
 * Reads checkbox states from the DOM.
 */
async function saveProgress() {
    if (!currentUser) {
        console.warn("Cannot save progress, no user logged in.");
        return;
    }

    const completedItemsToSave = {};
    // Query all visible checkboxes (static + modal if open)
    document.querySelectorAll('#app-container .topic-checkbox:checked, #topicModal .problem-checkbox:checked').forEach(checkbox => {
        if (checkbox.id) {
            completedItemsToSave[checkbox.id] = true;
        }
    });

    // Update local cache immediately
    currentProgress = completedItemsToSave;

    console.log(`Saving progress for user: ${currentUser.uid}`, currentProgress);
    const docRef = window.doc(window.db, "userProgress", currentUser.uid);
    try {
        // Use setDoc with merge: true to only update/add the completedItems field
        await window.setDoc(docRef, { completedItems: currentProgress }, { merge: true });
        console.log("Progress successfully saved.");
    } catch (error) {
        console.error("Error saving progress to Firestore:", error);
        // Optionally show non-blocking feedback to user
        // showAuthFeedback('app-error', `Failed to save progress: ${error.message}`); // Need an element for this
    }
}


// --- Roadmap Logic Functions ---

/**
 * Updates the main progress bar based on STATIC topic checkboxes.
 */
function updateProgressBar() {
    if (!progressBar || !progressBarText || !progressLabelText) return;
    // Ensure queries run only when the app container is visible and populated
    const currentStaticCheckboxes = document.querySelectorAll('#app-container .topic-checkbox');
    if (currentStaticCheckboxes.length === 0 && currentUser) {
         // console.warn("Progress bar update skipped: No static checkboxes found in app container.");
         return; // Don't calculate if checkboxes aren't rendered/found
    }
    const completedStaticCheckboxes = document.querySelectorAll('#app-container .topic-checkbox:checked');
    const completedCount = completedStaticCheckboxes.length;
    const currentTotalItems = currentStaticCheckboxes.length;
    const percentage = currentTotalItems > 0 ? Math.round((completedCount / currentTotalItems) * 100) : 0;

    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBarText.textContent = percentage + '%';
    progressLabelText.textContent = `Progress: ${completedCount} / ${currentTotalItems}`;
}

/**
 * Updates the visual style of a checkbox and its related elements (label/row).
 */
function updateElementStyle(checkbox) {
     if (!checkbox) return;
     let isCompleted = checkbox.checked;
     let isProblem = checkbox.classList.contains('problem-checkbox');

     if (isProblem) {
         const row = checkbox.closest('.problem-row');
         if (row) row.classList.toggle('completed', isCompleted);
     } else { // Topic checkbox
         const label = document.querySelector(`label[for="${checkbox.id}"]`);
         if (label) label.classList.toggle('completed', isCompleted);

         // Style parent item and label based on *disabled* state as well
         const item = checkbox.closest('.topic-item');
         const isDisabled = checkbox.disabled;
         if(item) item.style.opacity = isDisabled ? 0.6 : 1;
         if(label) {
            label.style.opacity = isDisabled ? 0.6 : 1;
            label.style.cursor = isDisabled ? 'default' : 'pointer';
         }
     }
}

/**
 * Applies the enabled/disabled state sequentially to STATIC topic checkboxes.
 */
function applySequencing() {
    if (allCheckboxes.length === 0) return; // Wait until populated

    let lastCheckedIndex = -1;
    allCheckboxes.forEach((checkbox, index) => {
        // Use the element's current checked state
        if (checkbox.checked) {
            lastCheckedIndex = index;
        }
    });

    allCheckboxes.forEach((checkbox, index) => {
        checkbox.disabled = index > lastCheckedIndex + 1;
        // Update style to reflect potential change in disabled state
        updateElementStyle(checkbox);
    });
}

/**
 * General handler called when any roadmap checkbox changes.
 */
function handleCheckboxChange(event) {
    if(!currentUser) return; // Safeguard

    const checkbox = event.target;
    updateElementStyle(checkbox); // Update style immediately

    if (checkbox.classList.contains('topic-checkbox')) {
        applySequencing(); // Re-check sequence if a static topic changed
    }

    saveProgress(); // Save the new state to Firestore
    updateProgressBar(); // Update bar based on static topics
}

// --- Modal & Data Fetching Logic ---

async function fetchProblemData() {
    if (Object.keys(allProblemsData).length > 0) return;
    try {
        const response = await fetch('problems.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        allProblemsData = await response.json();
        console.log("Problems.json loaded.");
    } catch (error) {
        console.error('Error fetching problems.json:', error);
        alert("Could not load practice problems. Please check the console.");
    }
}

function createProblemRowHTML(problem) {
    const problemTitleText = problem.title.replace(/^\d+\.\s*/, '');
    const checkboxId = `modal-${problem.id}`; // Ensure unique ID
    return `
        <tr class="problem-row">
            <td><input type="checkbox" class="problem-checkbox" id="${checkboxId}"></td>
            <td>${problemTitleText}</td>
            <td><a href="${problem.url ?? '#'}" target="_blank" rel="noopener noreferrer" class="problem-link">Solve</a></td>
        </tr>
    `;
}

function createModalProblemTableHTML(problems) {
     if (!problems || problems.length === 0) return '<h6>No specific problems listed for this topic.</h6>';
     const tableRowsHTML = problems.map(problem => createProblemRowHTML(problem)).join('');
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

function findProblemsForTopic(topicKey) {
     if (!allProblemsData || !topicKey) return [];
     for (const majorCategory in allProblemsData) {
         if (allProblemsData[majorCategory][topicKey]) {
             return allProblemsData[majorCategory][topicKey];
         }
         // Check if topicKey exists directly under majorCategory (for flatter structure)
         if (Array.isArray(allProblemsData[majorCategory][topicKey])) {
              return allProblemsData[majorCategory][topicKey];
         }
     }
      console.warn(`No problems found for topic key: ${topicKey}`);
     return [];
}

function showWarningModal(message) {
      if (!topicModal) { console.error("Cannot show warning, modal not initialized."); return; }
      if (modalTitleElement) modalTitleElement.textContent = "Action Required";
      if (modalExplanationElement) modalExplanationElement.textContent = message;
      if (modalLinksContainerElement) modalLinksContainerElement.style.display = 'none';
      if (modalProblemTableContainer) modalProblemTableContainer.innerHTML = ''; // Clear problems
      if (downloadNotesContainer) downloadNotesContainer.style.display = 'none'; // Hide notes btn
      topicModal.show();
}

function showTopicModal(topicKey) {
     if (!topicModal) { console.error("Cannot show topic modal, not initialized."); return; }
     if (!topicKey) { console.warn("No topic key provided for modal."); return; }

     const data = topicData[topicKey];

     // Reset modal content
     if (modalTitleElement) modalTitleElement.textContent = topicKey;
     if (modalExplanationElement) modalExplanationElement.textContent = data?.explanation || "No explanation available for this topic.";
     if (modalLinksListElement) modalLinksListElement.innerHTML = '';
     if (modalProblemTableContainer) modalProblemTableContainer.innerHTML = '';
     if (modalLinksContainerElement) modalLinksContainerElement.style.display = 'none';
     if (downloadNotesContainer) downloadNotesContainer.style.display = 'block'; // Show by default

     // Populate resource links
     if (data?.links && data.links.length > 0 && modalLinksListElement && modalLinksContainerElement) {
         modalLinksContainerElement.style.display = 'block';
         data.links.forEach(link => {
             const li = document.createElement('li');
             const a = document.createElement('a');
             a.href = link.url ?? '#';
             a.textContent = link.title || 'Resource Link';
             a.target = "_blank"; a.rel = "noopener noreferrer";
             li.appendChild(a);
             modalLinksListElement.appendChild(li);
         });
     }

     // Find and generate problem table
     const problems = findProblemsForTopic(topicKey);
     if (modalProblemTableContainer) { // Ensure container exists
        modalProblemTableContainer.innerHTML = createModalProblemTableHTML(problems);
        // Apply SAVED progress (from `currentProgress`) to newly added modal checkboxes
        modalProblemTableContainer.querySelectorAll('.problem-checkbox').forEach(checkbox => {
            if (checkbox.id) {
                checkbox.checked = currentProgress[checkbox.id] || false;
                updateElementStyle(checkbox); // Apply styling based on checked state
            }
        });
     }

     topicModal.show();
}


// --- Event Listener Setup ---

/**
 * Sets up listeners specific to the interactive roadmap app content.
 * Should only be called AFTER a user logs in.
 */
function initializeAppEventListeners() {
    // Populate allCheckboxes array ONCE per login session
    if (allCheckboxes.length === 0 && appContainer) {
       allCheckboxes = Array.from(appContainer.querySelectorAll('.topic-checkbox'));
       // console.log("Populated allCheckboxes:", allCheckboxes.length);
    } else if (!appContainer) {
        console.error("Cannot initialize app listeners: App container not found.");
        return;
    }

    // Use event delegation on the app container for checkbox changes
    appContainer.removeEventListener('change', handleCheckboxChangeDelegated); // Remove previous listener first
    appContainer.addEventListener('change', handleCheckboxChangeDelegated);

    // Use event delegation (capture phase) for clicks (handling disabled elements)
    appContainer.removeEventListener('click', handleAppClickDelegated, true); // Remove previous listener first
    appContainer.addEventListener('click', handleAppClickDelegated, true);

    // --- Event Listeners for Topic Labels (Modal Trigger) ---
    // Must re-attach directly as delegation is tricky with complex content
    const topicLabels = appContainer.querySelectorAll('.topic-badge');
    topicLabels.forEach(label => {
        label.removeEventListener('click', handleTopicLabelClick); // Remove potential old listener
        label.addEventListener('click', handleTopicLabelClick);
    });

    // console.log("App event listeners initialized.");
}

// Delegated handler for checkbox changes within the app container
function handleCheckboxChangeDelegated(event) {
     if (event.target.matches('.topic-checkbox, .problem-checkbox')) {
         handleCheckboxChange(event); // Call the main handler
     }
}

// Delegated handler for clicks within the app container (primarily for disabled warnings)
function handleAppClickDelegated(event) {
    // Handle disabled *topic* checkbox clicks -> show warning modal
    if (event.target.matches('.topic-checkbox:disabled')) {
         event.preventDefault();
         event.stopPropagation();
         const checkbox = event.target;
         const currentIndex = allCheckboxes.findIndex(cb => cb.id === checkbox.id);
         let prevTopicName = 'the previous topic';
         if (currentIndex !== -1 && currentIndex > 0) {
             const prevCheckbox = allCheckboxes[currentIndex - 1];
             if (prevCheckbox) {
                  const prevLabel = document.querySelector(`label[for="${prevCheckbox.id}"]`);
                  if (prevLabel) prevTopicName = prevLabel.getAttribute('data-topic') || prevLabel.textContent.trim();
             }
         }
         showWarningModal(`Please complete '${prevTopicName}' first.`);
     }
     // We don't need special handling for clicking disabled *problem* checkboxes
     // Label clicks are handled by direct listeners attached below
}

// Named handler for topic label clicks (attached directly to labels)
function handleTopicLabelClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const label = event.currentTarget;
    const topicKey = label.getAttribute('data-topic');
    const checkboxId = label.getAttribute('for');
    const checkbox = document.getElementById(checkboxId);

    // Check if the associated checkbox exists and is disabled
    if (checkbox?.disabled) { // Only show warning if the checkbox is disabled
        const currentIndex = allCheckboxes.findIndex(cb => cb.id === checkbox.id);
        let prevTopicName = 'the previous topic';
         if (currentIndex !== -1 && currentIndex > 0) {
             const prevCheckbox = allCheckboxes[currentIndex - 1];
              if (prevCheckbox) {
                  const prevLabel = document.querySelector(`label[for="${prevCheckbox.id}"]`);
                   if (prevLabel) prevTopicName = prevLabel.getAttribute('data-topic') || prevLabel.textContent.trim();
              }
         }
        showWarningModal(`Please complete '${prevTopicName}' first.`);
    } else if (topicKey) { // If not disabled (or checkbox doesn't exist), show the modal
        showTopicModal(topicKey);
    } else {
        console.warn("Label clicked with no topic key or disabled checkbox:", label);
    }
}


// --- Global Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Setting up initial state and listeners.");
    selectDOMElements(); // Select ALL elements first
    fetchProblemData(); // Fetch problem data early (doesn't rely on auth)

    // --- Setup Auth UI Listeners ---
    // These listeners are for elements always present in the auth container
    if (showLoginBtn) {
         showLoginBtn.addEventListener('click', () => showAuthForm('login'));
         // console.log("Listener attached: showLoginBtn");
    } else { console.error("Setup Error: showLoginBtn not found"); }

    if (showSignupBtn) {
         showSignupBtn.addEventListener('click', () => showAuthForm('signup'));
         // console.log("Listener attached: showSignupBtn");
    } else { console.error("Setup Error: showSignupBtn not found"); }

    if (loginForm) {
         loginForm.addEventListener('submit', handleLogin);
         // console.log("Listener attached: loginForm submit");
    } else { console.error("Setup Error: loginForm not found"); }

    if (signupForm) {
         signupForm.addEventListener('submit', handleSignUp);
         // console.log("Listener attached: signupForm submit");
    } else { console.error("Setup Error: signupForm not found"); }

    if (googleSigninBtn) {
         googleSigninBtn.addEventListener('click', handleGoogleSignIn);
         // console.log("Listener attached: googleSigninBtn");
    } else { console.error("Setup Error: googleSigninBtn not found"); }

    // Note: The logoutBtn listener is attached here but the button is initially hidden.
    if (logoutBtn) {
         logoutBtn.addEventListener('click', handleLogout);
          // console.log("Listener attached: logoutBtn (initially hidden)");
    } // Don't log error if not found initially

     // Default to showing the login form
     showAuthForm('login');

    // --- Setup Firebase Auth State Listener ---
    // This is the main controller for switching between logged-in/out states
    // console.log("Setting up Firebase onAuthStateChanged listener...");
    // Ensure Firebase was initialized before attaching listener
     if (typeof window.onAuthStateChanged === 'function' && window.auth) {
         window.onAuthStateChanged(window.auth, async (user) => {
            clearAuthErrors(); // Clear auth form errors on any state change

            if (user) {
                // --- User is signed IN ---
                if (!currentUser || currentUser.uid !== user.uid) { // Check if state actually changed or is new
                    console.log("Auth State Changed: User logged IN", user.uid, user.email);
                    currentUser = user; // Store user object

                    // Update UI for logged-in state
                    if (authContainer) authContainer.style.display = 'none';
                    if (appContainer) appContainer.style.display = 'block';
                    if (userStatusElement) userStatusElement.style.display = 'block';
                    if (userEmailElement) userEmailElement.textContent = `Logged in as: ${user.email || user.displayName || 'User'}`;

                    // Initialize app event listeners now that the app container is visible
                    initializeAppEventListeners();

                    // Load user's progress from Firestore AFTER listeners are ready
                    await loadProgress(user.uid);
                }
                // else { console.log("Auth State: User already logged in."); }

            } else {
                // --- User is signed OUT ---
                if (currentUser !== null) { // Check if state actually changed
                     console.log("Auth State Changed: User logged OUT");
                     currentUser = null; // Clear user object
                     currentProgress = {}; // Clear progress data

                     // Update UI for logged-out state
                     if (authContainer) authContainer.style.display = 'block';
                     if (appContainer) appContainer.style.display = 'none';
                     if (userStatusElement) userStatusElement.style.display = 'none';

                     // Reset visual state of roadmap (optional but good practice)
                     allCheckboxes = []; // Clear the list
                     document.querySelectorAll('.topic-checkbox, .problem-checkbox').forEach(cb => {
                         cb.checked = false;
                         cb.disabled = true;
                         updateElementStyle(cb);
                     });
                     updateProgressBar(); // Reset progress bar

                     showAuthForm('login'); // Show login form by default when logged out
                }
                // else { console.log("Auth State: User already logged out."); }
            }
        });
        console.log("onAuthStateChanged listener attached.");
     } else {
         console.error("Firebase Auth not available on window. Cannot attach auth state listener.");
         alert("Critical Error: Firebase Authentication failed to initialize. Please check the console and Firebase configuration.");
         // Show auth container as fallback? Or a dedicated error message.
         if (authContainer) authContainer.style.display = 'block';
         if (appContainer) appContainer.style.display = 'none';
     }

    console.log("Initial DOMContentLoaded script finished.");
});