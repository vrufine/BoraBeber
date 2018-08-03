var url = 'https://g34czjej1b.execute-api.us-east-1.amazonaws.com/production'
// var url = 'http://localhost:3000'

var USER = []
var IMGCAPAS = []
var MAXQTDIMG = 0
MobileUI.formByObject('contetInicial', {
    userEmailName: 'Teste',
    userPassword: '123'
})

window.addEventListener("orientationchange", function(){
    screen.orientation.lock('portrait')
});

function login(){
    var usuario = {}
    usuario.email = document.getElementById('userEmailName').value
    usuario.senha = document.getElementById('userPassword').value    
    if (document.getElementById('userEmailName').value == "" || document.getElementById('userPassword').value == ""){
        alert('Usuário e Senha vazios, verifique e tente novamente por gentileza !')
    } else {
        loading('Por favor aguarde o Login!')
        MobileUI.ajax.post(url + '/login').send(usuario).then(function (res){
            if(res.body.errorMessage) {
                closeLoading()
                alert(res.body.errorMessage)
            } else {
                USER = JSON.parse(JSON.stringify(res.body.data))
                if (USER.typeAccount == 'user'){
                    closeLoading()
                    openPage('main')
                } else {
                    closeLoading()
                    openPage('barAdmin', function (){
                        // console.log(res.body.data.swiperPhotos)
                        IMGCAPAS = res.body.data.swiperPhotos
                        setTimeout(() => {
                            new Swiper('.swipper-gallery', {
                                pagination: '.swiper-pagination'
                            });
                        }, 1000)
                    })
                }
            }
        }).catch(function(err) {
            closeLoading()
            alert('Falha ao realizar o Login! Tente novamente.')
            alert(err)
        })
    }
}

function createBar() {
    
    openPage('createBar', function() {        
        $("#tellCompany").mask("(99) 9 9999-99 99")
        // MobileUI.formByObject('formCreateBar', {
        //     nomeCompany: 'Bar',
        //     emailCompany: 'bar@bar.com.br',
        //     enderecoCompany: 'Rua do Bar',
        //     nroCompany: '123',
        //     bairroCompany: 'Jd. do Bar',
        //     tellCompany: '12312312312',
        //     passwordCompany: '123',
        //     passwordConfirmCompany: '123'
        // })
    })    
}

function cadUser(){
    var dadosUser = {}
    dadosUser.typeAccount = 'user'
    dadosUser.nomeUser = document.getElementById('nomeUser').value
    dadosUser.emailUser = document.getElementById('emailUser').value
    dadosUser.passwordUser = document.getElementById('passwordUser').value
    dadosUser.passwordConfirmUser = document.getElementById('passwordConfirmUser').value

    loading('Por favor aguarde, estou salvando suas precisas informações!')
    MobileUI.ajax.post(url + '/register').send(dadosUser).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            USER = JSON.parse(JSON.stringify(res.body.data.ops))
            openPage('main')
            closeLoading()
        }
    }).catch(function (err){
        closeLoading()
        alert('Api Error!')
    })
}

function cadBar(){
    var dadosBar = {}
    dadosBar.typeAccount = 'company'
    dadosBar.nomeCompany = document.getElementById('nomeCompany').value
    dadosBar.emailCompany = document.getElementById('emailCompany').value
    dadosBar.enderecoCompany = document.getElementById('enderecoCompany').value
    dadosBar.nroCompany = document.getElementById('nroCompany').value
    dadosBar.bairroCompany = document.getElementById('bairroCompany').value
    dadosBar.tellCompany = document.getElementById('tellCompany').value
    dadosBar.xNomeCompany = ""
    dadosBar.cnpjCompany = ""
    dadosBar.callendar = {
        "weekDays": [
            {
                "day": "Dom",
                "open": document.getElementById('weekDayDomOpen').innerHTML,
                "close": document.getElementById('weekDayDomClose').innerHTML
            },
            {
                "day": "Seg",
                "open": document.getElementById('weekDaySegOpen').innerHTML,
                "close": document.getElementById('weekDaySegClose').innerHTML
            },
            {
                "day": "Ter",
                "open": document.getElementById('weekDayTerOpen').innerHTML,
                "close": document.getElementById('weekDayTerClose').innerHTML
            },
            {
                "day": "Qua",
                "open": document.getElementById('weekDayQuaOpen').innerHTML,
                "close": document.getElementById('weekDayQuaClose').innerHTML
            },
            {
                "day": "Qui",
                "open": document.getElementById('weekDayQuiOpen').innerHTML,
                "close": document.getElementById('weekDayQuiClose').innerHTML
            },
            {
                "day": "Sex",
                "open": document.getElementById('weekDaySexOpen').innerHTML,
                "close": document.getElementById('weekDaySexClose').innerHTML
            },
            {
                "day": "Sab",
                "open": document.getElementById('weekDaySabOpen').innerHTML,
                "close": document.getElementById('weekDaySabClose').innerHTML
            }
        ]
    }

    dadosBar.passwordCompany = document.getElementById('passwordCompany').value
    dadosBar.passwordConfirmCompany = document.getElementById('passwordConfirmCompany').value
    loading('Por favor aguarde, salvando os dados da sua empresa!')
    MobileUI.ajax.post(url + '/register').send(dadosBar).then(function (res){
        if(res.body.errorMessage) {
            closeLoading()
            alert(res.body.errorMessage)
        } else {
            USER = JSON.parse(JSON.stringify(res.body.data.ops))
            closeLoading()
            openPage('barAdmin')
        }
    }).catch(function (err){
        closeLoading()
        alert('Ops, tive um probleminha para salvar seu cadastro! Tente novamente por gentileza.')
    })
}

