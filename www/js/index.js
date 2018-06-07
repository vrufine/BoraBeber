function goDetail() {
    openPage('bardetail', function (){
        new Swiper('.swipper-gallery', {
            pagination: '.swiper-pagination'
        });
    })
}