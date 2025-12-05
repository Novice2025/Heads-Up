document.addEventListener('DOMContentLoaded', () => {
    // --- Motion Background Initialization (Simple CSS animation already handled by CSS) ---
    // This JavaScript ensures the motion background div is present if not already in HTML
    const body = document.body;
    if (!document.querySelector('.motion-background')) {
        const motionBg = document.createElement('div');
        motionBg.classList.add('motion-background');
        body.prepend(motionBg); // Add as the first element of the body
    }

    // --- Animated Buttons (General for all buttons with .animated-button class) ---
    const animatedButtons = document.querySelectorAll('.animated-button');
    animatedButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.03)'; // Slightly larger
            button.style.boxShadow = '0 0 18px rgba(83, 214, 162, 0.7)'; // More prominent shadow
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none'; // Reset shadow
        });
        // Add a subtle click animation
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.03)'; // Return to hover size
        });
    });

    // --- Drag and Drop Functionality (for meu_ingles_inseguro.html) ---
    const dragItems = document.querySelectorAll('.drag-item');
    const dropTargets = document.querySelectorAll('.drop-target');
    const checkDragDropBtn = document.getElementById('checkDragDrop');
    const dragDropFeedbacks = document.querySelectorAll('.drag-drop-feedback'); // New feedback elements

    let draggedItem = null;

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            e.dataTransfer.setData('text/plain', item.textContent);
            setTimeout(() => item.classList.add('dragging'), 0);
        });

        item.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        });
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            target.classList.add('drag-over');
        });

        target.addEventListener('dragleave', () => {
            target.classList.remove('drag-over');
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('drag-over');
            if (draggedItem && !target.textContent) { // Only drop if target is empty
                target.textContent = draggedItem.textContent;
                target.setAttribute('data-placed', draggedItem.textContent); // Store placed item
                draggedItem.style.display = 'none'; // Hide the original drag item
            }
        });
    });

    if (checkDragDropBtn) {
        checkDragDropBtn.addEventListener('click', () => {
            const exerciseItems = document.querySelectorAll('.drag-drop-exercises .exercise-item');

            exerciseItems.forEach((item, index) => {
                const dropArea = item.querySelector('.drop-area');
                const feedbackElement = item.querySelector('.drag-drop-feedback');
                const correctSentence = dropArea.dataset.correctSentence.trim();

                let userSentenceParts = [];
                dropArea.querySelectorAll('.drop-target').forEach(target => {
                    userSentenceParts.push(target.textContent.trim());
                });
                const userSentence = userSentenceParts.join(' ').replace(/\s([.,!?;:])/, '$1'); // Clean up spaces before punctuation

                if (userSentence === correctSentence) {
                    feedbackElement.textContent = 'Correto! ✅';
                    feedbackElement.style.color = 'var(--inner-ai-success-color)';
                } else {
                    feedbackElement.textContent = `Incorreto. ❌ A frase correta é: "${correctSentence}".`;
                    feedbackElement.style.color = 'var(--inner-ai-error-color)';
                }
            });
        });
    }

    // --- Exercise Feedback for exercises.html ---

    // 1. Translation Exercise
    const translationItems = document.querySelectorAll('.translation-item');
    translationItems.forEach(item => {
        const input = item.querySelector('.translation-input');
        const checkButton = item.querySelector('.check-button');
        const feedbackMessage = item.querySelector('.feedback-message');
        const correctAnswer = checkButton.dataset.correctAnswer.toLowerCase().trim();

        checkButton.addEventListener('click', () => {
            const userAnswer = input.value.toLowerCase().trim();
            if (userAnswer === correctAnswer) {
                feedbackMessage.textContent = 'Correto! ✅';
                feedbackMessage.style.color = 'var(--inner-ai-success-color)';
            } else {
                feedbackMessage.textContent = `Incorreto. ❌ A resposta correta é: "${correctAnswer}".`;
                feedbackMessage.style.color = 'var(--inner-ai-error-color)';
            }
        });
    });

    // 2. Fill-in-the-Blanks Exercise
    const fillInItems = document.querySelectorAll('.fill-in-item');
    fillInItems.forEach(item => {
        const input = item.querySelector('.fill-in-input');
        const checkButton = item.querySelector('.check-button');
        const feedbackMessage = item.querySelector('.feedback-message');
        const correctAnswer = item.dataset.answer.toLowerCase().trim(); // Get correct answer from data-answer

        checkButton.addEventListener('click', () => {
            const userAnswer = input.value.toLowerCase().trim();
            if (userAnswer === correctAnswer) {
                feedbackMessage.textContent = 'Correto! ✅';
                feedbackMessage.style.color = 'var(--inner-ai-success-color)';
            } else {
                feedbackMessage.textContent = `Incorreto. ❌ A resposta correta é: "${correctAnswer}".`;
                feedbackMessage.style.color = 'var(--inner-ai-error-color)';
            }
        });
    });

    // --- DabyTalk Interaction (your_interaction.html) ---
    const startRecordingBtn = document.getElementById('startRecordingBtn');
    const stopRecordingBtn = document.getElementById('stopRecordingBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    const userTranscriptDiv = document.getElementById('userTranscript');
    const dabyFeedbackDiv = document.getElementById('dabyFeedback');
    const newConversationBtn = document.getElementById('newConversationBtn');

    let recognition; // SpeechRecognition object
    let isRecording = false;

    // Check for Web Speech API compatibility
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening
        recognition.interimResults = true; // Show results as they come in
        recognition.lang = 'en-US'; // Set language to English (US)

        recognition.onstart = () => {
            isRecording = true;
            recordingStatus.textContent = 'Recording... Speak now! 🎙️';
            recordingStatus.style.color = 'var(--inner-ai-link-color)';
            startRecordingBtn.disabled = true;
            stopRecordingBtn.disabled = false;
            userTranscriptDiv.innerHTML = '<p class="placeholder-text">Listening...</p>';
            dabyFeedbackDiv.innerHTML = '<p class="placeholder-text">Awaiting your speech for feedback...</p>';
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            userTranscriptDiv.innerHTML = `<p>${finalTranscript}<strong>${interimTranscript}</strong></p>`;
            userTranscriptDiv.scrollTop = userTranscriptDiv.scrollHeight; // Scroll to bottom

            // Simulate DabyTalk feedback based on final transcript
            if (finalTranscript.trim() !== '') {
                simulateDabyFeedback(finalTranscript.trim());
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            recordingStatus.textContent = `Recording error: ${event.error}. Please try again.`;
            recordingStatus.style.color = 'var(--inner-ai-error-color)';
            isRecording = false;
            startRecordingBtn.disabled = false;
            stopRecordingBtn.disabled = true;
        };

        recognition.onend = () => {
            if (isRecording) { // If recording was stopped by user, not by error
                recordingStatus.textContent = 'Recording finished. ✨';
                recordingStatus.style.color = 'var(--inner-ai-gradient-yellow)';
            }
            isRecording = false;
            startRecordingBtn.disabled = false;
            stopRecordingBtn.disabled = true;
        };

        startRecordingBtn.addEventListener('click', () => {
            recognition.start();
        });

        stopRecordingBtn.addEventListener('click', () => {
            recognition.stop();
        });

        newConversationBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            }
            userTranscriptDiv.innerHTML = '<p class="placeholder-text">Your spoken words will appear here...</p>';
            dabyFeedbackDiv.innerHTML = '<p class="placeholder-text">DabyTalk\'s corrections and explanations will appear here...</p>';
            recordingStatus.textContent = '';
            startRecordingBtn.disabled = false;
            stopRecordingBtn.disabled = true;
        });

    } else {
        recordingStatus.textContent = 'Your browser does not support the Speech Recognition API. Please use Chrome or Edge.';
        recordingStatus.style.color = 'var(--inner-ai-error-color)';
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = true;
    }

    // --- DabyTalk Feedback Simulation Logic ---
    function simulateDabyFeedback(transcript) {
        let feedbackText = '';
        let hasError = false;

        // Simple keyword-based feedback simulation
        if (transcript.toLowerCase().includes("i have got a meeting")) {
            feedbackText += "<p>Great use of 'I have got a meeting'! Sounds very natural. ✅</p>";
        } else if (transcript.toLowerCase().includes("i got a meeting")) {
            feedbackText += "<p>Excellent! 'I got a meeting' is super common and fluid. ✅</p>";
        } else if (transcript.toLowerCase().includes("i have a meeting")) {
            feedbackText += "<p>Correct! 'I have a meeting' is always a valid option. ✅</p>";
        } else if (transcript.toLowerCase().includes("he has got a report")) {
            feedbackText += "<p>Perfect! 'He has got a report' is correct. ✅</p>";
        } else if (transcript.toLowerCase().includes("he got a report")) {
            feedbackText += "<p>Very good! 'He got a report' is a concise and natural form. ✅</p>";
        } else if (transcript.toLowerCase().includes("i have got to go")) {
            feedbackText += "<p>Correct! 'I have got to go' expresses obligation naturally. ✅</p>";
        } else if (transcript.toLowerCase().includes("i got to go")) {
            feedbackText += "<p>Excellent! 'I got to go' is the most common and quick way to express obligation. ✅</p>";
        } else if (transcript.toLowerCase().includes("i have to go")) {
            feedbackText += "<p>Correct! 'I have to go' is always a valid option for obligation. ✅</p>";
        }
        else if (transcript.toLowerCase().includes("i is")) {
            feedbackText += "<p>Attention! The correct conjugation for 'I' is 'am', not 'is'. For example: 'I am working'. ❌</p>";
            hasError = true;
        } else if (transcript.toLowerCase().includes("he have")) {
            feedbackText += "<p>Careful! For 'He', the correct form is 'has', not 'have'. For example: 'He has a new project'. ❌</p>";
            hasError = true;
        } else if (transcript.toLowerCase().includes("we is")) {
            feedbackText += "<p>Attention! For 'We', the correct form is 'are', not 'is'. For example: 'We are ready'. ❌</p>";
            hasError = true;
        } else if (transcript.toLowerCase().includes("they is")) {
            feedbackText += "<p>Attention! For 'They', the correct form is 'are', not 'is'. For example: 'They are here'. ❌</p>";
            hasError = true;
        } else if (transcript.toLowerCase().includes("you is")) {
            feedbackText += "<p>Attention! For 'You', the correct form is 'are', not 'is'. For example: 'You are welcome'. ❌</p>";
            hasError = true;
        }
        else if (transcript.toLowerCase().includes("i got a new project")) {
            feedbackText += "<p>Great! 'I got a new project' is a natural and concise form. ✅</p>";
        }
        else if (transcript.toLowerCase().includes("she got a lot of experience")) {
            feedbackText += "<p>Excellent! 'She got a lot of experience' is a very common form. ✅</p>";
        }
        else if (transcript.toLowerCase().includes("have you got the report ready")) {
            feedbackText += "<p>Perfect! 'Have you got the report ready?' is a well-formed question. ✅</p>";
        }
        else if (transcript.toLowerCase().includes("has he got the latest report")) {
            feedbackText += "<p>Very good! 'Has he got the latest report?' is correct. ✅</p>";
        }
        else {
            feedbackText += "<p>Understood! Your pronunciation is clear. Keep practicing! 👍</p>";
            feedbackText += "<p>For more in-depth feedback, try phrases related to our 'have got'/'has got' topics or progressive tenses.</p>";
        }

        if (hasError) {
            dabyFeedbackDiv.innerHTML = `<p style="color:var(--inner-ai-error-color); font-weight:bold;">We've identified some points for improvement:</p>${feedbackText}`;
        } else {
            dabyFeedbackDiv.innerHTML = `<p style="color:var(--inner-ai-success-color); font-weight:bold;">DabyTalk Analysis:</p>${feedbackText}`;
        }
        dabyFeedbackDiv.scrollTop = dabyFeedbackDiv.scrollHeight; // Scroll to bottom
    }
});
