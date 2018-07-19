// var url = 'https://g34czjej1b.execute-api.us-east-1.amazonaws.com/production'
var url = 'http://localhost:3000'

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

    MobileUI.ajax.post(url + '/register').send(dadosBar).then(function (res){
        if(res.body.errorMessage) {
            alert(res.body.errorMessage)
        } else {
            console.log(res.body)
            alert('Cadastro realizado com sucesso!')
            openPage('main')
        }
    }).catch(function (err){
        console.log(err)
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
    var element = document.getElementById('teste')
    // var box = '<div class="row">'
    // box += '    <div class="col align-left">'
    // box += '        <label>Aberto das:</label>'
    var box = '        <input id="barTimeOpened" type="time" required="required" maxlength="8" name="hour" pattern="[0-9]{2}:[0-9]{2} [0-9]{2}$" placeholder="Aberto das:"/>'
    // box += '    </div>'
    // box += '    <div class="col align-right">'
    // box += '        <label>Até as:</label>'
    box += '        <input id="barTimeClosed" type="time" required="required" maxlength="8" name="hour" pattern="[0-9]{2}:[0-9]{2} [0-9]{2}$" placeholder="Até as:"/>'
    // box += '    </div>'
    // box += '</div>'

    switch (collorSeted) {
        case 'text-strong':
            document.getElementById(weekDay).className = 'text-strong text-green'
            element.innerHTML = box
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