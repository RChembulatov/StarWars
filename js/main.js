const slides = document.querySelectorAll(".slider__item");
const arrowLeft = document.querySelector(".slider__nav--left");
const arrowRight = document.querySelector(".slider__nav--right");
let slideIndex = 1;

const overlay = document.querySelector(".overlay");
const btnVideo = document.querySelector(".hero__button-play");
const btnClose = document.querySelector(".close");

//Слайдер

//Функция показа слайдов
function showSlides(n) {
  if (n > slides.length - 4) {
    //Проверка на количество слайдов
    slideIndex = 1;
  }

  if (n < 1) {
    //Проверка на количество слайдов на отрицательные значения
    slideIndex = slides.length - 4;
  }

  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex].style.display = "flex";
  slides[slideIndex + 1].style.display = "flex";
  slides[slideIndex + 2].style.display = "flex";
}

//Функция смены слайдов
function changeSlider(n) {
  showSlides((slideIndex += n));
}

//Движение слайдов стрелочкой
arrowLeft.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  changeSlider(-1);
});

//Движение слайдов стрелочкой
arrowRight.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  changeSlider(1);
});

//Функция автоматичекого переключения слайдов
function activateSlider() {
  paused = setInterval(() => {
    changeSlider(1);
  }, 4000);
}

//Функция остановки слайдов при наведении
function stopSliderByMouse(triggers) {
  triggers.addEventListener("mouseenter", () => {
    clearInterval(paused); //Обнуляем интервал смены показа слайдов
  });
}

//Функция отмены остановки слайдов при наведении
function activateSliderByMouse(triggers) {
  triggers.addEventListener("mouseleave", () => {
    activateSlider(paused);
  });
}

showSlides(slideIndex);
activateSlider();
stopSliderByMouse(slides[0].parentNode);
stopSliderByMouse(arrowLeft);
stopSliderByMouse(arrowRight);
activateSliderByMouse(slides[0].parentNode);
activateSliderByMouse(arrowLeft);
activateSliderByMouse(arrowRight);


//Проигрыватель видео

//Создаем проигрыватель видео
function createPlayer() {
  player = new YT.Player("frame", {
    height: "100%",
    width: "100%",
    videoId: "67E4F60YPqs",
  });
  overlay.style.display = "flex";
}

//Функционал открытия проигрывателя
function bindElement() {
  btnVideo.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.body.style.overflow = "hidden";
    if (document.querySelector("iframe#frame")) {
      //если плеер запущен
      overlay.style.display = "flex";
    } else {
      //если плеер не запущен
      createPlayer();
    }
  });
}

//Функционал закрытия проигрывателя
function bindCloseBtn() {
  btnClose.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "visible";
    player.stopVideo();
  });
}

//Инициализация проигрывателя
function init() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  bindElement();
  bindCloseBtn();
}

init();