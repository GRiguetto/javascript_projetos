const novaImagem = chrome.runtime.getURL("img/image.jpg");

function substituirImagens() {
    const imagens = document.getElementsByTagName("img");
    for (const img of imagens) {
        if (img.classList.contains("substituida")) continue;

        const novaImg = new Image();
        novaImg.src = novaImagem;
        novaImg.style.width = img.offsetWidth + "px";
        novaImg.style.height = img.offsetHeight + "px";
        novaImg.style.objectFit = "cover";
        novaImg.classList.add("substituida");

        img.parentNode.replaceChild(novaImg, img);
    }
}

function substituirFundos() {
    const elementosComFundo = document.querySelectorAll("*");
    for (const elemento of elementosComFundo) {
        if (elemento.style.backgroundImage) {
            elemento.style.backgroundImage = `url('${novaImagem}')`;
            elemento.style.backgroundSize = "cover";
        }
    }
}

function substituirVideos() {
    const videos = document.getElementsByTagName("video");
    for (const video of videos) {
        if (video.classList.contains("substituida")) continue;

        const img = document.createElement("img");
        img.src = novaImagem;
        img.style.width = video.offsetWidth + "px";
        img.style.height = video.offsetHeight + "px";
        img.style.objectFit = "cover";
        img.classList.add("substituida");

        video.parentNode.replaceChild(img, video);
    }
}

function substituirIframe() {
    const iframes = document.getElementsByTagName("iframe");
    for (const iframe of iframes) {
        if (iframe.classList.contains("substituida")) continue;

        const img = document.createElement("img");
        img.src = novaImagem;
        img.style.width = iframe.offsetWidth + "px";
        img.style.height = iframe.offsetHeight + "px";
        img.style.objectFit = "cover";
        img.classList.add("substituida");

        iframe.parentNode.replaceChild(img, iframe);
    }
}

function substituirTodasMidias() {
    substituirFundos();
    substituirIframe();
    substituirImagens();
    substituirVideos();
}

substituirTodasMidias();

let timeoutId;

const observador = new MutationObserver((mutacoes) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        substituirTodasMidias();
    }, 100);
});

const config = { childList: true, subtree: true };
observador.observe(document.body, config);