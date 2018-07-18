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
    class:'white',
    buttons:[
        {
            label: 'OK',
            class:'text-blue-500',
            onclick: function(){
                //You code when user click in OK button.
                closeAlert();
            }
        },
        {
            label:'Cancel',
            class:'text-blue-500',
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

function animatedShake(weekDay){
    var weekDay = 'weekDay' + weekDay
    var collorSeted = document.getElementById(weekDay).className
    var box = '<div class="row">'
    box += '    <div class="col align-left">'
    box += '        <label>Aberto das:</label>'
    box += '        <input id="barTimeOpened" type="time" required="required" maxlength="8" name="hour" pattern="[0-9]{2}:[0-9]{2} [0-9]{2}$"/>'
    box += '    </div>'
    box += '    <div class="col align-right">'
    box += '        <label>Até as:</label>'
    box += '        <input id="barTimeClosed" type="time" required="required" maxlength="8" name="hour" pattern="[0-9]{2}:[0-9]{2} [0-9]{2}$"/>'
    box += '    </div>'
    box += '</div>'
    switch (collorSeted) {
        case 'text-strong':
            document.getElementById(weekDay).className = 'text-strong text-green'
            showMyCustomizedAlert(box, '')
            break;
        case 'text-strong text-green':
            document.getElementById(weekDay).className = 'text-strong text-red'
            break;
        case 'text-strong text-red':
            document.getElementById(weekDay).className = 'text-strong'
            break;
        default:
            break;
    }
}