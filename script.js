// DOM Elements
const screens = {
    home: document.getElementById('home-screen'),
    randomMode: document.getElementById('random-mode-screen'),
    customMode: document.getElementById('custom-mode-screen'),
    share: document.getElementById('share-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

// Name inputs
const nameInputs = {
    randomCreatorName: document.getElementById('random-creator-name'),
    randomRecipientName: document.getElementById('random-recipient-name'),
    customCreatorName: document.getElementById('custom-creator-name'),
    customRecipientName: document.getElementById('custom-recipient-name')
};

// Buttons
const buttons = {
    randomMode: document.getElementById('random-mode-btn'),
    customMode: document.getElementById('custom-mode-btn'),
    backFromRandom: document.getElementById('back-from-random'),
    backFromCustom: document.getElementById('back-from-custom'),
    backFromShare: document.getElementById('back-from-share'),
    randomGenerateLink: document.getElementById('random-generate-link'),
    customGenerateLink: document.getElementById('custom-generate-link'),
    addQuestion: document.getElementById('add-question-btn'),
    copyLink: document.getElementById('copy-link-btn'),
    viewResults: document.getElementById('view-results-btn'),
    submitAnswers: document.getElementById('submit-answers'),
    createNewTest: document.getElementById('create-new-test'),
    shareResults: document.getElementById('share-results')
};

// Language buttons
const arLangBtn = document.getElementById('ar-lang');
const enLangBtn = document.getElementById('en-lang');

// Containers
const randomQuestionsContainer = document.getElementById('random-questions-container');
const customQuestionsContainer = document.getElementById('custom-questions-container');
const quizQuestionsContainer = document.getElementById('quiz-questions-container');
const shareLink = document.getElementById('share-link');

// Results elements
const compatibilityPercentage = document.getElementById('compatibility-percentage');
const matchingAnswers = document.getElementById('matching-answers');
const redFlags = document.getElementById('red-flags');
const resultAnalysis = document.getElementById('result-analysis');
const namesComparison = document.getElementById('names-comparison');
const quizIntroText = document.getElementById('quiz-intro-text');

// Share buttons
const shareWhatsapp = document.getElementById('share-whatsapp');
const shareFacebook = document.getElementById('share-facebook');
const shareTwitter = document.getElementById('share-twitter');

// App State
let currentLanguage = 'ar';
let currentTest = {
    id: null,
    mode: null, // 'random' or 'custom'
    questions: [],
    creatorAnswers: [],
    takerAnswers: [],
    results: null,
    creatorName: '',
    recipientName: ''
};

// Predefined questions (Arabic)
const predefinedQuestionsAr = [
    'هل تحب قضاء الوقت في المنزل أكثر من الخروج؟',
    'هل تفضل الأفلام الرومانسية على أفلام الحركة؟',
    'هل تعتقد أن الصداقة مهمة في العلاقة العاطفية؟',
    'هل تحب السفر والمغامرة؟',
    'هل تفضل قضاء عطلة نهاية الأسبوع مع العائلة؟',
    'هل تعتقد أن المال مهم في العلاقة؟',
    'هل تفضل الحيوانات الأليفة؟',
    'هل تحب الطبخ؟',
    'هل تفضل الاستماع أكثر من التحدث؟',
    'هل تعتقد أن الغيرة دليل على الحب؟',
    'هل تفضل العلاقات طويلة المدى؟',
    'هل تحب الأطفال وترغب في إنجاب أطفال في المستقبل؟',
    'هل تعتقد أن الصدق هو أهم شيء في العلاقة؟',
    'هل تفضل قضاء الوقت مع أصدقائك بدون شريكك؟',
    'هل تعتقد أن التضحية مهمة في العلاقة؟'
];

// Predefined questions (English)
const predefinedQuestionsEn = [
    'Do you prefer staying at home over going out?',
    'Do you prefer romantic movies over action movies?',
    'Do you believe friendship is important in a romantic relationship?',
    'Do you enjoy traveling and adventure?',
    'Do you prefer spending weekends with family?',
    'Do you think money is important in a relationship?',
    'Do you like pets?',
    'Do you enjoy cooking?',
    'Do you prefer listening over talking?',
    'Do you think jealousy is a sign of love?',
    'Do you prefer long-term relationships?',
    'Do you like children and want to have children in the future?',
    'Do you believe honesty is the most important thing in a relationship?',
    'Do you prefer spending time with your friends without your partner?',
    'Do you think sacrifice is important in a relationship?'
];

// Analysis messages (Arabic)
const analysisMessagesAr = {
    high: [
        'يبدو أنكما متوافقان بشكل رائع! هناك احتمال كبير لنجاح هذه العلاقة.',
        'التوافق بينكما عالٍ جدًا! قد يكون هذا الشخص هو النصف الآخر الذي تبحثين عنه.',
        'رائع! أنتما متناغمان في الكثير من الأمور، وهذا مؤشر إيجابي للعلاقة.'
    ],
    medium: [
        'هناك توافق معقول بينكما، ولكن قد تحتاجان إلى مزيد من التواصل في بعض المجالات.',
        'التوافق متوسط، وهذا ليس سيئًا! يمكنكما العمل على تحسين التفاهم المشترك.',
        'هناك أرضية مشتركة بينكما، ولكن أيضًا بعض الاختلافات التي تحتاج إلى مناقشة.'
    ],
    low: [
        'يبدو أن هناك اختلافات كبيرة بينكما. قد تحتاجين إلى التفكير مليًا في هذه العلاقة.',
        'التوافق منخفض، وهذا قد يشير إلى تحديات كبيرة في المستقبل.',
        'هناك العديد من العلامات التحذيرية. من الأفضل مناقشة هذه الاختلافات قبل المضي قدمًا.'
    ]
};

// Analysis messages (English)
const analysisMessagesEn = {
    high: [
        'You seem to be highly compatible! There is a great chance for this relationship to succeed.',
        'Your compatibility is very high! This person might be the other half you are looking for.',
        'Amazing! You are in harmony on many things, which is a positive indicator for the relationship.'
    ],
    medium: [
        'There is reasonable compatibility between you, but you may need more communication in some areas.',
        'The compatibility is medium, which is not bad! You can work on improving mutual understanding.',
        'There is common ground between you, but also some differences that need to be discussed.'
    ],
    low: [
        'It seems there are significant differences between you. You might need to think carefully about this relationship.',
        'The compatibility is low, which may indicate major challenges in the future.',
        'There are several red flags. It is better to discuss these differences before moving forward.'
    ]
};

// Initialize the app
function init() {
    // Set up event listeners
    setupEventListeners();
    
    // Handle URL routing
    handleUrlRouting();
    
    // Add popstate event listener to handle browser back/forward navigation
    window.addEventListener('popstate', handleUrlRouting);
}

// Handle URL routing based on current location
function handleUrlRouting() {
    // First try to get parameters from hash (for better mobile compatibility)
    let testId = null;
    let viewResults = null;
    
    // Check hash first (format: #test=abc123&results=true)
    if (window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        testId = hashParams.get('test');
        viewResults = hashParams.get('results');
    }
    
    // If not found in hash, check query parameters
    if (!testId) {
        const urlParams = new URLSearchParams(window.location.search);
        testId = urlParams.get('test');
        viewResults = urlParams.get('results');
    }
    
    if (testId) {
        // If there's a test ID, load the test
        const test = loadTest(testId);
        
        if (test) {
            currentTest = test;
            
            if (viewResults === 'true' && currentTest.results) {
                // Show the results
                displayResults(currentTest.results);
                showScreen('results');
            } else if (currentTest.creatorAnswers.length > 0) {
                // Show the quiz screen for the recipient
                updateQuizScreen();
                showScreen('quiz');
            } else {
                // Something went wrong, show the home screen
                showScreen('home');
            }
        } else {
            // Test not found, show the home screen
            showScreen('home');
        }
    } else {
        // If no test ID, show home screen
        showScreen('home');
    }
}

// Set up event listeners
function setupEventListeners() {
    // Navigation buttons
    buttons.randomMode.addEventListener('click', () => showScreen('randomMode'));
    buttons.customMode.addEventListener('click', () => showScreen('customMode'));
    buttons.backFromRandom.addEventListener('click', () => showScreen('home'));
    buttons.backFromCustom.addEventListener('click', () => showScreen('home'));
    buttons.backFromShare.addEventListener('click', () => {
        if (currentTest.mode === 'random') {
            showScreen('randomMode');
        } else {
            showScreen('customMode');
        }
    });
    
    // Generate link buttons
    buttons.randomGenerateLink.addEventListener('click', generateRandomTest);
    buttons.customGenerateLink.addEventListener('click', generateCustomTest);
    
    // Add question button
    buttons.addQuestion.addEventListener('click', addCustomQuestion);
    
    // Copy link button
    buttons.copyLink.addEventListener('click', copyLinkToClipboard);
    
    // View results button
    buttons.viewResults.addEventListener('click', () => {
        const baseUrl = `${window.location.origin}${window.location.pathname}`;
        const resultsUrl = getCompatibleUrl(baseUrl, { test: currentTest.id, results: 'true' });
        window.location.href = resultsUrl;
    });
    
    // Submit answers button
    buttons.submitAnswers.addEventListener('click', submitAnswers);
    
    // Create new test button
    buttons.createNewTest.addEventListener('click', () => {
        // Clear hash and query parameters when creating a new test
        window.location.href = window.location.origin + window.location.pathname;
        // Reset current test
        currentTest = {
            id: null,
            mode: null,
            questions: [],
            creatorAnswers: [],
            takerAnswers: [],
            results: null,
            creatorName: '',
            recipientName: ''
        };
    });
    
    // Share results button
    buttons.shareResults.addEventListener('click', shareResults);
    
    // Language buttons
    arLangBtn.addEventListener('click', () => changeLanguage('ar'));
    enLangBtn.addEventListener('click', () => changeLanguage('en'));
    
    // Share buttons
    shareWhatsapp.addEventListener('click', (e) => {
        e.preventDefault();
        const url = encodeURIComponent(shareLink.value);
        window.open(`https://wa.me/?text=${url}`, '_blank');
    });
    
    shareFacebook.addEventListener('click', (e) => {
        e.preventDefault();
        const url = encodeURIComponent(shareLink.value);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });
    
    shareTwitter.addEventListener('click', (e) => {
        e.preventDefault();
        const url = encodeURIComponent(shareLink.value);
        window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
    });
}

// Show a specific screen
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    screens[screenName].classList.add('active');
    
    // If showing random mode screen, load random questions
    if (screenName === 'randomMode') {
        loadRandomQuestions();
    }
}

// Load random questions
function loadRandomQuestions() {
    randomQuestionsContainer.innerHTML = '';
    
    // Get predefined questions based on current language
    const questions = currentLanguage === 'ar' ? predefinedQuestionsAr : predefinedQuestionsEn;
    
    // Randomly select 10 questions
    const selectedQuestions = [];
    const selectedIndices = new Set();
    
    while (selectedIndices.size < 10 && selectedIndices.size < questions.length) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            selectedQuestions.push(questions[randomIndex]);
        }
    }
    
    // Create question items
    selectedQuestions.forEach((question, index) => {
        const questionItem = createQuestionItem(question, index + 1, true);
        randomQuestionsContainer.appendChild(questionItem);
    });
}

