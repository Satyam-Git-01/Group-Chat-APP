const sendMessageBtn = document.getElementById("sendMessageBtn");
const messgaeInput = document.getElementById("inputMessage");
const postMessage = async () => {
  const messageText = messgaeInput.value;
 // console.log("Reached");
  const token = localStorage.getItem("token");
  const result = axios.post(
    "http://localhost:4800/message/sendMessage",
    { messageText },
    { headers: { Authorization: token } }
  );
  window.location.reload('/')
};

const getAllMessages = async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:4800/message/getAllMessages",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(result);
    console.log(result.data)
    showMessages(result.data.messages)
  } catch (err) {
    console.log(err);
  }
};

const showMessages = (data) => {
  const messageList = document.getElementById("messageList");
  messageList.textContent = "";
  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.senderName} : ${item.messageContent};`;
    messageList.appendChild(li);
  });
};

//setInterval(getAllMessages,3000);

sendMessageBtn.addEventListener("click", postMessage);

document.addEventListener("DOMContentLoaded", getAllMessages);
