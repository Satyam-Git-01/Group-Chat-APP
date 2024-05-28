const showGroupInfo = (group) => {
  const groupNameDiv = document.getElementById("groupName");
  groupNameDiv.innerHTML = `<h4> ${group.groupName} </h4>`;
};

const deleteFromGroup = async (event, id) => {
  //console.log('Reached Delete')
  event.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const groupId = localStorage.getItem("groupId");
    const result = await axios.delete(
      `http://13.53.97.38:4800/group/deleteGroup/${groupId}/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // console.log(groupId + " " + id);
    window.location.reload("/");
  } catch (err) {
    console.log(err);
  }
};

const showGroupMemberInfo = (members) => {
  const tableBody = document.getElementById("table_body");
  //console.log(members);
  members.forEach((member, index) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerHTML = `${index + 1}`;
    const td1 = document.createElement("td");
    td1.innerHTML = `${member.user.name}`;
    const td2 = document.createElement("td");
    td2.innerHTML = `${member.isAdmin}`;
    const td3 = document.createElement("td");
    td3.innerHTML = `<button class='btn btn-danger' onclick="deleteFromGroup(event,${member.userId})">Delete Memeber </button> <button class='btn btn-success' onclick="makeAdmin(event,${member.memberId})">Make Admin</button>`;
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableBody.appendChild(tr);
  });
};

const makeAdmin = async (event, memberId) => {
  console.log("Reached ake admin")
  const groupId = localStorage.getItem("groupId");
  const token = localStorage.getItem("token");
  try {
    const result = await axios.put(
      "http://13.53.97.38:4800/group/makeAdmin",
      { memberId, groupId },
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

const isAdmin = async () => {
  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("groupId");
  const result = await axios.get(
    `http://13.53.97.38:4800/group/isAdmin/${groupId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(result);
  const buttons = document.getElementsByTagName("button");
  if (result.data.isAdmin === false) {
    //console.log("False")
    for (let item of buttons) {
      console.log(item);
      item.disabled = true;
    }
  }
  //console.log(buttons)
};

socket.on("DoneGroup", () => {
  window.location.reload("/");
});

socket.on("admin-made", () => {
  window.location.reload("/");
});

const AddMembers = async (event) => {
  event.preventDefault();
  //console.log("reched")
  try {
    const groupId = localStorage.getItem("groupId");
    const members = event.target.membersInput.value.split(",");
    members.forEach((item, index, members) => {
      members[index] = item.trim();
    });
    const token = localStorage.getItem("token");
    const result = await axios.post(
      "http://13.53.97.38:4800/group/addMember",
      { groupId, members },
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

const getGroupInfo = async (id) => {
  try {
    const result = await axios.get(`http://13.53.97.38:4800/group/getInfo/${id}`);
    //   console.log(result);
    showGroupInfo(result.data.groupInfo);
    showGroupMemberInfo(result.data.groupMemberInfo);
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("groupId");
  // console.log(id);
  getGroupInfo(id);
  isAdmin();
});


