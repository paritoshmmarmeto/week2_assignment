document.addEventListener('DOMContentLoaded', function () {
    const menuHamburger = document.querySelector(".menu-hamburger");
    const navLinks = document.querySelector(".nav-links");

    menuHamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-menu');
    });

   let splide =  new Splide('#splide', {
        type: 'loop',
        perPage: 1,
        focus: 'center',
        autoplay: true,
        interval: 1000,
        flickMaxPages: 1,
        updateOnMove: true,
        pagination: false,
        padding: '0%',
        throttle: 100,
        breakpoints: {
            0: {
                perPage: 1,
                padding: '30%'
            }
        }
    }).mount();
    
    // Function to print the src of the current slide image

    function printCurrentSlideSrc() {
        const currentSlide = splide.Components.Slides.getAt(splide.index);
        const imgElement = currentSlide.slide.querySelector('img');
        //console.log(imgElement.getAttribute('src').length);
        let num = imgElement.getAttribute('src')[12];
      let new_num = `${(num % 4)  + 1 }`;
     let new_src = "image/watch_"+new_num+ ".png"; 
      imgElement.setAttribute('src', new_src);

        let color = ["linear-gradient(105.54deg, #F4A764 -2.93%, #FFDEC2 72.14%)",  "linear-gradient(105.54deg, #ADB0B0 -2.93%, #E1E1E1 72.14%)", " linear-gradient(105.54deg, #30A357 -2.93%, #75E39A 72.14%)", "linear-gradient(105.54deg, #F24F4F -2.93%, #FFA895 72.14%)" ];

     fetch('data.json')
     .then(response => response.json())
     .then( data => {  
                const sectionBlocks = data.sectionBlocks;
                document.getElementById("heading").innerText = data.sectionBlocks[new_num-1].heading;
                document.getElementById("subheading").innerText = data.sectionBlocks[new_num-1].subheading;
                document.getElementById("description").innerText = data.sectionBlocks[new_num-1].description;
                document.getElementById("price").innerText = data.sectionBlocks[new_num-1].price; 
                document.body.style.background = color[new_num-1];
               
            })
      
    }
    
    // Add event listeners to arrow buttons
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    
    prevArrow.addEventListener('click', printCurrentSlideSrc);
    nextArrow.addEventListener('click', printCurrentSlideSrc);
    
    // Also print the src when the slide changes automatically
    splide.on('move', printCurrentSlideSrc);
    
    
});

