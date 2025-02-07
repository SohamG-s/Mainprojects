package com.scm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.scm.entities.User;
import com.scm.forms.UserForm; // Add this import statement
import com.scm.helpers.Message;
import com.scm.helpers.MessageType;
import com.scm.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@Controller
public class PageController {


    @Autowired
private UserService userService;

@GetMapping("/")
public String index(){
return "redirect:/home";
}

    @RequestMapping("/home")
    public String home(Model model) {
        model.addAttribute("name", "substring technologies");
        model.addAttribute("utube", "learn coding");

        System.out.println("home page");
        return "home";
    }

    @RequestMapping("/about")
    public String aboutPage(Model model){
        model.addAttribute("islogin", true);
        System.out.println("About page loading");
        return "about";
    }

    @RequestMapping("/services")
    public String servicePage(){
        System.out.println("service page loading");
        return "services";
    }

    @GetMapping("/contact")
    public String contact(){
        return new String("contact");
    }

    @GetMapping("/login")
    public String login(){
        return new String("login");
    }

    @GetMapping("/register")
    public String register(Model model){

        UserForm userForm = new UserForm();
        // Initialize UserForm object properly
        // userForm.setName("Soham"); // Example initialization, replace with actual fields
        // userForm.setEmail("sakpalsoham8@gmail.com"); // Example initialization, replace with actual fields
        // userForm.setPhoneNumber("88888"); // Example initialization, replace with actual fields
        // userForm.setAbout("crazy"); // Example initialization, replace with actual fields

        model.addAttribute("userForm", userForm);
        return new String("register");
    }

// processing register
// form data comes in here
@RequestMapping(value = "/do-register",method = RequestMethod.POST)
public String processRegister(@Valid @ModelAttribute UserForm userForm, BindingResult rBindingResult, HttpSession session){
    System.out.println("processing registration");
    // fetch form data
    // userform
    System.out.println(userForm);

    // validate form data
if (rBindingResult.hasErrors()){
    return "register";
}
    
    // save to database
    // User user = User.builder()
    // .name(userForm.getName())
    // .email(userForm.getEmail())
    // .phoneNumber(userForm.getPhoneNumber())
    // .about(userForm.getAbout())
    // .password(userForm.getPassword())
    // .profilePic("https://avatars.githubusercontent.com/u/181449442?v=4")
    // .build();

    User user = new User();
    user.setName(userForm.getName());
    user.setEmail(userForm.getEmail());
    user.setPhoneNumber(userForm.getPhoneNumber());
    user.setEnabled(false);
    user.setAbout(userForm.getAbout());
    user.setPassword(userForm.getPassword());
    user.setProfilePic("https://avatars.githubusercontent.com/u/181449442?v=4");



    User savedUser= userService.saveUser(user);
    System.out.println("User saved: ");
    // message = "Registration successful"

   Message message = Message.builder().content("Registration Successful").type(MessageType.green).build();
    session.setAttribute("message",message);

    // redirect to login
    return "redirect:/register";
}
}
