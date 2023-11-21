document.addEventListener("DOMContentLoaded", function() {
    const openChat = document.getElementById("openChat");
    const chatWindow = document.getElementById("chatWindow");
    const minimizeBtn = document.getElementById("minimizeBtn");
    const messagesContainer = document.getElementById("messagesContainer");
    const suggestedQuestions = document.getElementById("suggestedQuestions");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    let hasUsedSuggestedQuestion = false;

    openChat.addEventListener("click", function() {
        chatWindow.style.display = "block";
        chatWindow.style.transform = "translateX(0)";
        suggestedQuestions.style.display = "block";
        hasUsedSuggestedQuestion = false;
    });

    minimizeBtn.addEventListener("click", function() {
        chatWindow.style.transform = "translateX(100%)";
        suggestedQuestions.style.display = "none";
    });

    suggestedQuestions.addEventListener("click", function(event) {
        if (event.target.classList.contains("question") && !hasUsedSuggestedQuestion) {
            const selectedQuestion = event.target.getAttribute("data-question");
            sendMessage(selectedQuestion, true); // Tin nhắn từ người dùng
            suggestedQuestions.style.display = "none";
            hasUsedSuggestedQuestion = true;
        }
    });

    sendBtn.addEventListener("click", function() {
        sendMessage(messageInput.value, true); // Tin nhắn từ người dùng
        messageInput.value = "";
        hasUsedSuggestedQuestion = false;
        showSuggestedQuestions();
    });

    messageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Ngăn chặn việc xuống dòng trong input
            sendMessage(messageInput.value, true); // Tin nhắn từ người dùng
            messageInput.value = "";
            hasUsedSuggestedQuestion = false;
            showSuggestedQuestions();
        }
    });

    function sendMessage(message, isUserMessage) {
        const messageText = isUserMessage ? message : `Hỗ trợ: ${message}`;
        const messageElement = document.createElement("div");
        messageElement.textContent = messageText;

        if (isUserMessage) {
            messageElement.classList.add("user-message");
        } else {
            messageElement.classList.add("support-message");
        }

        messagesContainer.appendChild(messageElement);
        // Thực hiện xử lý logic của bạn ở đây để gửi tin nhắn đến người làm web

        if (!isUserMessage) {
            hideSuggestedQuestions();
        }
    }

    function submitQuestion() {
        var userInput = document.getElementById("user-input").value;
        var chatBody = document.getElementById("chat-body");
      
        // Thêm tin nhắn của người dùng vào chat body
        var userMessage = document.createElement("div");
        userMessage.className = "message user";
        userMessage.textContent = userInput;
        chatBody.appendChild(userMessage);
      
        // Gọi hàm để xử lý câu hỏi và thêm tin nhắn từ hỗ trợ
        processQuestion(userInput);
      }
      
      function processQuestion(question) {
        var chatBody = document.getElementById("chat-body");
      
        // Kiểm tra nếu câu hỏi giống với một trong các câu hỏi gợi ý
        if (question.toLowerCase().includes("Tại Sao tôi Không Đăng Được Bài Viết cho Thuê Trọ?")) {
          var answer = "Đây là câu trả lời cho câu hỏi gợi ý 1.";
        } else if (question.toLowerCase().includes("Tôi Cần Hỗ Trợ Rút Tiền")) {
          var answer = "Đây là câu trả lời cho câu hỏi gợi ý 2.";
        } else {
          // Xử lý câu hỏi bình thường và nhận kết quả từ hỗ trợ
          var answer = "Đây là câu trả lời từ hỗ trợ.";
        }
      
        // Thêm tin nhắn từ hỗ trợ vào chat body
        var supportMessage = document.createElement("div");
        supportMessage.className = "message support";
        supportMessage.textContent = answer;
        chatBody.appendChild(supportMessage);
      }

    function showSuggestedQuestions() {
        suggestedQuestions.style.display = "block";
    }

    function hideSuggestedQuestions() {
        suggestedQuestions.style.display = "none";
    }
});
