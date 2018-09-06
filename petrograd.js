const prodLink = "https://kea-alt-del.dk/t5/api/productlist";
const catLink = "https://kea-alt-del.dk/t5/api/categories";
const imgbase = "https://kea-alt-del.dk/t5/site/imgs/";
const template = document.querySelector("#myTemplate").content;
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const allLink = document.querySelector("#allLink");

allLink.addEventListener("click", ()=> filterBy("all"));


fetch(catLink).then(promise => promise.json()).then(data => buildCategories(data));

function buildCategories(data) {
    data.forEach(category => {
        const newSection = document.createElement("section");
        const newH2 = document.createElement("img");
        const newLink = document.createElement("a");
        newLink.href = "#";
        newLink.textContent = category;
        newLink.addEventListener("click", () => filterBy(category));
        newSection.id = category;
        //newH2.textContent = category;
        newH2.src = "elements/"+category+".png";
        console.log("elements/"+ category+".png")
        nav.appendChild(newLink);
        newSection.appendChild(newH2);
        main.appendChild(newSection);
    });



fetch(prodLink).then(promise => promise.json()).then(data => show(data));
}

function filterBy(category) {

    document.querySelectorAll("section").forEach(section => {
        if (section.id == category || category == "all") {
            section.classList.remove("hide");
        } else {
            section.classList.add("hide");
        }
    })
}

function show(plist) {
    plist.forEach(product => {
        const parent = document.querySelector('#' + product.category);
        const clone = template.cloneNode(true);
        clone.querySelector(".name").textContent = product.name;
        clone.querySelector(".photo img").src = imgbase + "small/" + product.image + "-sm.jpg";
        clone.querySelector(".description").textContent = product.shortdescription;
        clone.querySelector(".price").textContent = product.price + ",00 kr";
        if (product.discount) {
            const newPrice = Math.round(product.price - product.price * product.discount / 100)
            clone.querySelector(".price").textContent = newPrice + ",00 kr";
            clone.querySelector(".dishes1").classList.add("filter-discount")
        } else {
            clone.querySelector(".sale").classList.add("hide");
        }


        if (product.vegetarian) {
            clone.querySelector(".veg");
        } else {
            clone.querySelector(".veg").classList.add("hide");
        }

        if (product.soldout) {
            clone.querySelector(".soldout");
        } else {
            clone.querySelector(".soldout").classList.add("hide");
        }
        if (product.alcohol) {
            clone.querySelector(".alcohol");
        } else {
            clone.querySelector(".alcohol").classList.add("hide");
        }

        parent.appendChild(clone);

    });
}

document.querySelector("#filter").addEventListener("click", () => {
    document.querySelectorAll(".dishes1").forEach(section => {

        if (section.classList.contains('filter-discount')) {
            section.classList.Add("hide")
        }
    })
})
