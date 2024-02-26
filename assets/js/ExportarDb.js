if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../../index.html";
}
function ExportarDB() {

    var leDb = JSON.stringify(localStorage, null, 4);
    document.location = 'data:Application/octet-stream;content-disposition:attachment;filename=file.txt,' + encodeURIComponent(leDb);

}