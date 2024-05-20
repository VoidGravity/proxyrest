/*
    *** Initial Data
*/

// school autocomplete
var schools = [
    "ST EXUPERY",
    "DESCARTES",
    "ECOLE BELGE FONDAMENTALE",
    "ECOLE BELGE SECONDAIRE",
    "VICTOR HUGO",
    "VICTOR HUGO CANTINE",
    "ECOLE BELGE SNACK CASA",
    "ECOLE BELGE RABAT",
    "ANDRE CHENIER",
    "LEON AFRICAIN RABAT",
    "DESCARTES CANTINE",
    "PAUL CEZANNE",
    "ST EXUPERY CANTINE",
];


var days = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi"
];

var categories = [
    "HORS D'OEUVRE",
    "PLAT ET GARNITURE",
    "PRODUITS LAITIERS",
    "DESSERT"
];

var categoriesTags = {
    "HORS D'OEUVRE": [
        "Appetizers",
        "Small Bites",
        "Finger Food",
        "Canapés",
        "Tapas",
        "Starters",
        "Nibbles",
        "Amuse-Bouche",
        "Party Snacks",
        "Crudités"
    ],
    "PLAT ET GARNITURE": [
        "Main Course",
        "Entrée",
        "Side Dish",
        "Main Dish",
        "Accompaniments",
        "Protein and Sides",
        "Dinner Plate",
        "Centerpiece Dish",
        "Hearty Meal",
        "Complete Meal"
    ],
    "PRODUITS LAITIERS": [
        "Dairy Products",
        "Milk",
        "Cheese",
        "Yogurt",
        "Butter",
        "Cream",
        "Cottage Cheese",
        "Sour Cream",
        "Dairy-Based",
        "Lactose"
    ],
    "DESSERT": [
        "Sweets",
        "Pastries",
        "Cakes",
        "Cookies",
        "Pies",
        "Ice Cream",
        "Puddings",
        "Confections",
        "Treats",
        "Sweet Treats"
    ]
};

var formData = [];
var school = null;
var date = { from: null, to: null }
$(document).ready(function () {
    repareFormData();
    renderRepaterWrapper();
    $("#school").autocomplete({
        source: schools,
        minLength: 0,
        select: function (event, ui) {
            setSchool(ui.item.value);
        }
    }).bind('focus', function () { $(this).autocomplete("search"); });
    // date picker
    let dateFormat = "mm/dd/yy";

    from = $("#date_from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            let minDate = getDate(this);
            let maxDate = new Date(minDate.getTime());
            maxDate.setDate(maxDate.getDate() + 2);
            $("#date_to").datepicker("option", "minDate", minDate);
            $("#date_to").datepicker("option", "maxDate", maxDate);
            setDate($("#date_from")[0].value,'from')
        }
    });

    to = $("#date_to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            let maxDate = getDate(this);
            let minDate = new Date(maxDate.getTime());
            minDate.setDate(minDate.getDate() - 2);
            $("#date_from").datepicker("option", "maxDate", maxDate);
            $("#date_from").datepicker("option", "minDate", minDate);
            setDate($("#date_to")[0].value,'to')
        }
    });

    function getDate(element) {
        let date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
});