// Create a question item
function createQuestionItem(questionText, index, isCreator = true) {
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    
    if (isCreator) {
        // For test creator
        const questionElement = document.createElement('p');
        questionElement.textContent = `${index}. ${questionText}`;
        
        const answerOptions = document.createElement('div');
        answerOptions.className = 'answer-options';
        
        const yesLabel = document.createElement('label');
        const yesInput = document.createElement('input');
        yesInput.type = 'radio';
        yesInput.name = `random-answer-${index}`;
        yesInput.value = 'yes';
        yesInput.checked = true;
        const yesSpan = document.createElement('span');
        yesSpan.textContent = currentLanguage === 'ar' ? 'نعم' : 'Yes';
        yesLabel.appendChild(yesInput);
        yesLabel.appendChild(yesSpan);
        
        const noLabel = document.createElement('label');
        const noInput = document.createElement('input');
        noInput.type = 'radio';
        noInput.name = `random-answer-${index}`;
        noInput.value = 'no';
        const noSpan = document.createElement('span');
        noSpan.textContent = currentLanguage === 'ar' ? 'لا' : 'No';
        noLabel.appendChild(noInput);
        noLabel.appendChild(noSpan);
        
        answerOptions.appendChild(yesLabel);
        answerOptions.appendChild(noLabel);
        
        questionItem.appendChild(questionElement);
        questionItem.appendChild(answerOptions);
    } else {
        // For test taker
        const questionElement = document.createElement('p');
        questionElement.textContent = `${index}. ${questionText}`;
        
        const answerOptions = document.createElement('div');
        answerOptions.className = 'answer-options';
        
        const yesLabel = document.createElement('label');
        const yesInput = document.createElement('input');
        yesInput.type = 'radio';
        yesInput.name = `quiz-answer-${index}`;
        yesInput.value = 'yes';
        const yesSpan = document.createElement('span');
        yesSpan.textContent = currentLanguage === 'ar' ? 'نعم' : 'Yes';
        yesLabel.appendChild(yesInput);
        yesLabel.appendChild(yesSpan);
        
        const noLabel = document.createElement('label');
        const noInput = document.createElement('input');
        noInput.type = 'radio';
        noInput.name = `quiz-answer-${index}`;
        noInput.value = 'no';
        const noSpan = document.createElement('span');
        noSpan.textContent = currentLanguage === 'ar' ? 'لا' : 'No';
        noLabel.appendChild(noInput);
        noLabel.appendChild(noSpan);
        
        answerOptions.appendChild(yesLabel);
        answerOptions.appendChild(noLabel);
        
        questionItem.appendChild(questionElement);
        questionItem.appendChild(answerOptions);
    }
    
    return questionItem;
}

