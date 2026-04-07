 
let allIssues = [];


 
function loadData(searchText = "") {

  const loader = document.getElementById("loader");
  const container = document.getElementById("issueContainer");

  loader.classList.remove("hidden");
  container.innerHTML = "";

 
  let url = "";

  if (searchText === "") {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  } else {
    url = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=" + searchText;
  }

 
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {

      if (data.data) {
        allIssues = data.data;
      } else {
        allIssues = [];
      }

      displayData(allIssues);
    })
    .catch(function (error) {
      console.log("error:", error);
    })
    .finally(function () {
      loader.classList.add("hidden");
    });
}


 
function displayData(data) {

  const container = document.getElementById("issueContainer");
  const count = document.getElementById("issueCount");

  container.innerHTML = "";
  count.innerText = data.length;

  for (let i = 0; i < data.length; i++) {

    const issue = data[i];

    let status = issue.status;
    if (!status) status = "open";

    let priority = issue.priority;
    if (!priority) priority = "low";

    let title = issue.title;
    if (!title) title = "No Title";

    let desc = issue.description;
    if (!desc) desc = "No description";

    let author = "Unknown";
    if (issue.author) {
      author = issue.author.split(" ")[0];
    }

    let id = "0";
    if (issue.id) {
      id = String(issue.id).slice(0, 6);
    }

 
    let borderClass = "border-t-[#10B981]";
    if (status === "closed") {
      borderClass = "border-t-[#8B5CF6]";
    }

 
    let priorityStyle = "bg-gray-100 text-gray-500";
    if (priority.toLowerCase() === "high") {
      priorityStyle = "bg-red-100 text-red-500";
    } else if (priority.toLowerCase() === "medium") {
      priorityStyle = "bg-yellow-100 text-yellow-500";
    }
 
    const card = document.createElement("div");

    card.className =
      "bg-white p-5 rounded-xl border-t-4 " + borderClass;

    card.innerHTML = `
      <h3 class="font-bold mb-2">${title}</h3>
      <p class="text-sm text-gray-400 mb-3">${desc}</p>
      <p class="text-xs text-gray-500">#${id} by ${author}</p>
    `;

 
    card.onclick = function () {
      showDetails(issue.id);
    };

    container.appendChild(card);
  }
}


 
function showDetails(id) {

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/" + id)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {

      const issue = data.data;

      const modal = document.getElementById("modalContent");

      modal.innerHTML = `
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">${issue.title}</h2>
          <p class="mb-4">${issue.description}</p>
          <p class="text-sm text-gray-500">By ${issue.author}</p>
          <button onclick="issueModal.close()" class="btn btn-primary mt-4">
            Close
          </button>
        </div>
      `;

      document.getElementById("issueModal").showModal();
    });
}


 
function handleSearch() {
  const text = document.getElementById("searchInput").value;
  loadData(text);
}


 
function filterData(status, btn) {

  const buttons = document.querySelectorAll(".tab-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("bg-blue-600", "text-white");
  }

  btn.classList.add("bg-blue-600", "text-white");

  if (status === "all") {
    displayData(allIssues);
  } else {

    let newData = [];

    for (let i = 0; i < allIssues.length; i++) {
      if (allIssues[i].status === status) {
        newData.push(allIssues[i]);
      }
    }

    displayData(newData);
  }
}


loadData();