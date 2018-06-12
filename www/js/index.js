function goDetail() {
    openPage('bardetail', function (){
        new Swiper('.swipper-gallery', {
            pagination: '.swiper-pagination'
        });
    })
}

function showMyCustomizedAlert(){
    alert({
    title:'My alert',
    message:'This is my customized alert!',
    buttons:[
        {
        label: 'OK',
        onclick: function(){
            //You code when user click in OK button.
            closeAlert();
        }
        },
        {
        label:'Cancel',
        onclick: function(){
            closeAlert();
        }
        }
    ]
    });
}

function avaliar(id) {
    var box = 'Quem é seu(sua) amigo(a) no rolê? <br/><br/>';
    box += '<button class="text-small margin-bottom full green radius padding">Chapa no Rolê</button>';
    box += '<button class="text-small margin-bottom full purple radius padding">Vai as vezes</button>';
    box += '<button class="text-small margin-bottom full red full radius padding">Nem Chama</button>';
    alert(box, 'Avaliação')
}