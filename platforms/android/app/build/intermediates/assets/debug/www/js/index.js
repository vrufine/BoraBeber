// var url = 'https://g34czjej1b.execute-api.us-east-1.amazonaws.com/production'
var url = 'http://localhost:3000'
var moment = req('moment');

function login(){
    var usuario = {}
    usuario.email = document.getElementById('email').value
    usuario.senha = document.getElementById('senha').value
    
    MobileUI.ajax.post(url + '/login').send(usuario).then(function (res){
        if(res.body.errorMessage) {
            alert(res.body.errorMessage)
        } else {
            console.log(res.body)
            openPage('main')
        }
    }).catch(function(err) {
        console.log(err)
        alert('Api Error!')
     })
}

function cadBar(){
    var dadosBar = {}
    dadosBar.nomeCompany = document.getElementById('nomeCompany').value
    dadosBar.cnpjCompany = document.getElementById('cnpjCompany').value
    dadosBar.xNomeCompany = document.getElementById('xNomeCompany').value
    dadosBar.enderecoCompany = document.getElementById('enderecoCompany').value
    dadosBar.nroCompany = document.getElementById('nroCompany').value
    dadosBar.tellCompany = document.getElementById('tellCompany').value
    dadosBar.callendar = {
        "weekDays": [
            {
              "day": "Dom",
              "open": document.getElementById('weekDayOpenDom').innerHTML,
              "close": document.getElementById('weekDayCloseDom').innerHTML
            },
            {
              "day": "Seg",
              "open": document.getElementById('weekDayOpenSeg').innerHTML,
              "close": document.getElementById('weekDayCloseSeg').innerHTML
            },
            {
              "day": "Ter",
              "open": document.getElementById('weekDayOpenTer').innerHTML,
              "close": document.getElementById('weekDayCloseTer').innerHTML
            },
            {
              "day": "Qua",
              "open": document.getElementById('weekDayOpenQua').innerHTML,
              "close": document.getElementById('weekDayCloseQua').innerHTML
            },
            {
              "day": "Qui",
              "open": document.getElementById('weekDayOpenQui').innerHTML,
              "close": document.getElementById('weekDayCloseQui').innerHTML
            },
            {
              "day": "Sex",
              "open": document.getElementById('weekDayOpenSex').innerHTML,
              "close": document.getElementById('weekDayCloseSex').innerHTML
            },
            {
              "day": "Sab",
              "open": document.getElementById('weekDayOpenSab').innerHTML,
              "close": document.getElementById('weekDayCloseSab').innerHTML
            }
        ]
    }

    MobileUI.ajax.post(url + '/register').send(dadosBar).then(function (res){
        if(res.body.errorMessage) {
            alert(res.body.errorMessage)
        } else {
            alert('Cadastro realizado com sucesso!')
            openPage('main')
        }
    }).catch(function (err){
        alert('Api Error!')
    })
}


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
    class:'white radius',
    buttons:[
        {
            label: 'OK',
            class:'text-blue-500',
            onclick: function(){
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
    box += '<button class="text-small margin-bottom full green radius padding" onclick="closeAlert()">Chapa no Rolê</button>';
    box += '<button class="text-small margin-bottom full purple radius padding" onclick="closeAlert()">Vai as vezes</button>';
    box += '<button class="text-small margin-bottom full red full radius padding" onclick="closeAlert()">Nem Chama</button>';
    showMyCustomizedAlert(box, 'Avaliar')
}

function convidar(nameUser, nameBar, nameBeer, valueDecimal, valueCentavos){
    var box = 'Enviar convite para ' + nameUser + ' ?'
    box += '<p> Oii ' + nameUser + ' vamos lá no ' + nameBar + ' tomar uma ' + nameBeer + ' ????</p>';
    box += '<p>Tá só R$ ' + valueDecimal + ',' + valueCentavos + ' !!!</p>';
    box += '<p> Tá ai a Localização... BoraBeber!!!</p>';
    showMyCustomizedAlert(box, 'Convidar')
}

function weekCollor(weekDay){
    var collorSeted = document.getElementById('weekDay' + weekDay).className
    switch (collorSeted) {
        case 'grey-200':
            document.getElementById('weekDay' + weekDay).className = 'text-green'
            break;
        case 'text-green':
            document.getElementById('weekDay' + weekDay).className = 'text-red'
            document.getElementById('weekDay' + weekDay + 'Open').innerHTML = '00:00'
            document.getElementById('weekDay' + weekDay + 'Close').innerHTML = '00:00'
            break;
        case 'text-red':
            document.getElementById('weekDay' + weekDay).className = 'text-green'
            break;
        default:
            break;
    }
}

function weekDayTime(weekDay, status){
    var weekDay = weekDay
    var status = status
    var options = {
        type: 'time',
        date: new Date(),
        minDate: new Date(),
        maxDate: new Date()
    }

    window.DateTimePicker.pick(options, function (date) {
        var ts = new Date(date)
        document.getElementById('weekDay' + weekDay + status).innerHTML = moment(ts).format('HH:mm')
        if (document.getElementById('weekDay' + weekDay + status).innerHTML !== '00:00'){
            document.getElementById('weekDay' + weekDay).className = 'text-green'
        } else {
            document.getElementById('weekDay' + weekDay).className = 'text-red'
        }
    })    
        
        // document.getElementById('weekDay' + weekDay + status).innerHTML = '10:30'
        // if (document.getElementById('weekDay' + weekDay + status).innerHTML !== '00:00'){
        //     document.getElementById('weekDay' + weekDay).className = 'text-green'
        // } else {
        //     document.getElementById('weekDay' + weekDay).className = 'text-red'
        // }    
}