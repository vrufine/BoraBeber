function goDetail() {
    openPage('bardetail', function (){
        new Swiper('.swipper-gallery', {
            pagination: '.swiper-pagination'
        });
    })
}

function showMyCustomizedAlert(content, message){
    alert({
    title:message,
    message:content,
    class:'blue',
    buttons:[
        {
            label: 'OK',
            class:'text-white',
            onclick: function(){
                //You code when user click in OK button.
                closeAlert();
            }
        },
        {
            label:'Cancel',
            class:'text-white',
            onclick: function(){
                closeAlert();
            }
        }
    ]
    });
}

function avaliar(name){
    var box = 'Quem é '+ name +' no rolê? <br/><br/>';
    box += '<button class="text-small margin-bottom full green radius padding">Chapa no Rolê</button>';
    box += '<button class="text-small margin-bottom full purple radius padding">Vai as vezes</button>';
    box += '<button class="text-small margin-bottom full red full radius padding">Nem Chama</button>';
    showMyCustomizedAlert(box, 'Avaliar')
}

function convidar(nameUser, nameBar, nameBeer, valueDecimal, valueCentavos){
    // var box = '<div class="blue align-center padding">';
    var box = 'Enviar convite para ' + nameUser + ' ?'
    box += '<p> Oii ' + nameUser + ' vamos lá no ' + nameBar + ' tomar uma ' + nameBeer + ' ????</p>';
    box += '<p>Tá só R$ ' + valueDecimal + ',' + valueCentavos + ' !!!</p>';
    box += '<p> Tá ai a Localização... BoraBeber!!!</p>';
    // box += '</div>';
    showMyCustomizedAlert(box, 'Convidar')
}