let itemList = document.querySelectorAll("section");

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
let CommentHandler = {
    commentForm: document.querySelector(".comment__form"),
    commentView: document.querySelector(".comments__container"),
    commentList: [],

    appendComment: function (name, email, comment) {
        let outer = document.createElement("div");
        let inner = `<h4 class="name__view">${name}</h4>
                     <p class="email__view">${email}</p>
                     <p>${comment}</p>`;
        outer.classList.add("comment");
        outer.innerHTML = inner;

        this.commentView.append(outer)
    },

    verifyForm: function (e) {
        e.preventDefault()
        let name = this.commentForm.querySelector("#name").value;
        let email = this.commentForm.querySelector("#email").value;
        let comment = this.commentForm.querySelector("#comment__text").value;
        if (!name) {
            alert("You need to input a name");
            return;
        }
        if ((!email) || (!email.includes("@"))) {
            alert("You need to input a valid email");
            return;
        }
        if (!comment) {
            alert("You need to input a comment");
            return;
        }
        let comData = [name, email, comment];
        this.saveToLocal(comData)
        this.appendComment(...comData);
        this.commentForm.querySelector("#name").value = "";
        this.commentForm.querySelector("#email").value = "";
        this.commentForm.querySelector("#comment__text").value = "";
    },

    saveToLocal: function (comment) {
        this.commentList.push(comment);
        localStorage.setItem("comments", JSON.stringify(this.commentList));
    },

    loadLocal: function () {
        if (!localStorage.getItem("comments")) return;
        this.commentList = JSON.parse(localStorage.getItem("comments"));
        this.commentList.forEach((item)=>{this.appendComment(...item)});
    },
}
// let commentForm = document.querySelector(".comment__form");
// let commentView = document.querySelector(".comments__container");
// let commentList = [];


function main() {
    Navbar.makeNavBar();
    Navbar.navbarDOM.addEventListener("click", Navbar.scroller);
    document.addEventListener("scroll", setActive);
    CommentHandler.commentForm.querySelector("#submit").addEventListener("click", CommentHandler.verifyForm.bind(CommentHandler));
    CommentHandler.loadLocal()
}
main();