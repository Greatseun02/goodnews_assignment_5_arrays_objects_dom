const button = document.querySelectorAll(".button");
const alerts = document.querySelectorAll(".label");
const cancels = document.querySelectorAll(".cancel");

button.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        
        alerts.forEach((alert)=>{
            if(btn.classList.contains("success") && alert.id ==="success"){
                alert.classList.remove("hidden");
                setTimeout(()=>{
                    alert.classList.add("hidden");
                }, 3000)
            }else if(btn.classList.contains("error") && alert.id ==="error"){
                alert.classList.remove("hidden");
                setTimeout(()=>{
                    alert.classList.add("hidden");
                }, 3000)
            }else if(btn.classList.contains("warning") && alert.id ==="warning"){
                alert.classList.remove("hidden");
                setTimeout(()=>{
                    alert.classList.add("hidden");
                }, 3000)
            }
        })
        
    })
})

cancels.forEach(cancel=>{
    cancel.addEventListener("click", (e)=>{
        alerts.forEach((alert)=>{
            if(cancel.parentElement?.id === "success" && alert.id ==="success"){
                alert.classList.add("hidden");
            }else if(cancel.parentElement?.id === "error" && alert.id ==="error"){
                alert.classList.add("hidden");
            }else if(cancel.parentElement?.id === "warning" && alert.id ==="warning"){
                alert.classList.add("hidden");
            }
        })
    })
})