// Add a custom question
function addCustomQuestion() {
    const questionCount = customQuestionsContainer.children.length + 1;
    
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = 'question-input';
    questionInput.placeholder = currentLanguage === 'ar' ? 'اكتبي سؤالك هنا...' : 'Write your question here...';
    
    const answerOptions = document.createElement('div');
    answerOptions.className = 'answer-options';
    
    const yesLabel = document.createElement('label');
    const yesInput = document.createElement('input');
    yesInput.type = 'radio';
    yesInput.name = `answer-${questionCount}`;
    yesInput.value = 'yes';
    yesInput.checked = true;
    const yesSpan = document.createElement('span');
    yesSpan.textContent = currentLanguage === 'ar' ? 'نعم' : 'Yes';
    yesLabel.appendChild(yesInput);
    yesLabel.appendChild(yesSpan);
    
    const noLabel = document.createElement('label');
    const noInput = document.createElement('input');
    noInput.type = 'radio';
    noInput.name = `answer-${questionCount}`;
    noInput.value = 'no';
    const noSpan = document.createElement('span');
    noSpan.textContent = currentLanguage === 'ar' ? 'لا' : 'No';
    noLabel.appendChild(noInput);
    noLabel.appendChild(noSpan);
    
    answerOptions.appendChild(yesLabel);
    answerOptions.appendChild(noLabel);
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-question-btn';
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.addEventListener('click', () => {
        questionItem.remove();
        // Renumber the remaining questions
        const questionItems = customQuestionsContainer.querySelectorAll('.question-item');
        questionItems.forEach((item, index) => {
            const radioInputs = item.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(input => {
                input.name = `answer-${index + 1}`;
            });
        });
    });
    
    questionItem.appendChild(questionInput);
    questionItem.appendChild(answerOptions);
    questionItem.appendChild(removeButton);
    
    customQuestionsContainer.appendChild(questionItem);
}

