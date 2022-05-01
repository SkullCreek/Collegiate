const signup = () => {
    let sign_btn = document.getElementById("signbtn");
    let sign_btn2 = document.getElementById("signbtn2");
    let signup = document.getElementsByClassName("signup");
    let form = document.getElementById("form");
    sign_btn.onclick = () =>{
        signup[0].style.display = "grid";
        form.classList.remove("animate__bounceOut");
        form.classList.add("animate__bounceIn");
    }
    sign_btn2.onclick = () =>{
        signup[0].style.display = "grid";
        form.classList.remove("animate__bounceOut");
        form.classList.add("animate__bounceIn");
    }
    document.onclick = function(e){
        if(e.target.id == 'signup'){
            form.classList.remove("animate__bounceIn");
            form.classList.add("animate__bounceOut");
            setTimeout(function(){
                signup[0].style.display = 'none';
            },800);     
        }
    }
}
signup();