window.IDBTransaction;
window.IDBKeyRange;
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
    signup[0].onclick = function(e){
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


const login = () => {
    let log_btn = document.getElementById("logbtn");
    let login = document.getElementsByClassName("login");
    let form2 = document.getElementById("form2");
    log_btn.onclick = () =>{
        login[0].style.display = "grid";
        form2.classList.remove("animate__bounceOut");
        form2.classList.add("animate__bounceIn");
    }
    login[0].onclick = function(e){
        if(e.target.id == 'login'){
            form2.classList.remove("animate__bounceIn");
            form2.classList.add("animate__bounceOut");
            setTimeout(function(){
                login[0].style.display = 'none';
            },800);     
        }
    }
}
login();

const sign_sbt = () => {
    let signemail = document.getElementById("sign_email");
    let signpassword = document.getElementById("sign_password");
    let form = document.getElementById("form");
    
    form.onsubmit = () => {
        
        var database =  window.indexedDB.open("College",2);
        database.onsuccess = () => {
            let signup = document.getElementsByClassName("signup");
            
            form.classList.remove("animate__bounceIn");
            form.classList.add("animate__bounceOut");
            setTimeout(function(){
                signup[0].style.display = 'none';
                signemail.value = "";
                signpassword.value = "";
            },800);
            
        }
        database.onerror = () => {
            alert("error");
        }
        database.onupgradeneeded = () => {
            var data2 = {
                email: signemail.value,
                password: signpassword.value
            }
            var idb_1 = database.result;
            var object = idb_1.createObjectStore("about_college",{keyPath: "email"});
            object.add(data2);
        }
        
        return false;
    }   
}

sign_sbt();

const log_sbt = () => {
    let logemail = document.getElementById("login_email");
    let logpassword = document.getElementById("login_password");
    let form2 = document.getElementById("form2");
    form2.onsubmit = () => {
        let login_data = {
            username: logemail.value,
            password: logpassword.value
        }

        let json_data = JSON.stringify(login_data);
        sessionStorage.setItem("login", json_data);
        if(sessionStorage.getItem("login") != null){
            var user_database = window.indexedDB.databases();
            user_database.then((pending_obj) => {
                var i;
                for(i=0;i<pending_obj.length;i++){
                    var db_name = pending_obj[i].name;
                    var database = window.indexedDB.open(db_name);
                    database.onsuccess = () => {
                        var idb = database.result;
                        var permission = idb.transaction("about_college","readwrite");
                        var access = permission.objectStore("about_college");
                        var json_data = access.get(login_data.username);
                        json_data.onsuccess = function(){
                            var user = json_data.result;
                            if(user){
                                var db_username = user.email;
                                var db_password = user.password;
                                var session_data = JSON.parse(sessionStorage.getItem("login"));
                                if(session_data.username == db_username){
                                    if(session_data.password == db_password){
                                        window.location = "../sidePages/home.html";
                                    }
                                    else{
                                        form2.classList.remove("animate__bounceIn");
                                        form2.classList.add("animate__shakeX");
                                        setTimeout(function(){
                                            form2.classList.remove("animate__shakeX");
                                            form2.classList.add("animate__bounceIn");
                                            logemail.value="";
                                            logpassword.value="";
                                        },800);
                                    }
                                }
                                else{
                                    form2.classList.remove("animate__bounceIn");
                                    form2.classList.add("animate__shakeX");
                                    setTimeout(function(){
                                        form2.classList.remove("animate__shakeX");
                                        form2.classList.add("animate__bounceIn");
                                        logemail.value="";
                                        logpassword.value="";
                                    },800);
                                }
                            }
                            else{
                                form2.classList.remove("animate__bounceIn");
                                form2.classList.add("animate__shakeX");
                                setTimeout(function(){
                                    form2.classList.remove("animate__shakeX");
                                    form2.classList.add("animate__bounceIn");
                                    logemail.value="";
                                    logpassword.value="";
                                },800);
                            }
                        }
                    }
                }
            }); 
        }
        else{
            form2.classList.remove("animate__bounceIn");
            form2.classList.add("animate__shakeX");
            setTimeout(function(){
                form2.classList.remove("animate__shakeX");
                form2.classList.add("animate__bounceIn");
                logemail.value="";
                logpassword.value="";
            },800);
        }
        return false;
    }
}
log_sbt();