// Generate a random test
function generateRandomTest() {
    // Get creator and recipient names
    const creatorName = nameInputs.randomCreatorName.value.trim();
    const recipientName = nameInputs.randomRecipientName.value.trim();
    
    // Validate names
    if (!creatorName || !recipientName) {
        alert(currentLanguage === 'ar' ? 'يرجى إدخال الأسماء' : 'Please enter both names');
        return;
    }
    
    // Get all questions and answers
    const questionItems = randomQuestionsContainer.querySelectorAll('.question-item');
    const questions = [];
    const creatorAnswers = [];
    
    questionItems.forEach(item => {
        const questionText = item.querySelector('p').textContent.substring(3); // Remove the index and dot
        const selectedAnswer = item.querySelector('input[type="radio"]:checked').value;
        
        questions.push(questionText);
        creatorAnswers.push(selectedAnswer);
    });
    
    // Generate a unique test ID
    const testId = generateUniqueId();
    
    // Save the test
    currentTest = {
        id: testId,
        mode: 'random',
        questions,
        creatorAnswers,
        takerAnswers: [],
        results: null,
        creatorName,
        recipientName
    };
    
    saveTest(currentTest);
    
    // Generate and show the share link using the most compatible URL format
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const shareUrl = getCompatibleUrl(baseUrl, { test: testId });
    shareLink.value = shareUrl;
    
    // Update share buttons
    updateShareButtons(shareUrl);
    
    // Show the share screen
    showScreen('share');
}

