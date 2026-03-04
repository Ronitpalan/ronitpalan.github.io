let knowledge = {};

async function loadKnowledge() {
    const response = await fetch('/assets/data/knowledge.json');
    knowledge = await response.json();
}

function findBestMatch(message) {
    message = message.toLowerCase();

    let bestMatch = null;
    let highestScore = 0;

    for (let key in knowledge) {
        let score = 0;
        knowledge[key].keywords.forEach(keyword => {
            if (message.includes(keyword)) {
                score++;
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestMatch = key;
        }
    }

    return bestMatch;
}

function sendMessage() {
    const input = document.getElementById("input");
    const messages = document.getElementById("messages");
    const userMessage = input.value;

    if (!userMessage) return;

    messages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    const match = findBestMatch(userMessage);

    if (match) {
        const response = knowledge[match];
        messages.innerHTML += `
            <p><strong>Bot:</strong></p>
            <p><b>${response.title}</b></p>
            <p>${response.content}</p>
        `;
    } else {
        messages.innerHTML += `
            <p><strong>Bot:</strong> I can answer questions about CI/CD, Monitoring, Infrastructure, Automation, and AI in DevOps.</p>
        `;
    }

    input.value = "";
}

loadKnowledge();
