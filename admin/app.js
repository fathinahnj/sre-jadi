document.addEventListener("DOMContentLoaded", () => {
  const endpoints = {
    "innovation-table": "https://sreunhas.id/api/v1/siclus/innovation-paper",
    "photography-table": "https://sreunhas.id/api/v1/siclus/photography",
    "studycase-table": "https://sreunhas.id/api/v1/siclus/study-case",
  };

  document.getElementById("innovation-table").classList.add("active");
  document.querySelector(".tab-button").classList.add("active");

  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      buttons.forEach((b) => {
        b.classList.remove("active");
      });
      button.classList.add("active");

      const targetId = button.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });

  const exportButtons = document.querySelectorAll(".export-button");
  exportButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tableId = button.getAttribute("data-table");
      exportTableToExcel(tableId);
    });
  });

  for (const [tableId, url] of Object.entries(endpoints)) {
    fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        console.log(data);
        populateTable(tableId, data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});

function populateTable(tableId, data) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = ""; // Clear existing table body content

  data.forEach((item) => {
    const row = document.createElement("tr");

    for (const key in item) {
      const cell = document.createElement("td");
      if (
        key.endsWith("Card") ||
        key.startsWith("proofOf") ||
        key === "originalitySheet" ||
        key === "abstract" ||
        key === "paymentProof" ||
        key.toLowerCase().includes("photograph") ||
        key === "description" ||
        key.toLowerCase().includes("twibbon")
      ) {
        const link = document.createElement("a");
        link.href = item[key];
        link.textContent = "Download";
        link.classList.add("download-link");
        link.setAttribute("download", "");
        cell.setAttribute("data-url", item[key]);
        cell.appendChild(link);
      } else {
        cell.textContent = item[key];
      }
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
}

function exportTableToExcel(tableId) {
  const table = document.getElementById(tableId);
  const tableClone = table.cloneNode(true); // Clone the table to avoid modifying the original

  // Replace the "Download" text with the actual URLs in the cloned table
  const cells = tableClone.querySelectorAll("td[data-url]");
  cells.forEach((cell) => {
    cell.textContent = cell.getAttribute("data-url");
  });

  const wb = XLSX.utils.table_to_book(tableClone, { sheet: "Sheet JS" });
  XLSX.writeFile(wb, `${tableId}.xlsx`);
}
