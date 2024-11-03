let donateLogic;
let buyLogic;

class ModalLogic {
    constructor(rootModal, openButton, closeButton, form, bankInput) {
        this.modal = document.getElementById(rootModal);
        this.modalButton = document.getElementById(openButton);
        this.closeButton = document.getElementById(closeButton);
        this.form = document.getElementById(form);
        this.bankInput = document.getElementById(bankInput)
        const self = this;

        this.modalButton.onclick = function (event) {
            self.modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
        this.closeButton.onclick = function (event) {
            self.modal.style.display = "none";
        }

        this.form.querySelectorAll("input:empty,textarea:empty").forEach(element => {
            element.classList.add("empty");
        });

        this.form.querySelectorAll("input").forEach(element => {
            element.addEventListener("keyup", function (event) {
                if (element.value.trim() !== '') {
                    element.classList.remove('empty');
                } else {
                    element.classList.add('empty');
                }
            });
        });

        this.modal.querySelectorAll(".payment-method-icon").forEach(element => {
            element.addEventListener("click", function (event) {
                self.modal.querySelectorAll(".payment-method-icon-selected").forEach(element => {
                    element.classList.remove("payment-method-icon-selected");
                });
                element.classList.add("payment-method-icon-selected");
                self.bankInput.value = element.dataset.code;
            });
        });

        //TODO: ADD PROPER DONATE FORM THROUGH THE BANK
        this.form.addEventListener("submit", function (event) {
            event.preventDefault();
            let url;
            // TODO: FIX STATIC IP ADDRESS
            if (self === buyLogic) {
                url = "https://resentful.eu/V3.0/api/buyNote.php"
            } else {
                url = "https://resentful.eu/V3.0/api/donateToPiano.php"
            }
            self.executeForm(url);
            self.modal.style.display = "none";
        });
    }


    executeForm(url) {
        const xhttp = new XMLHttpRequest();
        const formData = new FormData(this.form);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // TODO: Do something with a successful Database Entry
            }
        };
        xhttp.open("POST", url);
        xhttp.send(formData);
    }

    static initClickOffModalLogic() {
        window.onclick = function (event) {
            if (event.target === donateLogic.modal) {
                donateLogic.modal.style.display = "none";
            } else if (event.target === buyLogic.modal) {
                buyLogic.modal.style.display = "none";
            }
        }
    }


    static setBuyNote(key) {
        const buyNoteSelect = document.getElementById("buyNoteSelect");
        for (let option of buyNoteSelect) {
            option.selected = option.value === key.id.toString(); // .ToString needed as one is String value , 2nd int
        }
        ModalLogic.generatePriceOptions(key);
    }

    static generatePriceOptions(key) {
        if (key != null) {
            const select = document.getElementById("buyAmount");
            while (select.options.length > 0) {
                select.remove(0);
            }
            const note = Notes.getNoteList().find(it => it.id === key.id);
            if (note.currentPrice >= 200) {
                this.addOptionToBuyNote(undefined, select);
            }
            if (note.currentPrice <= 150) {
                this.addOptionToBuyNote(50, select);
            }
            if (note.currentPrice <= 100) {
                this.addOptionToBuyNote(100, select);
            }
            if (note.currentPrice <= 50) {
                this.addOptionToBuyNote(150, select);
            }
            if (note.currentPrice === 0) {
                this.addOptionToBuyNote(200, select);
            }
        }
    }

    static addOptionToBuyNote(amount, select) {
        const option = document.createElement("option");
        if (amount == null) {
            option.text = "Välja müüdud";
            option.value = "";
        } else {
            option.value = amount
            option.text = amount + " €";
        }
        select.add(option);
    }

    static initializeBuyNoteOptionList() {
        const select = document.getElementById("buyNoteSelect");
        Notes.getNoteList().forEach(note => {
            const option = document.createElement("option");
            if (note.currentPrice >= note.totalPrice) {
                option.disabled = true;
            }
            option.value = note.id;
            option.text = note.displayNote;
            select.add(option);
        });
        select.onchange = function (event) {
            ModalLogic.setBuyNote(Canvas.getDrawnKeyById(event.target.value))
        }
    }
}

window.addEventListener('load', function (ev) {
    donateLogic = new ModalLogic("donateModal", "donateButton", "donateClose", "donateForm", "donationBank");
    buyLogic = new ModalLogic("buyModal", "buyButton", "buyClose", "buyForm", "buyBank");
    ModalLogic.initClickOffModalLogic();
    ModalLogic.initializeBuyNoteOptionList();
}, false);