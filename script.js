let flowers = [];

let currentPage = 0;


/* -------------------------
   ELEMENTS
------------------------- */

const flowerName =
    document.getElementById("flowerName");

const articleText =
    document.getElementById("articleText");

const mainImage =
    document.getElementById("mainImage");

const bonusSection =
    document.getElementById("bonusSection");

const bonusText =
    document.getElementById("bonusText");

const bonusImage =
    document.getElementById("bonusImage");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const pageCounter =
    document.getElementById("pageCounter");

const articleDate =
    document.getElementById("articleDate");



/* -------------------------
   LOAD FLOWERS
------------------------- */

async function loadFlowers() {

    try {

        const response =
            await fetch("flowers.json");

        flowers =
            await response.json();


        /* Read page number from URL */

        const params =
            new URLSearchParams(
                window.location.search
            );

        const page =
            parseInt(
                params.get("page")
            );


        if (
            page &&
            page >= 1 &&
            page <= flowers.length
        ) {

            currentPage =
                page - 1;
        }


        renderArticle();


    } catch (error) {

        console.error(
            "Could not load flowers.json:",
            error
        );

        flowerName.textContent =
            "Could not load articles";

        articleText.innerHTML =
            "<p>Please make sure flowers.json exists.</p>";
    }

}


/* -------------------------
   RENDER ARTICLE
------------------------- */

function renderArticle() {

    const flower =
        flowers[currentPage];

    articleDate.textContent =
        flower["Date"] || "";


    /* TITLE */

    flowerName.textContent =
        flower["Flower Name"];


    document.title =
        "Ziarul Marian | Florile Otiliei";


    /* MAIN TEXT */

    articleText.innerHTML = "";

    const paragraphs =
        splitIntoParagraphs(
            flower["Fact"]
        );


    paragraphs.forEach(
        paragraph => {

            const p =
                document.createElement("p");

            p.textContent =
                paragraph;

            articleText.appendChild(p);

        }
    );


    /* MAIN IMAGE */

    if (
        flower["Image Link"]
    ) {

        mainImage.src =
            flower["Image Link"];

        mainImage.alt =
            flower["Flower Name"];

        mainImage.style.display =
            "block";

    } else {

        mainImage.style.display =
            "none";

    }


    /* -------------------------
       BONUS
    ------------------------- */

    const hasBonusText =
        flower["Bonus"] &&
        flower["Bonus"].trim() !== "";

    const hasBonusImage =
        flower["Van Gogh Image Link"] &&
        flower["Van Gogh Image Link"].trim() !== "";


    if (
        hasBonusText ||
        hasBonusImage
    ) {

        bonusSection.style.display =
            "block";

    } else {

        bonusSection.style.display =
            "none";

    }


    /* BONUS TEXT */

    bonusText.innerHTML = "";

    if (hasBonusText) {

        const bonusParagraphs =
            splitIntoParagraphs(
                flower["Bonus"]
            );


        bonusParagraphs.forEach(
            paragraph => {

                const p =
                    document.createElement("p");

                p.textContent =
                    paragraph;

                bonusText.appendChild(p);

            }
        );

    }


    /* BONUS IMAGE */

    if (hasBonusImage) {

        bonusImage.src =
            flower[
                "Van Gogh Image Link"
            ];

        bonusImage.alt =
            flower["Flower Name"]
            + " bonus image";

        bonusImage.style.display =
            "block";

    } else {

        bonusImage.style.display =
            "none";

    }


    /* PAGE NUMBERS */

    pageCounter.textContent =
        `${currentPage + 1} / ${flowers.length}`;


    /* BUTTON STATE */

    previousButton.disabled =
        currentPage === 0;

    nextButton.disabled =
        currentPage ===
        flowers.length - 1;


    /* UPDATE URL */

    const newURL =
        `${window.location.pathname}?page=${currentPage + 1}`;

    window.history.replaceState(
        {},
        "",
        newURL
    );


    /* MOVE BACK TO TOP */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* -------------------------
   PARAGRAPH HANDLING
------------------------- */

function splitIntoParagraphs(text) {

    if (!text) {
        return [];
    }


    /*
        If your Excel text contains
        blank lines, they become
        separate paragraphs.
    */

    return text
        .split(/\n\s*\n/)
        .map(
            paragraph =>
                paragraph.trim()
        )
        .filter(
            paragraph =>
                paragraph.length > 0
        );

}


/* -------------------------
   NAVIGATION
------------------------- */

function nextArticle() {

    if (
        currentPage <
        flowers.length - 1
    ) {

        currentPage++;

        renderArticle();

    }

}


function previousArticle() {

    if (
        currentPage > 0
    ) {

        currentPage--;

        renderArticle();

    }

}


nextButton.addEventListener(
    "click",
    nextArticle
);


previousButton.addEventListener(
    "click",
    previousArticle
);


/* -------------------------
   KEYBOARD ARROWS
------------------------- */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextArticle();

        }

        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousArticle();

        }

    }
);


/* -------------------------
   START
------------------------- */

loadFlowers();