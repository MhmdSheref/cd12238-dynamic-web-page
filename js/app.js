let itemList = document.querySelectorAll("section");
let commentForm = document.querySelector(".comment__form");
let commentView = document.querySelector(".comments__container");

let Navbar = {

    navbarDOM: document.querySelector("#navbar__list"),

    makeNavBar: function () {
        itemList.forEach((ele) => {
            let anchor = document.createElement("a");
            let listItem = document.createElement("li");
            if (ele.dataset["nav"]) anchor.innerText = ele.dataset["nav"];
            else anchor.innerText = ele.querySelector("h2").innerText;

            anchor.setAttribute("href", "#" + ele.id);
            anchor.classList.add("menu__link");
            listItem.append(anchor);
            this.navbarDOM.append(listItem);
        })
        },

    scroller: function (event) {
        let target = event.target
        if (!target.classList.contains("menu__link")) return;
        event.preventDefault();
        document.querySelector(target.getAttribute("href")).scrollIntoView({behavior: "smooth"});
    }
}

function setActive() {
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].getBoundingClientRect().top + itemList[i].getBoundingClientRect().height/2 > 0) {
            itemList[i].classList.add("active");
        }else {
            itemList[i].classList.remove("active");
        }
    }
}

function appendComment(name, email, comment) {
    let outer = document.createElement("div");
    let inner = `<h4 class="name__view">${name}</h4>
                 <p class="email__view">${email}</p>
                 <p>${comment}</p>`;
    outer.classList.add("comment");
    outer.innerHTML = inner;

    commentView.append(outer)
}
function verifyForm(e) {
    e.preventDefault()
    let name = commentForm.querySelector("#name").value;
    let email = commentForm.querySelector("#email").value;
    let comment = commentForm.querySelector("#comment__text").value;
    if (!name) {
        alert("You need to input a name");
        return;
    }
    if ((!email) || (!email.includes("@"))) {
        alert("You need to input a valid email")
        return;
    }
    if (!comment) {
        alert("You need to input a comment")
        return;
    }
    appendComment(name, email, comment)
}


function main() {
    Navbar.makeNavBar();
    Navbar.navbarDOM.addEventListener("click", Navbar.scroller);
    document.addEventListener("scroll", setActive);
    commentForm.querySelector("#submit").addEventListener("click", verifyForm)
}
main();