// Generate a custom test
function generateCustomTest() {
    // Get creator and recipient names
    const creatorName = nameInputs.customCreatorName.value.trim();
    const recipientName = nameInputs.customRecipientName.value.trim();
    
    // Validate names
    if (!creatorName || !recipientName) {
        alert(currentLanguage === 'ar' ? 'يرجى إدخال الأسماء' : 'Please enter both names');
        return;
    }
    
    // Get all questions and answers
    const questionItems = customQuestionsContainer.querySelectorAll('.question-item');
    const questions = [];
    const creatorAnswers = [];
    
    // Validate that all questions have text
    let isValid = true;
    
    questionItems.forEach(item => {
        const questionInput = item.querySelector('.question-input');
        if (!questionInput.value.trim()) {
            questionInput.classList.add('error');
            isValid = false;
        } else {
            questionInput.classList.remove('error');
        }
    });
    
    if (!isValid) {
        alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الأسئلة' : 'Please fill in all questions');
        return;
    }
    
    // Collect questions and answers
    questionItems.forEach(item => {
        const questionText = item.querySelector('.question-input').value.trim();
        const selectedAnswer = item.querySelector('input[type="radio"]:checked').value;
        
        questions.push(questionText);
        creatorAnswers.push(selectedAnswer);
    });
    
    // Generate a unique test ID
    const testId = generateUniqueId();
    
    // Save the test
    currentTest = {
        id: testId,
        mode: 'custom',
        questions,
        creatorAnswers,
        takerAnswers: [],
        results: null,
        creatorName,
        recipientName
    };
    
    saveTest(currentTest);
    
    // Generate and show the share link using the most compatible URL format
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const shareUrl = getCompatibleUrl(baseUrl, { test: testId });
    shareLink.value = shareUrl;
    
    // Update share buttons
    updateShareButtons(shareUrl);
    
    // Show the share screen
    showScreen('share');
}

// Generate a unique ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Save a test to localStorage
function saveTest(test) {
    localStorage.setItem(`love-test-${test.id}`, JSON.stringify(test));
}

// Load a test from localStorage
function loadTest(testId) {
    const testData = localStorage.getItem(`love-test-${testId}`);
    
    if (testData) {
        return JSON.parse(testData);
    } else {
        alert(currentLanguage === 'ar' ? 'الاختبار غير موجود' : 'Test not found');
        return null;
    }
}

// Update the quiz screen for the taker
function updateQuizScreen() {
    quizQuestionsContainer.innerHTML = '';
    
    // Update the quiz introduction text with the recipient's name
    if (currentTest.recipientName) {
        quizIntroText.textContent = currentLanguage === 'ar' 
            ? `مرحباً ${currentTest.recipientName}! أجب على الأسئلة التالية بصدق:` 
            : `Hello ${currentTest.recipientName}! Please answer the following questions honestly:`;
    }
    
    currentTest.questions.forEach((question, index) => {
        const questionItem = createQuestionItem(question, index + 1, false);
        quizQuestionsContainer.appendChild(questionItem);
    });
}

// Load quiz questions for the taker (legacy function, kept for backward compatibility)
function loadQuizQuestions() {
    updateQuizScreen();
}

