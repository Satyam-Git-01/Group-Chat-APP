const sendMessageBtn = document.getElementById("sendMessageBtn");
const messgaeInput = document.getElementById("inputMessage");

const postMessage = async (event) => {
  const messgaeInput = document.getElementById("inputMessage");
  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("groupId");
  if (messgaeInput.type == "text") {
    const messageText = messgaeInput.value;
    const result = axios.post(
      "http://localhost:4800/message/sendMessage",
      { messageText, groupId },
      { headers: { Authorization: token } }
    );
  } else {
    const file = messgaeInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    formData.append("token", token);
    formData.append("groupId", groupId);
    const result = axios.post(
      "http://localhost:4800/message/sendMessage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
  }
};

const onGroupView = async (id) => {
  localStorage.setItem("groupId", id);
  const data = await getAllMessages(id);
  console.log(data.messages);
  showGroupMessages(data.messages);
};

const showGroupMessages = (messages) => {
  const msgHistoryDiv = document.getElementById("msgHistory");
  msgHistoryDiv.textContent = "";
  messages.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("incoming_msg");
    if (item.messageContent.includes("http")) {
      div.innerHTML = `<div class="received_msg">
      <div class="received_withd_msg">
      <span class="time_date">${item.senderName}</span>      
        <img src='${item.messageContent}' width="40px;" height="40px;"></img>
        </div> </div>`;
    } else {
      div.innerHTML = `<div class="received_msg">
      <div class="received_withd_msg">
      <span class="time_date">${item.senderName}</span>      
        <p>${item.messageContent}</p>
        </div> </div>`;
    }
    msgHistoryDiv.appendChild(div);
  });
};

const getAllMessages = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const groupId = localStorage.getItem("groupId");
    if (groupId == null) {
      groupId = id;
    }
    const result = await axios.get(
      `http://localhost:4800/message/getAllMessages/${groupId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

socket.on("DonePost", (data) => {
  onGroupView(localStorage.getItem("groupId"));
});

socket.on("DoneGroup", () => {
  getAllGroupsForUser();
});

socket.on("left-group", () => {
  getAllGroupsForUser();
});

const createGroup = async (event) => {
  try {
    event.preventDefault();
    const name = event.target.groupName.value;
    const members = event.target.membersInput.value.split(",");
    members.forEach((item, index, members) => {
      members[index] = item.trim();
    });
    const token = localStorage.getItem("token");

    const result = await axios.post(
      "http://localhost:4800/group/createGroup",
      { name, members },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    event.target.groupName.value = "";
    event.target.membersInput.value = "";
  } catch (err) {
    console.log(err);
  }
};

const getAllGroupsForUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get(
      "http://localhost:4800/group/getAllGroupsForUser",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    showGroups(result.data);
    //console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const attachClick = () => {
  const attachedBtn = document.getElementById("attchedBtn");
  const inputTag = document.getElementById("inputMessage");
  inputTag.removeAttribute("type");
  inputTag.setAttribute("type", "file");
};

const getGroupInfoPage = async (event, id) => {
  localStorage.setItem("groupId", id);
  event.stopPropagation();
  console.log(id);
  window.location.href = "group/getGroupInfoPage";
};

const deleteGroup = async (event, id) => {
  event.stopPropagation();
  console.log(event);
  try {
    const token = localStorage.getItem("token");
    const result = await axios.delete(
      `http://localhost:4800/group/deleteGroup/${id}/0`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("groupId");
  window.location.href = "/";
};

const logoutBtn = document.getElementById("logoutbtn");
logoutBtn.addEventListener("click", logout);
const showGroups = (groups) => {
  const groupList = document.getElementById("listOfGroups");
  groupList.textContent = "";
  groups.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("data-groupId", item.id);
    div.classList.add("chat_people");
    div.addEventListener("click", () => onGroupView(item.id));
    //need to check if listener and delete work bubbling or not
    div.innerHTML = `<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="Icon"> </div>
    <div class="chat_ib">
    <div class="gNameIcon"> <div class="iconsDiv"><h5>${item.groupName}</div> <div><span class="chat_tray" onclick="getGroupInfoPage(event,${item.id})"><i class="fa-solid fa-circle-info"></i></span><span class="chat_tray" onclick="deleteGroup(event,${item.id})"><i class="fa-solid fa-arrow-right-from-bracket" title="Leave"></i></span></div>
      </div><p>Recent Messages....</p>
    </div>`;
    groupList.appendChild(div);
  });
  localStorage.setItem("groupId", 1);
};

sendMessageBtn.addEventListener("click", () => postMessage(event));
document.addEventListener("DOMContentLoaded", getAllGroupsForUser);
document.addEventListener("DOMContentLoaded", () => getAllMessages(1));
