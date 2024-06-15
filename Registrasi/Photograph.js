document.addEventListener("DOMContentLoaded", () => {
    const photographyForm = document.getElementById("photography-form");
  
    photographyForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = new FormData(photographyForm);
  
      formData.delete("payment_method");
  
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
  
        // Display success message and proceed to the next step or reset the form
        alert("Your information has been submitted successfully!");
  
        // Optionally, show the congratulations screen
        document.querySelector(".main.active").classList.remove("active");
        document.querySelector(".main:last-child").classList.add("active");
      } catch (error) {
        console.error("There was a problem with your submission:", error);
      }
    });
  });
  