// Submit answers from the taker
function submitAnswers() {
    // Get all answers
    const questionItems = quizQuestionsContainer.querySelectorAll('.question-item');
    const takerAnswers = [];
    
    // Validate that all questions have been answered
    let isValid = true;
    
    questionItems.forEach(item => {
        const selectedAnswer = item.querySelector('input[type="radio"]:checked');
        if (!selectedAnswer) {
            item.classList.add('error');
            isValid = false;
        } else {
            item.classList.remove('error');
            takerAnswers.push(selectedAnswer.value);
        }
    });
    
    if (!isValid) {
        alert(currentLanguage === 'ar' ? 'يرجى الإجابة على جميع الأسئلة' : 'Please answer all questions');
        return;
    }
    
    // Calculate results
    const results = calculateResults(currentTest.creatorAnswers, takerAnswers);
    
    // Update the test with taker answers and results
    currentTest.takerAnswers = takerAnswers;
    currentTest.results = results;
    
    // Save the updated test
    saveTest(currentTest);
    
    // Display results
    displayResults();
    
    // Show the results screen
    showScreen('results');
}

// Calculate results
function calculateResults(creatorAnswers, takerAnswers) {
    let matchCount = 0;
    let redFlagCount = 0;
    
    creatorAnswers.forEach((creatorAnswer, index) => {
        if (creatorAnswer === takerAnswers[index]) {
            matchCount++;
        } else {
            redFlagCount++;
        }
    });
    
    const totalQuestions = creatorAnswers.length;
    const compatibilityPercentage = Math.round((matchCount / totalQuestions) * 100);
    
    let analysisCategory;
    if (compatibilityPercentage >= 70) {
        analysisCategory = 'high';
    } else if (compatibilityPercentage >= 40) {
        analysisCategory = 'medium';
    } else {
        analysisCategory = 'low';
    }
    
    // Get a random analysis message based on the category and language
    const analysisMessages = currentLanguage === 'ar' ? analysisMessagesAr : analysisMessagesEn;
    const randomIndex = Math.floor(Math.random() * analysisMessages[analysisCategory].length);
    const analysisMessage = analysisMessages[analysisCategory][randomIndex];
    
    return {
        matchCount,
        redFlagCount,
        compatibilityPercentage,
        analysisMessage
    };
}

// Display results
function displayResults(resultsParam) {
    // Use provided results or get from currentTest
    const results = resultsParam || currentTest.results;
    
    if (!results) {
        console.error('No results to display');
        return;
    }
    
    // Update the UI with the results
    compatibilityPercentage.textContent = `${results.compatibilityPercentage}%`;
    matchingAnswers.textContent = results.matchCount;
    redFlags.textContent = results.redFlagCount;
    resultAnalysis.textContent = results.analysisMessage;
    
    // Display names comparison
    if (currentTest.creatorName && currentTest.recipientName) {
        namesComparison.textContent = currentLanguage === 'ar'
            ? `${currentTest.creatorName} ❤️ ${currentTest.recipientName}`
            : `${currentTest.creatorName} ❤️ ${currentTest.recipientName}`;
    }
    
    // Animate the compatibility percentage
    animateNumber(compatibilityPercentage, 0, results.compatibilityPercentage, 1500);
}

// Animate a number from start to end
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = `${current}%`;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Copy link to clipboard
function copyLinkToClipboard() {
    shareLink.select();
    document.execCommand('copy');
    
    // Show a success message
    const originalText = buttons.copyLink.innerHTML;
    buttons.copyLink.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        buttons.copyLink.innerHTML = originalText;
    }, 2000);
}

// Detect if the app is running in a mobile webview
function isMobileWebview() {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
        userAgent.includes('instagram') ||
        userAgent.includes('fbav') || // Facebook
        userAgent.includes('twitter') ||
        userAgent.includes('tiktok') ||
        userAgent.includes('snapchat') ||
        userAgent.includes('whatsapp') ||
        (userAgent.includes('android') && userAgent.includes('wv')) // Android WebView
    );
}

// Get the most compatible URL format based on the environment
function getCompatibleUrl(baseUrl, params) {
    // Create a URL object
    const url = new URL(baseUrl);
    
    // Determine if we're in a mobile webview
    const isWebview = isMobileWebview();
    
    if (isWebview) {
        // For mobile webviews, use query parameters as they tend to work better
        // in some webviews that strip hash fragments
        Object.keys(params).forEach(key => {
            url.searchParams.set(key, params[key]);
        });
    } else {
        // For regular browsers, use hash-based routing for SPA compatibility
        const hashParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
            hashParams.set(key, params[key]);
        });
        url.hash = hashParams.toString();
    }
    
    return url.toString();
}

