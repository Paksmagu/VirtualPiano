class DonatorCards {
    constructor() {
        throw "DonatorCards is not meant to be instantiated.";
    }

    static cardSwappingSpeed = 700;
    static cardSwappingRate = 4000;

    static donatorCardFadeOut = 40;

    static donatorStack = document.getElementById("donator-stack");

    static swapEffectInterval = undefined;

    static clearDonorStack() {
        clearInterval(this.swapEffectInterval);
        for (let i = this.donatorStack.childNodes.length - 1; i >= 0; i--) {
            const fadeTarget = this.donatorStack.childNodes[i]
            const fadeEffect = setInterval(function () {
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = 1;
                }
                if (fadeTarget.style.opacity > 0) {
                    fadeTarget.style.opacity -= 0.1;
                } else {
                    clearInterval(fadeEffect);
                    DonatorCards.donatorStack.removeChild(fadeTarget);
                }
            }, this.donatorCardFadeOut);
        }
    }

    static createDonatorInfo(json) {
        this.clearDonorStack();
        for (let jsonIndex = 0; jsonIndex < json.length; jsonIndex++) {
            let jsonRow = json[jsonIndex];
            let fullName = jsonRow.name;

            let donatorCard = document.createElement("div")
            donatorCard.classList.add("donator-card")
            let nameSpan = document.createElement("span")
            let bold = document.createElement("b")
            nameSpan.classList.add("donator-name")
            bold.innerText = fullName;
            nameSpan.appendChild(bold)

            let noteSpan = document.createElement("span")
            noteSpan.style.marginLeft = "10px"
            noteSpan.innerText = jsonRow.displayNote

            let donationElement = document.createElement("div");
            donationElement.classList.add("text-concat");
            donationElement.innerText = jsonRow.donationText;

            donatorCard.appendChild(nameSpan);
            donatorCard.appendChild(noteSpan);
            donatorCard.appendChild(donationElement);

            this.donatorStack.prepend(donatorCard);
        }
        this.swap(json.length);
    }

    static swap(amountOfAddedRows) {
        if (amountOfAddedRows <= 1) return;
        this.swapEffectInterval = setInterval(function () {
            const card = DonatorCards.donatorStack.lastChild;
            card.style.animation = "swapCards " + DonatorCards.cardSwappingSpeed + "ms forwards";
            setTimeout(() => {
                card.style.animation = "";
                DonatorCards.donatorStack.prepend(card);
            }, DonatorCards.cardSwappingSpeed);
        }, this.cardSwappingRate);
    }
}