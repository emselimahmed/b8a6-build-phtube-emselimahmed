const myHandleCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);

    const data = await response.json();

    const tabContainer = document.getElementById("nav-container");

    const fromApiData = data.data
    fromApiData.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="myHandleLoad('${category.category_id}')" class="tab mr-2 rounded bg-[#808080] active:bg-[#FF0000] text-[#252525] text-base font-medium">${category.category}</a>
        `;

        tabContainer.appendChild(div);
    });


};

const myHandleLoad = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById("card-container");
    const noContentDrawing = document.getElementById("no-content-drawing");
    const contentDrawing = document.getElementById("content-drawing");

    cardContainer.innerHTML = "";

    data.data.forEach((myShow) => {

        const div = document.createElement('div');

        const myDate = myShow.others.posted_date;
        function secondsToHrs(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours} hrs ${minutes} mins ago`;
        }



        div.innerHTML = `        
            <div class="card w-full bg-base-100 pb-5 shadow-sm">
                        <figure><img class="w-80 h-52 object-cover" src=${myShow?.thumbnail} alt="" /></figure>
                        <div class="flex flex-row gap-3 mt-5">
                            <div class="pl-4">
                                <img class="w-10 h-10 object-fill rounded-full overflow-hidden" src=${myShow.authors[0].profile_picture} alt="">
                                
                            </div>
                            <div class="pr-3">
                                <h2 class="card-title">${myShow.title}</h2>
                                <h2 class="card-title text-[#808080] text-sm font-normal py-2">
                                ${myShow.authors[0].profile_name}
                                <div>${myShow.authors[0].verified ? '<img src="./images/fi_10629607.png"/>' : ''}</div>
                                </h2>
                                <h2 class="text-[#808080] text-sm font-normal">
                                    ${myShow.others.views}
                                    ${myDate ?
                `
                                        <div class="badge badge-neutral rounded ml-3 p-2 text-[10px] normal-case font-normal text-white">
                                            ${secondsToHrs(myDate)}
                                        </div>
                                        ` : ''}
                                </h2>
                            </div>
                        </div>
                    </div>
            `;

        cardContainer.appendChild(div);
    });



    if (categoryId === "1005" && data.data.length === 0) {
        noContentDrawing.classList.remove("hidden");
        contentDrawing.classList.add("hidden");
    } else {
        noContentDrawing.classList.add("hidden");
        contentDrawing.classList.remove("hidden");

        data.data.forEach((show) => {
            const div = document.createElement('div');
            cardContainer.appendChild(div);
        });
    }
}



    myHandleCategory();
    myHandleLoad("1000");