console.log("Contacts.js");
const baseURL = "http://localhost:8081";
const viewContactModal = document.getElementById("view_contact_modal");
const options = {
  placement: "bottom-right",
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("modal is hidden");
  },
  onShow: () => {
    console.log("modal is shown");
  },
  onToggle: () => {
    console.log("modal has been toggled");
  },
};

// instance options object
const instanceOptions = {
  id: "view_contact_modal",
  override: true,
};

const contactModal = new Modal(viewContactModal, options, instanceOptions);

function openContactModal() {
  contactModal.show();
}

function closeContactModal() {
  contactModal.hide();
}

async function loadContactdata(id) {
    console.log(id);
    try {
      const data = await (await fetch(`${baseURL}/api/contacts/${id}`)).json();
      console.log(data);
  
      const contactName = document.querySelector("#contact_name");
      const contactEmail = document.querySelector("#contact_email");
      const contactAddress = document.querySelector("#contact_address");
      const contactPhone = document.querySelector("#contact_phone");
      const contactAbout = document.querySelector("#contact_about");
      const contactFavorite = document.querySelector("#contact_favorite");
      const contactWebsite = document.querySelector("#contact_website");
      const contactLinkedIn = document.querySelector("#contact_linkedIn");
      const contactImage = document.querySelector("#contact_image");  // Adding profile picture

      if (contactName) contactName.innerHTML = data.name;
      if (contactEmail) contactEmail.innerHTML = data.email;
      if (contactAddress) contactAddress.innerHTML = data.address;
      if (contactPhone) contactPhone.innerHTML = data.phoneNumber;
      if (contactAbout) contactAbout.innerHTML = data.description;
  
      if (contactFavorite) {
        if (data.favorite) {
          contactFavorite.innerHTML =
            "<i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i>";
        } else {
          contactFavorite.innerHTML = "Not Favorite Contact";
        }
      }
  
      if (contactWebsite) {
        contactWebsite.href = data.websiteLink;
        contactWebsite.innerHTML = data.websiteLink;
      }
  
      if (contactLinkedIn) {
        contactLinkedIn.href = data.linkedInLink;
        contactLinkedIn.innerHTML = data.linkedInLink;
      }

      if (contactImage) contactImage.src = data.picture;  // Setting the profile picture

      openContactModal();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function deleteContact(id){
    Swal.fire({
        title: "Do you want to delete the contact?",
        icon:"warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const url = `${baseURL}/user/contacts/delete/` + id;
          window.location.replace(url);
        } 
      });  }
