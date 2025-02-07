console.log("admin user");

const fileInput = document.querySelector("#image_file_input");
const imagePreview = document.querySelector("#upload_image_preview");

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Get the first selected file

  if (file) {
    const reader = new FileReader(); 

    // When the file is read, display the image                                        
    reader.onload = () => {                                                                  
      imagePreview.src = reader.result; 
    };
         
    //  below line executes first and then the above 2 lines executes if file is selected
    reader.readAsDataURL(file); // Read the file as a Data URL (base64)
  } else {
    imagePreview.src = ""; // Reset preview if no file selected
  }
});
