const setActiveButton = ($tabs, index) => {
    $tabs.find("li").removeClass("active").eq(index).addClass("active");
};

const setActiveContent = (id) => {
    $(id).siblings().removeClass("active").end().addClass("active");
};

function handleTabClick(e) {
    e.preventDefault();

    const index = $(this).parent().index();
    setActiveButton($(this).closest(".js-tabs"), index);
    setActiveContent($(this).attr("href"));
}

$(function () {
    $(document).on("click", ".js-tabs a", handleTabClick);
});