// Update share buttons with the current URL
function updateShareButtons(url) {
    const encodedUrl = encodeURIComponent(url);
    
    shareWhatsapp.href = `https://wa.me/?text=${encodedUrl}`;
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
}

// Share results
function shareResults() {
    // Generate the most compatible URL format for sharing results
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const resultsUrl = getCompatibleUrl(baseUrl, { test: currentTest.id, results: 'true' });
    
    // Update share link input
    shareLink.value = resultsUrl;
    
    // Update share buttons
    updateShareButtons(resultsUrl);
    
    // Show the share screen
    showScreen('share');
}

// Change language
function changeLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update language buttons
    arLangBtn.classList.toggle('active', lang === 'ar');
    enLangBtn.classList.toggle('active', lang === 'en');
    
    // Update UI text based on the selected language
    updateUIText();
}

// Update UI text based on the current language
function updateUIText() {
    // This function would update all text elements based on the current language
    // For simplicity, we're not implementing the full translation here
    // In a real application, you would have a translation dictionary for all UI elements
    
    // Example of updating placeholders
    const questionInputs = document.querySelectorAll('.question-input');
    questionInputs.forEach(input => {
        input.placeholder = currentLanguage === 'ar' ? 'اكتبي سؤالك هنا...' : 'Write your question here...';
    });
    
    // Update name input placeholders
    if (nameInputs.randomCreatorName) {
        nameInputs.randomCreatorName.placeholder = currentLanguage === 'ar' ? 'أدخلي اسمك هنا...' : 'Enter your name here...';
        nameInputs.randomRecipientName.placeholder = currentLanguage === 'ar' ? 'أدخلي اسم الشخص الذي تختبرينه...' : 'Enter the name of the person you are testing...';
    }
    
    if (nameInputs.customCreatorName) {
        nameInputs.customCreatorName.placeholder = currentLanguage === 'ar' ? 'أدخلي اسمك هنا...' : 'Enter your name here...';
        nameInputs.customRecipientName.placeholder = currentLanguage === 'ar' ? 'أدخلي اسم الشخص الذي تختبرينه...' : 'Enter the name of the person you are testing...';
    }
    
    // Update name input labels
    const creatorNameLabels = document.querySelectorAll('label[for="random-creator-name"], label[for="custom-creator-name"]');
    creatorNameLabels.forEach(label => {
        label.textContent = currentLanguage === 'ar' ? 'اسمك:' : 'Your name:';
    });
    
    const recipientNameLabels = document.querySelectorAll('label[for="random-recipient-name"], label[for="custom-recipient-name"]');
    recipientNameLabels.forEach(label => {
        label.textContent = currentLanguage === 'ar' ? 'اسم الشخص الآخر:' : 'Other person\'s name:';
    });
    
    // Example of updating yes/no labels
    const yesLabels = document.querySelectorAll('.answer-options label:first-child span');
    yesLabels.forEach(label => {
        label.textContent = currentLanguage === 'ar' ? 'نعم' : 'Yes';
    });
    
    const noLabels = document.querySelectorAll('.answer-options label:last-child span');
    noLabels.forEach(label => {
        label.textContent = currentLanguage === 'ar' ? 'لا' : 'No';
    });
    
    // Reload random questions if they're visible
    if (screens.randomMode.classList.contains('active')) {
        loadRandomQuestions();
    }
    
    // Update quiz intro text if on quiz screen
    if (screens.quiz.classList.contains('active') && currentTest.recipientName) {
        quizIntroText.textContent = currentLanguage === 'ar' 
            ? `مرحباً ${currentTest.recipientName}! أجب على الأسئلة التالية بصدق:` 
            : `Hello ${currentTest.recipientName}! Please answer the following questions honestly:`;
    }
    
    // Update names comparison if on results screen
    if (screens.results.classList.contains('active') && currentTest.creatorName && currentTest.recipientName) {
        namesComparison.textContent = `${currentTest.creatorName} ❤️ ${currentTest.recipientName}`;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);