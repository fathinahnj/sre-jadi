document.addEventListener("DOMContentLoaded", () => {
  const photographyForm = document.getElementById("photography-form");

  console.log(photographyForm);

  photographyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(photographyForm);

    try {
      const response = await fetch(
        "https://sreunhas.id/api/v1/siclus/photography",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);

      
      alert("Your information has been submitted successfully!");

      document.querySelector(".main.active").classList.remove("active");
      document.querySelector(".main:last-child").classList.add("active");
    } catch (error) {
      console.error("There was a problem with your submission:", error);
    }
  });
});