function exitFromApp(){
    navigator.app.exitApp();
}

function goDetail() {
    openPage('bardetail', function (){
        new Swiper('.swipper-gallery', {
            pagination: '.swiper-pagination'
        });
    })
}

function addBarAmbientImg(tpEntrada){
    var tpEnt = ''
    if (tpEntrada == 'cam'){
        tpEnt = 1 
    } else {
        tpEnt = 2
    }
        
    var cameraOptions = {
        Quality: 80,
        DestinationType: 0,
        PictureSourceType: tpEnt,
        AllowEdit: true,
        TargetWidth: 720,
        TargetHeight: 400,
        CorrectOrientation: true,
        SaveToPhotoAlbum: true,
        Direction: 0
    }
    
    alertGifMessage(cameraOptions)
    
}

function cameraSuccess(imageData){
    var ImgBar = {}
    ImgBar.barName = USER.nomeCompany
    ImgBar.swiperPhotos = {
        "photosCapa": [
            {
                "imgOrder": parseInt(MAXQTDIMG) + 1,
                "base64Photo": "data:image/jpeg;base64," + imageData,                
            }
        ]
    }    
    window.addEventListener("orientationchange", function(){
        screen.orientation.lock('landscape-primary')
    })
    if (MAXQTDIMG <= 6){
        loading('Por favor aguarde, estou salvando a imagem do seu estabelecimento.')
        MobileUI.ajax.post(url + '/cadbar').send(ImgBar).then(function (res){
            if(res.body.errorMessage) {
                closeLoading()
                alert(res.body.errorMessage)
            } else {
                closeLoading()
                alert('Imagem salva com sucesso.')
                MAXQTDIMG = res.body.data.swiperPhotos.length
                USER = res.body.data
                IMGCAPAS = res.body.data.swiperPhotos
                setTimeout(() => {
                    new Swiper('.swipper-gallery', {
                        pagination: '.swiper-pagination'
                    });
                }, 1000)
            }
        }).catch(function (err){
            console.log(err)
            closeLoading()
            alert('Ops, tive um probleminha para salvar seu cadastro! Tente novamente por gentileza.')
        })
    } else {
        alert('Você já cadastrou a quantidade máxima de fotos permitida!')
    }
    window.addEventListener("orientationchange", function(){
        screen.orientation.lock('portrait')
    })
}

function cameraError(){
    alert(message)
}

function alertGifMessage(cameraOptions){
    var box = '<div class="grey-800 align-center">'
    box += '    <p>Para ter a melhor foto, por gentileza gire seu dispositivo para a esquerda, o colocando na posição horizontal.</p>'
    box += '    <img src="img/rotate.gif" style="widows: 100px; height: 100px;">'
    box += '</div>'
    alert({
        title: 'Imagens para capa.',
        message: box,
        class: 'grey-800 radius',
        buttons:[
            {
                label: 'Ok',
                class: 'text-grey-50',
                onclick: function(){
                    closeAlert()
                    navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
                }
            }
        ]
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
    
    //### Código mantido para testar no navegador!
    // document.getElementById('weekDay' + weekDay + status).innerHTML = '10:30'
    // if (document.getElementById('weekDay' + weekDay + status).innerHTML !== '00:00'){
    //     document.getElementById('weekDay' + weekDay).className = 'text-green'
    // } else {
    //     document.getElementById('weekDay' + weekDay).className = 'text-red'
    // }
}